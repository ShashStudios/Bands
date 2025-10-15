"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Waitlist() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          name: email.split("@")[0] // Use email prefix as name
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Successfully joined the waitlist!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to join waitlist");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
        <Input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
        <Button 
          type="submit" 
          disabled={status === "loading"} 
          className="bg-black text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {status === "loading" ? "Joining..." : "Join the Waitlist"}
        </Button>
      </form>
      {status === "success" && (
        <p className="text-sm text-green-600 font-medium">{message}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 font-medium">{message}</p>
      )}
      {status === "idle" && (
        <p className="text-sm text-muted-foreground">
          Be the first to know when we launch.
        </p>
      )}
    </div>
  );
}
