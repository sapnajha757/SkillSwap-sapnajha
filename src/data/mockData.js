export const MOCK_STUDENTS = [
  {
    id: 'student-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    title: 'Computer Science Undergrad @ IIIT Delhi',
    bio: 'Frontend enthusiast & open source contributor. Love teaching React and clean CSS layout techniques.',
    location: 'Delhi, India',
    rating: 4.9,
    reviewsCount: 18,
    matchScore: 98,
    availability: 'Mon, Wed, Fri (After 5 PM)',
    experience: 'Intermediate',
    skillsOffered: [
      { name: 'HTML5 / CSS3', level: 'Expert', category: 'Programming' },
      { name: 'JavaScript ES6+', level: 'Advanced', category: 'Programming' },
      { name: 'React.js', level: 'Intermediate', category: 'Programming' }
    ],
    skillsWanted: [
      { name: 'Python', level: 'Beginner', category: 'Programming' },
      { name: 'Hybrid RAG', level: 'Beginner', category: 'AI/ML' },
      { name: 'UI/UX Design', level: 'Intermediate', category: 'Design' }
    ],
    learningGoals: 'Master Python for Machine Learning and build modern AI-assisted web tools.'
  },
  {
    id: 'student-2',
    name: 'Priya Singh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    title: 'UI/UX Design Scholar @ NIFT Noida',
    bio: 'Product designer focusing on micro-interactions, Figma component libraries, and visual design systems.',
    location: 'Noida, India',
    rating: 4.8,
    reviewsCount: 14,
    matchScore: 94,
    availability: 'Tue, Thu, Sat (2 PM - 7 PM)',
    experience: 'Advanced',
    skillsOffered: [
      { name: 'Figma & Wireframing', level: 'Expert', category: 'Design' },
      { name: 'UI/UX Design Systems', level: 'Advanced', category: 'Design' },
      { name: 'User Research', level: 'Intermediate', category: 'Design' }
    ],
    skillsWanted: [
      { name: 'React.js', level: 'Beginner', category: 'Programming' },
      { name: 'Tailwind CSS', level: 'Intermediate', category: 'Programming' }
    ],
    learningGoals: 'Learn React component architecture to turn my Figma designs into functional code.'
  },
  {
    id: 'student-3',
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    title: 'AI & Data Science Senior @ DTU',
    bio: 'Backend enthusiast specializing in Python, FastApi, DSA algorithms, and SQL optimization.',
    location: 'Delhi, India',
    rating: 5.0,
    reviewsCount: 22,
    matchScore: 91,
    availability: 'Weekends (All Day)',
    experience: 'Expert',
    skillsOffered: [
      { name: 'Python', level: 'Expert', category: 'Programming' },
      { name: 'Data Structures & Algo', level: 'Advanced', category: 'Programming' },
      { name: 'PostgreSQL & SQL', level: 'Advanced', category: 'Programming' }
    ],
    skillsWanted: [
      { name: 'System Design', level: 'Intermediate', category: 'Programming' },
      { name: 'Public Speaking', level: 'Beginner', category: 'Communication' }
    ],
    learningGoals: 'Crack tech interview rounds and practice public speaking for tech conferences.'
  },
  {
    id: 'student-4',
    name: 'Ananya Gupta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    title: 'Digital Marketing & Growth @ SRCC',
    bio: 'Specialist in SEO strategies, copywriting, content creation, and personal branding.',
    location: 'Delhi, India',
    rating: 4.7,
    reviewsCount: 11,
    matchScore: 86,
    availability: 'Mon - Fri (6 PM - 9 PM)',
    experience: 'Intermediate',
    skillsOffered: [
      { name: 'SEO Strategy', level: 'Advanced', category: 'Marketing' },
      { name: 'Copywriting', level: 'Expert', category: 'Communication' },
      { name: 'Social Media Growth', level: 'Advanced', category: 'Marketing' }
    ],
    skillsWanted: [
      { name: 'Python Scripts', level: 'Beginner', category: 'Programming' },
      { name: 'Canva & Graphic Design', level: 'Intermediate', category: 'Design' }
    ],
    learningGoals: 'Automate marketing workflows using basic Python scripts and APIs.'
  },
  {
    id: 'student-5',
    name: 'Kabir Khan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    title: 'Full Stack Dev @ BITS Pilani',
    bio: 'MERN stack & cloud dev. Love building real-time apps with Node.js, WebSockets, and Docker.',
    location: 'Mumbai, India',
    rating: 4.9,
    reviewsCount: 29,
    matchScore: 96,
    availability: 'Daily Evening',
    experience: 'Expert',
    skillsOffered: [
      { name: 'Node.js & Express', level: 'Expert', category: 'Programming' },
      { name: 'MongoDB', level: 'Advanced', category: 'Programming' },
      { name: 'Docker & DevOps', level: 'Intermediate', category: 'Programming' }
    ],
    skillsWanted: [
      { name: 'Machine Learning', level: 'Beginner', category: 'AI/ML' },
      { name: 'PyTorch', level: 'Beginner', category: 'AI/ML' }
    ],
    learningGoals: 'Understand ML model deployment pipelines and build AI SaaS applications.'
  }
];

