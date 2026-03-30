export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
  images?: string[];
  videos?: string[];
  content?: string; // Full markdown for modal
}
