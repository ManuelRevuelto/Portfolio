export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Experience {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  description: string;
}

export interface ProjectHighlight {
  name: string;
  year: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Profile {
  name: string;
  title: string;
  bio: string[];
  heroTitles: string[];
  experience: Experience[];
  education: Education[];
  projectHighlights: ProjectHighlight[];
  skillGroups: SkillGroup[];
  allTechs: string[];
}
