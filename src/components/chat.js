"use client";
import { useState } from "react";

export default function ChatComponent() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await fetch("/api/deepseek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      if (res.ok) {
        setResponse(data.response);
      } else {
        // Display error message returned from API
        setResponse(data.error || "Error in response");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResponse("Error fetching response: " + error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Chat with DeepSeek</h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full"
          placeholder="Ask something..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-2 border">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
}
