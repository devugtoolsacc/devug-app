# Convex Database Setup for DevUG Events

This document explains how the DevUG events data has been migrated to Convex database and provides usage examples.

## Database Schema

The data is organized into the following tables:

### 1. `events` - Main event information

- `id`: string (unique identifier)
- `title`: string
- `description`: string
- `date`: string
- `time`: string
- `location`: string
- `attendeeCount`: number
- `maxAttendees`: number
- `price`: string
- `speakers`: array of speaker objects
- `hasInPerson`: boolean
- `hasOnline`: boolean
- `isLive`: boolean
- `tags`: array of strings
- `category`: 'workshop' | 'talk' | 'networking' | 'hackathon' | 'conference'
- `featuredSessionId`: optional number

### 2. `sessions` - Individual sessions within events

- `id`: number (unique within event)
- `eventId`: string (foreign key to events)
- `title`: string
- `type`: 'announcement' | 'break' | 'talk'
- `startTime`: number (Unix timestamp)
- `endTime`: number (Unix timestamp)
- `completed`: boolean
- `isActive`: boolean
- `speaker`: optional speaker object
- `description`: optional string
- `videoLink`: optional string

### 3. `questions` - Questions asked during sessions

- `id`: number
- `sessionId`: number (foreign key to sessions)
- `text`: string
- `author`: string
- `timestamp`: number (Unix timestamp)
- `isHandRaise`: optional boolean

### 4. `sessionFeedback` - Feedback for sessions

- `sessionId`: number (foreign key to sessions)
- `rating`: number
- `tags`: array of strings
- `comment`: string

## Usage Examples

### 1. Querying Data

```typescript
import { useEvents, useEvent, useLiveEvents } from '@/data/data';

// Get all events
const events = useEvents();

// Get a specific event
const event = useEvent('event-id-123');

// Get live events
const liveEvents = useLiveEvents();

// Get sessions for an event
const sessions = useSessions('event-id-123');
```

### 2. Mutations (Modifying Data)

```typescript
import {
  useCreateEvent,
  useAddQuestion,
  useUpdateSessionFeedback,
} from '@/data/data';

// Create a new event
const createEvent = useCreateEvent();
await createEvent({
  id: 'new-event-id',
  title: 'New Event Title',
  description: 'Event description',
  // ... other required fields
});

// Add a question to a session
const addQuestion = useAddQuestion();
await addQuestion({
  sessionId: 1,
  text: 'What is the best practice for...?',
  author: 'John Doe',
  isHandRaise: false,
});

// Update session feedback
const updateFeedback = useUpdateSessionFeedback();
await updateFeedback({
  sessionId: 1,
  rating: 5,
  tags: ['helpful', 'informative'],
  comment: 'Great session!',
});
```

### 3. Seeding the Database

To populate the database with sample data, run the seed action:

```typescript
import { useSeedDatabase } from '@/data/data';

const seedDatabase = useSeedDatabase();
await seedDatabase();
```

## Available Hooks

### Query Hooks

- `useEvents()` - Get all events
- `useEvent(id)` - Get event by ID
- `useEventsByCategory(category)` - Get events by category
- `useLiveEvents()` - Get live events
- `useUpcomingEvents()` - Get upcoming events
- `useSessions(eventId)` - Get sessions for an event
- `useSession(id)` - Get session by ID
- `useQuestions(sessionId)` - Get questions for a session
- `useSessionFeedback(sessionId)` - Get feedback for a session

### Mutation Hooks

- `useCreateEvent()` - Create new event
- `useUpdateEvent()` - Update existing event
- `useDeleteEvent()` - Delete event
- `useAddQuestion()` - Add question to session
- `useUpdateSessionFeedback()` - Update session feedback
- `useUpdateAttendeeCount()` - Update attendee count
- `useCreateSession()` - Create new session
- `useUpdateSession()` - Update session
- `useDeleteSession()` - Delete session
- `useCreateQuestion()` - Create question
- `useUpdateQuestion()` - Update question
- `useDeleteQuestion()` - Delete question
- `useToggleHandRaise()` - Toggle hand raise status
- `useUpdateFeedback()` - Update feedback
- `useDeleteFeedback()` - Delete feedback
- `useSeedDatabase()` - Seed database with sample data

## Migration Notes

1. **Data Types**: Date objects are converted to Unix timestamps when stored in Convex and converted back to Date objects in queries for frontend compatibility.

2. **Backward Compatibility**: The `sampleEvents` array is still available in `data.ts` for backward compatibility during migration.

3. **Relationships**: Foreign key relationships are maintained using the respective ID fields (e.g., `eventId`, `sessionId`).

4. **Real-time Updates**: All queries will automatically update in real-time when the underlying data changes.

## Convex Setup

The Convex configuration is located in:

- `convex/schema.ts` - Database schema definition
- `convex/events.ts` - Event-related queries and mutations
- `convex/sessions.ts` - Session-related operations
- `convex/questions.ts` - Question-related operations
- `convex/sessionFeedback.ts` - Feedback-related operations
- `convex/seed.ts` - Database seeding action

## Development

To work with the Convex dashboard:

1. Install Convex CLI: `npm install -g convex`
2. Login: `convex login`
3. Open dashboard: `convex dashboard`

To run the development server:

```bash
npm run dev
```

The Convex functions will be automatically deployed when you run the dev server.
