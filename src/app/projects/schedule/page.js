"use client";
import React, { useEffect, useState } from 'react';
import Script from 'next/script';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from your custom API endpoint
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/calendar/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading calendar...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div>
      <h1>Your Calendar Events</h1>
      {events.length ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.summary}</strong> - {event.start.dateTime || event.start.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}

      {/* Google Calendar Embed */}
      <iframe 
        src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=Your_Time_Zone" 
        style={{ border: 0 }} 
        width="800" 
        height="600" 
        frameBorder="0" 
        scrolling="no"
      ></iframe>

      {/* Calendly Scheduling Widget */}
      <h2>Schedule an Event with Me</h2>
      {/* Load Calendly's external widget script */}
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive" 
      />
      {/* Load Calendly's CSS */}
      <link 
        href="https://assets.calendly.com/assets/external/widget.css" 
        rel="stylesheet" 
      />
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/your-username" 
        style={{ minWidth: '320px', height: '630px' }}
      ></div>
    </div>
  );
};

export default CalendarPage;
