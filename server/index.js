import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MOCK_STUDENTS, MOCK_EXCHANGES, MOCK_SCHEDULE } from '../src/data/mockData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store for server APIs
let students = [...MOCK_STUDENTS];
let exchanges = [...MOCK_EXCHANGES];
let schedule = [...MOCK_SCHEDULE];

// API Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SkillSwap API Express Server', timestamp: new Date() });
});

// Students API
app.get('/api/students', (req, res) => {
  const { query, category } = req.query;
  let result = [...students];

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q) ||
      s.skillsOffered.some(sk => sk.name.toLowerCase().includes(q)) ||
      s.skillsWanted.some(sk => sk.name.toLowerCase().includes(q))
    );
  }

  if (category && category !== 'All') {
    result = result.filter(s =>
      s.skillsOffered.some(sk => sk.category === category) ||
      s.skillsWanted.some(sk => sk.category === category)
    );
  }

  res.json({ count: result.length, students: result });
});

app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

// Exchanges API
app.get('/api/exchanges', (req, res) => {
  res.json(exchanges);
});

app.post('/api/exchanges', (req, res) => {
  const { partnerId, teachingSkill, learningSkill, message } = req.body;
  const partner = students.find(s => s.id === partnerId);
  
  if (!partner) return res.status(400).json({ error: 'Invalid partner ID' });

  const newExchange = {
    id: `ex-${Date.now()}`,
    partner,
    teachingSkill,
    learningSkill,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
    lastMessage: message || 'Exchange request sent.',
    progress: 0,
    nextSession: 'Pending'
  };

  exchanges.unshift(newExchange);
  res.status(201).json({ success: true, exchange: newExchange });
});

app.patch('/api/exchanges/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const exchange = exchanges.find(e => e.id === id);
  if (!exchange) return res.status(404).json({ error: 'Exchange not found' });

  if (status) exchange.status = status;
  res.json({ success: true, exchange });
});

// Schedule API
app.get('/api/schedule', (req, res) => {
  res.json(schedule);
});

app.post('/api/schedule', (req, res) => {
  const { title, withPartner, skill, type, date, time } = req.body;
  const newSession = {
    id: `sch-${Date.now()}`,
    title: title || 'Skill Exchange Session',
    withPartner: withPartner || 'Skill Partner',
    partnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    skill: skill || 'General',
    type: type || 'Learning',
    date: date || new Date().toISOString().split('T')[0],
    time: time || '05:00 PM - 06:00 PM',
    status: 'Confirmed',
    link: 'https://meet.google.com/xyz-skill-swap'
  };

  schedule.unshift(newSession);
  res.status(201).json({ success: true, session: newSession });
});

app.listen(PORT, () => {
  console.log(`🚀 SkillSwap Express Server running on http://localhost:${PORT}`);
});
