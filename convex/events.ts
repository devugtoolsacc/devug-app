import { query, mutation, action } from './_generated/server';
import { v } from 'convex/values';

// Get all events
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query('events').collect();

    // For each event, get its sessions, questions, and feedback
    const eventsWithDetails = await Promise.all(
      events.map(async (event) => {
        const sessions = await ctx.db
          .query('sessions')
          .filter((q) => q.eq(q.field('eventId'), event.id))
          .collect();

        // Get sessions with their questions and feedback
        const sessionsWithDetails = await Promise.all(
          sessions.map(async (session) => {
            const questions = await ctx.db
              .query('questions')
              .filter((q) => q.eq(q.field('sessionId'), session.id))
              .collect();

            const feedback = await ctx.db
              .query('sessionFeedback')
              .filter((q) => q.eq(q.field('sessionId'), session.id))
              .collect();

            return {
              ...session,
              // Convert Unix timestamps back to Date objects for frontend compatibility
              startTime: new Date(session.startTime),
              endTime: new Date(session.endTime),
              questions: questions.map((q) => ({
                ...q,
                timestamp: new Date(q.timestamp),
              })),
              feedback:
                feedback.length > 0
                  ? feedback[0]
                  : { rating: 0, tags: [], comment: '' },
            };
          })
        );

        return {
          ...event,
          sessions: sessionsWithDetails,
        };
      })
    );

    return eventsWithDetails;
  },
});

// Get a single event by ID
export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const event = await ctx.db
      .query('events')
      .filter((q) => q.eq(q.field('id'), args.id))
      .first();

    if (!event) return null;

    const sessions = await ctx.db
      .query('sessions')
      .filter((q) => q.eq(q.field('eventId'), event.id))
      .collect();

    const sessionsWithDetails = await Promise.all(
      sessions.map(async (session) => {
        const questions = await ctx.db
          .query('questions')
          .filter((q) => q.eq(q.field('sessionId'), session.id))
          .collect();

        const feedback = await ctx.db
          .query('sessionFeedback')
          .filter((q) => q.eq(q.field('sessionId'), session.id))
          .collect();

        return {
          ...session,
          startTime: new Date(session.startTime),
          endTime: new Date(session.endTime),
          questions: questions.map((q) => ({
            ...q,
            timestamp: new Date(q.timestamp),
          })),
          feedback:
            feedback.length > 0
              ? feedback[0]
              : { rating: 0, tags: [], comment: '' },
        };
      })
    );

    return {
      ...event,
      sessions: sessionsWithDetails,
    };
  },
});

// Get events by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('events')
      .filter((q) => q.eq(q.field('category'), args.category))
      .collect();
  },
});

// Get live events
export const getLiveEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('events')
      .filter((q) => q.eq(q.field('isLive'), true))
      .collect();
  },
});

// Get upcoming events
export const getUpcomingEvents = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    return await ctx.db
      .query('events')
      .filter((q) =>
        q.neq(
          q.field('date'),
          new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        )
      )
      .collect();
  },
});

// Get sessions for a specific event
export const getSessionsByEventId = query({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query('sessions')
      .filter((q) => q.eq(q.field('eventId'), args.eventId))
      .collect();

    const sessionsWithDetails = await Promise.all(
      sessions.map(async (session) => {
        const questions = await ctx.db
          .query('questions')
          .filter((q) => q.eq(q.field('sessionId'), session.id))
          .collect();

        const feedback = await ctx.db
          .query('sessionFeedback')
          .filter((q) => q.eq(q.field('sessionId'), session.id))
          .collect();

        return {
          ...session,
          startTime: new Date(session.startTime),
          endTime: new Date(session.endTime),
          questions: questions.map((q) => ({
            ...q,
            timestamp: new Date(q.timestamp),
          })),
          feedback:
            feedback.length > 0
              ? feedback[0]
              : { rating: 0, tags: [], comment: '' },
        };
      })
    );

    return sessionsWithDetails;
  },
});

// Create a new event
export const create = mutation({
  args: {
    id: v.string(),
    title: v.string(),
    description: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    attendeeCount: v.number(),
    maxAttendees: v.number(),
    price: v.string(),
    speakers: v.array(
      v.object({
        name: v.string(),
        role: v.string(),
        company: v.optional(v.string()),
      })
    ),
    hasInPerson: v.boolean(),
    hasOnline: v.boolean(),
    isLive: v.boolean(),
    tags: v.array(v.string()),
    category: v.string(),
    featuredSessionId: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('events', args);
  },
});

// Update an event
export const update = mutation({
  args: {
    id: v.id('events'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    date: v.optional(v.string()),
    time: v.optional(v.string()),
    location: v.optional(v.string()),
    attendeeCount: v.optional(v.number()),
    maxAttendees: v.optional(v.number()),
    price: v.optional(v.string()),
    speakers: v.optional(
      v.array(
        v.object({
          name: v.string(),
          role: v.string(),
          company: v.optional(v.string()),
        })
      )
    ),
    hasInPerson: v.optional(v.boolean()),
    hasOnline: v.optional(v.boolean()),
    isLive: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    featuredSessionId: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    return await ctx.db.patch(id, updateFields);
  },
});

// Delete an event and all its related data
export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Get all sessions for this event
    const sessions = await ctx.db
      .query('sessions')
      .filter((q) => q.eq(q.field('eventId'), args.id))
      .collect();

    // Delete all questions and feedback for each session
    for (const session of sessions) {
      await ctx.db
        .query('questions')
        .filter((q) => q.eq(q.field('sessionId'), session.id))
        .collect()
        .then((questions) =>
          Promise.all(questions.map((q) => ctx.db.delete(q._id)))
        );

      await ctx.db
        .query('sessionFeedback')
        .filter((q) => q.eq(q.field('sessionId'), session.id))
        .collect()
        .then((feedback) =>
          Promise.all(feedback.map((f) => ctx.db.delete(f._id)))
        );

      await ctx.db.delete(session._id);
    }

    // Delete the event
    const event = await ctx.db
      .query('events')
      .filter((q) => q.eq(q.field('id'), args.id))
      .first();

    if (event) {
      await ctx.db.delete(event._id);
    }
  },
});

// Add a question to a session
export const addQuestion = mutation({
  args: {
    id: v.number(),
    sessionId: v.number(),
    text: v.string(),
    author: v.string(),
    isHandRaise: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('questions', {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Update session feedback
export const updateSessionFeedback = mutation({
  args: {
    sessionId: v.number(),
    rating: v.number(),
    tags: v.array(v.string()),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if feedback already exists
    const existingFeedback = await ctx.db
      .query('sessionFeedback')
      .filter((q) => q.eq(q.field('sessionId'), args.sessionId))
      .first();

    if (existingFeedback) {
      return await ctx.db.patch(existingFeedback._id, args);
    } else {
      return await ctx.db.insert('sessionFeedback', args);
    }
  },
});

// Update attendee count
export const updateAttendeeCount = mutation({
  args: {
    eventId: v.string(),
    increment: v.number(),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db
      .query('events')
      .filter((q) => q.eq(q.field('id'), args.eventId))
      .first();

    if (event) {
      const newCount = Math.max(0, event.attendeeCount + args.increment);
      return await ctx.db.patch(event._id, { attendeeCount: newCount });
    }
  },
});
