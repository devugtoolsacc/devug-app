'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  Star,
  Hand,
  CheckSquare,
  X,
  Play,
  Clock,
  Mic,
  Coffee,
  Megaphone,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCreateQuestion, useDeleteQuestion, useEvents } from '@/data/data';
import { api } from '../../../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { Id } from '../../../../../convex/_generated/dataModel';

// type SessionType = 'announcement' | 'break' | 'talk';

// interface SessionFeedback {
//   rating: number;
//   tags: string[];
//   comment: string;
// }

// interface Question {
//   id: number;
//   text: string;
//   author: string;
//   sessionId: number;
//   isHandRaise?: boolean;
//   timestamp: Date;
// }

// interface SessionData {
//   id: number;
//   title: string;
//   type: SessionType;
//   startTime: Date;
//   endTime: Date;
//   completed: boolean;
//   isActive: boolean;
//   open: boolean;
//   speaker?: {
//     name: string;
//     avatar: string;
//     role: string;
//   };
//   description?: string;
//   videoLink?: string;
//   questions: Question[];
//   feedback: SessionFeedback;
// }

// const predefinedTags = [
//   'Interesting topic',
//   'Nice talk',
//   'Great presentation',
//   'Clear explanation',
//   'Engaging',
//   'Informative',
//   'Well organized',
//   'Good pace',
// ];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDuration(startTime: Date, endTime: Date): string {
  const durationMs = endTime.getTime() - startTime.getTime();
  const minutes = Math.floor(durationMs / (1000 * 60));
  return `${minutes} min`;
}

