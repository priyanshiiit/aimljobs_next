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
}

export interface SearchFilters {
  query: string;
  categories: string[];
  tags: string[];
}
