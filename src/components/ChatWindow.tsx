import { useEffect, useRef, useState } from "react";
import "./ChatWindow.css";
interface ChatWindowProps {
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}


const quickQuestions = [
    "Care sunt proiectele tale principale?",
    "Ce tehnologii folosești?",
    "Care este experiența ta profesională?",
    "Ce studii ai?"
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
  <p>Cu ce te pot ajuta? 😊</p>`
  };

const ChatWindow = ({ setShowChat }: ChatWindowProps) => {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleQuickQuestion = (question: string) => {
    setInput(question);
    sendMessage(question); // Pass the question directly instead of waiting for setInput
  };
  useEffect(() => {
    setMessages([{ 
      sender: "ai", 
      text: systemPrompt.content
    }]);
  }, []);
  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;

    if (textToSend.trim() === "") return;

    const userMessage = { sender: "user", text: textToSend };
    setMessages((prev: any) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://workers-playground-bitter-heart-da25.vlasdenis2008.workers.dev/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.2-90b-vision-preview",
            messages: [
              {
                role: "user",
                content: textToSend,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      const aiMessage = { sender: "ai", text: data.content };
      setMessages((prev: any) => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
  }, [messages, isLoading]); // Scroll when messages or loading state changes


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
          {messages.map((msg: any, index: number) => (
            <div key={index} className={`message ${msg.sender}`}>
              {/* {msg.text} */}
              <span dangerouslySetInnerHTML={{ __html: msg.text }} />

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
          <button onClick={()=>sendMessage()} disabled={isLoading || !input.trim()}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
