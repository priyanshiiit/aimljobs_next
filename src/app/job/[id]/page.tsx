import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/api";
import { JobDescription } from "@/components/JobDescription";

interface JobPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const job = await getJob(params.id);

  if (!job) {
    return {
      title: "Job Not Found | AI/ML Jobs",
    };
  }

  return {
    title: `${job.JobTitle} at ${job.CompanyName} | AI/ML Jobs`,
    description: `Apply for ${job.JobTitle} position at ${job.CompanyName}. Find more AI and ML jobs at top startups.`,
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <JobDescription job={job} />
    </div>
  );
}
