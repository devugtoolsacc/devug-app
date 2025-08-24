'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  MapPin,
  Users,
  Settings,
  Video,
  Building,
  Clock,
} from 'lucide-react';

import { api } from '../../convex/_generated/api';
import { useQuery } from 'convex/react';

export default function Home() {
  const events = useQuery(api.events.getAll);

  console.log({ events });

  // Get live events
  const liveEvents = events?.filter((event) => event.isLive);
  const upcomingEvents = events?.filter((event) => !event.isLive).slice(0, 3);

  // Get upcoming events (first 3 non-live events)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            Welcome to <span className="text-primary">DevUG</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A vibrant community of developers sharing knowledge, exploring new
            technologies, and building connections. Join us for tech talks,
            workshops, and networking events.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#about">Learn More</Link>
          </Button>
        </div>
      </div>

      {/* Live Events Section */}
      {liveEvents && liveEvents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-medium text-foreground">Live Now</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveEvents?.map((event) => (
              <Card
                key={event._id}
                className="border border-red-200/50 bg-red-50/30 dark:bg-red-950/10 hover:shadow-md transition-shadow"
              >
                <CardHeader className="space-y-2 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      >
                        LIVE
                      </Badge>
                      <CardTitle className="text-lg text-foreground">
                        {event.featuredSessionId
                          ? event.sessions?.find(
                              (s) => s._id === event.featuredSessionId
                            )?.title || event.title
                          : event.title}
                      </CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground leading-normal">
                    {event.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {event.attendeeCount} watching
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Video className="h-4 w-4" />
                      Online
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {event.price}
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    className="w-full"
                    size="sm"
                    variant="outline"
                    asChild
                  >
                    <Link href={`/event/${event._id}/session`}>
                      <Video className="h-4 w-4 mr-2" />
                      Join Event
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            Upcoming Events
          </h2>
          <Button variant="link" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>

        <div className="text-xl text-foreground mb-4 flex items-center gap-2">
          <CalendarDays /> Next Events
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents &&
            upcomingEvents.map((event) => (
              <Card
                key={event._id}
                className="border border-border cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                      <CardTitle className="text-xl text-foreground">
                        {event.featuredSessionId
                          ? event.sessions?.find(
                              (s) => s._id === event.featuredSessionId
                            )?.title || event.title
                          : event.title}
                      </CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground leading-normal">
                    {event.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {event.attendeeCount}/{event.maxAttendees} attendees
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {event.time}
                  </div>

                  <div className="text-base text-muted-foreground">
                    {event.price}
                  </div>

                  <div className="flex gap-2">
                    {event.hasInPerson && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Building className="h-3 w-3 mr-1" />
                        In Person
                      </Button>
                    )}
                    {event.hasOnline && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Video className="h-3 w-3 mr-1" />
                        Online
                      </Button>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/event/${event._id}/details`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">About DevUG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              DevUG brings together developers from all backgrounds to share
              knowledge, explore cutting-edge technologies, and build meaningful
              connections. Whether you&apos;re a seasoned professional or just
              starting your journey, there&apos;s a place for you in our
              community.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-foreground">What We Do</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Tech talks and presentations
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Hands-on workshops
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Networking events
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Code reviews and discussions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
