import { useState, useRef, useEffect } from 'react';
import { Send, UserCircle, ImageIcon, MoreVertical, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Messages.css';

const MOCK_CONTACTS = [
  { id: 1, name: 'Bob\'s Fix-It Shop (WIP)', lastMessage: 'yes i have the pads lol', time: '10:42 AM', unread: 2 },
  { id: 2, name: 'Cool Cars Inc. (Testing)', lastMessage: 'bring car tomorrow pls', time: 'Yesterday', unread: 0 },
];

const Messages = () => {
  const navigate = useNavigate();
  const [activeContact, setActiveContact] = useState(MOCK_CONTACTS[0]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(console.error);
  }, [activeContact]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const text = newMessage;
    setNewMessage('');
    
    // Optimistic UI update
    const optimisticMsg = {
      id: Date.now(),
      sender: 'Me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages(prev => [...prev, optimisticMsg]);

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="container page-shell page-enter-active messages-page">
      <div className="messages-layout glass-panel">
        <aside className="messages-sidebar">
          <div className="sidebar-header">
            <h3>Messages</h3>
            <p>Active repair conversations</p>
          </div>
          <div className="contacts-list">
            {MOCK_CONTACTS.map(contact => (
              <div 
                key={contact.id} 
                className={`contact-item ${activeContact.id === contact.id ? 'active' : ''}`}
                onClick={() => setActiveContact(contact)}
              >
                <UserCircle size={40} color="var(--color-text-muted)" />
                <div className="contact-info">
                  <div className="contact-name-row">
                    <span className="contact-name">{contact.name}</span>
                    <span className="contact-time">{contact.time}</span>
                  </div>
                  <div className="contact-last-message">
                    <span>{contact.lastMessage}</span>
                    {contact.unread > 0 && <span className="unread-badge">{contact.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="chat-area">
          <header className="chat-header">
            <div className="chat-header-info">
              <UserCircle size={40} color="var(--color-text-muted)" />
              <div>
                <h3>{activeContact.name}</h3>
                <span className="chat-presence">Online</span>
              </div>
            </div>
            
            <div className="chat-header-actions">
              <button 
                className="btn-primary btn-sm pay-button"
                onClick={() => navigate('/payment', { state: { amount: '75.00', mechanicName: activeContact.name } })}
              >
                <CreditCard size={18} /> Pay Securely
              </button>
              <button type="button" className="chat-more-button" aria-label="More options">
                <MoreVertical size={22} color="var(--color-text-muted)" />
              </button>
            </div>
          </header>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message-bubble ${msg.isMe ? 'me' : 'them'}`}>
                <div className="message-content">
                  {msg.text}
                </div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="message-input-area" onSubmit={handleSend}>
            <button type="button" className="icon-btn">
              <ImageIcon size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="message-input"
            />
            <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
              <Send size={20} />
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Messages;
