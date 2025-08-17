interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendeeCount: number;
  maxAttendees: number;
  price: string;
  speakers: { name: string; role: string; company?: string }[];
  hasInPerson: boolean;
  hasOnline: boolean;
  isLive: boolean;
  tags: string[];
  category: 'workshop' | 'talk' | 'networking' | 'hackathon' | 'conference';
}

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: "React 19 Deep Dive: What's New and How to Migrate",
    description:
      "Join us for an in-depth exploration of React 19's latest features including the new compiler, improved performance, and breaking changes. Learn practical migration strategies and best practices for upgrading your existing React applications.",
    date: '20 Sept 2025',
    time: '19:00 - 21:00',
    location: 'BBD Rosebank, Johannesburg, ZA',
    attendeeCount: 45,
    maxAttendees: 80,
    price: 'free',
    speakers: [
      {
        name: 'Thabiso Magwaza',
        role: 'Senior Frontend Engineer',
        company: 'Takealot',
      },
      { name: 'Nathi Ngwenya', role: 'React Specialist', company: 'Microsoft' },
    ],
    hasInPerson: true,
    hasOnline: true,
    isLive: false,
    tags: ['React', 'Frontend', 'JavaScript'],
    category: 'talk',
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js and TypeScript',
    description:
      "Learn how to build robust, scalable APIs using Node.js and TypeScript. We'll cover authentication, database design, testing strategies, and deployment best practices.",
    date: '25 Sept 2025',
    time: '18:30 - 20:30',
    location: 'WeWork Sandton, Johannesburg, ZA',
    attendeeCount: 32,
    maxAttendees: 50,
    price: 'R50',
    speakers: [
      { name: 'Sarah Johnson', role: 'Backend Lead', company: 'Yoco' },
    ],
    hasInPerson: true,
    hasOnline: false,
    isLive: false,
    tags: ['Node.js', 'TypeScript', 'API', 'Backend'],
    category: 'workshop',
  },
  {
    id: '3',
    title: 'AI/ML in Production: From Prototype to Scale',
    description:
      "Discover how to take your AI/ML models from prototype to production. We'll discuss MLOps, model serving, monitoring, and real-world deployment challenges.",
    date: '30 Sept 2025',
    time: '19:00 - 21:00',
    location: 'Online',
    attendeeCount: 78,
    maxAttendees: 100,
    price: 'free',
    speakers: [
      { name: 'Dr. Aisha Patel', role: 'ML Engineer', company: 'Google' },
      {
        name: 'David Mokoena',
        role: 'Data Scientist',
        company: 'Standard Bank',
      },
    ],
    hasInPerson: false,
    hasOnline: true,
    isLive: false,
    tags: ['AI', 'Machine Learning', 'MLOps', 'Python'],
    category: 'talk',
  },
  {
    id: '4',
    title: 'DevOps Best Practices for Modern Applications',
    description:
      'Explore modern DevOps practices including CI/CD pipelines, containerization with Docker, Kubernetes orchestration, and cloud-native development.',
    date: '5 Oct 2025',
    time: '18:00 - 20:00',
    location: 'Microsoft Office, Cape Town, ZA',
    attendeeCount: 28,
    maxAttendees: 40,
    price: 'R75',
    speakers: [
      { name: 'Michael Chen', role: 'DevOps Engineer', company: 'Netflix' },
    ],
    hasInPerson: true,
    hasOnline: true,
    isLive: false,
    tags: ['DevOps', 'Docker', 'Kubernetes', 'CI/CD'],
    category: 'workshop',
  },
  {
    id: '5',
    title: 'Web3 and Blockchain Development Workshop',
    description:
      'Get hands-on experience with Web3 development. Build a simple dApp, understand smart contracts, and explore the future of decentralized applications.',
    date: '10 Oct 2025',
    time: '14:00 - 17:00',
    location: 'Blockchain Hub, Johannesburg, ZA',
    attendeeCount: 15,
    maxAttendees: 25,
    price: 'R100',
    speakers: [
      {
        name: 'Lerato Molefe',
        role: 'Blockchain Developer',
        company: 'Chainlink',
      },
    ],
    hasInPerson: true,
    hasOnline: false,
    isLive: false,
    tags: ['Web3', 'Blockchain', 'Smart Contracts', 'Solidity'],
    category: 'workshop',
  },
  {
    id: '6',
    title: 'Live: Building Real-time Applications with WebSockets',
    description:
      'Join us live as we build a real-time chat application using WebSockets, Node.js, and React. Watch the development process in real-time and ask questions!',
    date: 'Now Live',
    time: 'Live Now',
    location: 'Online',
    attendeeCount: 156,
    maxAttendees: 200,
    price: 'free',
    speakers: [
      {
        name: 'Alex Thompson',
        role: 'Full Stack Developer',
        company: 'Twilio',
      },
    ],
    hasInPerson: false,
    hasOnline: true,
    isLive: true,
    tags: ['WebSockets', 'Real-time', 'Node.js', 'React'],
    category: 'workshop',
  },
  {
    id: '7',
    title: 'Live: Q&A Session: Career in Tech',
    description:
      'Live Q&A session with industry professionals. Ask questions about breaking into tech, career progression, salary negotiations, and more!',
    date: 'Now Live',
    time: 'Live Now',
    location: 'Online',
    attendeeCount: 89,
    maxAttendees: 150,
    price: 'free',
    speakers: [
      {
        name: 'Zinhle Dlamini',
        role: 'Engineering Manager',
        company: 'Shopify',
      },
      { name: 'James Wilson', role: 'Tech Recruiter', company: 'OfferZen' },
    ],
    hasInPerson: false,
    hasOnline: true,
    isLive: true,
    tags: ['Career', 'Q&A', 'Networking'],
    category: 'networking',
  },
  {
    id: '8',
    title: 'Mobile App Development with React Native',
    description:
      "Learn to build cross-platform mobile applications using React Native. We'll cover navigation, state management, native modules, and app store deployment.",
    date: '15 Oct 2025',
    time: '19:00 - 21:00',
    location: 'Andela Office, Johannesburg, ZA',
    attendeeCount: 42,
    maxAttendees: 60,
    price: 'R60',
    speakers: [
      { name: 'Tumi Maseko', role: 'Mobile Developer', company: 'SnapScan' },
    ],
    hasInPerson: true,
    hasOnline: true,
    isLive: false,
    tags: ['React Native', 'Mobile', 'Cross-platform', 'JavaScript'],
    category: 'workshop',
  },
  {
    id: '9',
    title: 'Database Design and Optimization',
    description:
      "Master database design principles, query optimization, and performance tuning. We'll cover both SQL and NoSQL databases with real-world examples.",
    date: '20 Oct 2025',
    time: '18:30 - 20:30',
    location: 'Oracle Office, Cape Town, ZA',
    attendeeCount: 35,
    maxAttendees: 45,
    price: 'R80',
    speakers: [
      {
        name: 'Dr. Peter van der Merwe',
        role: 'Database Architect',
        company: 'Oracle',
      },
    ],
    hasInPerson: true,
    hasOnline: false,
    isLive: false,
    tags: ['Database', 'SQL', 'NoSQL', 'Performance'],
    category: 'talk',
  },
  {
    id: '10',
    title: 'Annual DevUG Hackathon 2025',
    description:
      'Join us for our biggest event of the year! 24 hours of coding, learning, and networking. Build something amazing and win prizes worth R50,000!',
    date: '25-26 Oct 2025',
    time: '24 Hours',
    location: 'Microsoft Reactor, Johannesburg, ZA',
    attendeeCount: 120,
    maxAttendees: 200,
    price: 'R150',
    speakers: [
      {
        name: 'Various Mentors',
        role: 'Industry Experts',
        company: 'Multiple Companies',
      },
    ],
    hasInPerson: true,
    hasOnline: false,
    isLive: false,
    tags: ['Hackathon', 'Competition', 'Networking', 'Prizes'],
    category: 'hackathon',
  },
];
