import { Job } from "@/types";
import { dummyJobs } from "./data";

export async function getJobs(): Promise<Job[]> {
  try {
    return dummyJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJob(id: string): Promise<Job | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch job");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}
