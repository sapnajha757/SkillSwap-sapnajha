# ⚙️ Setup & Deployment Guide — SkillSwap

This guide provides step-by-step instructions to set up, configure, run, and deploy the **SkillSwap** application on local machines and cloud platforms.

---

## 1. Prerequisites

Ensure your development machine has the following tools installed:

- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher
- **Git**: `v2.30.0` or higher

Check your installed versions:
```bash
node -v
npm -v
git --version
```

---

## 2. Local Environment Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/sapnajha757/SkillSwap-sapnajha.git
cd SkillSwap-sapnajha
```

### Step 2: Install Project Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://rvhtmresjmhjhtaflkfh.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Express Server Port
PORT=5000
```

---

## 3. Running the Application

### Running Frontend (React + Vite)
```bash
npm run dev
```
Access the application at **[http://localhost:3000](http://localhost:3000)**.

### Running Backend (Node.js + Express)
```bash
npm run server
```
Access Express API health check at **[http://localhost:5000/api/health](http://localhost:5000/api/health)**.

---

## 4. Supabase Database Setup & RLS Policies

If you are setting up a fresh Supabase database instance, run the following SQL script in your **Supabase Dashboard > SQL Editor**:

```sql
-- 1. Create Profiles Table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  bio text default '',
  location text default '',
  avatar_url text default '',
  created_at timestamp with time zone default now()
);

-- 2. Create Skills Table
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill_name text not null,
  skill_type text not null check (skill_type in ('teach', 'learn')),
  created_at timestamp with time zone default now()
);

-- 3. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.skills enable row level security;

-- 4. RLS Security Policies
create policy "Allow select profiles" on public.profiles for select using (true);
create policy "Allow insert profiles" on public.profiles for insert with check (auth.uid() = id);
create policy "Allow update profiles" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Allow select skills" on public.skills for select using (true);
create policy "Allow insert skills" on public.skills for insert with check (auth.uid() = user_id);
create policy "Allow update skills" on public.skills for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Allow delete skills" on public.skills for delete using (auth.uid() = user_id);
```

---

## 5. Deployment Instructions

### Deploying Frontend to Vercel or Netlify
1. Connect your GitHub repository (`sapnajha757/SkillSwap-sapnajha`) to **Vercel** or **Netlify**.
2. Set Build Command to: `npm run build`
3. Set Output Directory to: `dist`
4. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Click **Deploy**.

### Deploying Express Server to Render or Railway
1. Connect repository to **Render** or **Railway**.
2. Set Build Command to: `npm install`
3. Set Start Command to: `npm run server`
4. Expose `PORT=5000`.
