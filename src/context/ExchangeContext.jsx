import React, { createContext, useContext, useState } from 'react';
import { MOCK_EXCHANGES, MOCK_SCHEDULE, MOCK_MESSAGES } from '../data/mockData';
import { useToast } from './ToastContext';

const ExchangeContext = createContext(null);

export const ExchangeProvider = ({ children }) => {
  const [exchanges, setExchanges] = useState(MOCK_EXCHANGES);
  const [schedule, setSchedule] = useState(MOCK_SCHEDULE);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const { addToast } = useToast();

  const sendExchangeRequest = (partner, teachingSkill, learningSkill, customMessage) => {
    const newExchange = {
      id: `ex-${Date.now()}`,
      partner,
      teachingSkill,
      learningSkill,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      lastMessage: customMessage || `Hi ${partner.name}, I would love to exchange skills with you!`,
      progress: 0,
      nextSession: 'Pending'
    };

    setExchanges(prev => [newExchange, ...prev]);
    addToast(`Exchange request sent to ${partner.name}!`, 'success');
  };

  const updateExchangeStatus = (exchangeId, newStatus) => {
    setExchanges(prev =>
      prev.map(ex => {
        if (ex.id === exchangeId) {
          return { ...ex, status: newStatus };
        }
        return ex;
      })
    );

    const statusMap = {
      active: 'accepted & is now active!',
      rejected: 'rejected.',
      completed: 'marked as completed 🎉',
      cancelled: 'cancelled.'
    };

    addToast(`Exchange request ${statusMap[newStatus] || 'updated.'}`, 'info');
  };

  const addScheduleSession = (sessionData) => {
    const newSession = {
      id: `sch-${Date.now()}`,
      title: sessionData.title || 'Skill Swap Learning Session',
      withPartner: sessionData.withPartner || 'Skill Partner',
      partnerAvatar: sessionData.partnerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      skill: sessionData.skill || 'Skill Exchange',
      type: sessionData.type || 'Learning',
      date: sessionData.date || new Date().toISOString().split('T')[0],
      time: sessionData.time || '05:00 PM - 06:00 PM',
      status: 'Confirmed',
      link: 'https://meet.google.com/xyz-skill-swap'
    };

    setSchedule(prev => [newSession, ...prev]);
    addToast(`Session booked for ${newSession.date} at ${newSession.time}`, 'success');
  };

  const sendMessage = (partnerId, text) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [partnerId]: [...(prev[partnerId] || []), newMessage]
    }));
  };

  return (
    <ExchangeContext.Provider
      value={{
        exchanges,
        schedule,
        messages,
        sendExchangeRequest,
        updateExchangeStatus,
        addScheduleSession,
        sendMessage
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

export const useExchange = () => useContext(ExchangeContext);
