import Link from "next/link";

export const LandingContainer = () => {
  return (
    <div className="bg-gray-900">
      <div className="xl:max-w-screen-2xl mx-auto">
        <div className="lg:max-w-6xl mx-auto pb-20 pt-10 px-4 sm:px-6 xl:px-0">
          <p className="sm:text-xl text-gray-200 font-semibold">
            AI Jobs • ML Jobs • Data Jobs
          </p>
          <h1 className="md:max-w-3xl text-4xl md:text-6xl lg:text-7xl text-white font-extrabold md:leading-tighter lg:leading-tighter tracking-tight mt-3">
            The leading job board for AI Jobs, Data Jobs and Machine Learning Jobs
          </h1>
          <h2 className="md:max-w-3xl text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed sm:leading-relaxed md:leading-relaxed mt-4">
            AIMLJobs curates the best remote jobs at leading AI startups.
          </h2>
          <div className="flex flex-wrap text-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              className="w-full sm:w-auto flex-none text-white font-semibold bg-purple border border-transparent px-5 py-2.5 rounded-md hover:bg-purple-dark hover:border-purple-dark transition-colors"
              href="/post-job"
            >
              Post job
            </Link>
            <Link
              className="w-full sm:w-auto flex-none text-white font-semibold bg-gray-900 border border-gray-600 px-5 py-2.5 rounded-md hover:border-gray-400 transition-colors"
              href="#findjob"
            >
              Find job
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 