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
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
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
