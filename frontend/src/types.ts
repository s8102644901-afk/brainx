export interface Program {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  scientificBasis: string;
  ageBracket: string;
  duration: string;
  metrics: string[];
  benefits: string[];
  stages: { title: string; description: string }[];
  process: string[];
  cognitiveDominance: string;
  colorTheme: "cyan" | "violet" | "emerald" | "amber";
  faqs: { question: string; answer: string }[];
  bannerImage?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface SEOPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  parentPainPoint: string;
  scientificAngle: string;
  keywords: string[];
  outline: string[];
}

export interface CampaignAsset {
  id: string;
  title: string;
  platform: "Instagram" | "Webinar" | "Parenting Course" | "Community";
  hook: string;
  narrativeOutline: string;
  callToAction: string;
}

export interface Testimonial {
  id: string;
  parentName: string;
  parentProfession: string;
  childProfile: string;
  programTaken: string;
  storyHeading: string;
  storyText: string;
  resultsObserved: string[];
  initialPainPoint: string;
  avatarUrl?: string;
}

export interface BrandAsset {
  tagline: string;
  mission: string;
  brandVoice: string;
  colorTheory: { name: string; hex: string; psychology: string }[];
  typography: { role: string; family: string; specs: string }[];
}

export interface CustomerLog {
  id: string;
  type: "Booking" | "Franchise" | "School" | "Consultation";
  name: string;
  phone: string;
  date: string;
  extraDetails?: string;
}
