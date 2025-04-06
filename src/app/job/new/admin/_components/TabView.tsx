"use client";

import { useState } from "react";
import { UnscheduledJobsTab } from "./UnscheduledJobsTab";
import { ScheduledJobsTab } from "./ScheduledJobsTab";
import { LiveJobsTab } from "./LiveJobsTab";
import { OldJobsTab } from "./OldJobsTab";

type TabType = "unscheduled" | "scheduled" | "live" | "old";

export function TabView() {
  const [activeTab, setActiveTab] = useState<TabType>("unscheduled");

  const tabs = [
    { id: "unscheduled", label: "Unscheduled Jobs" },
    { id: "scheduled", label: "Scheduled Jobs" },
    { id: "live", label: "Live Jobs" },
    { id: "old", label: "Old Jobs" },
  ];

  return (
    <div className="mt-8 space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? "border-purple text-purple"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
              onClick={() => setActiveTab(tab.id as TabType)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === "unscheduled" && <UnscheduledJobsTab />}
        {activeTab === "scheduled" && <ScheduledJobsTab />}
        {activeTab === "live" && <LiveJobsTab />}
        {activeTab === "old" && <OldJobsTab />}
      </div>
    </div>
  );
}
