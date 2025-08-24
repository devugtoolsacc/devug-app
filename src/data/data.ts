import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

// Hooks for querying data
export const useEvents = () => {
  return useQuery(api.events.getAll);
};

export const useEvent = (id: string) => {
  return useQuery(api.events.getById, { id });
};

export const useEventsByCategory = (category: string) => {
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

export const useSession = (id: Id<'sessions'>) => {
  return useQuery(api.sessions.getById, { id });
};

export const useQuestions = (sessionId: Id<'sessions'>) => {
  return useQuery(api.questions.getBySessionId, {
    sessionId,
  });
};

export const useSessionFeedback = (sessionId: Id<'sessions'>) => {
  return useQuery(api.sessionFeedback.getBySessionId, {
    sessionId,
  });
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
  return useMutation(api.questions.create);
};

export const useUpdateSessionFeedback = () => {
  return useMutation(api.sessionFeedback.update);
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
