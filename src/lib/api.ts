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

export async function getJob(id: string): Promise<Job | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/job/${id}`, {
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

export async function updateJob(jobId: string, jobData: any) {
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
