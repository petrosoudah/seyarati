import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User } from 'lucide-react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Seyarti AI. How can I help you with your car today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userText = input;
    const userMessage = { id: messages.length + 1, text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText })
      });

      if (!res.ok) {
        throw new Error(`Chat request failed with status ${res.status}`);
      }

      const data = await res.json();
      setMessages(prev => [
        ...prev, 
        { id: prev.length + 1, text: data.text, sender: data.sender }
      ]);
    } catch(err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: 'I could not reach the assistant just now. Please make sure the backend server is running, then try again.',
          sender: 'bot'
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button className="ai-chatbot-widget" onClick={() => setIsOpen(true)}>
          <Bot size={28} />
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-window glass-panel">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <Bot size={20} />
              <div>
                <span>Seyarti AI Assistant</span>
                <small>Fast guidance for owners</small>
              </div>
            </div>
            <button className="ai-chat-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="ai-chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`ai-msg-row ${msg.sender}`}>
                <div className="ai-msg-avatar">
                  {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="ai-msg-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask anything about cars..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim() || isSending}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
