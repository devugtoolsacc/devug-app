'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  Share2,
  Bookmark,
  Video,
  User,
  Building,
} from 'lucide-react';
import { useEvent } from '@/data/data';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function EventDetailsPage() {
  const params = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const event = useEvent(params.id as string);

  // Find the event by ID (in a real app, this would be a database query)

  // Check if event is today or live
  const isEventToday = () => {
    if (event?.isLive) return true;

    const today = new Date();
    const eventDate = new Date(event?.date || '');

    // Simple date comparison (you might want to use a date library like date-fns for more robust comparison)
    return today.toDateString() === eventDate.toDateString();
  };

  const isEventLive = event?.isLive;
  // const isToday = isEventToday();
  const canJoin = isEventLive;

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title || '',
        text: event?.description || '',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Events</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{event?.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="h-8 w-8 p-0"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={`h-8 w-8 p-0 ${isBookmarked ? 'text-primary' : ''}`}
              >
                <Bookmark
                  className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {event?.price === 'free' ? 'Free Event' : 'Paid Event'}
                </Badge>
                {event?.hasInPerson && event?.hasOnline && (
                  <Badge variant="outline" className="text-xs">
                    Hybrid
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-foreground leading-tight">
                {event?.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {event?.description}
              </p>
            </div>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        {event?.date}
                      </p>
                      <p className="text-sm text-muted-foreground">Date</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        19:00 - 21:00
                      </p>
                      <p className="text-sm text-muted-foreground">Time</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        {event?.location}
                      </p>
                      <p className="text-sm text-muted-foreground">Location</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        {event?.attendeeCount} attendees
                      </p>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Speakers Section */}
            {event?.speakers && event?.speakers?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Speakers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event?.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg border border-border"
                      >
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {speaker.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {speaker.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-foreground">
                  <p className="text-muted-foreground leading-relaxed">
                    Join us for an exciting evening of learning and networking.
                    This event brings together developers, designers, and tech
                    enthusiasts to share knowledge and build connections.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Whether you&apos;re a seasoned professional or just starting
                    your journey in tech, there&apos;s something for everyone at
                    this event. Don&apos;t miss out on this opportunity to
                    expand your skills and network with like-minded individuals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl">
                  {canJoin ? 'Join Session' : 'Register'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {event?.price}
                  </p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>

                {canJoin ? (
                  // Show Join Session buttons when event is live or today
                  <div className="space-y-3">
                    {isEventLive && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        >
                          LIVE NOW
                        </Badge>
                      </div>
                    )}

                    {event?.hasInPerson && (
                      <Button className="w-full" size="lg" asChild>
                        <Link href={`/event/${event?._id}/session`}>
                          <Building className="h-4 w-4 mr-2" />
                          Join In Person
                        </Link>
                      </Button>
                    )}

                    {event?.hasOnline && (
                      <Button
                        variant={isEventLive ? 'destructive' : 'default'}
                        className="w-full"
                        size="lg"
                        asChild
                      >
                        <Link href={`/event/${event?._id}/session`}>
                          <Video className="h-4 w-4 mr-2" />
                          {isEventLive ? 'Join Live Stream' : 'Join Online'}
                        </Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  // Show RSVP buttons for future events
                  <div className="space-y-3">
                    {event?.hasInPerson && (
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setIsRSVPed(true)}
                        disabled={isRSVPed}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        {isRSVPed ? 'RSVP Confirmed' : 'RSVP In Person'}
                      </Button>
                    )}

                    {event?.hasOnline && (
                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                        onClick={() => setIsRSVPed(true)}
                        disabled={isRSVPed}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {isRSVPed ? 'RSVP Confirmed' : 'RSVP Online'}
                      </Button>
                    )}
                  </div>
                )}

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {event?.attendeeCount} people attending
                  </p>
                  {canJoin && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Session will start at {event?.time}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Event Organizer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Organized by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">
                      D
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">DevUG</p>
                    <p className="text-sm text-muted-foreground">
                      Developer User Group
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Event Website
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
