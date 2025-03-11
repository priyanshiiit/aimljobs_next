"use client";

import { useEffect, useState } from "react";
import { getJob, updateJob } from "@/lib/api";
import { Job } from "@/types";
import toast from "react-hot-toast";
import { AdminJobPostForm } from "../../_components/AdminJobPostForm";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobId, setJobId] = useState<string | null>(null);

  // First, resolve the params to get the ID
  useEffect(() => {
    async function resolveParams() {
      try {
        const resolvedParams = await params;
        setJobId(resolvedParams.id);
      } catch (error) {
        console.error("Failed to resolve params:", error);
        toast.error("Failed to load job data");
      }
    }

    resolveParams();
  }, [params]);

  // Then, load the job data once we have the ID
  useEffect(() => {
    if (!jobId) return;

    async function loadJob() {
      try {
        setIsLoading(true);
        // We've already checked that jobId is not null above
        const jobData = await getJob(jobId as string);
        setJob(jobData);
      } catch (error) {
        console.error("Failed to load job:", error);
        toast.error("Failed to load job data");
      } finally {
        setIsLoading(false);
      }
    }

    loadJob();
  }, [jobId]);

  const handleSubmit = async (formData: Record<string, unknown>) => {
    if (!jobId) return;

    try {
      await updateJob(jobId, formData);
      toast.success("Job updated successfully");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job");
    }
  };

  if (isLoading || !jobId) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Job</h1>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Job</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Job not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Job</h1>
      <AdminJobPostForm
        initialData={job}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
}
