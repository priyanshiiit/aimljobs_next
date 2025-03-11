export interface Job {
  _id: string;
  JobTitle: string;
  CompanyName: string;
  Location: string;
  JobType: string;
  Team: string;
  LogoURL: string;
  Timestamp: string | null;
  featured: boolean;
  ApplicationURLrecommendedOrEmailAddress2: string;
  CompanyWebsite: string;
  CompanyDescription: string;
  Keywords: string[];
  Categories: string[];
  Tags: string[];
  Address: string;
  Twitter: string;
  Linkedin: string;
  JobDescription: string;
  YourName?: string;
  YourCompanyEmail?: string;
}

export interface SearchFilters {
  query: string;
  categories: string[];
  tags: string[];
}
