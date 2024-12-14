import { JobPostForm } from "@/components/JobPostForm";

export default function NewJobPage() {
  return (
    <div className="min-h-screen">
      <div className="lg:max-w-5xl mx-auto mt-16 md:mt-24 md:px-6 xl:px-0">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Post a New Job
        </h1>
        <JobPostForm />
      </div>
    </div>
  );
} 