import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/api";
import { JobDescription } from "@/components/JobDescription";
import Script from "next/script";
import { Job } from "@/types";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id: idOrSlug } = await params;
  const job = await getJob(idOrSlug);

  if (!job) {
    return {
      title: "Job Not Found | AI/ML Jobs",
      description:
        "The job you are looking for does not exist or has been removed. Explore other AI and ML job opportunities on aimljobs.fyi.",
    };
  }

  const title = `${job.JobTitle} at ${job.CompanyName} | AI/ML Jobs`;
  const description = `Apply for this ${job.JobTitle} position at ${
    job.CompanyName
  }. ${job.JobType} ${job.Location} opportunity in ${
    job.Team || "AI/ML"
  } team . ${job.JobDescription?.substring(0, 150)}...`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://aimljobs.fyi/job/${idOrSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://aimljobs.fyi/job/${idOrSlug}`,
      siteName: "AI/ML Jobs",
      images: [
        {
          url: job.LogoURL || "/logo512.png",
          width: 512,
          height: 512,
          alt: `${job.CompanyName} logo`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `Apply for ${job.JobTitle} position at ${job.CompanyName}. ${job.JobType} ${job.Location} opportunity.`,
      creator: "@aimljobs",
      images: [job.LogoURL || "/logo512.png"],
    },
  };
}

// Add a new component to render the structured job posting data
function JobPostingSchema({ job }: { job: Job }) {
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.JobTitle,
    description: job.JobDescription,
    datePosted: job.Timestamp || new Date().toISOString(),
    employmentType: job.JobType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.CompanyName,
      sameAs: job.CompanyWebsite || "https://aimljobs.fyi",
      logo: job.LogoURL || "https://aimljobs.fyi/logo512.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: job.Address || "Worldwide",
        addressLocality: job.Location || "Remote",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: job.Address || "Worldwide",
    },
    directApply: true,
    jobLocationType: job.Location === "Remote" ? "TELECOMMUTE" : "ONSITE",
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        unitText: "YEAR",
        minValue: 50000,
        maxValue: 180000,
      },
    },
  };

  return (
    <Script id="jobPosting-schema" type="application/ld+json">
      {JSON.stringify(jobPostingSchema)}
    </Script>
  );
}

export default async function JobPage({ params }: { params: Params }) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <JobPostingSchema job={job} />
      <JobDescription job={job} />
    </>
  );
}
