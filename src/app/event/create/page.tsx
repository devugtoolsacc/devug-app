'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ChevronDown,
  Plus,
  Clock,
  MapPin,
  Users,
  Calendar,
  Video,
  Building,
  Mic,
  Coffee,
  Megaphone,
  X,
  Trash2,
} from 'lucide-react';
import { useCreateEvent, useCreateSession } from '@/data/data';
import { useRouter } from 'next/navigation';

interface Session {
  id: string;
  title: string;
  type: 'talk' | 'break' | 'announcement';
  startTime: string;
  endTime: string;
  speaker?: {
    name: string;
    avatar: string;
    role: string;
  };
  description?: string;
  videoLink?: string;
}

interface Speaker {
  name: string;
  role: string;
  company?: string;
}

export default function CreateEventPage() {
  const router = useRouter();
  const createEvent = useCreateEvent();
  const createSession = useCreateSession();

  // Event form state
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    attendeeCount: 0,
    maxAttendees: 100,
    price: 'Free',
    hasInPerson: true,
    hasOnline: false,
    isLive: false,
    tags: [] as string[],
    category: 'talk',
    speakers: [] as Speaker[],
  });

  // Sessions state
  const [sessions, setSessions] = useState<Session[]>([]);
  const [openSessions, setOpenSessions] = useState<string[]>([]);

  // Dialog states
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [isSpeakerDialogOpen, setIsSpeakerDialogOpen] = useState(false);

  // New session form state
  const [newSession, setNewSession] = useState<Session>({
    id: '',
    title: '',
    type: 'talk',
    startTime: '',
    endTime: '',
    speaker: undefined,
    description: '',
    videoLink: '',
  });

  // New speaker form state
  const [newSpeaker, setNewSpeaker] = useState<Speaker>({
    name: '',
    role: '',
    company: '',
  });

  // Tag input state
  const [tagInput, setTagInput] = useState('');

  const getSessionTypeIcon = (type: string) => {
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
  };

  const getSessionTypeColor = (type: string) => {
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
  };

  const toggleSession = (sessionId: string) => {
    setOpenSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const addTag = () => {
    if (tagInput.trim() && !eventData.tags.includes(tagInput.trim())) {
      setEventData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEventData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addSpeaker = () => {
    if (newSpeaker.name.trim() && newSpeaker.role.trim()) {
      setEventData((prev) => ({
        ...prev,
        speakers: [...prev.speakers, { ...newSpeaker }],
      }));
      setNewSpeaker({ name: '', role: '', company: '' });
      setIsSpeakerDialogOpen(false);
    }
  };

  const removeSpeaker = (index: number) => {
    setEventData((prev) => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index),
    }));
  };

  const addSession = () => {
    if (newSession.title.trim() && newSession.startTime && newSession.endTime) {
      const sessionWithId = {
        ...newSession,
        id: Date.now().toString(),
      };
      setSessions((prev) => [...prev, sessionWithId]);
      setOpenSessions((prev) => [...prev, sessionWithId.id]);
      setNewSession({
        id: '',
        title: '',
        type: 'talk',
        startTime: '',
        endTime: '',
        speaker: undefined,
        description: '',
        videoLink: '',
      });
      setIsSessionDialogOpen(false);
    }
  };

  const removeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    setOpenSessions((prev) => prev.filter((id) => id !== sessionId));
  };

  const handleSubmit = async () => {
    try {
      // Create the event first
      const eventId = await createEvent({
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
        attendeeCount: eventData.attendeeCount,
        maxAttendees: eventData.maxAttendees,
        price: eventData.price,
        speakers: eventData.speakers,
        hasInPerson: eventData.hasInPerson,
        hasOnline: eventData.hasOnline,
        isLive: eventData.isLive,
        tags: eventData.tags,
        category: eventData.category,
      });

      // Create sessions for the event
      for (const session of sessions) {
        await createSession({
          eventId,
          title: session.title,
          type: session.type,
          startTime: new Date(session.startTime).getTime(),
          endTime: new Date(session.endTime).getTime(),
          completed: false,
          isActive: false,
          speaker: session.speaker,
          description: session.description,
          videoLink: session.videoLink,
        });
      }

      // Redirect to the events page
      router.push('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Create Event</h1>
        <p className="text-lg text-muted-foreground">
          Set up your event details and schedule sessions for the day.
        </p>
      </div>

      {/* Event Details Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Event Title</label>
                <Input
                  placeholder="Enter event title"
                  value={eventData.title}
                  onChange={(e) =>
                    setEventData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={eventData.category}
                  onValueChange={(value) =>
                    setEventData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="talk">Talks</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="hackathon">Hackathons</SelectItem>
                    <SelectItem value="conference">Conferences</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={eventData.date}
                  onChange={(e) =>
                    setEventData((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={eventData.time}
                  onChange={(e) =>
                    setEventData((prev) => ({ ...prev, time: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="Enter location"
                  value={eventData.location}
                  onChange={(e) =>
                    setEventData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Price</label>
                <Select
                  value={eventData.price}
                  onValueChange={(value) =>
                    setEventData((prev) => ({ ...prev, price: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="$10">$10</SelectItem>
                    <SelectItem value="$25">$25</SelectItem>
                    <SelectItem value="$50">$50</SelectItem>
                    <SelectItem value="$100">$100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Max Attendees</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={eventData.maxAttendees}
                  onChange={(e) =>
                    setEventData((prev) => ({
                      ...prev,
                      maxAttendees: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>

              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inPerson"
                    checked={eventData.hasInPerson}
                    onCheckedChange={(checked) =>
                      setEventData((prev) => ({
                        ...prev,
                        hasInPerson: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor="inPerson" className="text-sm">
                    In Person
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="online"
                    checked={eventData.hasOnline}
                    onCheckedChange={(checked) =>
                      setEventData((prev) => ({
                        ...prev,
                        hasOnline: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor="online" className="text-sm">
                    Online
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Describe your event..."
              value={eventData.description}
              onChange={(e) =>
                setEventData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1"
              />
              <Button onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {eventData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Speakers Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Speakers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Add speakers for your event
            </p>
            <Dialog
              open={isSpeakerDialogOpen}
              onOpenChange={setIsSpeakerDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Speaker
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Speaker</DialogTitle>
                  <DialogDescription>
                    Add a new speaker to your event.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      placeholder="Speaker name"
                      value={newSpeaker.name}
                      onChange={(e) =>
                        setNewSpeaker((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Input
                      placeholder="Speaker role"
                      value={newSpeaker.role}
                      onChange={(e) =>
                        setNewSpeaker((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Company (Optional)
                    </label>
                    <Input
                      placeholder="Company name"
                      value={newSpeaker.company}
                      onChange={(e) =>
                        setNewSpeaker((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsSpeakerDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={addSpeaker}>Add Speaker</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {eventData.speakers.length > 0 ? (
            <div className="space-y-2">
              {eventData.speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{speaker.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {speaker.role}
                      {speaker.company && ` at ${speaker.company}`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpeaker(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No speakers added yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Sessions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Event Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Schedule sessions for your event day
            </p>
            <Dialog
              open={isSessionDialogOpen}
              onOpenChange={setIsSessionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Session
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Session</DialogTitle>
                  <DialogDescription>
                    Add a new session to your event schedule.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">
                        Session Title
                      </label>
                      <Input
                        placeholder="Session title"
                        value={newSession.title}
                        onChange={(e) =>
                          setNewSession((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Select
                        value={newSession.type}
                        onValueChange={(
                          value: 'talk' | 'break' | 'announcement'
                        ) =>
                          setNewSession((prev) => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="talk">Talk</SelectItem>
                          <SelectItem value="break">Break</SelectItem>
                          <SelectItem value="announcement">
                            Announcement
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Start Time</label>
                      <Input
                        type="datetime-local"
                        value={newSession.startTime}
                        onChange={(e) =>
                          setNewSession((prev) => ({
                            ...prev,
                            startTime: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">End Time</label>
                      <Input
                        type="datetime-local"
                        value={newSession.endTime}
                        onChange={(e) =>
                          setNewSession((prev) => ({
                            ...prev,
                            endTime: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {newSession.type === 'talk' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium">
                            Speaker Name
                          </label>
                          <Input
                            placeholder="Speaker name"
                            value={newSession.speaker?.name || ''}
                            onChange={(e) =>
                              setNewSession((prev) => ({
                                ...prev,
                                speaker: {
                                  ...prev.speaker,
                                  name: e.target.value,
                                  avatar: prev.speaker?.avatar || '',
                                  role: prev.speaker?.role || '',
                                },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Speaker Role
                          </label>
                          <Input
                            placeholder="Speaker role"
                            value={newSession.speaker?.role || ''}
                            onChange={(e) =>
                              setNewSession((prev) => ({
                                ...prev,
                                speaker: {
                                  ...prev.speaker,
                                  role: e.target.value,
                                  name: prev.speaker?.name || '',
                                  avatar: prev.speaker?.avatar || '',
                                },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Avatar</label>
                          <Input
                            placeholder="Avatar initials"
                            value={newSession.speaker?.avatar || ''}
                            onChange={(e) =>
                              setNewSession((prev) => ({
                                ...prev,
                                speaker: {
                                  ...prev.speaker,
                                  avatar: e.target.value,
                                  name: prev.speaker?.name || '',
                                  role: prev.speaker?.role || '',
                                },
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          placeholder="Session description"
                          value={newSession.description}
                          onChange={(e) =>
                            setNewSession((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Video Link (Optional)
                        </label>
                        <Input
                          placeholder="https://..."
                          value={newSession.videoLink}
                          onChange={(e) =>
                            setNewSession((prev) => ({
                              ...prev,
                              videoLink: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsSessionDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={addSession}>Add Session</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Sessions List */}
          {sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((session) => (
                <Collapsible
                  key={session.id}
                  open={openSessions.includes(session.id)}
                  onOpenChange={() => toggleSession(session.id)}
                >
                  <div className="border border-border rounded-lg">
                    <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${getSessionTypeColor(session.type)}`}
                          >
                            {getSessionTypeIcon(session.type)}
                            <span className="ml-1 capitalize">
                              {session.type}
                            </span>
                          </Badge>
                          <div>
                            <h3 className="text-lg text-foreground font-semibold">
                              {session.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {new Date(
                                  session.startTime
                                ).toLocaleTimeString()}{' '}
                                -{' '}
                                {new Date(session.endTime).toLocaleTimeString()}
                              </span>
                              {session.speaker && (
                                <span>by {session.speaker.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSession(session.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            openSessions.includes(session.id)
                              ? 'rotate-180'
                              : ''
                          }`}
                        />
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="border-t border-border p-4">
                        {session.description && (
                          <p className="text-foreground mb-4">
                            {session.description}
                          </p>
                        )}
                        {session.speaker && (
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              {session.speaker.avatar ||
                                session.speaker.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">
                                {session.speaker.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {session.speaker.role}
                              </p>
                            </div>
                          </div>
                        )}
                        {session.videoLink && (
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            <a
                              href={session.videoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              View Video Link
                            </a>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No sessions added yet. Add your first session to get started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Create Event
        </Button>
      </div>
    </div>
  );
}
