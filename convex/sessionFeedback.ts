import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Get feedback by session ID
export const getBySessionId = query({
  args: { sessionId: v.id('sessions') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('sessionFeedback')
      .filter((q) => q.eq(q.field('sessionId'), args.sessionId))
      .first();
  },
});

// Create new feedback
export const create = mutation({
  args: {
    sessionId: v.id('sessions'),
    rating: v.number(),
    tags: v.array(v.string()),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('sessionFeedback', args);
  },
});

// Update existing feedback
export const update = mutation({
  args: {
    sessionId: v.id('sessions'),
    rating: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { sessionId, ...updateFields } = args;
    const feedback = await ctx.db
      .query('sessionFeedback')
      .filter((q) => q.eq(q.field('sessionId'), sessionId))
      .first();

    if (feedback) {
      return await ctx.db.patch(feedback._id, updateFields);
    } else {
      // Create new feedback if it doesn't exist
      return await ctx.db.insert('sessionFeedback', {
        sessionId,
        rating: updateFields.rating || 0,
        tags: updateFields.tags || [],
        comment: updateFields.comment || '',
      });
    }
  },
});

// Delete feedback
export const remove = mutation({
  args: { sessionId: v.id('sessions') },
  handler: async (ctx, args) => {
    const feedback = await ctx.db
      .query('sessionFeedback')
      .filter((q) => q.eq(q.field('sessionId'), args.sessionId))
      .first();

    if (feedback) {
      await ctx.db.delete(feedback._id);
    }
  },
});

// Update session feedback
export const updateSessionFeedback = mutation({
  args: {
    sessionId: v.id('sessions'),
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
