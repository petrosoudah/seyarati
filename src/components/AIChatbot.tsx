import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User } from 'lucide-react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Seyarti AI. How can I help you with your car today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMessage = { id: messages.length + 1, text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText })
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev, 
        { id: prev.length + 1, text: data.text, sender: data.sender }
      ]);
    } catch(err) {
      console.error(err);
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
              <span>Seyarti AI Assistant</span>
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
            <button type="submit" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
