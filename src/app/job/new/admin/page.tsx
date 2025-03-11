"use client";

import { useState } from "react";
import { AdminJobPostForm } from "./_components/AdminJobPostForm";
import { ScheduledJobs } from "./_components/ScheduledJobs";
import { AdminHeader } from "./_components/AdminHeader";

export default function NewJobPage() {
  const [refreshTrigger] = useState(0);

  return (
    <div className="lg:max-w-5xl mx-auto mt-8 md:mt-12 md:px-6 xl:px-0">
      <AdminHeader />
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Job</h2>
      <AdminJobPostForm />
      <ScheduledJobs refreshTrigger={refreshTrigger} />
    </div>
  );
}
