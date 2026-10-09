import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Skill<span className="text-indigo-400">Swap</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Peer-to-peer student skill exchange platform. Trade what you know, learn what you don't — no cash required.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/explore" className="hover:text-indigo-400 transition-colors">Explore Skills</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/exchanges" className="hover:text-indigo-400 transition-colors">My Exchanges</Link></li>
              <li><Link to="/schedule" className="hover:text-indigo-400 transition-colors">Schedule Session</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Skill Categories</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><span className="hover:text-indigo-400 cursor-pointer">Programming & Web</span></li>
              <li><span className="hover:text-indigo-400 cursor-pointer">UI/UX & Product Design</span></li>
              <li><span className="hover:text-indigo-400 cursor-pointer">Data Science & AI/ML</span></li>
              <li><span className="hover:text-indigo-400 cursor-pointer">Digital Marketing & SEO</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400">Join 5,000+ students swapping skills daily.</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your college email"
                className="bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SkillSwap Platform. Built for student mutual growth.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Peer Learning</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
