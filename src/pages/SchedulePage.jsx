import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useExchange } from '../context/ExchangeContext';
import { Calendar as CalendarIcon, Clock, Video, Plus, CheckCircle2 } from 'lucide-react';

export const SchedulePage = () => {
  const { schedule, addScheduleSession } = useExchange();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [partner, setPartner] = useState('Priya Singh');
  const [skill, setSkill] = useState('Figma & Wireframing');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('05:00 PM - 06:00 PM');

  const handleSubmit = (e) => {
    e.preventDefault();
    addScheduleSession({ title, withPartner: partner, skill, date, time });
    setShowModal(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 overflow-x-hidden">
        
        {/* Title & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Session Planner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Learning Schedule</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Book and manage 1-on-1 peer teaching and learning video calls.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Session</span>
          </button>
        </div>

        {/* Schedule List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map(session => (
            <div key={session.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
                  session.type === 'Teaching' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}>
                  {session.type} Session
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{session.status}</span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900">{session.title}</h3>
                <p className="text-xs text-indigo-600 font-medium mt-0.5">Skill: {session.skill}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold">{session.date}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{session.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <img src={session.partnerAvatar} alt={session.withPartner} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs font-bold text-slate-800">{session.withPartner}</span>
                </div>
                <a
                  href={session.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 rounded-xl transition-all"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Book Session Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">Book Skill Exchange Session</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React Component Walkthrough"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Partner Name</label>
                <input
                  type="text"
                  required
                  value={partner}
                  onChange={e => setPartner(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600">Save Session</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
