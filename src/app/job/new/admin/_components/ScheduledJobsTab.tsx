"use client";

import { useState, useEffect } from "react";
import { fetchUnlistedJobs, updateJobSchedule, deleteJob } from "@/lib/api";
import { Job } from "@/types";
import { AdminJobCard } from "./AdminJobCard";

export function ScheduledJobsTab() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUnlistedJobs();
        // Filter for scheduled jobs only (future timestamp)
        const now = new Date();
        const scheduledJobs = data.filter((job) => {
          if (!job.Timestamp) return false;
          const jobDate = new Date(job.Timestamp);
          return jobDate > now;
        });
        setJobs(scheduledJobs);
      } catch (error) {
        console.error("Error fetching scheduled jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleScheduleUpdate = async (jobId: string, newDate: Date) => {
    try {
      await updateJobSchedule(jobId, newDate.toISOString());
      // Refresh the jobs list
      const data = await fetchUnlistedJobs();
      const now = new Date();
      const scheduledJobs = data.filter((job) => {
        if (!job.Timestamp) return false;
        const jobDate = new Date(job.Timestamp);
        return jobDate > now;
      });
      setJobs(scheduledJobs);
    } catch (error) {
      console.error("Error updating job schedule:", error);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(jobId);
      // Refresh the jobs list
      const data = await fetchUnlistedJobs();
      const now = new Date();
      const scheduledJobs = data.filter((job) => {
        if (!job.Timestamp) return false;
        const jobDate = new Date(job.Timestamp);
        return jobDate > now;
      });
      setJobs(scheduledJobs);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <AdminJobCard
              key={job._id}
              job={job}
              onSchedule={handleScheduleUpdate}
              onDelete={handleDeleteJob}
            />
          ))
        ) : (
          <div className="col-span-3 py-8 text-center text-gray-500">
            No scheduled jobs found.
          </div>
        )}
      </div>
    </div>
  );
}
