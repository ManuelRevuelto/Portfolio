export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  featured?: boolean;
  readingTimeMinutes: number;
  content?: string; // Only present in full post fetch
}
