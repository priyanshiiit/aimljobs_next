import Image from "next/image";
import Link from "next/link";
import { Job } from "@/types";
import { formatTimeAgo } from "@/lib/utils";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const timeAgo = formatTimeAgo(new Date(job.Timestamp || ""));

  return (
    <div
      className={`grid text-sm text-gray-600 border-t border-gray-200 p-4 sm:p-6 ${
        job.featured ? "bg-slate-50" : "bg-white"
      }`}
      style={{ gridTemplateColumns: "auto minmax(0, 1fr) auto" }}
    >
      <Image
        className="h-8 sm:h-10 md:h-11 w-8 sm:w-10 md:w-11 bg-white border border-gray-100 sm:mr-4 rounded-full"
        src={job.LogoURL || "https://i.ibb.co/6bWJH3h/Company-logo.png"}
        alt={`${job.CompanyName} logo`}
        width={44}
        height={44}
      />
      <div className="col-start-1 sm:col-start-2 row-start-2 sm:row-start-1">
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-800 font-bold">
            <Link
              href={`/job/${job._id}`}
              className="hover:text-purple transition-colors"
            >
              {job.JobTitle}
            </Link>
          </h2>
        </div>
        <h3 className="text-base md:text-lg text-gray-800">
          <a
            href={job.CompanyWebsite}
            className="hover:text-purple transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {job.CompanyName}
          </a>
        </h3>
      </div>
      {/* Keywords */}
      <div className="col-start-1 sm:col-start-2 col-end-2 sm:col-end-4">
        <div className="flex flex-row flex-wrap mt-3 space-x-1 sm:space-x-2">
          <ul className="leading-relaxed sm:leading-normal">
            {job.Keywords?.map((keyword, index) => (
              <li key={index} className="inline">
                <span className="hover:text-purple transition-colors">
                  {keyword}
                  {index !== job.Keywords.length - 1 ? "  •  " : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-start-3 row-start-1 flex items-center justify-end gap-2">
        <div className="inline-block leading-loose">
          <span>{timeAgo}</span>
        </div>
        {job.featured && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700 text-white whitespace-nowrap">
            Featured
          </span>
        )}
      </div>
    </div>
  );
}
