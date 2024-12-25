export interface Job {
  _id: string;
  JobTitle: string;
  CompanyName: string;
  CompanyWebsite: string;
  LogoURL: string;
  Categories: string[];
  Tags: string[];
  Timestamp: string;
  JobDescription: string;
  applyLink: string;
  featured: boolean;
  Twitter?: string;
  Linkedin?: string;
  location?: string;
  Address?: string;
  JobType?: string;
  Team?: string;
  ApplicationURLrecommendedOrEmailAddress2: string;
}

export interface SearchFilters {
  query: string;
  categories: string[];
  tags: string[];
}
