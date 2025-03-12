"use client";

import { useState, useRef, useEffect } from "react";
import { subscribeToNewsletter } from "@/lib/api";
import toast from "react-hot-toast";

interface SubscriptionFormProps {
  onSuccess?: () => void;
  buttonText?: string;
  inputId?: string;
  layout?: "row" | "column";
  className?: string;
  autoFocus?: boolean;
  showSuccessMessage?: boolean;
  successMessage?: React.ReactNode;
  title?: string;
  description?: string;
}

export const SubscriptionForm = ({
  onSuccess,
  buttonText = "Subscribe",
  inputId = "email",
  layout = "row",
  className = "",
  autoFocus = false,
  showSuccessMessage = true,
  successMessage,
  title,
  description,
}: SubscriptionFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if user has already subscribed
  useEffect(() => {
    const subscribed = localStorage.getItem("hasSubscribed");
    if (subscribed) {
      setHasSubscribed(true);
    }
  }, []);

  // Auto-focus the input if requested
  useEffect(() => {
    if (autoFocus && inputRef.current && !hasSubscribed) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus, hasSubscribed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await subscribeToNewsletter(email);
      localStorage.setItem("hasSubscribed", "true");
      setEmail("");
      setHasSubscribed(true);
      toast.success("Thanks for subscribing!");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formClasses =
    layout === "row"
      ? "flex flex-col sm:flex-row gap-2"
      : "flex flex-col gap-2";

  // Default success message
  const defaultSuccessMessage = (
    <div className="text-center">
      <p className="text-green-600 font-medium">
        You&apos;re subscribed to our newsletter!
        <span className="block text-sm text-gray-600 mt-1">
          Check your inbox every Saturday for the latest jobs.
        </span>
      </p>
    </div>
  );

  // If user has subscribed and we want to show success message
  if (hasSubscribed && showSuccessMessage) {
    return (
      <div className={className}>{successMessage || defaultSuccessMessage}</div>
    );
  }

  // If user has subscribed but we don't want to show success message
  if (hasSubscribed && !showSuccessMessage) {
    return null;
  }

  return (
    <div className={className}>
      {title && (
        <h3 className="text-center text-lg font-medium mb-3">{title}</h3>
      )}
      {description && (
        <p className="text-center text-sm text-gray-600 mb-4">{description}</p>
      )}
      <form onSubmit={handleSubmit} className={formClasses}>
        <div className="flex-grow">
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple hover:bg-purple-dark text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple whitespace-nowrap"
        >
          {isSubmitting ? "Subscribing..." : buttonText}
        </button>
      </form>
    </div>
  );
};
