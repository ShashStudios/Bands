import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Waitlist() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Enter your email" />
        <Button type="submit">Join the Waitlist</Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Be the first to know when we launch.
      </p>
    </div>
  );
}
