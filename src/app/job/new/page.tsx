import { JobPostForm } from "@/components/JobPostForm";
import { PackDetails } from "@/components/PackDetails";

export default function NewJobPage() {
  return (
    <div className="min-h-screen">
      <PackDetails />
      <div className="lg:max-w-5xl mx-auto mt-16 md:mt-24 md:px-6 xl:px-0">
        <JobPostForm />
      </div>
    </div>
  );
}
