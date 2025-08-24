import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Get sessions by event ID
export const getByEventId = query({
  args: { eventId: v.id('events') },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query('sessions')
      .filter((q) => q.eq(q.field('eventId'), args.eventId))
      .collect();

    // For each session, get questions and feedback
    const sessionsWithDetails = await Promise.all(
      sessions.map(async (session) => {
        const questions = await ctx.db
          .query('questions')
          .filter((q) => q.eq(q.field('sessionId'), session._id))
          .collect();

        const feedback = await ctx.db
          .query('sessionFeedback')
          .filter((q) => q.eq(q.field('sessionId'), session._id))
          .collect();

        return {
          ...session,
          startTime: session.startTime,
          endTime: session.endTime,
          questions,
          feedback,
        };
      })
    );

    return sessionsWithDetails;
  },
});

// Get a single session by ID
export const getById = query({
  args: { id: v.id('sessions') },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query('sessions')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();

    if (!session) return null;

    const questions = await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('sessionId'), session._id))
      .collect();

    const feedback = await ctx.db
      .query('sessionFeedback')
      .filter((q) => q.eq(q.field('sessionId'), session._id))
      .collect();

    return {
      ...session,
      startTime: session.startTime,
      endTime: session.endTime,
      questions,
      feedback,
    };
  },
});

// Create a new session
export const create = mutation({
  args: {
    eventId: v.id('events'),
    title: v.string(),
    type: v.string(),
    startTime: v.number(), // Unix timestamp
    endTime: v.number(), // Unix timestamp
    completed: v.boolean(),
    isActive: v.boolean(),
    speaker: v.optional(
      v.object({
        name: v.string(),
        avatar: v.string(),
        role: v.string(),
      })
    ),
    description: v.optional(v.string()),
    videoLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('sessions', args);
  },
});

// Update a session
export const update = mutation({
  args: {
    id: v.id('sessions'),
    title: v.optional(v.string()),
    type: v.optional(v.string()),
    startTime: v.optional(v.number()),
    endTime: v.optional(v.number()),
    completed: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
    speaker: v.optional(
      v.object({
        name: v.string(),
        avatar: v.string(),
        role: v.string(),
      })
    ),
    description: v.optional(v.string()),
    videoLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    const session = await ctx.db
      .query('sessions')
      .filter((q) => q.eq(q.field('_id'), id))
      .first();

    if (session) {
      return await ctx.db.patch(session._id, updateFields);
    }
  },
});

// Delete a session and all its related data
export const remove = mutation({
  args: { id: v.id('sessions') },
  handler: async (ctx, args) => {
    // Delete all questions for this session
    await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('sessionId'), args.id))
      .collect()
      .then((questions) =>
        Promise.all(questions.map((q) => ctx.db.delete(q._id)))
      );

    // Delete all feedback for this session
    await ctx.db
      .query('sessionFeedback')
      .filter((q) => q.eq(q.field('sessionId'), args.id))
      .collect()
      .then((feedback) =>
        Promise.all(feedback.map((f) => ctx.db.delete(f._id)))
      );

    // Delete the session
    const session = await ctx.db
      .query('sessions')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});
