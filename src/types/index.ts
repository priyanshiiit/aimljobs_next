export interface Job {
  _id: string;
  JobTitle: string;
  CompanyName: string;
  CompanyWebsite: string;
  LogoURL: string;
  Categories: string[];
  Tags: string[];
  Timestamp: string;
  description?: string;
  applyLink?: string;
}

export interface SearchFilters {
  query: string;
  categories: string[];
  tags: string[];
} 