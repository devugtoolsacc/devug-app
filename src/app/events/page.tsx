'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CalendarDays,
  MapPin,
  Users,
  Settings,
  Video,
  Building,
  Search,
  Filter,
  Grid,
  List,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useEvents } from '@/data/data';

export default function EventsPage() {
  const events = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter events based on search and filters
  const filteredEvents = events?.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesTypeFilter =
      filterType === 'all' ||
      (filterType === 'free' && event.price === 'free') ||
      (filterType === 'paid' && event.price !== 'free') ||
      (filterType === 'online' && event.hasOnline) ||
      (filterType === 'in-person' && event.hasInPerson) ||
      (filterType === 'live' && event.isLive);

    const matchesCategoryFilter =
      filterCategory === 'all' || event.category === filterCategory;

    return matchesSearch && matchesTypeFilter && matchesCategoryFilter;
  });

  // Separate live events
  const liveEvents = filteredEvents?.filter((event) => event.isLive);
  const upcomingEvents = filteredEvents?.filter((event) => !event.isLive);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Events</h1>
        <p className="text-lg text-muted-foreground">
          Discover upcoming tech events, workshops, and meetups in the developer
          community.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events, tags, or speakers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="live">Live Now</SelectItem>
              <SelectItem value="free">Free Events</SelectItem>
              <SelectItem value="paid">Paid Events</SelectItem>
              <SelectItem value="online">Online Only</SelectItem>
              <SelectItem value="in-person">In Person Only</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="talk">Talks</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
              <SelectItem value="networking">Networking</SelectItem>
              <SelectItem value="hackathon">Hackathons</SelectItem>
              <SelectItem value="conference">Conferences</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredEvents && filteredEvents.length} event
            {filteredEvents && filteredEvents.length !== 1 ? 's' : ''} found
          </p>
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
                key={event.id}
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
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    {event.featuredSessionId
                      ? event.sessions?.find(
                          (s) => s.id === event.featuredSessionId
                        )?.title || event.title
                      : event.title}
                  </CardTitle>
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
                  <Button className="w-full" size="sm" variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    Join Live Stream
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events Section */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Upcoming Events
          </h2>

          {/* Events Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents?.map((event) => (
                <Card
                  key={event.id}
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
                                (s) => s.id === event.featuredSessionId
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
                      <Link href={`/event/${event.id}/details`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingEvents?.map((event) => (
                <Card
                  key={event.id}
                  className="border border-border cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {event.category}
                            </Badge>
                            <CardTitle className="text-xl text-foreground">
                              {event.featuredSessionId
                                ? event.sessions?.find(
                                    (s) => s.id === event.featuredSessionId
                                  )?.title || event.title
                                : event.title}
                            </CardTitle>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-foreground leading-normal">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
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

                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <div className="text-base font-medium text-foreground">
                            {event.price}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {event.hasInPerson && (
                            <Button variant="outline" size="sm">
                              <Building className="h-3 w-3 mr-1" />
                              In Person
                            </Button>
                          )}
                          {event.hasOnline && (
                            <Button variant="outline" size="sm">
                              <Video className="h-3 w-3 mr-1" />
                              Online
                            </Button>
                          )}
                        </div>

                        <Button asChild>
                          <Link href={`/event/${event.id}/details`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {filteredEvents && filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="text-6xl">🔍</div>
            <h3 className="text-xl font-semibold text-foreground">
              No events found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
