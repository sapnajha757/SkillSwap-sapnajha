import React from 'react';
import { ArrowRightLeft, Check, X, Calendar, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { useExchange } from '../../context/ExchangeContext';

export const ExchangeCard = ({ exchange }) => {
  const { updateExchangeStatus } = useExchange();
  const { partner, teachingSkill, learningSkill, status, createdAt, lastMessage, nextSession } = exchange;

  const statusBadgeMap = {
    pending: { label: 'Pending Response', bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
    active: { label: 'Active Exchange', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Calendar },
    completed: { label: 'Completed', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
    rejected: { label: 'Rejected', bg: 'bg-rose-50 text-rose-700 border-rose-200', icon: X }
  };

  const currentBadge = statusBadgeMap[status] || statusBadgeMap.pending;
  const BadgeIcon = currentBadge.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        
        {/* Partner Info */}
        <div className="flex items-center gap-3">
          <img
            src={partner.avatar}
            alt={partner.name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20"
          />
          <div>
            <h3 className="font-bold text-sm text-slate-900">{partner.name}</h3>
            <p className="text-xs text-slate-500">{partner.title}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${currentBadge.bg}`}>
            <BadgeIcon className="w-3.5 h-3.5" />
            {currentBadge.label}
          </span>
          <span className="text-[11px] font-medium text-slate-400">Created: {createdAt}</span>
        </div>

      </div>

      {/* Skill Pair Exchange Flow */}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
            You
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">You Teach:</p>
            <p className="text-xs font-bold text-slate-800">{teachingSkill}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
            They
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">You Learn:</p>
            <p className="text-xs font-bold text-slate-800">{learningSkill}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons depending on status */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-slate-500 truncate max-w-xs">
          <span className="font-semibold text-slate-700">Note:</span> "{lastMessage}"
        </p>

        <div className="flex items-center gap-2">
          {status === 'pending' && (
            <>
              <button
                onClick={() => updateExchangeStatus(exchange.id, 'active')}
                className="inline-flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 rounded-xl transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept</span>
              </button>
              <button
                onClick={() => updateExchangeStatus(exchange.id, 'rejected')}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-rose-100 hover:text-rose-700 px-3 py-2 rounded-xl transition-all"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </>
          )}

          {status === 'active' && (
            <>
              <button
                onClick={() => updateExchangeStatus(exchange.id, 'completed')}
                className="inline-flex items-center gap-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-xl transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Completed</span>
              </button>
            </>
          )}
        </div>
      </div>

    </div>
  );
};
