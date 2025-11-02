export interface SocialLinks {
  email?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  phone?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Availability {
  base: string;
  work_regions: string[];
  status: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle?: string;
  summary?: string;
  long_summary?: string;
  location?: string;
  availability?: Availability;
  avatar: string;
  glb?: string;
  tags?: string[];
  social?: SocialLinks;
  contacts?: SocialLinks;
  languages?: Record<string, string>;
  skills?: {
    languages?: Skill[];
    platforms?: Skill[];
    design?: Skill[];
  };
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  impact?: string;
  stack?: string[];
  tags?: string[];
  thumbnail: string;
  links?: {
    code?: string | null;
    demo?: string | null;
  };
}

export interface Career {
  period: string;
  role: string;
  company: string;
  location?: string;
  highlights?: string[];
  tech?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  url?: string;
}

export interface Education {
  degree: string;
  institution: string;
  years: string;
}

export interface Presentation {
  title: string;
  event: string;
  year: number;
  type: string;
}

export interface Publication {
  title: string;
  year: number;
}

export interface SiteData {
  profile: Profile;
  projects?: Project[];
  experience?: Career[];
  career?: Career[];
  certifications?: Certification[];
  education?: Education[];
  presentations?: Presentation[];
  publications?: Publication[];
}
