"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ className, label, type = "text", value, defaultValue, onFocus, onBlur, onChange, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || defaultValue || "");

  // Update local value when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  const hasValue = String(localValue).length > 0;
  const shouldFloat = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        type={type}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          "peer w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-[#7ed957] focus:ring-2 focus:ring-[#7ed957]/20",
          className
        )}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          setLocalValue(e.target.value);
          onBlur?.(e);
        }}
        onChange={(e) => {
          setLocalValue(e.target.value);
          onChange?.(e);
        }}
        {...props}
      />
      <label
        className={cn(
          "absolute left-4 text-sm text-gray-500 transition-all duration-200 pointer-events-none bg-white",
          shouldFloat
            ? "top-[-10px] left-3 text-xs px-1"
            : "top-3 text-sm px-0",
          isFocused && "text-[#7ed957]"
        )}
      >
        {label}
      </label>
    </div>
  );
});

FloatingLabelInput.displayName = "FloatingLabelInput";
