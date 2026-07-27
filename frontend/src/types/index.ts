export interface Repository {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}