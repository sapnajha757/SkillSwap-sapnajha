import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useExchange } from '../../context/ExchangeContext';

export const RequestExchangeModal = ({ partner, onClose }) => {
  const { user } = useAuth();
  const { sendExchangeRequest } = useExchange();

  const [teachingSkill, setTeachingSkill] = useState(user?.skillsOffered[0]?.name || 'HTML5 / CSS3');
  const [learningSkill, setLearningSkill] = useState(partner?.skillsOffered[0]?.name || 'Figma');
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [message, setMessage] = useState(`Hi ${partner?.name}, I’d love to exchange skills! I can teach you ${teachingSkill} in return for learning ${learningSkill}.`);

  if (!partner) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalLearn = customSkillInput.trim() || learningSkill;
    sendExchangeRequest(partner, teachingSkill, finalLearn, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Request Skill Swap</h3>
              <p className="text-xs text-slate-500">Exchange knowledge with {partner.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Partner Info Summary */}
        <div className="my-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
          <img src={partner.avatar} alt={partner.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20" />
          <div>
            <h4 className="font-bold text-xs text-slate-900">{partner.name}</h4>
            <p className="text-[11px] text-slate-500">{partner.title}</p>
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Skill You Want */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              What do you want to learn from {partner.name}?
            </label>
            <select
              value={learningSkill}
              onChange={(e) => setLearningSkill(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500"
            >
              {partner.skillsOffered.map((sk, idx) => (
                <option key={idx} value={sk.name}>{sk.name} ({sk.level})</option>
              ))}
            </select>
          </div>

          {/* Custom Write-in Skill Option */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Or type a custom skill you want:
            </label>
            <input
              type="text"
              placeholder="e.g. Hybrid RAG, Advanced Python, Machine Learning"
              value={customSkillInput}
              onChange={(e) => setCustomSkillInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Skill You Offer */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              What will you teach in return?
            </label>
            <select
              value={teachingSkill}
              onChange={(e) => setTeachingSkill(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500"
            >
              {user?.skillsOffered.map((sk, idx) => (
                <option key={idx} value={sk.name}>{sk.name} ({sk.level})</option>
              ))}
            </select>
          </div>

          {/* Personal Message */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Personal Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Swap Request</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
