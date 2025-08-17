import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarDays, MapPin, Users, Settings } from 'lucide-react';

import { sampleEvents as events } from '@/data/data';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl text-foreground">Welcome to DevUG</h1>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut
          tincidunt urna, eget malesuada dolor. Mauris tincidunt leo
        </p>
      </div>

      {/* Upcoming Events Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-foreground">Upcoming Events</h2>
          <Button variant="link" className="text-muted-foreground">
            see all...
          </Button>
        </div>

        <div className="text-xl text-foreground mb-4 flex items-center gap-2">
          <CalendarDays /> 20 Sept 2025
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card
              key={event.id}
              className="border border-border cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-foreground">
                    Event {index + 1}
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-foreground leading-normal">
                  {event.title}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    attendees ({event.attendeeCount})
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Johannesburg, ZA
                  </div>
                </div>

                <div className="text-base text-muted-foreground">
                  Attend ({event.price})
                </div>

                <div className="flex gap-2">
                  {event.hasInPerson && (
                    <Button variant="outline" className="flex-1">
                      In Person
                    </Button>
                  )}
                  {event.hasOnline && (
                    <Button variant="outline" className="flex-1">
                      Online
                    </Button>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="space-y-2 text-muted-foreground">
          <div className="text-xl flex items-center gap-2">
            <CalendarDays /> 24 Aug 2025
          </div>
        </div>
      </div>
    </div>
  );
}
