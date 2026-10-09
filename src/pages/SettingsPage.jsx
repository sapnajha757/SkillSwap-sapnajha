import React, { useState, useRef } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Avatar } from '../components/ui/Avatar';
import { Settings, Save, Plus, Trash2, Camera, Link as LinkIcon } from 'lucide-react';

export const SettingsPage = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  
  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newWantedSkill, setNewWantedSkill] = useState('');

  const [skillsOffered, setSkillsOffered] = useState(user?.skillsOffered || []);
  const [skillsWanted, setSkillsWanted] = useState(user?.skillsWanted || []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        addToast('Photo loaded into preview. Click "Save Changes" to apply.', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatar(null);
    addToast('Picture removed from preview.', 'info');
  };

  const handleAddOffered = () => {
    if (!newOfferedSkill.trim()) return;
    setSkillsOffered(prev => [...prev, { name: newOfferedSkill.trim(), level: 'Intermediate', category: 'General' }]);
    setNewOfferedSkill('');
  };

  const handleAddWanted = () => {
    if (!newWantedSkill.trim()) return;
    setSkillsWanted(prev => [...prev, { name: newWantedSkill.trim(), level: 'Beginner', category: 'General' }]);
    setNewWantedSkill('');
  };

  const handleRemoveOffered = (index) => {
    setSkillsOffered(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveWanted = (index) => {
    setSkillsWanted(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      title,
      bio,
      location,
      avatar,
      skillsOffered,
      skillsWanted
    });
    addToast('Profile settings updated successfully!', 'success');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 overflow-x-hidden">
        
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Profile Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Account & Skill Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update your personal details, profile picture, offered skills, and learning preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Profile Picture Section */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900">Profile Picture</h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar src={avatar} name={name} className="w-20 h-20 text-2xl font-extrabold" />
              <div className="space-y-3 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                  </button>
                  {avatar && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Picture</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Upload a JPG or PNG file. If no picture is selected, your initial badge (e.g. "{name ? name.charAt(0).toUpperCase() : 'S'}") will be displayed automatically.
                </p>
              </div>
            </div>
          </div>

          {/* General Information */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900">General Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Title / College</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

          </div>

          {/* Manage Offered Skills */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900">Skills I Can Teach</h3>
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a new skill (e.g. Node.js, Deployment, Git)"
                value={newOfferedSkill}
                onChange={e => setNewOfferedSkill(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddOffered}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skillsOffered.map((sk, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  {sk.name}
                  <button type="button" onClick={() => handleRemoveOffered(idx)} className="text-emerald-500 hover:text-rose-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Manage Wanted Skills */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900">Skills I Want to Learn</h3>
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a skill you want to learn (e.g. Hybrid RAG, Machine Learning)"
                value={newWantedSkill}
                onChange={e => setNewWantedSkill(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddWanted}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skillsWanted.map((sk, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1.5 rounded-xl">
                  {sk.name}
                  <button type="button" onClick={() => handleRemoveWanted(idx)} className="text-indigo-500 hover:text-rose-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Save Action */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </main>

    </div>
  );
};
