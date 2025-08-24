import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

// Type definitions (keeping for TypeScript compatibility)
export type SessionType = 'announcement' | 'break' | 'talk';

export interface SessionFeedback {
  rating: number;
  tags: string[];
  comment: string;
}

export interface Question {
  id: number;
  text: string;
  author: string;
  sessionId: number;
  isHandRaise?: boolean;
  timestamp: Date;
}

export interface Session {
  id: number;
  title: string;
  type: SessionType;
  startTime: Date;
  endTime: Date;
  completed: boolean;
  isActive: boolean;
  speaker?: {
    name: string;
    avatar: string;
    role: string;
  };
  description?: string;
  videoLink?: string;
  questions: Question[];
  feedback: SessionFeedback;
}

export interface Event {
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
  sessions: Session[];
  featuredSessionId?: number; // ID of the session to feature on home/events pages
}

// Hooks for querying data
export const useEvents = () => {
  return useQuery(api.events.getAll);
};

export const useEvent = (id: string) => {
  return useQuery(api.events.getById, { id });
};

export const useEventsByCategory = (category: Event['category']) => {
  return useQuery(api.events.getByCategory, { category });
};

export const useLiveEvents = () => {
  return useQuery(api.events.getLiveEvents);
};

export const useUpcomingEvents = () => {
  return useQuery(api.events.getUpcomingEvents);
};

export const useSessions = (eventId: string) => {
  return useQuery(api.events.getSessionsByEventId, { eventId });
};

export const useSession = (id: number) => {
  return useQuery(api.sessions.getById, { id });
};

export const useQuestions = (sessionId: number) => {
  return useQuery(api.questions.getBySessionId, { sessionId });
};

export const useSessionFeedback = (sessionId: number) => {
  return useQuery(api.sessionFeedback.getBySessionId, { sessionId });
};

// Mutations for modifying data
export const useCreateEvent = () => {
  return useMutation(api.events.create);
};

export const useUpdateEvent = () => {
  return useMutation(api.events.update);
};

export const useDeleteEvent = () => {
  return useMutation(api.events.remove);
};

export const useAddQuestion = () => {
  return useMutation(api.events.addQuestion);
};

export const useUpdateSessionFeedback = () => {
  return useMutation(api.events.updateSessionFeedback);
};

export const useUpdateAttendeeCount = () => {
  return useMutation(api.events.updateAttendeeCount);
};

export const useCreateSession = () => {
  return useMutation(api.sessions.create);
};

export const useUpdateSession = () => {
  return useMutation(api.sessions.update);
};

export const useDeleteSession = () => {
  return useMutation(api.sessions.remove);
};

export const useCreateQuestion = () => {
  return useMutation(api.questions.create);
};

export const useUpdateQuestion = () => {
  return useMutation(api.questions.update);
};

export const useDeleteQuestion = () => {
  return useMutation(api.questions.remove);
};

export const useToggleHandRaise = () => {
  return useMutation(api.questions.toggleHandRaise);
};

export const useUpdateFeedback = () => {
  return useMutation(api.sessionFeedback.update);
};

export const useDeleteFeedback = () => {
  return useMutation(api.sessionFeedback.remove);
};

// Seed the database (only use this once to populate initial data)
// Note: This is an action, not a mutation, so it requires different handling
export const useSeedDatabase = () => {
  // Actions are handled differently in Convex - you would typically call this directly
  // rather than through a React hook. For now, we'll leave this as a placeholder.
  return null;
};
