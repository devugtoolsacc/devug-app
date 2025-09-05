import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  events: defineTable({
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
    featuredSessionId: v.optional(v.id('sessions')),
  }),

  sessions: defineTable({
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
  }),

  questions: defineTable({
    sessionId: v.id('sessions'),
    text: v.optional(v.string()),
    author: v.string(),
    isHandRaise: v.optional(v.boolean()),
  }),

  sessionFeedback: defineTable({
    sessionId: v.id('sessions'),
    rating: v.number(),
    tags: v.array(v.string()),
    comment: v.string(),
  }),
});
