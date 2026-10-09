import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useExchange } from '../context/ExchangeContext';
import { ExchangeCard } from '../components/cards/ExchangeCard';
import { Repeat, Clock, CheckCircle2, X, Filter } from 'lucide-react';

export const MyExchangesPage = () => {
  const { exchanges } = useExchange();
  const [activeTab, setActiveTab] = useState('all'); // all | pending | active | completed | rejected

  const tabs = [
    { id: 'all', label: 'All Exchanges', count: exchanges.length },
    { id: 'pending', label: 'Pending', count: exchanges.filter(e => e.status === 'pending').length },
    { id: 'active', label: 'Active', count: exchanges.filter(e => e.status === 'active').length },
    { id: 'completed', label: 'Completed', count: exchanges.filter(e => e.status === 'completed').length },
    { id: 'rejected', label: 'Rejected', count: exchanges.filter(e => e.status === 'rejected').length }
  ];

  const filteredExchanges = exchanges.filter(e => {
    if (activeTab === 'all') return true;
    return e.status === activeTab;
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 overflow-x-hidden">
        
        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Repeat className="w-3.5 h-3.5" />
            <span>Manage Exchanges</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Skill Exchanges</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your pending requests, active peer sessions, and completed learning milestones.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 overflow-x-auto scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Exchange Cards List */}
        {filteredExchanges.length > 0 ? (
          <div className="space-y-4">
            {filteredExchanges.map(exchange => (
              <ExchangeCard key={exchange.id} exchange={exchange} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Repeat className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">No {activeTab} exchanges yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore skills in the marketplace and send a swap request to start exchanging knowledge.
            </p>
          </div>
        )}

      </main>

    </div>
  );
};
