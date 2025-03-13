import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { Job } from "@/types";

interface JobDescriptionProps {
  job: Job;
}

export function JobDescription({ job }: JobDescriptionProps) {
  const refDetails =
    "?ref=aimljobs.fyi&source=aimljobs.fyi&utm_source=aimljobs.fyi&utm_campaign=aimljobs.fyi";

  const {
    JobTitle: title,
    CompanyName: company,
    JobDescription: description,
    Address: address,
    JobType: jobType,
    Team: role,
    Keywords: keywords,
    ApplicationURLrecommendedOrEmailAddress2: applyLink,
    Twitter: twitter,
    Linkedin: linkedin,
    LogoURL: logoURL,
    // aboutCompanyLink,
  } = job;

  return (
    <>
      <div className="lg:max-w-5xl mx-auto px-4 sm:px-6 xl:px-0">
        <div className="pt-12 md:pt-32">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-gray-900 font-extrabold md:leading-tighter lg:leading-tighter tracking-tight break-words md:break-normal mt-6 md:mt-7">
            {title}
          </h1>
          <div className="flex items-center mt-3 md:mt-4">
            <div className="mr-3">
              <Image
                alt={`${company} logo`}
                className="bg-white border border-gray-100 h-9 md:h-12 w-9 md:w-12 rounded-full lazyautosizes lazyloaded"
                height="400"
                width="400"
                src={logoURL || "https://i.ibb.co/6bWJH3h/Company-logo.png"}
                sizes="48px"
              />
            </div>
            <h2 className="text-xl md:text-3xl text-gray-900 font-medium leading-none sm:leading-none md:leading-none break-words md:break-normal">
              {company}
            </h2>
          </div>

          <div className="mt-6">
            <ul className="text-gray-600 leading-relaxed mt-2 mb-2">
              {twitter && (
                <li className="inline-block mr-3 md:mr-2">
                  <Link
                    className="text-gray-500 hover:text-purple transition-colors"
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </Link>
                </li>
              )}
              {linkedin && (
                <li className="inline-block mr-3 md:mr-2">
                  <Link
                    className="text-gray-500 hover:text-purple transition-colors"
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="pb-15 md:py-10 lg:py-10">
          <div className="lg:max-w-full grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-4 row-start-2 lg:row-span-3 mt-20 lg:mt-0">
              <div className="prose max-w-none">
                {<Markdown>{description}</Markdown>}
              </div>
              <div className="mt-14 md:mt-20">
                <Link
                  className="inline-block w-full sm:w-auto text-white font-semibold text-center bg-purple border border-transparent px-10 py-2.5 rounded-md hover:bg-gray-900 transition-colors"
                  href={
                    applyLink.includes("@")
                      ? `mailto:${applyLink}`
                      : applyLink + refDetails
                  }
                  target={applyLink.includes("@") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                >
                  Apply now
                </Link>
              </div>
            </div>
            <div className="mt-5 lg:col-start-5 row-start-1 lg:row-start-1">
              {address && (
                <div>
                  <h3 className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                    Location
                  </h3>
                  <ul className="text-gray-600 leading-relaxed mt-1">
                    {/* {locations.map((location, index) => (
                        <li key={index} className="inline">
                          {index !== 0 && <span aria-hidden="true">,&nbsp;</span>}
                          <a
                            className="hover:text-purple transition-colors"
                            href={`/${location.toLowerCase()}/`}
                          > */}
                    {address}
                    {/* </a>
                        </li>
                      ))} */}
                  </ul>
                </div>
              )}
              <div className="mt-6">
                <h3 className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                  Job type
                </h3>
                <ul className="text-gray-600 leading-relaxed mt-1">
                  <li className="inline-block">
                    <span className="hover:text-purple transition-colors">
                      {jobType}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                  Role
                </h3>
                <div className="text-gray-600 mt-1">
                  <span className="hover:text-purple transition-colors">
                    {role}
                  </span>
                </div>
              </div>
              {keywords.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                    Keywords
                  </h3>
                  <ul className="text-gray-600 leading-relaxed mt-1">
                    {keywords?.map((keyword, index) => (
                      <li key={index} className="inline">
                        {index !== 0 && <span aria-hidden="true">,&nbsp;</span>}
                        {index !== keywords.length - 1 ? (
                          <span className="hover:text-purple transition-colors">
                            {keyword}
                          </span>
                        ) : (
                          <span className="hover:text-purple transition-colors">
                            {keyword}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-7 md:mt-10">
                <Link
                  className="inline-block w-full sm:w-auto text-white font-semibold text-center bg-purple border border-transparent px-10 py-2.5 rounded-md hover:bg-gray-900 transition-colors"
                  href={
                    applyLink.includes("@")
                      ? `mailto:${applyLink}`
                      : applyLink + refDetails
                  }
                  target={applyLink.includes("@") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                >
                  Apply now
                </Link>
              </div>
              <div className="mt-7 lg:block">
                <Link
                  className="inline-flex items-center text-gray-600 group hover:text-purple transition-colors"
                  href="/"
                >
                  Back to all jobs
                  <span className="group-hover:hidden" aria-hidden="true">
                    {/* Back Arrow SVG */}
                  </span>
                  <span
                    className="hidden group-hover:inline"
                    aria-hidden="true"
                  >
                    {/* Forward Arrow SVG */}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
