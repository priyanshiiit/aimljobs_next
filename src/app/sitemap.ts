import { MetadataRoute } from "next";
import { getJobs } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all jobs to generate job-specific sitemap entries
  const jobs = await getJobs();

  // Base URL for the site
  const baseUrl = "https://aimljobs.fyi";

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/job/post`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  // Create job-specific routes with a lower priority
  const jobRoutes = jobs.map((job) => ({
    url: `${baseUrl}/job/${job.slug || job._id}`,
    lastModified: new Date(job.Timestamp || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Create category pages from job keywords
  // const categories = new Set<string>();
  // jobs.forEach((job) => {
  //   if (job.Keywords) {
  //     const keywords = job.Keywords.map((k) => k.trim());
  //     keywords.forEach((keyword) => {
  //       if (keyword) categories.add(keyword);
  //     });
  //   }
  // });

  // const categoryRoutes = Array.from(categories).map((category) => ({
  //   url: `${baseUrl}/?q=${encodeURIComponent(category)}`,
  //   lastModified: new Date(),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.6,
  // }));

  // Return all routes combined
  return [...staticRoutes, ...jobRoutes];
}
