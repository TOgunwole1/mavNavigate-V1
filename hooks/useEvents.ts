import { useEffect, useState } from 'react';

export interface Event {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  time: string;
  price: string;
  rating?: number;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://events.uta.edu/api/2/events?days=30');
      const data = await response.json();
      
      const formattedEvents: Event[] = data.events.map((item: any) => {
        const e = item.event;
        const instance = e.event_instances?.[0]?.event_instance;
        const startDate = instance?.start ? new Date(instance.start) : new Date();
        
        return {
          id: e.id,
          title: e.title,
          subtitle: e.location_name || 'UTA Campus',
          image: e.photo_url || 'https://www.uta.edu/_nuxt/img/uta-logo.3c7c3e0.png', // Fallback image
          description: e.description_text || 'No description available.',
          time: startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: e.ticket_cost || 'Free',
          rating: 4.5 // Default rating as API doesn't provide it
        };
      });

      // Deduplicate events based on ID to prevent key collision errors
      const uniqueEvents = formattedEvents.filter((event, index, self) =>
        index === self.findIndex((t) => t.id === event.id)
      );

      setEvents(uniqueEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  return { events, loading, error };
}
