import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExchangeProvider } from './context/ExchangeContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExploreSkillsPage } from './pages/ExploreSkillsPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { MyExchangesPage } from './pages/MyExchangesPage';
import { MessagesPage } from './pages/MessagesPage';
import { SchedulePage } from './pages/SchedulePage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <ExchangeProvider>
            <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/explore" element={<ExploreSkillsPage />} />
                  <Route path="/my-profile" element={<StudentProfilePage />} />
                  <Route path="/exchanges" element={<MyExchangesPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </ExchangeProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