export const MOCK_EXCHANGES = [
  {
    id: 'ex-101',
    partner: MOCK_STUDENTS[1], // Priya Singh
    teachingSkill: 'React.js',
    learningSkill: 'Figma & Wireframing',
    status: 'active',
    createdAt: '2026-09-14',
    lastMessage: 'Let’s schedule our Figma setup session for tomorrow!',
    progress: 65,
    nextSession: 'Tomorrow, 5:00 PM'
  },
  {
    id: 'ex-102',
    partner: MOCK_STUDENTS[2], // Rahul Verma
    teachingSkill: 'JavaScript ES6+',
    learningSkill: 'Python',
    status: 'pending',
    createdAt: '2026-09-16',
    lastMessage: 'Hey Aarav! I saw you offer JS. I can teach you Python DSA in return.',
    progress: 0,
    nextSession: 'Pending confirmation'
  },
  {
    id: 'ex-103',
    partner: MOCK_STUDENTS[3], // Ananya Gupta
    teachingSkill: 'HTML5 / CSS3',
    learningSkill: 'SEO Strategy',
    status: 'completed',
    createdAt: '2026-08-20',
    lastMessage: 'Thanks for the awesome CSS Grid walkthrough!',
    progress: 100,
    nextSession: 'Completed on Sep 5'
  }
];

export const MOCK_SCHEDULE = [
  {
    id: 'sch-1',
    title: 'Figma Component Systems & Auto Layout',
    withPartner: 'Priya Singh',
    partnerAvatar: MOCK_STUDENTS[1].avatar,
    skill: 'Figma & Wireframing',
    type: 'Learning',
    date: '2026-10-10',
    time: '05:00 PM - 06:00 PM',
    status: 'Confirmed',
    link: 'https://meet.google.com/xyz-skill-swap'
  },
  {
    id: 'sch-2',
    title: 'React Hooks & State Management Essentials',
    withPartner: 'Priya Singh',
    partnerAvatar: MOCK_STUDENTS[1].avatar,
    skill: 'React.js',
    type: 'Teaching',
    date: '2026-10-12',
    time: '04:00 PM - 05:00 PM',
    status: 'Confirmed',
    link: 'https://meet.google.com/xyz-skill-swap'
  },
  {
    id: 'sch-3',
    title: 'Python Basics & Data Structures Intro',
    withPartner: 'Rahul Verma',
    partnerAvatar: MOCK_STUDENTS[2].avatar,
    skill: 'Python',
    type: 'Learning',
    date: '2026-10-14',
    time: '06:00 PM - 07:00 PM',
    status: 'Pending',
    link: 'https://meet.google.com/xyz-skill-swap'
  }
];

export const MOCK_MESSAGES = {
  'student-2': [
    { id: 'm1', sender: 'them', text: 'Hey Sapna! Excited for our skill exchange. Are you ready for Figma today?', timestamp: '10:15 AM' },
    { id: 'm2', sender: 'me', text: 'Hey Priya! Yes, absolutely. I’ve prepared my React component questions as well.', timestamp: '10:18 AM' },
    { id: 'm3', sender: 'them', text: 'Awesome! We will cover Auto Layout and Design Tokens first.', timestamp: '10:20 AM' }
  ],
  'student-3': [
    { id: 'm1', sender: 'them', text: 'Hi! I saw your profile on SkillSwap. I can help with Python & SQL!', timestamp: 'Yesterday' }
  ]
};
