import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { MOCK_STUDENTS } from '../data/mockData';
import { StudentCard } from '../components/cards/StudentCard';
import { RequestExchangeModal } from '../components/ui/RequestExchangeModal';
import { ViewProfileModal } from '../components/ui/ViewProfileModal';
import { Search, Filter, Sparkles, Compass } from 'lucide-react';

export const ExploreSkillsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'request' | 'view'

  const categories = ['All', 'Programming', 'Design', 'Marketing', 'AI/ML', 'Communication'];

  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const q = searchQuery.toLowerCase();
    const nameMatch = student.name.toLowerCase().includes(q);
    const locationMatch = student.location.toLowerCase().includes(q);
    const skillOfferMatch = student.skillsOffered.some(s => s.name.toLowerCase().includes(q));
    const skillWantMatch = student.skillsWanted.some(s => s.name.toLowerCase().includes(q));

    const matchesSearch = nameMatch || locationMatch || skillOfferMatch || skillWantMatch;

    if (selectedCategory === 'All') return matchesSearch;

    const matchesCategory =
      student.skillsOffered.some(s => s.category === selectedCategory) ||
      student.skillsWanted.some(s => s.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 overflow-x-hidden">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Find Your Skill Partner</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Discover students offering React, Python, Figma, SEO, or public speaking.
            </p>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="What do you want to learn today? (e.g. React, Python, Figma, Delhi...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500">
            Showing <span className="text-indigo-600 font-extrabold">{filteredStudents.length}</span> verified student partners
          </p>
        </div>

        {/* Student Cards Grid */}
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map(student => (
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
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">No skill partners found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching for a different skill, college name, or clear your category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

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
