import { Suspense } from "react";
import { LandingContainer } from "@/components/LandingContainer";
import { JobList } from "@/components/JobList";
import { JobListSkeleton } from "@/components/JobListSkeleton";
import { getJobs } from "@/lib/api";
import AIPH_Banner from "@/components/sponsors/AIPH";
import { AmplitudeProvider } from "@/lib/AmplitudeProvider";

export default async function Home() {
  const jobs = await getJobs();

  return (
    <AmplitudeProvider>
      <div className="min-h-screen">
        <LandingContainer />
        <div id="findjob">
          <div className="lg:max-w-5xl mx-auto mt-16 md:mt-24 md:px-6 xl:px-0">
            <Suspense fallback={<JobListSkeleton />}>
              <JobList initialJobs={jobs} />
            </Suspense>
          </div>
        </div>
        <AIPH_Banner />
      </div>
    </AmplitudeProvider>
  );
}
