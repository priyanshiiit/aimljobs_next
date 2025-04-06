"use server";

import { Job } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://aimljobs-backend.vercel.app";

export async function getJobs(): Promise<Job[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/jobs`, {
      next: {
        revalidate: 20, // Cache for 20 seconds
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const jobs = await response.json();

    // Sort jobs: featured first, then by timestamp
    return jobs.sort((a: Job, b: Job) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (
        new Date(b.Timestamp!).getTime() - new Date(a.Timestamp!).getTime()
      );
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJob(idOrSlug: string): Promise<Job | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/job/${idOrSlug}`, {
      next: {
        revalidate: 300, // Cache for 5 minutes
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch job");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export async function fetchUnlistedJobs(): Promise<Job[]> {
  try {
    const [scheduledResponse, unscheduledResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/v1/jobs/scheduled`),
      fetch(`${API_BASE_URL}/v1/jobs/unscheduled`),
    ]);

    if (!scheduledResponse.ok || !unscheduledResponse.ok) {
      throw new Error("Failed to fetch unlisted jobs");
    }

    const [scheduledJobs, unscheduledJobs] = await Promise.all([
      scheduledResponse.json(),
      unscheduledResponse.json(),
    ]);

    return [...unscheduledJobs, ...scheduledJobs];
  } catch (error) {
    console.error("Error fetching unlisted jobs:", error);
    return [];
  }
}

export async function updateJobSchedule(jobId: string, timestamp: string) {
  const response = await fetch(`${API_BASE_URL}/v1/jobs/${jobId}/schedule`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timestamp }),
  });

  if (!response.ok) {
    throw new Error("Failed to update job schedule");
  }

  return response.json();
}

export async function deleteJob(jobId: string) {
  const response = await fetch(`${API_BASE_URL}/v1/jobs/${jobId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }

  return response.json();
}

export async function updateJob(
  jobId: string,
  jobData: Record<string, unknown>
) {
  const response = await fetch(`${API_BASE_URL}/v1/job/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ADMIN_SECRET_KEY || "",
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update job");
  }

  return response.json();
}

/**
 * Subscribe an email to the newsletter (server action)
 * @param email - The email address to subscribe
 * @returns A promise that resolves to the subscription result
 */
export async function subscribeToNewsletter(email: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to subscribe");
    }

    return await response.json();
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
}

/**
 * Fetch currently published jobs (live jobs)
 * @returns A promise that resolves to an array of live jobs
 */
export async function fetchLiveJobs(): Promise<Job[]> {
  try {
    // The default /v1/jobs endpoint returns jobs from the last 31 days, which are the live jobs
    const response = await fetch(`${API_BASE_URL}/v1/jobs`, {
      next: {
        revalidate: 20, // Cache for 20 seconds
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch live jobs");
    }

    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error("Error fetching live jobs:", error);
    return [];
  }
}

/**
 * Fetch old jobs (published more than 31 days ago but less than 60 days ago)
 * @returns A promise that resolves to an array of old jobs
 */
export async function fetchOldJobs(): Promise<Job[]> {
  try {
    // Calculate dates for 31 and 60 days ago
    const now = new Date();
    const thirtyOneDaysAgo = new Date(now);
    thirtyOneDaysAgo.setDate(now.getDate() - 31);

    const sixtyDaysAgo = new Date(now);
    sixtyDaysAgo.setDate(now.getDate() - 60);

    // Format dates as ISO strings
    const from = sixtyDaysAgo.toISOString();
    const to = thirtyOneDaysAgo.toISOString();

    // Use the jobs endpoint with date parameters to filter old jobs
    const response = await fetch(
      `${API_BASE_URL}/v1/jobs?from=${from}&to=${to}`,
      {
        next: {
          revalidate: 60, // Cache for 60 seconds
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch old jobs");
    }

    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error("Error fetching old jobs:", error);
    return [];
  }
}
