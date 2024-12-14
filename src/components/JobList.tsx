"use client";

import { useState, useEffect } from "react";
import { Job, SearchFilters } from "@/types";
import { JobCard } from "./JobCard";

interface JobListProps {
  initialJobs: Job[];
}

export function JobList({ initialJobs }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filters] = useState<SearchFilters>({
    query: "",
    categories: [],
    tags: [],
  });

  // Filter jobs based on search criteria
  useEffect(() => {
    let filtered = initialJobs;

    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.JobTitle.toLowerCase().includes(query) ||
          job.CompanyName.toLowerCase().includes(query)
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((job) =>
        job.Categories.some((cat) => filters.categories.includes(cat))
      );
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter((job) =>
        job.Tags.some((tag) => filters.tags.includes(tag))
      );
    }

    setJobs(filtered);
  }, [filters, initialJobs]);

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}
