// src/app/api/calendar/events/route.js

export async function GET(request) {
    // Dummy data representing calendar events.
    const events = [
      {
        id: "1",
        summary: "Meeting with Bob",
        start: { dateTime: "2025-01-01T10:00:00-05:00" },
        end: { dateTime: "2025-01-01T11:00:00-05:00" }
      },
      {
        id: "2",
        summary: "Lunch with Alice",
        start: { dateTime: "2025-01-01T12:00:00-05:00" },
        end: { dateTime: "2025-01-01T13:00:00-05:00" }
      }
    ];
  
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  