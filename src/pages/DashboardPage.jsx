import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useExchange } from '../context/ExchangeContext';
import { MOCK_STUDENTS } from '../data/mockData';
import { Sidebar } from '../components/layout/Sidebar';
import { StudentCard } from '../components/cards/StudentCard';
import { ExchangeCard } from '../components/cards/ExchangeCard';
import { RequestExchangeModal } from '../components/ui/RequestExchangeModal';
import { ViewProfileModal } from '../components/ui/ViewProfileModal';
import { Repeat, BookOpen, CheckCircle, Flame, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { exchanges, schedule } = useExchange();

  const [selectedPartner, setSelectedPartner] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'request' | 'view'

  const activeExchanges = exchanges.filter(e => e.status === 'active');
  const pendingExchanges = exchanges.filter(e => e.status === 'pending');

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 overflow-x-hidden">
        
        {/* Welcome Header Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>7-Day Learning Streak Active!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              You have {pendingExchanges.length} pending exchange requests and {schedule.length} upcoming sessions this week.
            </p>
          </div>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Exchanges</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{activeExchanges.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Repeat className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Skills Shared</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{user?.skillsOffered?.length || 3}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sessions Completed</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{user?.sessionsCompleted || 14}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Streak</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{user?.learningStreak || 7} Days</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
          </div>

        </div>

        {/* Recommended Skill Matches */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Recommended Skill Matches</h2>
              <p className="text-xs text-slate-500">Students matching your offered and wanted skill preferences.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_STUDENTS.slice(0, 3).map(student => (
              <StudentCard
                key={student.id}
                student={student}
                onViewProfile={(p) => {
                  setSelectedPartner(p);
                  setModalMode('view');
                }}
                onRequestExchange={(p) => {
                  setSelectedPartner(p);
                  setModalMode('request');
                }}
              />
            ))}
          </div>
        </section>

        {/* Recent Exchanges & Upcoming Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Exchanges (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Recent Exchange Requests</h2>
            <div className="space-y-4">
              {exchanges.slice(0, 3).map(ex => (
                <ExchangeCard key={ex.id} exchange={ex} />
              ))}
            </div>
          </div>

          {/* Upcoming Sessions (1 Col) */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Upcoming Sessions</h2>
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs">
              {schedule.slice(0, 3).map(session => (
                <div key={session.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={session.partnerAvatar} alt={session.withPartner} className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{session.title}</h4>
                      <p className="text-[11px] text-slate-500">{session.withPartner} • {session.time}</p>
                    </div>
                  </div>
                  <a
                    href={session.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg"
                  >
                    Join
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* Modals */}
      {modalMode === 'request' && selectedPartner && (
        <RequestExchangeModal partner={selectedPartner} onClose={() => setModalMode(null)} />
      )}
      {modalMode === 'view' && selectedPartner && (
        <ViewProfileModal
          student={selectedPartner}
          onClose={() => setModalMode(null)}
          onRequestExchange={(p) => {
            setSelectedPartner(p);
            setModalMode('request');
          }}
        />
      )}

    </div>
  );
};
