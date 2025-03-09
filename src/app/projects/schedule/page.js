"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localTime, setLocalTime] = useState("");
  const [timezone, setTimezone] = useState("");

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/calendar/events");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fetch user's IP and timezone
  useEffect(() => {
    const fetchUserTimezone = async () => {
      try {
        const ipResponse = await fetch("https://ip-api.com/json/");
        const ipData = await ipResponse.json();
        const userTimezone = ipData.timezone;

        setTimezone(userTimezone);

        // Fetch local time using the obtained timezone
        const timeResponse = await fetch(`http://worldtimeapi.org/api/timezone/${userTimezone}`);
        const timeData = await timeResponse.json();

        // Format the time properly
        const date = new Date(timeData.datetime);
        setLocalTime(date.toLocaleTimeString());

        // Update local time every second
        const interval = setInterval(() => {
          setLocalTime(new Date().toLocaleTimeString("en-US", { timeZone: userTimezone }));
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount

      } catch (err) {
        console.error("Error fetching IP/timezone:", err);
        setTimezone("Unknown Timezone");
      }
    };

    fetchUserTimezone();
  }, []);

  if (loading) return <p>Loading calendar...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div>
      {/* Display Local Time */}
      <h2>Current Time in {timezone || "your location"}: {localTime}</h2>

      {/* Calendly Scheduling Widget */}
      <h2>Schedule an Event with Me</h2>
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive" 
      />
      <link 
        href="https://assets.calendly.com/assets/external/widget.css" 
        rel="stylesheet" 
      />
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/sherlockdong2007" 
        style={{ minWidth: "320px", height: "630px" }}
      ></div>
    </div>
  );
};

export default CalendarPage;
