import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skillswap_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Remove default lady stock photo if present from old cache
      if (parsed.avatar && parsed.avatar.includes('photo-1494790108377')) {
        parsed.avatar = null;
      }
      return parsed;
    }
    return {
      id: 'user-sapna',
      name: 'Sapna Jha',
      email: 'sapnajha2007@gmail.com',
      avatar: null, // No picture by default -> displays clean initial "S" badge
      title: 'B.Tech Student @ AKTU University',
      bio: 'Hi, I am a 2nd year B.Tech student who loves Web Development and learning new tech stacks!',
      location: 'Delhi, India',
      rating: 5.0,
      reviewsCount: 12,
      skillsOffered: [
        { name: 'HTML5 & CSS3', level: 'Advanced', category: 'Programming' },
        { name: 'JavaScript', level: 'Intermediate', category: 'Programming' },
        { name: 'SQL & Database', level: 'Intermediate', category: 'Programming' }
      ],
      skillsWanted: [
        { name: 'React.js', level: 'Beginner', category: 'Programming' },
        { name: 'Hybrid RAG', level: 'Beginner', category: 'AI/ML' },
        { name: 'Python', level: 'Beginner', category: 'Programming' }
      ],
      learningStreak: 7,
      activeExchangesCount: 3,
      sessionsCompleted: 14
    };
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('skillswap_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('skillswap_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (data?.user) {
          const updatedUser = {
            ...user,
            email: data.user.email,
            id: data.user.id,
            name: data.user.user_metadata?.full_name || email.split('@')[0]
          };
          setUser(updatedUser);
          setLoading(false);
          return { success: true };
        }
      }
      
      const updatedUser = {
        ...user,
        email,
        name: email.split('@')[0].replace('.', ' ').toUpperCase()
      };
      setUser(updatedUser);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
        if (error) throw error;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        avatar: null, // New signups start with initial avatar
        title: 'Student Member @ SkillSwap',
        bio: 'Enthusiastic student ready to share skills and learn together!',
        location: 'Delhi, India',
        rating: 5.0,
        reviewsCount: 0,
        skillsOffered: [{ name: 'HTML & CSS', level: 'Intermediate', category: 'Programming' }],
        skillsWanted: [{ name: 'React', level: 'Beginner', category: 'Programming' }],
        learningStreak: 1,
        activeExchangesCount: 0,
        sessionsCompleted: 0
      };

      setUser(newUser);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const updateUserProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
