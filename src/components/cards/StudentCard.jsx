import React from 'react';
import { Star, MapPin, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const StudentCard = ({ student, onViewProfile, onRequestExchange }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      
      <div>
        {/* Header: Avatar, Name, Match Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                {student.name}
              </h3>
              <p className="text-[11px] font-medium text-slate-500 leading-tight">
                {student.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {student.rating} ({student.reviewsCount})
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <MapPin className="w-3 h-3" />
                  {student.location.split(',')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Match Score % Badge */}
          {student.matchScore && (
            <div className="shrink-0 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 px-2.5 py-1 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider block">Match</span>
              <span className="text-xs font-extrabold text-indigo-700">{student.matchScore}%</span>
            </div>
          )}
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
          "{student.bio}"
        </p>

        {/* Skills Offered */}
        <div className="mb-3.5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Can Teach:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {student.skillsOffered.map((sk, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 rounded-lg"
              >
                {sk.name}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            Wants to Learn:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {student.skillsWanted.map((sk, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 px-2.5 py-1 rounded-lg"
              >
                {sk.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
        <button
          onClick={() => onViewProfile(student)}
          className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-xl transition-all"
        >
          <span>View Profile</span>
        </button>

        <button
          onClick={() => onRequestExchange(student)}
          className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all"
        >
          <span>Swap Request</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
