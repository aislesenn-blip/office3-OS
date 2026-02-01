import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';

export default function DMDrawer({ notice, onClose }) {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([
    { id: 1, text: `Regarding: ${notice.title}`, sender: 'system' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setHistory([...history, { id: Date.now(), text: message, sender: 'me' }]);
    setMessage('');

    // Simulate reply
    setTimeout(() => {
        setHistory(prev => [...prev, { id: Date.now() + 1, text: "Acknowledged. I'll get back to you shortly.", sender: 'them' }]);
    }, 1000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
                <h3 className="font-bold text-slate-900">Reply to {notice.author}</h3>
                <p className="text-xs text-slate-500 truncate w-64">{notice.title}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {history.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.sender === 'me'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : msg.sender === 'system'
                            ? 'bg-slate-200 text-slate-600 text-xs text-center w-full'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    autoFocus
                />
                <button type="submit" className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </form>
      </motion.div>
    </>
  );
}
