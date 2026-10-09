import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Users, Repeat, Star, ShieldCheck, Flame } from 'lucide-react';
import { MOCK_STUDENTS } from '../data/mockData';
import { StudentCard } from '../components/cards/StudentCard';

export const LandingPage = () => {
  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/70 via-slate-50/50 to-slate-50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200/80 text-indigo-700 text-xs font-semibold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Peer-to-Peer Student Skill Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Your Skills. Their Knowledge. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                Mutual Growth.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              SkillSwap connects ambitious students to exchange knowledge directly. 
              Teach what you know, learn what you need — zero money required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200"
              >
                <span>Start Swapping Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-6 py-3.5 rounded-2xl shadow-xs transition-all duration-200"
              >
                <span>Explore Skills</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/60 shadow-xs">
                <p className="text-xl font-extrabold text-indigo-600">5,000+</p>
                <p className="text-xs font-semibold text-slate-500">Students Joined</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/60 shadow-xs">
                <p className="text-xl font-extrabold text-indigo-600">120+</p>
                <p className="text-xs font-semibold text-slate-500">Skills Categories</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/60 shadow-xs">
                <p className="text-xl font-extrabold text-indigo-600">4.9/5</p>
                <p className="text-xs font-semibold text-slate-500">Session Rating</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/60 shadow-xs">
                <p className="text-xl font-extrabold text-emerald-600">₹0</p>
                <p className="text-xs font-semibold text-slate-500">Cost Required</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How SkillSwap Works</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">Three simple steps to exchange knowledge with students across top universities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-extrabold text-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              01
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Discover Skills</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Browse student profiles and filter by Python, React, Figma, SEO, or public speaking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 font-extrabold text-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Connect & Match</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Send a 1-to-1 swap request offering your skills in return for the skills you want to learn.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-extrabold text-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Exchange & Grow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Schedule interactive sessions, chat, build projects together, and earn verified reviews.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Student Spotlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Featured Student Partners</h2>
            <p className="text-xs text-slate-500 mt-1">Connect with verified peer tutors ready to swap skills.</p>
          </div>
          <Link to="/explore" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
            <span>View All Students</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_STUDENTS.slice(0, 3).map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onViewProfile={() => window.location.href = `/explore`}
              onRequestExchange={() => window.location.href = `/signup`}
            />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to swap your skills for knowledge?</h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Join thousands of college students expanding their tech, design, and business portfolios today.
            </p>
            <div className="pt-2">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold text-xs px-6 py-3 rounded-xl shadow-md hover:bg-indigo-50 transition-all"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
