"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { fetchScheduledJobs } from "@/lib/api";

interface Job {
  _id: string;
  JobTitle: string;
  CompanyName: string;
  Location: string;
  JobType: string;
  Team: string;
  LogoURL: string;
  Timestamp: string;
  featured: boolean;
}

interface ScheduledJobsProps {
  refreshTrigger: number;
}

export function ScheduledJobs({ refreshTrigger }: ScheduledJobsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await fetchScheduledJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching scheduled jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple"></div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No scheduled jobs found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Scheduled Jobs</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={job.LogoURL || "/company-logo-placeholder.png"}
                    alt={`${job.CompanyName} logo`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {job.JobTitle}
                  </h3>
                  <p className="text-gray-600">{job.CompanyName}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="inline-block bg-purple-100 text-purple px-2 py-1 rounded-full text-xs">
                    Scheduled for:{" "}
                    {formatDistanceToNow(new Date(job.Timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    {job.Location}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    {job.JobType}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    {job.Team}
                  </span>
                  {job.featured && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
