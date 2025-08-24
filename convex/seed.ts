import { action } from './_generated/server';
import { api } from './_generated/api';

// Sample data based on the original data.ts file
const sampleEvents = [
  {
    id: '1',
    title: "React 19 Deep Dive: What's New and How to Migrate",
    description:
      "Join us for an in-depth exploration of React 19's latest features including the new compiler, improved performance, and breaking changes. Learn practical migration strategies and best practices for upgrading your existing React applications.",
    date: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
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
    category: 'talk' as const,
    featuredSessionId: 2,
    sessions: [
      {
        id: 1,
        title: 'Welcome & Opening Remarks',
        type: 'announcement' as const,
        startTime: new Date('2024-01-15T19:00:00'),
        endTime: new Date('2024-01-15T19:05:00'),
        completed: true,
        isActive: false,
        description:
          "Welcome to our React 19 Deep Dive event. We're excited to have you all here!",
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
      {
        id: 2,
        title: "React 19 Deep Dive: What's New and How to Migrate",
        type: 'talk' as const,
        startTime: new Date('2024-01-15T19:05:00'),
        endTime: new Date('2024-01-15T20:45:00'),
        completed: false,
        isActive: true,
        speaker: {
          name: 'Thabiso Magwaza',
          avatar: 'TM',
          role: 'Senior Frontend Engineer',
        },
        description:
          'Explore the latest features in React 19 and how they can improve your development workflow.',
        videoLink: 'https://meet.google.com/abc-defg-hij',
        questions: [
          {
            id: 1,
            text: 'Where do you work?',
            author: 'Nathi',
            timestamp: new Date(),
          },
          {
            id: 2,
            text: 'Thabiso raise hand.',
            author: 'System',
            isHandRaise: true,
            timestamp: new Date(),
          },
          {
            id: 3,
            text: 'Does those even work?',
            author: 'you',
            timestamp: new Date(),
          },
        ],
        feedback: { rating: 0, tags: [], comment: '' },
      },
      {
        id: 3,
        title: 'Q&A Session',
        type: 'talk' as const,
        startTime: new Date('2024-01-15T20:45:00'),
        endTime: new Date('2024-01-15T21:00:00'),
        completed: false,
        isActive: false,
        speaker: {
          name: 'Thabiso Magwaza',
          avatar: 'TM',
          role: 'Senior Frontend Engineer',
        },
        description:
          'Open Q&A session with Thabiso about React 19 and migration strategies.',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js and TypeScript',
    description:
      "Learn how to build robust, scalable APIs using Node.js and TypeScript. We'll cover authentication, database design, testing strategies, and deployment best practices.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
      'en-US',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    ),
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
    category: 'workshop' as const,
    featuredSessionId: 1,
    sessions: [
      {
        id: 1,
        title: 'Building Scalable APIs with Node.js and TypeScript',
        type: 'talk' as const,
        startTime: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000 + 18.5 * 60 * 60 * 1000
        ),
        endTime: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000 + 20.5 * 60 * 60 * 1000
        ),
        completed: false,
        isActive: false,
        speaker: {
          name: 'Sarah Johnson',
          avatar: 'SJ',
          role: 'Backend Lead',
        },
        description:
          'Learn how to build robust, scalable APIs using Node.js and TypeScript.',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
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
    category: 'talk' as const,
    featuredSessionId: 1,
    sessions: [
      {
        id: 1,
        title: 'AI/ML in Production: From Prototype to Scale',
        type: 'talk' as const,
        startTime: new Date('2025-09-30T19:00:00'),
        endTime: new Date('2025-09-30T21:00:00'),
        completed: false,
        isActive: false,
        speaker: {
          name: 'Dr. Aisha Patel',
          avatar: 'AP',
          role: 'ML Engineer',
        },
        description:
          'Discover how to take your AI/ML models from prototype to production.',
        videoLink: 'https://meet.google.com/ai-ml-session',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
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
    category: 'workshop' as const,
    featuredSessionId: 1,
    sessions: [
      {
        id: 1,
        title: 'DevOps Best Practices for Modern Applications',
        type: 'talk' as const,
        startTime: new Date('2025-10-05T18:00:00'),
        endTime: new Date('2025-10-05T20:00:00'),
        completed: false,
        isActive: false,
        speaker: {
          name: 'Michael Chen',
          avatar: 'MC',
          role: 'DevOps Engineer',
        },
        description:
          'Explore modern DevOps practices including CI/CD pipelines, containerization with Docker, Kubernetes orchestration, and cloud-native development.',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
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
    category: 'workshop' as const,
    featuredSessionId: 1,
    sessions: [
      {
        id: 1,
        title: 'Web3 and Blockchain Development Workshop',
        type: 'talk' as const,
        startTime: new Date('2025-10-10T14:00:00'),
        endTime: new Date('2025-10-10T17:00:00'),
        completed: false,
        isActive: false,
        speaker: {
          name: 'Lerato Molefe',
          avatar: 'LM',
          role: 'Blockchain Developer',
        },
        description:
          'Get hands-on experience with Web3 development. Build a simple dApp, understand smart contracts, and explore the future of decentralized applications.',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
  },
  {
    id: '6',
    title: 'Live: Building Real-time Applications with WebSockets',
    description:
      'Join us live as we build a real-time chat application using WebSockets, Node.js, and React. Watch the development process in real-time and ask questions!',
    date: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
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
    category: 'workshop' as const,
    featuredSessionId: 1,
    sessions: [
      {
        id: 1,
        title: 'Building Real-time Applications with WebSockets',
        type: 'talk' as const,
        startTime: new Date(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        completed: false,
        isActive: true,
        speaker: {
          name: 'Alex Thompson',
          avatar: 'AT',
          role: 'Full Stack Developer',
        },
        description:
          'Join us live as we build a real-time chat application using WebSockets, Node.js, and React.',
        videoLink: 'https://meet.google.com/websockets-live',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
  },
  {
    id: '7',
    title: 'Live: Q&A Session: Career in Tech',
    description:
      'Live Q&A session with industry professionals. Ask questions about breaking into tech, career progression, salary negotiations, and more!',
    date: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
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
    category: 'networking' as const,
    featuredSessionId: 1,
    sessions: [
      {
        id: 1,
        title: 'Q&A Session: Career in Tech',
        type: 'talk' as const,
        startTime: new Date(),
        endTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000), // 1.5 hours from now
        completed: false,
        isActive: true,
        speaker: {
          name: 'Zinhle Dlamini',
          avatar: 'ZD',
          role: 'Engineering Manager',
        },
        description:
          'Live Q&A session with industry professionals. Ask questions about breaking into tech, career progression, salary negotiations, and more!',
        videoLink: 'https://meet.google.com/career-qa',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
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
    category: 'workshop' as const,
    featuredSessionId: 1,
    sessions: [
      {
        id: 1,
        title: 'Mobile App Development with React Native',
        type: 'talk' as const,
        startTime: new Date('2025-10-15T19:00:00'),
        endTime: new Date('2025-10-15T21:00:00'),
        completed: false,
        isActive: false,
        speaker: {
          name: 'Tumi Maseko',
          avatar: 'TM',
          role: 'Mobile Developer',
        },
        description:
          'Learn to build cross-platform mobile applications using React Native.',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
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
    category: 'talk' as const,
    featuredSessionId: 1,
    sessions: [
      {
        id: 1,
        title: 'Database Design and Optimization',
        type: 'talk' as const,
        startTime: new Date('2025-10-20T18:30:00'),
        endTime: new Date('2025-10-20T20:30:00'),
        completed: false,
        isActive: false,
        speaker: {
          name: 'Dr. Peter van der Merwe',
          avatar: 'PV',
          role: 'Database Architect',
        },
        description:
          'Master database design principles, query optimization, and performance tuning.',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
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
    category: 'hackathon' as const,
    featuredSessionId: 1,
    sessions: [
      {
        id: 1,
        title: 'Hackathon Opening & Rules',
        type: 'announcement' as const,
        startTime: new Date('2025-10-25T09:00:00'),
        endTime: new Date('2025-10-25T09:30:00'),
        completed: false,
        isActive: false,
        description:
          'Welcome to the Annual DevUG Hackathon 2025! Learn about the rules, prizes, and schedule.',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
      {
        id: 2,
        title: 'Coding Session',
        type: 'talk' as const,
        startTime: new Date('2025-10-25T09:30:00'),
        endTime: new Date('2025-10-26T09:00:00'),
        completed: false,
        isActive: false,
        description:
          '24 hours of coding, learning, and building amazing projects!',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
      {
        id: 3,
        title: 'Project Presentations & Awards',
        type: 'announcement' as const,
        startTime: new Date('2025-10-26T09:00:00'),
        endTime: new Date('2025-10-26T11:00:00'),
        completed: false,
        isActive: false,
        description: 'Teams present their projects and winners are announced!',
        questions: [],
        feedback: { rating: 0, tags: [], comment: '' },
      },
    ],
  },
];

export const seed = action({
  args: {},
  handler: async (ctx) => {
    console.log('Starting seed process...');

    for (const eventData of sampleEvents) {
      // Insert the event
      const eventId = await ctx.runMutation(api.events.create, {
        id: eventData.id,
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
        attendeeCount: eventData.attendeeCount,
        maxAttendees: eventData.maxAttendees,
        price: eventData.price,
        speakers: eventData.speakers,
        hasInPerson: eventData.hasInPerson,
        hasOnline: eventData.hasOnline,
        isLive: eventData.isLive,
        tags: eventData.tags,
        category: eventData.category,
        featuredSessionId: eventData.featuredSessionId,
      });

      console.log(`Created event: ${eventData.title}`);

      // Insert sessions for this event
      for (const session of eventData.sessions) {
        // Insert session
        const sessionId = await ctx.runMutation(api.sessions.create, {
          id: session.id,
          eventId: eventData.id,
          title: session.title,
          type: session.type,
          startTime: session.startTime.getTime(), // Convert to Unix timestamp
          endTime: session.endTime.getTime(), // Convert to Unix timestamp
          completed: session.completed,
          isActive: session.isActive,
          speaker: 'speaker' in session ? session.speaker : undefined,
          description:
            'description' in session ? session.description : undefined,
          videoLink: 'videoLink' in session ? session.videoLink : undefined,
        });

        // Insert questions for this session
        for (const question of session.questions) {
          await ctx.runMutation(api.questions.create, {
            id: question.id,
            sessionId: session.id,
            text: question.text,
            author: question.author,
            timestamp: question.timestamp.getTime(), // Convert to Unix timestamp
            isHandRaise: question.isHandRaise,
          });
        }

        // Insert feedback for this session
        if (
          session.feedback.rating > 0 ||
          session.feedback.tags.length > 0 ||
          session.feedback.comment
        ) {
          await ctx.runMutation(api.sessionFeedback.create, {
            sessionId: session.id,
            rating: session.feedback.rating,
            tags: session.feedback.tags,
            comment: session.feedback.comment,
          });
        }
      }
    }

    console.log('Seed process completed!');
    return { success: true, message: 'Database seeded with sample data' };
  },
});
