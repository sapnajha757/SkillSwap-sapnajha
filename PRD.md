# 📑 Product Requirement Document (PRD) — SkillSwap

## 1. Product Overview & Vision

**SkillSwap** is a peer-to-peer student skill exchange application designed to democratize learning among college students and aspiring developers. Traditional tutoring, online bootcamps, and courses are expensive. SkillSwap enables students to trade their existing skills (*e.g., HTML, CSS, JavaScript, Figma, Marketing*) in exchange for skills they want to learn (*e.g., Python, React, Hybrid RAG, Machine Learning*).

### Mission Statement
*"To build a vibrant student community where skills are currency, learning is mutual, and personal growth costs zero money."*

---

## 2. Target Audience & Personas

- **Primary Persona: College Undergrads & Self-Taught Devs**
  - *Goal*: Wants to learn modern web development, data science, or design without paying for expensive courses.
  - *Pain Point*: Cannot afford expensive private tutors or subscriptions; lacks peer accountability.
- **Secondary Persona: Student Mentors & Tutors**
  - *Goal*: Wants to reinforce their own knowledge by teaching others, build a portfolio, and acquire complementary skills.

---

## 3. Core Functional Requirements

### 3.1 Authentication & Profile Setup
- **User Registration & Login**: Email and password authentication with validation and toggleable password visibility.
- **Profile Customization**: Students can configure their name, college title, bio, location, skills offered (with proficiency level), and skills wanted.
- **Dynamic Avatar System**: Automatic letter initial badge generation (e.g. **"S"** for Sapna Jha) with optional profile photo upload, preview, and removal options.

### 3.2 Marketplace & Skill Discovery
- **Explore Marketplace**: Real-time search by student name, college, location, or skill keyword.
- **Category Filter Pills**: Filter profiles by *Programming*, *Design*, *Marketing*, *AI/ML*, and *Communication*.
- **Match Score Indicator**: Displays an estimated match percentage (e.g. `98% Match`) based on complementary skill pairs.

### 3.3 Exchange Workflow Management
- **Skill Swap Request Modal**: Allows students to select listed skills or write in custom custom skills (*e.g., Hybrid RAG*) along with a personal introduction message.
- **My Exchanges Hub**: Tabbed management interface (*All*, *Pending*, *Active*, *Completed*, *Rejected*) featuring status badges and instant state action triggers (*Accept*, *Reject*, *Mark Completed*).

### 3.4 Interactive Communication & Scheduling
- **2-Panel Chat Layout**: Left panel listing active conversations; right panel rendering message bubbles, timestamps, and message sending bar.
- **Session Planner**: Ability to schedule 1-on-1 peer teaching video sessions with integrated Google Meet link generation.

---

## 4. Non-Functional Requirements

- **Performance**: Instant client-side page transitions via React Router and sub-2-second build compilation with Vite.
- **User Experience (UX)**: Clean SaaS aesthetics utilizing Indigo (`#4F46E5`), Violet (`#7C3AED`), and Slate (`#F8FAFC`) with smooth micro-interactions.
- **Responsiveness**: Fluid layout adaptations across Desktop ($1280px+$), Tablet ($768px$), and Mobile ($375px$).
- **Data Security**: PostgreSQL Row Level Security (RLS) ensuring students can only update their own profile and exchange records.
