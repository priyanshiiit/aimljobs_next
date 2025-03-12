"use client";

import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { subscribeToNewsletter } from "@/lib/api";

// How often to show the dialog (in days)
const DIALOG_FREQUENCY_DAYS = 4;

export const SubscriptionDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrollListenerActive, setIsScrollListenerActive] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Activate scroll listener after a delay
  useEffect(() => {
    // Check if user has already subscribed (permanently)
    const hasSubscribed = localStorage.getItem("hasSubscribed");
    if (hasSubscribed) return;

    // Check if user has dismissed the dialog in this session
    const hasDismissed = sessionStorage.getItem("hasDismissedSubscription");
    if (hasDismissed) return;

    // Check if we should show the dialog based on frequency
    const lastShownTimestamp = localStorage.getItem(
      "subscriptionDialogLastShown"
    );
    if (lastShownTimestamp) {
      const lastShownDate = new Date(parseInt(lastShownTimestamp, 10));
      const currentDate = new Date();
      const daysSinceLastShown = Math.floor(
        (currentDate.getTime() - lastShownDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      // If it hasn't been long enough since we last showed the dialog, don't show it
      if (daysSinceLastShown < DIALOG_FREQUENCY_DAYS) {
        return;
      }
    }

    // Add a delay before activating the scroll listener
    const activationTimer = setTimeout(() => {
      setIsScrollListenerActive(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(activationTimer);
  }, []);

  // Scroll event listener
  useEffect(() => {
    // Only add scroll listener if it's active and dialog is not open
    if (!isScrollListenerActive || isOpen) return;

    // Check if user has already subscribed or dismissed
    const hasSubscribed = localStorage.getItem("hasSubscribed");
    const hasDismissed = sessionStorage.getItem("hasDismissedSubscription");
    if (hasSubscribed || hasDismissed) return;

    // Check frequency limit
    const lastShownTimestamp = localStorage.getItem(
      "subscriptionDialogLastShown"
    );
    if (lastShownTimestamp) {
      const lastShownDate = new Date(parseInt(lastShownTimestamp, 10));
      const currentDate = new Date();
      const daysSinceLastShown = Math.floor(
        (currentDate.getTime() - lastShownDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastShown < DIALOG_FREQUENCY_DAYS) {
        return;
      }
    }

    // Add scroll event listener with debounce
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY > 600 && !isOpen) {
          setIsOpen(true);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrollListenerActive, isOpen]);

  // Focus email input when dialog opens
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle escape key to close dialog
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Update when dialog is opened
  useEffect(() => {
    if (isOpen) {
      // Store the timestamp when the dialog was shown
      localStorage.setItem(
        "subscriptionDialogLastShown",
        Date.now().toString()
      );
    }
  }, [isOpen]);

  const closeDialog = () => {
    setIsOpen(false);
    // Mark as dismissed for this session
    sessionStorage.setItem("hasDismissedSubscription", "true");
  };

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
      setIsOpen(false);
      toast.success("Thanks for subscribing!");
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl p-5 sm:p-6 w-full max-w-md animate-fade-in"
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            id="dialog-title"
            className="text-lg sm:text-xl font-bold text-gray-900"
          >
            Subscribe to our newsletter
          </h2>
          <button
            onClick={closeDialog}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Every Saturday we\'ll send the latest jobs directly to your inbox.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              ref={emailInputRef}
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
            className="w-full bg-purple hover:bg-purple-dark text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};
