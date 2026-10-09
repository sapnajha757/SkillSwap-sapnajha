# 🤝 SkillSwap — Peer-to-Peer Student Skill Exchange Platform

**SkillSwap** is a modern, full-stack web application designed for students to exchange skills directly with one another. Whether you want to master **Python**, level up in **React**, design in **Figma**, or practice **Public Speaking**, SkillSwap lets you trade what you know for what you want to learn — with **zero money required**.

---

## 🌟 Key Features & Highlights

- **Zero Cash Knowledge Exchange**: Trade skills 1-on-1 with fellow students based on mutual interest and learning goals.
- **SaaS-Quality Dashboard**: Personal statistics tracking active exchanges, shared skills, completed sessions, and a **7-Day Learning Streak** counter.
- **Smart Skill Matching**: Automatic match score percentages based on complementary skills offered and wanted.
- **Interactive Exchange Requests**: Send swap requests with custom write-in skills or choose from pre-populated partner skills.
- **Dynamic Avatar System**: Displays clean, letter-initial badges by default (e.g. **"S"** for Sapna Jha) with optional profile photo upload, change, and removal capabilities.
- **My Exchanges Management**: Organized tabbed workflow (*All*, *Pending*, *Active*, *Completed*, *Rejected*) with status badges and one-click actions.
- **Real-Time Peer Chat**: Two-panel messaging interface to coordinate session topics, share code snippets, and arrange timings.
- **Session Planner & Schedule**: Book, reschedule, and join 1-on-1 video call sessions (Google Meet / Zoom integration ready).

---

## 🏗️ Technical Architecture

SkillSwap is built using a modern decoupled architecture that guarantees high performance, responsive design, and seamless data persistence:

```
                          ┌───────────────────────────┐
                          │   React 18 + Vite Client  │
                          │  (Tailwind CSS v4 + Lucide)│
                          └─────────────┬─────────────┘
                                        │
                ┌───────────────────────┴───────────────────────┐
                ▼                                               ▼
  ┌───────────────────────────┐                   ┌───────────────────────────┐
  │   Node.js + Express Server│                   │  Supabase Cloud Backend   │
  │     (REST API / Endpoints)│                   │  (PostgreSQL + Auth + RLS)│
  └───────────────────────────┘                   └───────────────────────────┘
```

### 🎨 Design Tokens & System

- **Primary Accent**: Indigo `#4F46E5`
- **Secondary Accent**: Violet `#7C3AED`
- **Background**: Soft Slate `#F8FAFC`
- **Card Surfaces**: Pure White `#FFFFFF` with `rounded-2xl` borders & soft drop shadows
- **Typography**: Inter (Google Fonts)

---

## ⚡ Technical Approach

1. **Component-Driven Frontend**: Built with React 18, Vite, and Tailwind CSS v4 for rapid modularity and 1.8-second compilation times.
2. **Context-Driven State Management**:
   - `AuthContext`: Handles student authentication, session persistence, and avatar management.
   - `ExchangeContext`: Manages exchange requests, status transitions (*Pending*, *Active*, *Completed*, *Rejected*), messaging logs, and calendar schedules.
   - `ToastContext`: Provides floating, animated alert feedback for all user actions.
3. **Dual Persistence Layer**: Supabase PostgreSQL cloud storage backed up by a fallback local state provider to guarantee seamless operation in any environment.
4. **Security & RLS**: Database policies enforcing Row Level Security so students can only modify their own protected profile data.

---

## 📁 Repository Structure

```
SkillSwap-sapnajha/
├── server/                    # Node.js + Express REST API Server
│   └── index.js               # API endpoints (/api/students, /api/exchanges, /api/schedule)
├── src/
│   ├── components/            # Reusable UI & Layout Components
│   │   ├── cards/             # StudentCard, ExchangeCard
│   │   ├── layout/            # Navbar, Sidebar, Footer
│   │   └── ui/                # Avatar, RequestExchangeModal, ViewProfileModal
│   ├── context/               # AuthContext, ExchangeContext, ToastContext
│   ├── data/                  # Student dataset & mock exchanges
│   ├── lib/                   # Supabase client helper
│   ├── pages/                 # Full pages (Landing, Login, Signup, Dashboard, Explore, etc.)
│   ├── App.jsx                # React Router setup & global providers
│   ├── index.css              # Tailwind CSS directives & custom scrollbars
│   └── main.jsx               # React entry point
├── PRD.md                     # Product Requirement Document
├── SETUP.md                   # Setup & Deployment Guide
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/sapnajha757/SkillSwap-sapnajha.git

# Navigate into project directory
cd SkillSwap-sapnajha

# Install dependencies
npm install
```

### 2. Running Frontend Development Server

```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Running Express API Server (Optional)

```bash
npm run server
```
The Express server will start on **[http://localhost:5000](http://localhost:5000)**.

### 4. Building for Production

```bash
npm run build
```

---

## 📄 Documentation Links

- 📖 **[PRD.md](PRD.md)** — Detailed Product Requirement Document.
- ⚙️ **[SETUP.md](SETUP.md)** — Comprehensive Setup, Database Migration & Deployment Guide.

---

## 💙 Created for Student Growth

Built with passion to empower students to share knowledge, build portfolios, and grow together!
