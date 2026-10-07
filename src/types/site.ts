export interface SocialLinks {
  email?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  youtube?: string;
}

export interface Availability {
  base: string;
  work_regions: string[];
  status: string;
}

export interface StackLayer {
  layer: string;
  items: string[];
}

export interface Profile {
  name: string;
  title: string;
  headline: string;
  tagline: string;
  years: string;
  current: { role: string; company: string };
  summary?: string;
  long_summary?: string;
  availability?: Availability;
  avatar: string;
  contacts: SocialLinks;
  languages?: Record<string, string>;
  stackByLayer: StackLayer[];
}

export type FlowKind = 'source' | 'process' | 'output';

export interface FlowNode {
  id: string;
  label: string;
  tech?: string;
  kind: FlowKind;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ProjectFlow {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  client?: string;
  featured?: boolean;
  type?: 'freelancer' | 'personal-lab' | 'open-source' | 'collective';
  impact?: string;
  stack?: string[];
  tags?: string[];
  thumbnail: string;
  video?: string;
  hasDetailedContent?: boolean;
  story?: string;
  flow?: ProjectFlow;
  links?: {
    code?: string | null;
    demo?: string | null;
  };
}

export interface CareerStep {
  role: string;
  period: string;
}

export interface Career {
  period: string;
  role: string;
  company: string;
  location?: string;
  current?: boolean;
  /** Promotions inside the same company, newest first. */
  steps?: CareerStep[];
  highlights?: string[];
  tech?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  kind?: 'certification' | 'course';
  featured?: boolean;
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
  projects: Project[];
  experience: Career[];
  certifications: Certification[];
  education: Education[];
  presentations: Presentation[];
  publications: Publication[];
}
