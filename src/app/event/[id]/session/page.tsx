'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { ChevronDown, Star, Hand, CheckSquare, X } from 'lucide-react';

interface SessionFeedback {
  rating: number;
  tags: string[];
  comment: string;
}

interface Question {
  id: number;
  text: string;
  author: string;
  isHandRaise?: boolean;
}

interface SessionData {
  id: number;
  name: string;
  completed: boolean;
  isActive: boolean;
  timeRemaining: number; // in seconds
  open: boolean;
}

const predefinedTags = [
  'Interesting topic',
  'Nice talk',
  'Great presentation',
  'Clear explanation',
  'Engaging',
];

function Timer({ timeRemaining }: { timeRemaining: number }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <span>
      {minutes} Minute{minutes !== 1 ? 's' : ''}{' '}
      {seconds > 0 ? `${seconds}s` : ''} Remaining
    </span>
  );
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

function SessionFeedbackCard({
  sessionName,
  sessionNumber,
  isEnabled,
}: {
  sessionName: string;
  sessionNumber: number;
  isEnabled: boolean;
}) {
  const [feedback, setFeedback] = useState<SessionFeedback>({
    rating: 0,
    tags: [],
    comment: '',
  });

  const toggleTag = (tag: string) => {
    setFeedback((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = () => {
    console.log(`Session ${sessionNumber} feedback:`, feedback);
    // Here you would typically submit to backend
  };

  if (!isEnabled) {
    return (
      <Card className="border border-border opacity-50">
        <CardContent className="p-6 text-center">
          <CardTitle className="mb-4">{sessionName}</CardTitle>
          <p className="text-muted-foreground">
            Feedback available after session completion
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border">
      <CardContent className="p-6 space-y-6">
        <CardTitle className="text-center">{sessionName}</CardTitle>

        <div className="text-center">
          <p className="text-lg mb-4">How was the session?</p>
          <StarRating
            rating={feedback.rating}
            onRatingChange={(rating) =>
              setFeedback((prev) => ({ ...prev, rating }))
            }
          />
        </div>

        {feedback.rating > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {predefinedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={feedback.tags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <Textarea
              placeholder="Add comment"
              value={feedback.comment}
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, comment: e.target.value }))
              }
              className="min-h-[80px]"
            />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={feedback.rating === 0}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SessionPage() {
  const [sessions, setSessions] = useState<SessionData[]>([
    {
      id: 1,
      name: 'Welcome',
      completed: true,
      isActive: false,
      timeRemaining: 0,
      open: false,
    },
    {
      id: 2,
      name: 'Session 1',
      completed: false,
      isActive: true,
      timeRemaining: 120,
      open: true,
    }, // 2 minutes
    {
      id: 3,
      name: 'Session 2',
      completed: false,
      isActive: false,
      timeRemaining: 900,
      open: false,
    }, // 15 minutes
  ]);

  const [openSessions, setOpenSessions] = useState<number[]>([2]); // Session 1 open by default
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: 'Where do you work?', author: 'Nathi' },
    { id: 2, text: 'Thabiso raise hand.', author: 'System', isHandRaise: true },
    { id: 3, text: 'Does those even work?', author: 'you' },
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isHandRaised, setIsHandRaised] = useState(false);

  // Timer effect for active sessions
  useEffect(() => {
    const interval = setInterval(() => {
      setSessions((prev) =>
        prev.map((session) => {
          if (session.isActive && session.timeRemaining > 0) {
            const newTimeRemaining = session.timeRemaining - 1;
            return {
              ...session,
              timeRemaining: newTimeRemaining,
              completed: newTimeRemaining === 0,
              isActive: newTimeRemaining > 0,
            };
          }
          return session;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleSession = (sessionId: number) => {
    setOpenSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleAskQuestion = () => {
    if (newQuestion.trim()) {
      const newQ: Question = {
        id: Date.now(),
        text: newQuestion,
        author: 'you',
      };
      setQuestions((prev) => [...prev, newQ]);
      setNewQuestion('');
    }
  };

  const handleRaiseHand = () => {
    if (!isHandRaised) {
      const handRaiseQ: Question = {
        id: Date.now(),
        text: 'You raised your hand.',
        author: 'System',
        isHandRaise: true,
      };
      setQuestions((prev) => [...prev, handRaiseQ]);
    } else {
      setQuestions((prev) =>
        prev.filter((q) => !(q.isHandRaise && q.author === 'System'))
      );
    }
    setIsHandRaised(!isHandRaised);
  };

  const removeQuestion = (questionId: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    if (questions.find((q) => q.id === questionId)?.isHandRaise) {
      setIsHandRaised(false);
    }
  };

  const activeSession = sessions.find((s) => s.isActive);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl text-foreground mb-8">Event 1</h1>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <Collapsible
            key={session.id}
            open={openSessions.includes(session.id)}
            onOpenChange={() => toggleSession(session.id)}
          >
            <div className="border border-border">
              <CollapsibleTrigger className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Checkbox checked={session.completed} disabled />
                  <h3 className="text-2xl text-foreground">
                    {session.name}
                    {session.isActive && session.timeRemaining > 0 && (
                      <span className="ml-4 text-2xl">
                        - <Timer timeRemaining={session.timeRemaining} />
                      </span>
                    )}
                    {!session.isActive && !session.completed && (
                      <span className="ml-4 text-2xl text-muted-foreground">
                        - Pending Start
                      </span>
                    )}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-6 w-6 transition-transform ${
                    openSessions.includes(session.id) ? 'rotate-180' : ''
                  }`}
                />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="border-t border-border p-6">
                  {session.isActive ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Speaker Info */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>TM</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Thabiso Magwaza</h4>
                            <p className="text-sm text-muted-foreground">
                              Speaker
                            </p>
                          </div>
                        </div>

                        <p className="text-foreground leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin ut tincidunt urna, eget malesuada dolor.
                          Mauris tincidunt leo
                        </p>

                        {/* Question Input */}
                        <div className="space-y-4">
                          <h4 className="text-2xl text-foreground">Question</h4>
                          <div className="flex gap-4 items-end">
                            <div className="flex-1">
                              <Input
                                placeholder="Type your question"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                onKeyPress={(e) =>
                                  e.key === 'Enter' && handleAskQuestion()
                                }
                                className="min-h-[60px] text-lg"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={handleAskQuestion}
                                disabled={!newQuestion.trim()}
                                className="px-8 py-4"
                              >
                                Ask
                              </Button>
                              <HandRaiseIcon
                                isRaised={isHandRaised}
                                onClick={handleRaiseHand}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Questions Panel */}
                      <div className="space-y-4">
                        <h4 className="text-2xl text-foreground">Questions</h4>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {questions.map((question, index) => (
                            <div
                              key={question.id}
                              className="flex items-start justify-between gap-2 p-2 rounded border"
                            >
                              <div className="flex-1">
                                <span className="text-sm">
                                  {index + 1}. {question.text} -{' '}
                                  {question.author}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                {question.author === 'you' && (
                                  <>
                                    <button
                                      onClick={() =>
                                        removeQuestion(question.id)
                                      }
                                      className="text-muted-foreground hover:text-foreground p-1"
                                    >
                                      <CheckSquare className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        removeQuestion(question.id)
                                      }
                                      className="text-muted-foreground hover:text-destructive p-1"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {session.completed
                        ? 'Session completed.'
                        : 'Session content will be available when started.'}
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>

      {/* Feedback Section */}
      <div className="space-y-6">
        <h2 className="text-3xl text-center text-foreground">Feedback</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <SessionFeedbackCard
              key={`feedback-${session.id}`}
              sessionName={session.name}
              sessionNumber={session.id}
              isEnabled={session.completed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
