export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  chineseName?: string;
  title: string;
  department: string;
  departmentNote?: string;
  institution: string;
  courtesyAppointment?: string;
  administrativeRoles?: string[];
  email: string;
  officialEmail?: string;
  personalEmail?: string;
  phone?: string;
  office: string;
  avatar: string;
  cvUrl: string;
  cuhkProfileUrl?: string;
  orcidUrl?: string;
  bio: string[];
  interests: string[];
  education: Education[];
  links: SocialLink[];
}

export interface BookLink {
  label: string;
  url: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  coverImage: string;
  description: string;
  tags: string[];
  links: BookLink[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  date: string;
  venue: string;
  type: string;
  abstract: string;
  tags: string[];
  doi?: string;
  pdf?: string;
  bibtex?: string;
  image?: string;
  featured?: boolean;
}

export interface TeachingCourse {
  id: string;
  code?: string;
  title: string;
  level: 'Undergraduate' | 'Master' | 'Ph.D.';
  semesters: string;
  overview: string;
  topics: string[];
}

export interface Advisee {
  name: string;
  role: string;
  institution?: string;
  year?: string;
  currentPlacement?: string;
  profileUrl?: string;
}

export interface VisitingStudent {
  name: string;
  institution: string;
  period: string;
}

export interface Advising {
  summary: string;
  phdStudents: Advisee[];
  committeeMembers: Advisee[];
  visitingStudents: VisitingStudent[];
  undergradAdviseesCount: number;
}

export interface ProgrammingItem {
  title: string;
  url: string;
  tag: string;
}

export interface ProgrammingCategory {
  category: string;
  description: string;
  items: ProgrammingItem[];
}

export interface SiteData {
  profile: Profile;
  books: Book[];
  publications: Publication[];
  teaching: TeachingCourse[];
  advising: Advising;
  programming: ProgrammingCategory[];
  lastUpdated: string;
}
