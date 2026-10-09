import React, { useRef } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Avatar } from '../components/ui/Avatar';
import { Star, MapPin, CheckCircle2, BookOpen, Camera, Trash2 } from 'lucide-react';

export const StudentProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  if (!user) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserProfile({ avatar: reader.result });
        addToast('Profile picture uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    updateUserProfile({ avatar: null });
    addToast('Profile picture removed. Default initial avatar applied.', 'info');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 overflow-x-hidden">
        
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Avatar with Upload Hover Button */}
            <div className="relative group">
              <Avatar
                src={user.avatar}
                name={user.name}
                className="w-24 h-24 text-3xl font-extrabold"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-2xl bg-slate-900/40 text-white opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity backdrop-blur-xs font-semibold text-xs cursor-pointer"
                title="Upload Profile Picture"
              >
                <Camera className="w-5 h-5" />
                <span>Upload</span>
              </button>
            </div>

            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
                  <p className="text-xs font-semibold text-indigo-600">{user.title}</p>
                </div>
                <div className="inline-flex items-center justify-center gap-1 font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-xl text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{user.rating} ({user.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  {user.skillsOffered?.length || 3} Skills Offered
                </span>
              </div>

              {/* Photo Management Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{user.avatar ? 'Change Picture' : 'Add Profile Picture'}</span>
                </button>
                {user.avatar && (
                  <button
                    onClick={handleRemovePhoto}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Picture</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About Me</h3>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            "{user.bio}"
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Skills Offered */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Skills I Can Teach
            </h3>
            <div className="space-y-2.5">
              {user.skillsOffered?.map((sk, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900">{sk.name}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">{sk.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Skills I Want to Learn
            </h3>
            <div className="space-y-2.5">
              {user.skillsWanted?.map((sk, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900">{sk.name}</span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">{sk.level}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};
