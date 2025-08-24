import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Get questions by session ID
export const getBySessionId = query({
  args: { sessionId: v.id('sessions') },
  handler: async (ctx, args) => {
    const questions = await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('sessionId'), args.sessionId))
      .collect();

    return questions;
  },
});

// Create a new question
export const create = mutation({
  args: {
    sessionId: v.id('sessions'),
    text: v.string(),
    author: v.string(),
    isHandRaise: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('questions', args);
  },
});

// Update a question
export const update = mutation({
  args: {
    id: v.id('questions'),
    text: v.optional(v.string()),
    author: v.optional(v.string()),
    isHandRaise: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    const question = await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('_id'), id))
      .first();

    if (question) {
      return await ctx.db.patch(question._id, updateFields);
    }
  },
});

// Delete a question
export const remove = mutation({
  args: { id: v.id('questions') },
  handler: async (ctx, args) => {
    const question = await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();

    if (question) {
      await ctx.db.delete(question._id);
    }
  },
});

// Mark/unmark question as hand raise
export const toggleHandRaise = mutation({
  args: { id: v.id('questions') },
  handler: async (ctx, args) => {
    const question = await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();

    if (question) {
      return await ctx.db.patch(question._id, {
        isHandRaise: !question.isHandRaise,
      });
    }
  },
});

// Add a question to a session
export const askQuestion = mutation({
  args: {
    sessionId: v.id('sessions'),
    text: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('questions', {
      ...args,
    });
  },
});

export const raiseHand = mutation({
  args: {
    sessionId: v.id('sessions'),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('questions', {
      ...args,
      isHandRaise: true,
    });
  },
});
