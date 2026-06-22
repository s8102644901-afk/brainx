import { Program, SEOPost, CampaignAsset, Testimonial, BrandAsset } from "./types";

export const BRAND_ASSETS: BrandAsset = {
  tagline: "Unwind the Genius",
  mission: "To inspire and empower the next generation by combining the scientific precision of Howard Gardner's Multiple Intelligence theory with ancient value-based moral foundations — building cognitive sovereignty against passive screens.",
  brandVoice: "Scientific, highly authoritative, deeply ethical, future-ready, and encouraging. Grounding children's cognitive development in biological fingerprint maps and family values.",
  colorTheory: [
    { name: "Cosmic Midnight", hex: "#08080A", psychology: "Elite space and brain science baseline for futuristic tech-startup authority." },
    { name: "Synaptic Indigo", hex: "#6366F1", psychology: "Brain-mapping connectivity, rapid cognitive synchronization and integration." },
    { name: "Solar Amber", hex: "#F59E0B", psychology: "Creativity, conscious alpha states, warmth, and high moral intelligence." },
    { name: "Bio-Genic Emerald", hex: "#10B981", psychology: "Neuroplasticity, diagnostic integrity, child development and natural grow." }
  ],
  typography: [
    { role: "Display Headings", family: "Space Grotesk", specs: "Bold geometric layout for premium high-performance digital presence." },
    { role: "Body & Details", family: "Plus Jakarta Sans", specs: "Elegant, accessible, responsive reading with beautiful whitespace grids." },
    { role: "Telemetry Data", family: "Fira Code", specs: "Monospaced alignment for representing precision brain-mapping figures." }
  ]
};

export const STATISTICS = {
  schoolsCollaborations: "160+",
  schoolLabel: "School Collaborations in Pune & Nationally",
  dmitTests: "80,000+",
  dmitTestsLabel: "DMIT Audits Conducted",
  studentsTrained: "45,000+",
  studentsLabel: "Active Students Trained",
  teachersEmpowered: "15,000+",
  teachersLabel: "Certified Educators Empowered",
  parentsGuided: "3,00,000+",
  parentsLabel: "High-EQ Parents Guided"
};

