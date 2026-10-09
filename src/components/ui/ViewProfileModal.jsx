import React from 'react';
import { X, Star, MapPin, Calendar, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const ViewProfileModal = ({ student, onClose, onRequestExchange }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-20 h-20 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-md"
          />
          <div className="text-center sm:text-left">
            <h2 className="font-extrabold text-xl text-slate-900">{student.name}</h2>
            <p className="text-xs font-semibold text-indigo-600 mb-1.5">{student.title}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {student.rating} ({student.reviewsCount} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {student.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {student.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="my-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About Student</h4>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            "{student.bio}"
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          
          {/* Can Teach */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Skills Can Teach
            </h4>
            <div className="space-y-2">
              {student.skillsOffered.map((sk, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-emerald-200/60 shadow-xs">
                  <span className="font-bold text-slate-900">{sk.name}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{sk.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wants to Learn */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Skills Wants to Learn
            </h4>
            <div className="space-y-2">
              {student.skillsWanted.map((sk, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-indigo-200/60 shadow-xs">
                  <span className="font-bold text-slate-900">{sk.name}</span>
                  <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">{sk.level}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestExchange(student);
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
          >
            <span>Request Exchange</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
