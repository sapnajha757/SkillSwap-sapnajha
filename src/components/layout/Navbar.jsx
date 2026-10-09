import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Sparkles, ArrowRight, User, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileDropdown, setProfileDropdown] = useState(false);

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Skill<span className="text-indigo-600">Swap</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-slate-600 text-sm">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              location.pathname === '/' ? 'text-indigo-600 bg-indigo-50/60 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              location.pathname === '/explore' ? 'text-indigo-600 bg-indigo-50/60 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            Explore Skills
          </Link>
          {user && (
            <>
              <Link
                to="/dashboard"
                className={`px-3.5 py-2 rounded-lg transition-colors ${
                  location.pathname === '/dashboard' ? 'text-indigo-600 bg-indigo-50/60 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/exchanges"
                className={`px-3.5 py-2 rounded-lg transition-colors ${
                  location.pathname === '/exchanges' ? 'text-indigo-600 bg-indigo-50/60 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                My Exchanges
              </Link>
            </>
          )}
        </nav>

        {/* Right CTA / User Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <Avatar src={user.avatar} name={user.name} className="w-8 h-8 text-xs" />
                  <span className="hidden md:inline font-semibold text-xs text-slate-800 pr-1.5">{user.name.split(' ')[0]}</span>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="font-semibold text-sm text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/my-profile"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      Settings & Skills
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdown(false);
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-3.5 py-2 rounded-xl transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