function getSessionTypeIcon(type: string) {
  switch (type) {
    case 'announcement':
      return <Megaphone className="h-5 w-5" />;
    case 'break':
      return <Coffee className="h-5 w-5" />;
    case 'talk':
      return <Mic className="h-5 w-5" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
}

function getSessionTypeColor(type: string) {
  switch (type) {
    case 'announcement':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'break':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'talk':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function HandRaiseIcon({
  isRaised,
  onClick,
}: {
  isRaised: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-full transition-colors ${
        isRaised
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted hover:bg-muted/80'
      }`}
    >
      <Hand className="h-8 w-8" />
    </button>
  );
}

function StarRating({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange: (rating: number) => void;
}) {
  return (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          className="p-1 hover:scale-110 transition-transform"
        >
          <Star
            className={`h-10 w-10 ${
              star <= rating
                ? 'fill-primary stroke-primary'
                : 'stroke-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// function SessionFeedbackCard({
//   session,
//   onFeedbackSubmit,
// }: {
//   session: Session;
//   onFeedbackSubmit: (sessionId: number, feedback: SessionFeedback) => void;
// }) {
//   const [feedback, setFeedback] = useState<SessionFeedback>(session.feedback);

//   const toggleTag = (tag: string) => {
//     setFeedback((prev) => ({
//       ...prev,
//       tags: prev.tags.includes(tag)
//         ? prev.tags.filter((t) => t !== tag)
//         : [...prev.tags, tag],
//     }));
//   };

//   const handleSubmit = () => {
//     onFeedbackSubmit(session.id, feedback);
//   };

//   if (!session.completed) {
//     return (
//       <Card className="border border-border opacity-50">
//         <CardContent className="p-6 text-center">
//           <CardTitle className="mb-4">{session.title}</CardTitle>
//           <p className="text-muted-foreground">
//             Feedback available after session completion
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="border border-border">
//       <CardContent className="p-6 space-y-6">
//         <CardTitle className="text-center">{session.title}</CardTitle>

//         <div className="text-center">
//           <p className="text-lg mb-4">How was the session?</p>
//           <StarRating
//             rating={feedback.rating}
//             onRatingChange={(rating) =>
//               setFeedback((prev) => ({ ...prev, rating }))
//             }
//           />
//         </div>

//         {feedback.rating > 0 && (
//           <div className="space-y-4">
//             <div className="flex flex-wrap gap-2 justify-center">
//               {predefinedTags.map((tag) => (
//                 <Badge
//                   key={tag}
//                   variant={feedback.tags.includes(tag) ? 'default' : 'outline'}
//                   className="cursor-pointer hover:scale-105 transition-transform"
//                   onClick={() => toggleTag(tag)}
//                 >
//                   {tag}
//                 </Badge>
//               ))}
//             </div>

//             <Textarea
//               placeholder="Add comment"
//               value={feedback.comment}
//               onChange={(e) =>
//                 setFeedback((prev) => ({ ...prev, comment: e.target.value }))
//               }
//               className="min-h-[80px]"
//             />
//           </div>
//         )}

//         <Button
//           onClick={handleSubmit}
//           className="w-full"
//           disabled={feedback.rating === 0}
//         >
//           Submit
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

export default function SessionPage() {
  const params = useParams();
  const eventId = params.id as string;
  const events = useEvents();
  const askQuestion = useCreateQuestion();

  const removeQuestionMutation = useDeleteQuestion();

  // Find the event by ID
  const event = events?.find((e) => e._id === eventId);

  // Convert event sessions to SessionData format and add open state
  // const [sessions, setSessions] = useState(
  //   event?.sessions?.map((session) => ({
  //     ...session,
  //     open: session.isActive, // Add open state for collapsible
  //   })) || []
  // );

  const [openSessions, setOpenSessions] = useState<Id<'sessions'>[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isHandRaised, setIsHandRaised] = useState(false);

  useEffect(() => {
    if (!event) return;

    setOpenSessions(
      event.sessions
        .filter((session) => session.isActive)
        .map((session) => session._id)
    );
  }, [event]);

  // Timer effect for active sessions
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     const nowTime = now.getTime();

  //     setSessions((prev) =>
  //       prev.map((session) => {
  //         const isActive =
  //           nowTime >= session.startTime && nowTime < session.endTime;
  //         const completed = nowTime >= session.endTime;

  //         return {
  //           ...session,
  //           isActive,
  //           completed,
  //         };
  //       })
  //     );
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl text-foreground mb-8">Event Not Found</h1>
          <p className="text-lg text-muted-foreground">
            The event you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const toggleSession = (sessionId: Id<'sessions'>) => {
    setOpenSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleAskQuestion = async (sessionId: Id<'sessions'>) => {
    if (!newQuestion.trim()) return;

    await askQuestion({
      sessionId,
      text: newQuestion,
      author: 'you',
    });
    setNewQuestion('');
  };

  const handleRaiseHand = async (sessionId: Id<'sessions'>) => {
    await askQuestion({
      sessionId,
      text: 'You raised your hand.',
      author: 'you',
    });

    setIsHandRaised(!isHandRaised);
  };

  const removeQuestion = async (questionId: Id<'questions'>) => {
    await removeQuestionMutation({ id: questionId });
  };

  // const handleFeedbackSubmit = (
  //   sessionId: number,
  //   feedback: SessionFeedback
  // ) => {
  //   setSessions((prev) =>
  //     prev.map((session) =>
  //       session.id === sessionId ? { ...session, feedback } : session
  //     )
  //   );
  //   console.log(`Session ${sessionId} feedback:`, feedback);
  // };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl text-foreground mb-8">{event.title}</h1>
        <p className="text-lg text-muted-foreground">
          {event.date} • {event.location}
        </p>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {event?.sessions.map((session) => (
          <Collapsible
            key={session._id}
            open={openSessions.includes(session._id)}
            onOpenChange={() => toggleSession(session._id)}
          >
            <div className="border border-border rounded-lg">
              <CollapsibleTrigger className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Checkbox checked={session.completed} disabled />
                  <div className="flex items-center gap-3">
                    <Badge className={`${getSessionTypeColor(session.type)}`}>
                      {getSessionTypeIcon(session.type)}
                      <span className="ml-1 capitalize">{session.type}</span>
                    </Badge>
                    <div>
                      <h3 className="text-xl text-foreground font-semibold">
                        {session.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatTime(new Date(session.startTime))} -{' '}
                          {formatTime(new Date(session.endTime))}
                        </span>
                        <span>
                          (
                          {formatDuration(
                            new Date(session.startTime),
                            new Date(session.endTime)
                          )}
                          )
                        </span>
                        {session.isActive && (
                          <span className="text-green-600 font-medium">
                            • Live Now
                          </span>
                        )}
                        {session.completed && (
                          <span className="text-blue-600 font-medium">
                            • Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`h-6 w-6 transition-transform ${
                    openSessions.includes(session._id) ? 'rotate-180' : ''
                  }`}
                />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="border-t border-border p-6">
                  {session.isActive || session.completed ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Session Info */}
                      <div className="lg:col-span-2 space-y-6">
                        {session.speaker && (
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback>
                                {session.speaker.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">
                                {session.speaker.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {session.speaker.role}
                              </p>
                            </div>
                          </div>
                        )}

                        {session.description && (
                          <p className="text-foreground leading-relaxed">
                            {session.description}
                          </p>
                        )}

                        {session.videoLink && (
                          <div className="space-y-2">
                            <h4 className="text-lg font-medium">
                              Watch Online
                            </h4>
                            <Button
                              onClick={() =>
                                window.open(session.videoLink, '_blank')
                              }
                              className="flex items-center gap-2"
                            >
                              <Play className="h-4 w-4" />
                              Join Stream
                            </Button>
                          </div>
                        )}

                        {/* Question Input - Only for talk sessions */}
                        {session.type === 'talk' &&
                          (session.isActive || session.completed) && (
                            <div className="space-y-4">
                              <h4 className="text-xl text-foreground">
                                Ask a Question
                              </h4>
                              <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                  <Input
                                    placeholder="Type your question"
                                    value={newQuestion}
                                    onChange={(e) =>
                                      setNewQuestion(e.target.value)
                                    }
                                    onKeyPress={(e) =>
                                      e.key === 'Enter' &&
                                      handleAskQuestion(session._id)
                                    }
                                    className="min-h-[60px] text-lg"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() =>
                                      handleAskQuestion(session._id)
                                    }
                                    disabled={!newQuestion.trim()}
                                    className="px-8 py-4"
                                  >
                                    Ask
                                  </Button>
                                  <HandRaiseIcon
                                    isRaised={isHandRaised}
                                    onClick={() => handleRaiseHand(session._id)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                      </div>

                      {/* Questions Panel - Only for talk sessions */}
                      {session.type === 'talk' && (
                        <div className="space-y-4">
                          <h4 className="text-xl text-foreground">Questions</h4>
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {session.questions.length === 0 ? (
                              <p className="text-muted-foreground text-center py-4">
                                No questions yet. Be the first to ask!
                              </p>
                            ) : (
                              session.questions.map((question, index) => (
                                <div
                                  key={question._id}
                                  className="flex items-start justify-between gap-2 p-3 rounded border"
                                >
                                  <div className="flex-1">
                                    <span className="text-sm">
                                      {index + 1}. {question.text || ''} -{' '}
                                      {question.author}
                                    </span>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {new Date(
                                        question._creationTime
                                      ).toLocaleTimeString()}
                                    </div>
                                  </div>
                                  <div className="flex gap-1">
                                    {question.author === 'you' && (
                                      <>
                                        <button
                                          onClick={() =>
                                            removeQuestion(question._id)
                                          }
                                          className="text-muted-foreground hover:text-foreground p-1"
                                        >
                                          <CheckSquare className="h-4 w-4" />
                                        </button>
                                        <button
                                          onClick={() =>
                                            removeQuestion(question._id)
                                          }
                                          className="text-muted-foreground hover:text-destructive p-1"
                                        >
                                          <X className="h-4 w-4" />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Session content will be available when started.
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>

      {/* Feedback Section - Only for completed sessions */}
      {/* <div className="space-y-6">
        <h2 className="text-3xl text-center text-foreground">
          Session Feedback
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions
            .filter((session) => session.completed)
            .map((session) => (
              <SessionFeedbackCard
                key={`feedback-${session.id}`}
                session={session}
                onFeedbackSubmit={handleFeedbackSubmit}
              />
            ))}
        </div>
      </div> */}
    </div>
  );
}
