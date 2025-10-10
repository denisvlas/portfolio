import { useEffect, useRef, useState } from "react";
import { logChat } from "../analytics";
import DOMPurify from "dompurify";
import "./ChatWindow.css";

interface ChatWindowProps {
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const quickQuestions = [
  "Care sunt proiectele tale principale?",
  "Ce tehnologii folosești?",
  "Care este experiența ta profesională?",
  "Ce studii ai?",
];

const systemPrompt = {
  role: "system",
  content: `<h4>👋 Bună! Sunt asistentul virtual al lui Denis.</h4>
  <p>Pot să îți ofer informații despre:</p>
  <ul>
    <li><b>Experiența profesională</b> și educația lui Denis</li>
    <li><b>Proiectele</b> la care a lucrat</li>
    <li><b>Tehnologiile</b> pe care le folosește</li>
    <li><b>Skill-urile</b> și domeniile de expertiză</li>
  </ul>
  <p>Cu ce te pot ajuta? 😊</p>`,
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
    // Curăță inputul utilizatorului (doar text simplu, fără HTML)
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
      // Presupunem că primul mesaj (index 0) este promptul de sistem.
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
        // Creează un mesaj de tip eroare care va rămâne în chat
        const flaggedMessage: ChatMessage = {
          sender: data.flag === "warning" ? "warning" : "error",
          text: data.explanation || "",
        };
        setMessages((prev) => [...prev, flaggedMessage]);
        // Scoate mesajul utilizatorului din lista de mesaje, dacă e nevoie
        const indexOfFlaggedMessage = updatedMessages.findIndex(
          (message) => message.text === safeUserText
        );
        if (indexOfFlaggedMessage !== -1) {
          updatedMessages.splice(indexOfFlaggedMessage, 1);
        }
      }
      // Pentru output-ul AI se permite HTML, dar îl curățăm din siguranță
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
      // Adaugă mesajul de eroare direct în chat
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
              {/* Pentru output AI se permite HTML dar este trecut prin DOMPurify */}
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
