import { Job } from "@/types";

export const dummyJobs: Job[] = [
  {
    _id: "1",
    JobTitle: "Senior Machine Learning Engineer",
    CompanyName: "AI Tech Labs",
    CompanyWebsite: "https://aitechlabs.com",
    LogoURL: "https://ui-avatars.com/api/?name=AI+Tech+Labs&background=random",
    Categories: ["Engineering", "Machine Learning"],
    Tags: ["Python", "PyTorch", "Remote"],
    Timestamp: "2024-03-15T10:00:00Z",
    description: "Looking for an experienced ML engineer...",
    applyLink: "https://aitechlabs.com/careers"
  },
  {
    _id: "2",
    JobTitle: "AI Research Scientist",
    CompanyName: "DeepMind Co",
    CompanyWebsite: "https://deepmindco.ai",
    LogoURL: "https://ui-avatars.com/api/?name=Deep+Mind&background=random",
    Categories: ["Research", "AI"],
    Tags: ["Deep Learning", "Research", "Hybrid"],
    Timestamp: "2024-03-14T15:30:00Z",
    description: "Join our research team...",
    applyLink: "https://deepmindco.ai/jobs"
  },
  {
    _id: "3",
    JobTitle: "Data Scientist",
    CompanyName: "DataFlow Inc",
    CompanyWebsite: "https://dataflow.io",
    LogoURL: "https://ui-avatars.com/api/?name=Data+Flow&background=random",
    Categories: ["Data Science", "Analytics"],
    Tags: ["SQL", "Python", "Remote"],
    Timestamp: "2024-03-13T09:15:00Z",
    description: "Looking for a data scientist...",
    applyLink: "https://dataflow.io/careers"
  }
]; 