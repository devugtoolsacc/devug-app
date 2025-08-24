import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Get questions by session ID
export const getBySessionId = query({
  args: { sessionId: v.number() },
  handler: async (ctx, args) => {
    const questions = await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('sessionId'), args.sessionId))
      .collect();

    return questions.map((q) => ({
      ...q,
      timestamp: new Date(q.timestamp),
    }));
  },
});

// Create a new question
export const create = mutation({
  args: {
    id: v.number(),
    sessionId: v.number(),
    text: v.string(),
    author: v.string(),
    timestamp: v.number(),
    isHandRaise: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('questions', args);
  },
});

// Update a question
export const update = mutation({
  args: {
    id: v.number(),
    text: v.optional(v.string()),
    author: v.optional(v.string()),
    isHandRaise: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    const question = await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('id'), id))
      .first();

    if (question) {
      return await ctx.db.patch(question._id, updateFields);
    }
  },
});

// Delete a question
export const remove = mutation({
  args: { id: v.number() },
  handler: async (ctx, args) => {
    const question = await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('id'), args.id))
      .first();

    if (question) {
      await ctx.db.delete(question._id);
    }
  },
});

// Mark/unmark question as hand raise
export const toggleHandRaise = mutation({
  args: { id: v.number() },
  handler: async (ctx, args) => {
    const question = await ctx.db
      .query('questions')
      .filter((q) => q.eq(q.field('id'), args.id))
      .first();

    if (question) {
      return await ctx.db.patch(question._id, {
        isHandRaise: !question.isHandRaise,
      });
    }
  },
});