export const PROGRAMS: Program[] = [
  {
    id: "dmit",
    title: "DMIT Cognitive Brain Mapping",
    shortDescription: "Scientific fingertip ridge analysis based on Howard Gardner's Multiple Intelligence model to reveal inborn talent pathways.",
    longDescription: "Dermatoglyphics Multiple Intelligence Test (DMIT) is a patented biometric analysis that maps children's prefrontal, parietal, temporal, occipital, and frontal lobes. Developed on the scientifically validated link that fingertip epidermal ridges form concurrently with brain neocortex layers during weeks 13-21 of embryonic gestation, DMIT enables parents to decipher their kids' innate learning styles (Visual, Auditory, Kinesthetic) without subjective trial-and-error.",
    scientificBasis: "Rooted in clinical embryology and Dr. Howard Gardner's cognitive science showing that humans possess multiple distinct intelligence quotients (logical, spatial, bodily-kinesthetic, linguistic, musical, interpersonal, and intrapersonal).",
    ageBracket: "Trained on Kids of Ages 2 to 18 & Adults",
    duration: "1 Biometric Mapping Scan + 2-Hour Pediatric Counselor Consultation",
    cognitiveDominance: "Prefrontal Leadership Index, Left-vs-Right Hemisphere Coherence Index.",
    colorTheme: "cyan",
    bannerImage: "/images/program_dmit_1781776619206.png",
    metrics: ["Lobe Density Strengths", "Inborn Talent Propensities", "Visual vs Auditory vs Kinesthetic (VAK) Ratio", "Creative vs Logical Hemisphere Dominance"],
    benefits: [
      "No more academic guesswork: Align secondary coaching classes with their biological sensory input type.",
      "Avert parent-child friction: Understand your child's natural temperament (Analytical vs Affective).",
      "Career Stream Optimization: Select matching domains (Engineering, Management, Design, Research) before traditional tuition exhaustion.",
      "Improve attention spans by tailoring tutoring material to their dominant brain lobe's sensory comfort."
    ],
    stages: [
      { title: "Stage 01: Biometric Dermal Scan", description: "Secure, non-invasive digital scanning of the unique ridge formations on all ten fingers." },
      { title: "Stage 02: Quantitative Lobe Mapping", description: "Calculating total ridge count and synaptic variables using BrainX India's algorithmic processing." },
      { title: "Stage 03: Specialist Consult", description: "A detailed 1-on-1 parenting roadmap session with a certified pediatric counseling expert." }
    ],
    process: [
      "Select home service mapping or visit one of our diagnostic franchise centers across India.",
      "The digital biometric scan is processed to formulate a dense 34-page premium neurological dossier.",
      "Conclude with a private counseling session customized around your child's innate developmental traits."
    ],
    faqs: [
      { question: "Is DMIT a projection model like palmistry?", answer: "No. Dermatoglyphics is a peer-reviewed biological science. Dermato (skin) glyphs (curves) are genetically synced with neural hemisphere growth during embryonic development. It represents static biological predisposition, not future prediction." },
      { question: "Is DMIT useful for teenagers and adults?", answer: "Indeed. It reveals core career alignments, blindspots, and interpersonal stress-regulation habits, removing the anxiety of early academic stream selection." }
    ]
  },
  {
    id: "midbrain",
    title: "Centre Brain Ignition",
    shortDescription: "Unlocking diencephalon-mediated sensory synesthesia to foster photographic visual recall and instant Alpha-wave flow.",
    longDescription: "The centre brain serves as the critical communications bridge between left and right hemispheres. In the current digital landscape, children suffer from electronic screen over-stimulation, which suppresses centre brain coordination, causing executive attention strain. Utilizing patented binaural frequencies, sensory coherence tasks, and non-visual spatial projection, we shift child mind states into the creative Alpha baseline (8-12 Hz) at will.",
    scientificBasis: "By teaching kids to coordinate without visual monitor chatter, the brain synthesizes ambient inputs (tactile, thermal, auditory), activating advanced pathways of near-photographic memory.",
    ageBracket: "Perfect for Kids of Ages 5 to 15",
    duration: "12-Week Interactive Lab Series (Interactive Cohorts)",
    cognitiveDominance: "Instant Alpha Wave Transition, Visual Spatial Tracking Velocity.",
    colorTheme: "violet",
    bannerImage: "/images/program_centre_1781776635602.png",
    metrics: ["Alpha-Wave Output Coherence", "Peripheral Tracking Width", "Non-Visual Color Synthesis Rate", "Focus Recovery Speed"],
    benefits: [
      "Restore shattered focus: Transition from digital hyper-activation to deep concentration within 90 seconds.",
      "Accelerated visual reading: Absorb paragraphs in smooth vertical sweeps rather than exhausting horizontal tracking.",
      "High self-trust: Unleash sensory synesthesia, including blindfolded coordination, by learning to utilize complete spatial cues.",
      "Reduce classroom exhaustion: Retain mathematical complex sequences with spatial memory grids."
    ],
    stages: [
      { title: "Stage 01: Binaural Sync Resonance", description: "Exposing auditory lobes to harmless, medical-grade rhythmic frequencies that synchronize both hemispheres." },
      { title: "Stage 02: Space Sensory Play", description: "Blindfolded exercises that accelerate tactual, auditory, and olfactory spatial interpretation parameters." },
      { title: "Stage 03: Voluntary Alpha Lock-in", description: "Training children to activate high-performance calm flow states for normal daily homework." }
    ],
    process: [
      "Complete a preliminary DMIT evaluation to assess current occipital baseline strength.",
      "Attend structured weekly cohort sessions inside electromagnetically shielded, light-controlled sensory labs.",
      "Maintain simple 10-minute daily acoustic and coordinate exercise guides at home."
    ],
    faqs: [
      { question: "What is blindfolded reading or color sensing?", answer: "It is an exercise of sensory compensation. When visual perception is closed, the brain is trained to translate thermal drafts, acoustic frequencies, and skin tactility into a rich spatial mental image—letting certified students read accurately while securely blindfolded." },
      { question: "Is this safe for children with mild focus issues?", answer: "Yes, it is highly therapeutic. It has been shown to decrease cortisol levels and shift children from anxious Beta states into calm, focused Alpha states." }
    ]
  },
  {
    id: "parenting",
    title: "Modern-Day Parenting Challenges",
    shortDescription: "Neuropsychological boundaries designed to rescue your home from screen addiction, continuous meltdowns, and digital fatigue.",
    longDescription: "Parenting today is significantly different from what it was 20–30 years ago. Rapid technological, social, educational, and economic changes have created new challenges for parents. Modern-Day Parenting Challenges addresses digital addiction, peer social media comparisons, and emotional isolation directly using actionable, science-guided communication scripts and dopamine-balance schedules.",
    scientificBasis: "Combines pediatric clinical focus drills with dopamine reset schedules to reverse screen-induced gray matter reduction based on our core parenting formula: Character + Competency + Confidence + Compassion = Future-Ready Child.",
    ageBracket: "Tailored for Parents of Teens & Kids",
    duration: "3-Hour Deep-Dive Live Interactive Masterclass & Q&A",
    cognitiveDominance: "Digital Screen Defense Mechanics, High-EQ Parent-Child Alignment.",
    colorTheme: "emerald",
    bannerImage: "/images/program_parenting_1781776649774.png",
    metrics: ["Digital Toxicity Baseline", "Home Acoustic Haven Score", "EQ Communication Index", "Screen-to-Active Ratio"],
    benefits: [
      "Digital Addiction & Screen Time: Counter excessive use of smartphones, tablets, gaming, and social media while establishing sleep-safe routines.",
      "Social Media Influence: Build high self-esteem and digital responsibility, neutralizing peer comparison and online pressure.",
      "Mental Health: Create emotionally safe environments and encourage open communication to relieve anxiety, stress, and isolation.",
      "Academic Pressure: Balance achievements with genuine emotional well-being to avoid modern student burnout.",
      "Value System & Character Building: Instill patience, gratitude, discipline, empathy, and responsibility in children while respecting individuality."
    ],
    stages: [
      { title: "Stage 01: Toxicity Audit", description: "Tracking passive screen schemas and highlighting behavior-disruptive triggers." },
      { title: "Stage 02: Spatial Redirection", description: "Introducing coordinate toys and spatial tasks that flood the brain with natural, healthy dopamine." },
      { title: "Stage 03: Communication Scripting", description: "Deploying high-EQ scientific scripts to de-escalate digital withdrawal tantrums." }
    ],
    process: [
      "Understand the shift: Assess how modern fast-paced developments differ from the parental dynamics of 20-30 years ago.",
      "Integrate the 5 core parenting duties: Character building, competency training, emotional well-being, digital awareness, and future prep.",
      "Implement the tailored 21-day family screen detox protocols utilizing our structured manuals."
    ],
    faqs: [
      { question: "Should we absolute ban screens at home?", answer: "No. Bans trigger anxiety and secret consumption. We train you to establish high screen resilience, so children naturally choose physical spatial tasks over digital feeds." },
      { question: "Are these parenting sessions conducted in traditional school workshops?", answer: "Yes, BrainX India is a primary counseling partner with 160+ elite schools in Pune and nationally." }
    ]
  },
  {
    id: "value",
    title: "Importance of Value Education in Today's World",
    shortDescription: "Melding futuristic brain science with foundational moral values to nurture empathic, highly ethical future leaders.",
    longDescription: "In today's fast-changing world, academic excellence alone is not enough. Children require strong values, ethics, emotional intelligence, and social responsibility to become successful and responsible human beings. This program bridges cognitive knowledge, moral values, and real-world action to empower balanced leadership.",
    scientificBasis: "Prefrontal cortex strengthening through conscious empathy training, moral decision trees, and systematic character index mapping under our formula: Character + Competency + Compassion + Confidence = Successful & Responsible Human Being.",
    ageBracket: "Ages 6 to 16 & Teenagers",
    duration: "6-Month Integrated Ethics & Focus Syllabus",
    cognitiveDominance: "Empathy Quotient (EQ), Adversity Quotient (AQ), Ethical Decision Velocity.",
    colorTheme: "amber",
    bannerImage: "/images/program_value_1781776663397.png",
    metrics: ["Moral Judgment Index", "Integrity Coefficient Score", "Adversity Quotient Rating", "Interpersonal Communication Comfort"],
    benefits: [
      "Builds Strong Character: Fosters internal integrity, self-discipline, and deep respect for elders and teachers.",
      "Develops Responsible Citizens: Prepares future leaders who act with empathy, reducing negative peer-driven behavior.",
      "Value Education in the Digital Age: Teaches technology responsibility, critical thinking, and respectful digital citizenship.",
      "Encourages Communication: Connects parents and educators as prime examples of positive reinforcement and compassion.",
      "Holistic Progress: Synchronizes Head (Knowledge), Heart (Values), and Hands (Action) for a truly balanced human development."
    ],
    stages: [
      { title: "Stage 01: Empathy Mapping", description: "Interactive scenario games that measure and stretch conversational empathy boundaries." },
      { title: "Stage 02: Integrity Scenarios", description: "Engaging roleplays that model decision-making under modern digital peer pressure." },
      { title: "Stage 03: Community Service Projects", description: "Applying values in real-world collaborative teams to experience parent and elder gratitude." }
    ],
    process: [
      "Incorporate the BrainX Value Syllabus alongside traditional school classes.",
      "Utilize our proprietary Character Ledger to track moral, focus, and behavioral progress.",
      "Receive quarterly Character Maps alongside scientific cognitive DMIT reviews."
    ],
    faqs: [
      { question: "How does moral education connect with brain science?", answer: "Morality is governed by the prefrontal cortex — the brain's executive hub. Regular empathy training, perspective-taking, and value-based self-discipline strengthen neural pathways that direct focus and long-term planning." },
      { question: "Can schools integrate this values syllabus?", answer: "Absolutely. We currently collaborate with over 160 schools to integrate this holistic framework into their standard curriculum." }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    parentName: "Dr. Sandeep Deshmukh & Mrs. Swati Deshmukh",
    parentProfession: "Neuro-Surgeon & High School Counselor (Pune)",
    childProfile: "Aarav, Age 9 (Severe digital distraction, attention deficits)",
    programTaken: "DMIT Mapping + Centre Brain Ignition Program",
    storyHeading: "Unlocking extraordinary photographic memory and calm focus, replacing tablet addiction.",
    storyText: "Our son Aarav was highly hyperactive, throwing intense tantrums whenever the iPad was removed. As a surgeon, I knew digital over-stimulation was straining his prefrontal cortex. BrainX India scanned his fingerprints to reveal his dominant parietal lobe and kinesthetic style. We enrolled him in the Centre Brain Ignition program. The change is remarkable: Aarav now sits with deep focus for long periods, reads books calmly, and can even sense spatial colors blindfolded with outstanding alphawave coherence. He has evolved from a digital consumer into an active human thinker.",
    resultsObserved: ["90% reduction in digital cravings in 30 days", "Can recall 12-digit math sequences visually with ease", "Profound mutual respect and positive communication at home"],
    initialPainPoint: "Severe mobile-screen dependency, math anxiety, lack of core focus.",
    avatarUrl: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: "t2",
    parentName: "Principal Mrs. Radhika Sen & Dr. Alok Sen",
    parentProfession: "Elite Academician & Biotech Director",
    childProfile: "Ananya, Age 13 (High academic panic, poor social confidence)",
    programTaken: "Value Education & Human Intelligence (HI) Bootcamp",
    storyHeading: "Transforming exam anxiety into resilient, high-EQ leadership.",
    storyText: "Standard schools teach memorization, which AI does instantly. My daughter Ananya was highly anxious about her mock exams and suffered low self-esteem. BrainX provided an unerring DMIT blueprint of her Multiple Intelligences, followed by character training. She learned to embrace her high interpersonal potential, leading her school's science team to victory. BrainX did not just train her brain; they built her character and resilience for the next century.",
    resultsObserved: ["3x increase in public speaking confidence metrics", "Avenue for high-integrity independent homework completed", "Profound emotional resilience in dealing with competitive challenges"],
    initialPainPoint: "Exam panic attacks, social isolation, and rigid rote-learning burnout.",
    avatarUrl: "https://i.pravatar.cc/150?img=5"
  }
];

export const SEO_POSTS: SEOPost[] = [
  {
    id: "seo1",
    title: "Neuroscience of Screen Addiction: Restoring Your Child's Prefrontal Cortex",
    slug: "neuroscience-screen-addiction-developing-brain",
    category: "Neurology of Focus",
    readTime: "8 Min Read",
    parentPainPoint: "Severe children meltdowns when smartphones are detached.",
    scientificAngle: "Grey matter volume reductions in children on passive high-rewards digital schemas exceeding 3 hours daily.",
    keywords: ["screen addiction in children", "developing brain dopamine detox", "pune school brain mapping", "child attention span rescue"],
    outline: [
      "The rapid-swipe dopamine cycle: Why traditional board games feel 'boring' to kids.",
      "Physical prefrontal cortex strain: What clinical scans say about digital dopamine addiction.",
      "The 3-Dimensional Spatial Shift: Exchanging cellular feeds for coordinate-sync physical exercises.",
      "Free screening vouchers at BrainX India's diagnostic centers."
    ]
  },
  {
    id: "seo2",
    title: "Howard Gardner's Multiple Intelligence Theory: The Death of Rote-Coaching Classes",
    slug: "howard-gardner-theory-multiple-intelligence-education",
    category: "Scientific Learning",
    readTime: "10 Min Read",
    parentPainPoint: "Expending thousands in traditional tuitions that fail to improve natural focus.",
    scientificAngle: "Linear standard school metrics only grade logical-linguistic quotients, ignoring spatial, musical, and interpersonal capacities of child brains.",
    keywords: ["howard gardner multiple intelligence", "dmit test pune", "know child talents early", "why traditional coaching fails"],
    outline: [
      "The obsolete standardized child: Why memory-grinding is a losing battle in the AI era.",
      "Introducing the 8 distinct intelligences: Logical, Kinesthetic, Verbal, Musical, and more.",
      "Biometric Ridge Corelation: Mapping embryonic dermal fingerprints directly to lobe density.",
      "Building custom educational pathways tailored around your child's biological strengths."
    ]
  }
];

export const CAMPAIGNS: CampaignAsset[] = [
  {
    id: "c1",
    title: "The BrainX India 'Digital Mirror' Awareness Project",
    platform: "Instagram",
    hook: "Is your child developing their natural brain, or are tech algorithms hijacking their potential?",
    narrativeOutline: "A high-fidelity cinematic video of a young boy and girl sitting in a dark room, blue screen light reflecting off their faces. Slowly, we pan to trace their fingerprint ridges under a digital zoom lens, fading into a brain scan showing cognitive zones sparking under spatial coordinate games. Features a message detailing the 90-Second Focus card technique.",
    callToAction: "Visit our bio link to test your kid's online digital toxicity fatigue score."
  },
  {
    id: "c2",
    title: "The 'AI-Ready Child' Leadership Masterclass",
    platform: "Webinar",
    hook: "The standard academic child is highly vulnerable in 2026. How to cultivate human strengths that conversational AI cannot replace.",
    narrativeOutline: "A 45-minute live diagnostic presentation illustrating how generative AI solves standard high-school algebra chemistry tests in 1.2 seconds, proving rote learning creates robot-like thinking. Shows parents how to build custom prefrontal cortex focus drills and leverage DMIT biometrics.",
    callToAction: "Reserve seat at local physical parenting seminar + secure a complimentary DMIT digital fingerprint mapping voucher."
  }
];

export const TECHNICAL_RECOMMENDATIONS = {
  stackComponents: [
    { name: "Frontend Architecture", tech: "Next.js 15 / React 19 / TypeScript 5", rationale: "Delivers responsive multi-page path navigation with zero latency, providing rapid diagnostic calculations and seamless viewport transitions." },
    { name: "Interactive Aesthetics", tech: "Framer Motion 12", rationale: "Enables elegant glassmorphism effects, interactive brain-lobe mapping graphs, and premium whitespace scrolling structures." },
    { name: "Scalable Content & CRM", tech: "NodeJS / Express 5 API server + Sanity CMS", rationale: "Handles sensitive consultation registrations, secures biometric diagnostic data, and manages SEO blog posts with elite security." },
    { name: "Database Storage", tech: "MongoDB Atlas & Firebase Security Rules", rationale: "Organizes structured collections of parent-completed checklists, franchise applications, and active seminar leads." },
    { name: "Hosting Platform", tech: "Vercel Enterprise Edge CDN", rationale: "Guarantees rapid page loading speeds (<150ms) across India for school coordinates, franchise dashboards, and lead-generation funnels." }
  ],
  hostingGuidelines: {
    platform: "Vercel / AWS Elastic Container Service (ECS)",
    scalability: "Engineered to scale gracefully during high-traffic webinar registrations, hosting up to 50,000+ parents simultaneously.",
    security: "Enforces industry-leading SSL encryption, secure API proxying, and strict compliance protocols for parent and child contact privacy."
  }
};
