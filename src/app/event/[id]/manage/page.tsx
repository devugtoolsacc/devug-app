'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronDown,
  Play,
  Pause,
  Square,
  Clock,
  Mic,
  Coffee,
  Megaphone,
  Users,
  Calendar,
  MapPin,
  Video,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEvent, useUpdateEvent, useUpdateSession } from '@/data/data';
import { Id } from '../../../../../convex/_generated/dataModel';

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

function getSessionStatus({
  startTime,
  endTime,
  completed,
  isActive,
}: {
  startTime: Date;
  endTime: Date;
  completed: boolean;
  isActive: boolean;
}) {
  const now = new Date().getTime();

  if (completed) {
    return {
      status: 'completed',
      label: 'Completed',
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'text-green-600',
    };
  } else if (isActive) {
    return {
      status: 'active',
      label: 'Live Now',
      icon: <Play className="h-4 w-4" />,
      color: 'text-red-600',
    };
  } else if (now >= startTime.getTime() && now < endTime.getTime()) {
    return {
      status: 'should-be-active',
      label: 'Should be active',
      icon: <AlertCircle className="h-4 w-4" />,
      color: 'text-yellow-600',
    };
  } else if (now < startTime.getTime()) {
    return {
      status: 'upcoming',
      label: 'Upcoming',
      icon: <Clock className="h-4 w-4" />,
      color: 'text-blue-600',
    };
  } else {
    return {
      status: 'missed',
      label: 'Missed',
      icon: <XCircle className="h-4 w-4" />,
      color: 'text-gray-600',
    };
  }
}

export default function ManageEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const event = useEvent(eventId);
  const updateEvent = useUpdateEvent();
  const updateSession = useUpdateSession();

  const [openSessions, setOpenSessions] = useState<Id<'sessions'>[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!event) return;

    // Open active sessions by default
    setOpenSessions(
      event.sessions
        .filter((session) => session.isActive || session.completed)
        .map((session) => session._id)
    );
  }, [event]);

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

  const handleStartEvent = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      await updateEvent({
        _id: event._id,
        isLive: true,
      });
    } catch (error) {
      console.error('Error starting event:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStopEvent = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      await updateEvent({
        _id: event._id,
        isLive: false,
      });
    } catch (error) {
      console.error('Error stopping event:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStartSession = async (sessionId: Id<'sessions'>) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      await updateSession({
        id: sessionId,
        isActive: true,
      });
    } catch (error) {
      console.error('Error starting session:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEndSession = async (sessionId: Id<'sessions'>) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      await updateSession({
        id: sessionId,
        isActive: false,
        completed: true,
      });
    } catch (error) {
      console.error('Error ending session:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const activeSession = event.sessions.find((session) => session.isActive);
  const completedSessions = event.sessions.filter(
    (session) => session.completed
  );
  const upcomingSessions = event.sessions.filter(
    (session) => !session.completed && !session.isActive
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              {event.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              Event Management Dashboard
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push(`/event/${eventId}/session`)}
          >
            <Video className="h-4 w-4 mr-2" />
            View Event
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {event.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {event.time}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {event.attendeeCount}/{event.maxAttendees} attendees
          </div>
        </div>
      </div>

      {/* Event Status Card */}
      <Card
        className={`border-2 ${event.isLive ? 'border-red-200 bg-red-50/30' : 'border-border'}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Event Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${event.isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}
              ></div>
              <span className="font-medium">
                {event.isLive ? 'Event is Live' : 'Event is Not Live'}
              </span>
            </div>
            <div className="flex gap-2">
              {!event.isLive ? (
                <Button
                  onClick={handleStartEvent}
                  disabled={isUpdating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Event
                </Button>
              ) : (
                <Button
                  onClick={handleStopEvent}
                  disabled={isUpdating}
                  variant="destructive"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop Event
                </Button>
              )}
            </div>
          </div>

          {activeSession && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">
                  Active Session
                </span>
              </div>
              <p className="text-sm text-yellow-700">
                &quot;{activeSession.title}&quot; is currently running
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sessions Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Sessions Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sessions List */}
          <div className="space-y-4">
            {event.sessions.map((session, index) => {
              const sessionStatus = getSessionStatus({
                startTime: new Date(session.startTime),
                endTime: new Date(session.endTime),
                completed: session.completed,
                isActive: session.isActive,
              });
              const isActive = session.isActive;
              const isCompleted = session.completed;

              return (
                <Collapsible
                  key={session._id}
                  open={openSessions.includes(session._id)}
                  onOpenChange={() => toggleSession(session._id)}
                >
                  <div
                    className={`border border-border rounded-lg ${isActive ? 'border-red-200 bg-red-50/30' : ''}`}
                  >
                    <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${getSessionTypeColor(session.type)}`}
                          >
                            {getSessionTypeIcon(session.type)}
                            <span className="ml-1 capitalize">
                              {session.type}
                            </span>
                          </Badge>
                          <div className="flex items-center gap-2">
                            {sessionStatus.icon}
                            <span
                              className={`text-sm font-medium ${sessionStatus.color}`}
                            >
                              {sessionStatus.label}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg text-foreground font-semibold">
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
                              {session.speaker && (
                                <span>by {session.speaker.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openSessions.includes(session._id) ? 'rotate-180' : ''
                        }`}
                      />
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="border-t border-border p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Session Info */}
                          <div className="lg:col-span-2 space-y-4">
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
                                  Video Link
                                </h4>
                                <Button
                                  onClick={() =>
                                    window.open(session.videoLink, '_blank')
                                  }
                                  className="flex items-center gap-2"
                                  variant="outline"
                                >
                                  <Video className="h-4 w-4" />
                                  Open Stream
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Session Controls */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium">
                              Session Controls
                            </h4>

                            <div className="space-y-3">
                              {!isCompleted && !isActive && (
                                <Button
                                  onClick={() =>
                                    handleStartSession(session._id)
                                  }
                                  disabled={isUpdating}
                                  className="w-full bg-green-600 hover:bg-green-700"
                                >
                                  <Play className="h-4 w-4 mr-2" />
                                  Start Session
                                </Button>
                              )}

                              {isActive && (
                                <Button
                                  onClick={() => handleEndSession(session._id)}
                                  disabled={isUpdating}
                                  variant="destructive"
                                  className="w-full"
                                >
                                  <Square className="h-4 w-4 mr-2" />
                                  End Session
                                </Button>
                              )}

                              {isCompleted && (
                                <div className="flex items-center gap-2 text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    Session Completed
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Session Status */}
                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">Status</h5>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Active:</span>
                                  <span
                                    className={
                                      isActive
                                        ? 'text-green-600'
                                        : 'text-gray-500'
                                    }
                                  >
                                    {isActive ? 'Yes' : 'No'}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span>Completed:</span>
                                  <span
                                    className={
                                      isCompleted
                                        ? 'text-green-600'
                                        : 'text-gray-500'
                                    }
                                  >
                                    {isCompleted ? 'Yes' : 'No'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>

          {/* Session Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Upcoming</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {upcomingSessions.length}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Active</span>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  {activeSession ? 1 : 0}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {completedSessions.length}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
