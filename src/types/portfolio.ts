export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  status: "completed" | "in-progress";
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  sortOrder: number;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: "code" | "design" | "camera" | "users" | "editing";
  color: "primary" | "secondary" | "accent" | "info";
  skills: Skill[];
}

export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "instagram";
  url: string;
  label: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  bio: string;
  bio2: string;
  bio3: string;
  initials: string;
  location: string;
  availability: string;
  email: string;
  photo: string;
  stats: Stat[];
  socialLinks: SocialLink[];
  skillsSubtitle: string;
  worksSubtitle: string;
}
