import { useEffect, useRef, useState } from "react";
import { logChat } from "../analytics";
import DOMPurify from "dompurify";
import "./ChatWindow.css";

interface ChatWindowProps {
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const quickQuestions = [
  "What are your main projects?",
  "What technologies do you use?",
  "What is your professional experience?",
  "What are your studies?",
];

const systemPrompt = {
  role: "system",
  content: `<h4>👋 Hello! I'm Denis's virtual assistant.</h4>
  <p>I can provide you with information about:</p>
  <ul>
    <li><b>Professional experience</b> and Denis's education</li>
    <li><b>Projects</b> he has worked on</li>
    <li><b>Technologies</b> he uses</li>
    <li><b>Skills</b> and areas of expertise</li>
  </ul>
  <p>How can I help you? 😊</p>`,
};

type Sender = "user" | "ai" | "error" | "warning";
interface ChatMessage {
  sender: Sender;
  text: string;
}
interface ApiResponse {
  content: string;
  flag?: "warning" | "error";
  explanation?: string;
}

const ChatWindow = ({ setShowChat }: ChatWindowProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    sendMessage(question);
  };

  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: systemPrompt.content,
      },
    ]);
  }, []);

  // Function to sanitize user input using a strict configuration
  const sanitizeUserInput = (dirty: string): string => {
    // Disallow any tags or attributes by setting empty allowed lists.
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  };

  const sendMessage = async (messageText?: string) => {
    // Clean user input (plain text only, no HTML)
    const textToSend = messageText || input;
    setInput("");
    const safeUserText = sanitizeUserInput(textToSend);
    console.log("User input sanitized:", safeUserText);

    if (safeUserText.trim() === "") return;

    const userMessage: ChatMessage = { sender: "user", text: safeUserText };
    // setMessages((prev: any) => [...prev, userMessage]);
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setIsLoading(true);
    setError(null);

    const conversationContext = updatedMessages.map((msg, index) => {
      // Assume the first message (index 0) is the system prompt.
      if (index === 0) {
        return { role: "system", content: msg.text };
      }
      return {
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      };
    });
    console.log("mess", conversationContext);

    try {
      const response = await fetch(
        "https://workers-playground-bitter-heart-da25.vlasdenis2008.workers.dev/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: conversationContext,
          }),
        }
      );

      const data: ApiResponse = await response.json();
      console.log("res", data);

      if (data.flag) {
        // Create an error message that will remain in chat
        const flaggedMessage: ChatMessage = {
          sender: data.flag === "warning" ? "warning" : "error",
          text: data.explanation || "",
        };
        setMessages((prev) => [...prev, flaggedMessage]);
        // Remove the user message from the list if needed
        const indexOfFlaggedMessage = updatedMessages.findIndex(
          (message) => message.text === safeUserText
        );
        if (indexOfFlaggedMessage !== -1) {
          updatedMessages.splice(indexOfFlaggedMessage, 1);
        }
      }
      // For AI output HTML is allowed, but we clean it for safety
      const aiMessage: ChatMessage = { sender: "ai", text: data.content };
      setMessages((prev) => [...prev, aiMessage]);

      // Log chat Q/A
      try {
        await logChat({
          question: safeUserText,
          answer: data?.content,
          flag: data?.flag || null,
        });
      } catch (e) {
        console.error("chat log error", e);
      }
    } catch (err) {
      // Add the error message directly to chat
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setMessages((prev) => [...prev, { sender: "error", text: errorMessage }]);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="messages">
          <div className="header">
            <h2>Ask about Denis</h2>
            <i
              className="bi bi-x-circle"
              onClick={() => setShowChat(false)}
            ></i>
          </div>
          {messages.map((msg: ChatMessage, index: number) => (
            <div key={index} className={`message ${msg.sender}`}>
              {/* For AI output HTML is allowed but it passes through DOMPurify */}
              <span
                dangerouslySetInnerHTML={{
                  __html: msg.text,
                }}
              />
            </div>
          ))}
          {messages.length === 1 && (
            <div className="quick-questions">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                  disabled={isLoading}
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="message ai loading">
              Thinking<span className="cursor"></span>
            </div>
          )}
          {error && <div className="message error">{error}</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            disabled={isLoading}
            placeholder="Type a message..."
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
