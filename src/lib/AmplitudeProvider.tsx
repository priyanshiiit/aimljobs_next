"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";

const initAmplitude = () => {
  if (typeof window !== "undefined") {
    amplitude.init("a50143935dc17744e9fb69939e3509e4", {
      defaultTracking: {
        pageViews: true,
        sessions: true,
        formInteractions: false,
        fileDownloads: false,
      },
    });
  }
};

export function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAmplitude();
  }, []);

  return <>{children}</>;
}
