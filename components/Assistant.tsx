
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, AlertCircle } from 'lucide-react';
import { chatWithCia } from '../services/geminiService';
import { DailyLog } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AssistantProps {
  logs: DailyLog[];
}

const Assistant: React.FC<AssistantProps> = ({ logs }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi there! I'm Cia, your PCOS wellness companion. Ask me anything about nutrition, cycle syncing, or symptoms." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const reply = await chatWithCia(userMsg, logs);
      setMessages(prev => [...prev, { role: 'assistant', content: reply || "I'm sorry, I'm having trouble connecting right now." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white animate-in slide-in-from-right duration-300">
      <header className="px-6 py-4 border-b border-rose-50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-rose-600" />
        </div>
        <div>
            <h2 className="font-bold text-gray-800">Ask Cia</h2>
            <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Online Assistant</span>
            </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
              m.role === 'user' 
              ? 'bg-rose-500 text-white rounded-tr-none shadow-md' 
              : 'bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-50 rounded-2xl p-4 flex gap-1 items-center rounded-tl-none">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2 items-start mt-4">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-700 italic">This AI assistant provides wellness info only and is not a substitute for medical advice from a professional.</p>
        </div>
      </div>

      <div className="p-4 border-t border-rose-50 pb-8">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about diet, exercise, or PCOS..."
            className="w-full bg-gray-50 rounded-full py-3 px-5 pr-12 text-sm focus:ring-2 focus:ring-rose-200 border-none transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className={`absolute right-2 top-1.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${input.trim() ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-400'}`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
