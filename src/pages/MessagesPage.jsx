import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useExchange } from '../context/ExchangeContext';
import { MOCK_STUDENTS } from '../data/mockData';
import { MessageSquare, Send, CheckCheck, User } from 'lucide-react';

export const MessagesPage = () => {
  const { messages, sendMessage } = useExchange();
  const [selectedPartnerId, setSelectedPartnerId] = useState('student-2'); // Default Priya Singh
  const [inputText, setInputText] = useState('');

  const selectedPartner = MOCK_STUDENTS.find(s => s.id === selectedPartnerId) || MOCK_STUDENTS[1];
  const activeChatMessages = messages[selectedPartnerId] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(selectedPartnerId, inputText);
    setInputText('');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container - 2 Panel Chat */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-x-hidden">
        
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md h-[calc(100vh-8rem)] flex overflow-hidden">
          
          {/* Left Panel: Conversation List */}
          <div className="w-full md:w-80 border-r border-slate-200/80 flex flex-col bg-slate-50/50">
            
            <div className="p-4 border-b border-slate-200/80">
              <h2 className="font-extrabold text-base text-slate-900">Skill Swap Chat</h2>
              <p className="text-xs text-slate-500">Conversations with your peer partners</p>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {MOCK_STUDENTS.slice(1, 4).map(partner => (
                <button
                  key={partner.id}
                  onClick={() => setSelectedPartnerId(partner.id)}
                  className={`w-full text-left p-3.5 flex items-center gap-3 transition-colors ${
                    selectedPartnerId === partner.id ? 'bg-indigo-50/80 border-l-4 border-indigo-600' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <img src={partner.avatar} alt={partner.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20" />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs text-slate-900">{partner.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">Tap to open messages</p>
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Right Panel: Selected Chat Area */}
          <div className="hidden md:flex flex-1 flex-col bg-white">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <img src={selectedPartner.avatar} alt={selectedPartner.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{selectedPartner.name}</h3>
                  <p className="text-[11px] text-slate-500">{selectedPartner.title}</p>
                </div>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/20">
              {activeChatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      msg.sender === 'me'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-200/80 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Message ${selectedPartner.name.split(' ')[0]}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </main>

    </div>
  );
};
