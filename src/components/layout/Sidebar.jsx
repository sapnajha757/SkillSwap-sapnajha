import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Repeat,
  MessageSquare,
  Calendar,
  User,
  Settings,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';

export const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Explore Skills', path: '/explore', icon: Compass },
    { label: 'My Exchanges', path: '/exchanges', icon: Repeat, badge: '3' },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'Schedule', path: '/schedule', icon: Calendar },
    { label: 'My Profile', path: '/my-profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 shrink-0 shadow-xs hidden md:flex">
      
      {/* Navigation Items */}
      <div className="space-y-6">
        
        {/* User Card */}
        {user && (
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
            <Avatar src={user.avatar} name={user.name} className="w-10 h-10 text-sm" />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-slate-900 truncate">{user.name}</h4>
              <p className="text-[11px] font-medium text-slate-500 truncate">{user.title.split('@')[0]}</p>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">Navigation</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Streak Upgrade Widget */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-indigo-50/50 to-violet-50 border border-indigo-100/80">
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs mb-1">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>7-Day Learning Streak!</span>
        </div>
        <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
          Complete a skill exchange session this week to keep your streak alive!
        </p>
        <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-indigo-600 h-full w-4/5 rounded-full"></div>
        </div>
      </div>

    </aside>
  );
};
