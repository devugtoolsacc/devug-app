import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  events: defineTable({
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
  }),

  sessions: defineTable({
    id: v.number(),
    eventId: v.string(),
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
  }),

  questions: defineTable({
    id: v.number(),
    sessionId: v.number(),
    text: v.string(),
    author: v.string(),
    timestamp: v.number(), // Unix timestamp
    isHandRaise: v.optional(v.boolean()),
  }),

  sessionFeedback: defineTable({
    sessionId: v.number(),
    rating: v.number(),
    tags: v.array(v.string()),
    comment: v.string(),
  }),
});
