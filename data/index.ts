/**
 * Single source of truth for every piece of content on the site.
 *
 * Kept in sync with the CV (Talha Abbas - FullStack). Job titles, dates and
 * metrics here should match the PDF exactly - a recruiter cross-checking the
 * two should never find a discrepancy.
 */

export const personalInfo = {
  name: "Talha Abbas",
  headline: "Senior Software Engineer & AI Engineer",
  roles: [
    "Senior Software Engineer",
    "Full-Stack Engineer",
    "AI Engineer",
    "Technical Lead",
  ],
  title: "Full-Stack Software Engineer | AI Engineer | Technical Lead",
  tagline: "I build production systems — and the AI that runs inside them.",
  summary:
    "Full-Stack Software Engineer with 5+ years architecting and shipping production web, mobile and desktop applications with React, Next.js, Node.js and MongoDB — now building LLM-powered systems with Python, LangChain, LangGraph, RAG pipelines and vector databases. Promoted to Senior after leading 15+ end-to-end builds for international clients, from database schema through deployed UI.",
  shortSummary:
    "5+ years shipping production software end to end. Now building agentic AI systems — RAG, LangGraph, vector search — on top of that foundation.",
  email: "talhaatdev@gmail.com",
  phone: "+92 309 5589184",
  alternatePhone: "0309 5589184",
  location: "Lahore, Pakistan",
  timezone: "PKT (UTC+5)",
  availability: "Open to senior full-stack & AI engineering roles",
  yearsExperience: "5+",
  address: "House no 473, M Block, Sabzazar",
  portfolio: "https://talha-abbas.vercel.app",
  github: "https://github.com/TalhaAbbas55",
  linkedin: "https://www.linkedin.com/in/talha-abbas-developer/",
  whatsapp: "https://wa.me/923095589184",
  freelancer:
    "https://www.freelancer.pk/u/talhaatwork",
  resume: "/Talha-Abbas-Resume.pdf",
};

export const navItems = [
  { name: "About", link: "#about" },
  { name: "AI Lab", link: "#ai" },
  { name: "Work", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Stack", link: "#skills" },
  { name: "Contact", link: "#contact" },
];

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */

export const heroStats = [
  { value: "5+", label: "Years shipping" },
  { value: "15+", label: "End-to-end builds" },
  { value: "10k+", label: "Users reached" },
  { value: "Top 1%", label: "WakaTime 2024–25" },
];

/* ------------------------------------------------------------------ *
 * About / bento grid
 * ------------------------------------------------------------------ */

export const gridItems = [
  {
    id: 1,
    title:
      "I build production software end to end — from database schema and API contracts through to the interface that consumes them.",
    description: "Profile",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.webp",
    spareImg: "",
  },
  {
    id: 2,
    title: "Collaborating with teams across the Globe",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title:
      "Frontend, backend, mobile, desktop and now AI — the full surface area needed to ship a complete system.",
    description: "Tech stack",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title:
      "Top 1% of 500,000+ developers on WakaTime, two years running — with 1,389+ tracked coding hours per year.",
    description: "Highlights",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.webp",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title:
      "Currently building LLM-powered products: RAG pipelines, agentic workflows with LangGraph, and custom-trained OCR models in production.",
    description: "What I'm building now",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.webp",
    spareImg: "/grid.webp",
  },
  {
    id: 6,
    title:
      "Open to building ambitious products for web, mobile and AI-native platforms.",
    description: "Let's connect",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const stackLists = {
  left: ["React", "Next.js", "TypeScript", "LangChain"],
  right: ["Node.js", "Python", "MongoDB", "LangGraph"],
};

/* ------------------------------------------------------------------ *
 * AI Lab — the section this portfolio was missing entirely
 * ------------------------------------------------------------------ */

export const aiIntro = {
  eyebrow: "AI Engineering",
  title: "Building with LLMs, not just around them",
  body: "The last two years of my work have moved from CRUD to cognition. I design retrieval pipelines, orchestrate multi-step agents, train domain-specific models, and put all of it behind APIs that hold up in production — the same engineering discipline, applied to a probabilistic stack.",
};

/** The RAG pipeline diagram animates through these stages in order. */
export const ragPipeline = [
  {
    id: "ingest",
    label: "Ingest",
    detail: "PDFs, diagrams, transcripts, DB rows",
    tech: "Loaders · OCR",
  },
  {
    id: "chunk",
    label: "Chunk & Embed",
    detail: "Semantic splitting, overlap tuning",
    tech: "Embeddings",
  },
  {
    id: "store",
    label: "Vector Store",
    detail: "Similarity + metadata filtering",
    tech: "Vector DB",
  },
  {
    id: "retrieve",
    label: "Retrieve & Rerank",
    detail: "Hybrid search, top-k reranking",
    tech: "Retriever",
  },
  {
    id: "generate",
    label: "Generate",
    detail: "Grounded answers with citations",
    tech: "LLM",
  },
];

export const aiCapabilities = [
  {
    id: 1,
    title: "RAG Pipelines",
    icon: "database",
    accent: "cyan" as const,
    description:
      "End-to-end retrieval-augmented generation: document ingestion, semantic chunking, embedding, vector search and grounded generation with citations — built so answers stay traceable to source.",
    tags: ["Chunking", "Embeddings", "Vector DBs", "Hybrid search"],
  },
  {
    id: 2,
    title: "Agentic Workflows",
    icon: "workflow",
    accent: "violet" as const,
    description:
      "Multi-step agents with LangGraph: stateful graphs, tool calling, routing and human-in-the-loop checkpoints — so an agent can be reasoned about and debugged rather than just prompted at.",
    tags: ["LangGraph", "Tool calling", "State machines", "Guardrails"],
  },
  {
    id: 3,
    title: "LLM Application Layer",
    icon: "sparkles",
    accent: "pink" as const,
    description:
      "Dynamic prompt templates, structured output, streaming responses, token budgeting and evaluation loops — the unglamorous layer that decides whether an AI feature is shippable.",
    tags: ["LangChain", "Structured output", "Streaming", "Evals"],
  },
  {
    id: 4,
    title: "Custom Models & OCR",
    icon: "scan",
    accent: "teal" as const,
    description:
      "Trained a domain-specific model for electrical-diagram OCR and component counting at OpenDrawing — thousands of drawings processed at 90%+ accuracy, replacing days of manual takeoff.",
    tags: ["OCR", "Fine-tuning", "Computer vision", "Production ML"],
  },
];

export const aiStack = [
  "Python",
  "LangChain",
  "LangGraph",
  "RAG",
  "LLMs",
  "Vector Databases",
  "Embeddings",
  "OpenAI API",
  "Prompt Engineering",
  "AI Agents",
  "OCR",
  "Semantic Search",
];

/* ------------------------------------------------------------------ *
 * Certifications
 * ------------------------------------------------------------------ */

export const certifications = [
  {
    id: 1,
    title: "AI Engineer Bootcamp 2026: LLMs, RAG, AI Agents & Vector DBs",
    issuer: "Udemy",
    instructor: "Paulo Dichone",
    date: "July 5, 2026",
    length: "28 hours",
    credentialId: "UC-e9f19ae5-dbe5-49ec-9285-541d867babc9",
    url: "https://www.udemy.com/certificate/UC-e9f19ae5-dbe5-49ec-9285-541d867babc9/",
    image: "/certs/udemy-ai-engineer.webp",
    skills: [
      "LLMs",
      "RAG",
      "AI Agents",
      "Vector Databases",
      "LangChain",
      "Embeddings",
    ],
    featured: true,
  },
];

/* ------------------------------------------------------------------ *
 * Skills — categorised, with the AI track added
 * ------------------------------------------------------------------ */

export const skillCategories = [
  {
    id: "ai",
    label: "AI & Python",
    accent: "cyan" as const,
    blurb: "LLM applications, retrieval and agents.",
    skills: [
      "Python",
      "LLMs",
      "LangChain",
      "LangGraph",
      "RAG",
      "Vector Databases",
      "Embeddings",
      "OpenAI API",
      "Prompt Engineering",
      "AI Agents",
      "OCR",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    accent: "violet" as const,
    blurb: "Interfaces that stay fast under real load.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "React Native",
      "Electron.js",
      "Redux",
      "Three.js",
      "Tailwind CSS",
      "Sass/SCSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    accent: "teal" as const,
    blurb: "APIs, data models and the contracts between them.",
    skills: [
      "Node.js",
      "Express.js",
      "Nest.js",
      "MongoDB",
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "Node-RED",
      "REST API Design",
      "JWT",
      "OAuth",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    accent: "amber" as const,
    blurb: "Getting it deployed and keeping it up.",
    skills: [
      "AWS EC2",
      "AWS Amplify",
      "Route 53",
      "Vercel",
      "Docker",
      "CI/CD",
      "GitHub Actions",
    ],
  },
  {
    id: "web3",
    label: "Web3",
    accent: "pink" as const,
    blurb: "On-chain logic and contract integration.",
    skills: ["Solidity", "Web3.js", "Smart Contracts"],
  },
  {
    id: "practices",
    label: "Tools & Practices",
    accent: "violet" as const,
    blurb: "How the work actually gets shipped.",
    skills: [
      "Git",
      "GitHub",
      "Agile/Scrum",
      "Stripe",
      "Performance Optimization",
      "Code Review",
      "Mentoring",
    ],
  },
];

/** Flat marquee list for the scrolling ticker. */
export const marqueeStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "LangChain",
  "LangGraph",
  "RAG",
  "MongoDB",
  "PostgreSQL",
  "Nest.js",
  "React Native",
  "Electron.js",
  "Three.js",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "Vector DBs",
  "OpenAI API",
  "Solidity",
  "Stripe",
  "Redux",
];

/* ------------------------------------------------------------------ *
 * Projects
 * ------------------------------------------------------------------ */

export const projects = [
  {
    id: 5,
    title: "OpenDrawing",
    period: "Sep 2025 - Present",
    role: "AI-Powered BOM Platform",
    summary:
      "Custom-trained AI turns electrical diagrams into structured bills of material at 90%+ accuracy.",
    details:
      "Automated electrical diagram conversion into structured bills of material (BOM) and asset data, using a custom-trained AI model for OCR and automated component counting. Processes thousands of diagrams at 90%+ accuracy, saving electrical engineers hours to days of manual work per project.",
    metrics: [
      { value: "90%+", label: "OCR accuracy" },
      { value: "1000s", label: "Diagrams processed" },
    ],
    stack: ["Next.js", "TypeScript", "Custom AI Models", "OCR", "Node.js"],
    img: "/apps/OpenDrawing.webp",
    iconLists: ["/next.svg", "/ts.svg", "/c.svg", "/tail.svg"],
    link: "https://opendrawing.ai/",
    linkTitle: "opendrawing.ai",
    cta: "Explore project",
    featured: true,
    ai: true,
  },
  {
    id: 4,
    title: "OurOffice",
    period: "2023 - 2025",
    role: "AI Survey Platform",
    summary:
      "LangChain-driven survey engine with dynamic prompt templates and Twilio SMS, serving 10,000+ users.",
    details:
      "Built an AI-powered survey application using LangChain with dynamic prompt templates and Twilio SMS integration, handling 10,000+ users. The wider OurOffice platform improves hiring, retention and organizational performance — letting teams measure what matters and turn plans into action.",
    metrics: [
      { value: "10,000+", label: "Users handled" },
      { value: "LangChain", label: "Prompt engine" },
    ],
    stack: ["Next.js", "LangChain", "TypeScript", "Twilio", "Node.js"],
    img: "/apps/OurOffice.webp",
    iconLists: ["/next.svg", "/ts.svg", "/c.svg", "/tail.svg"],
    link: "https://www.ouroffice.io/",
    linkTitle: "ouroffice.io",
    cta: "View details",
    featured: true,
    ai: true,
  },
  {
    id: 1,
    title: "NEVERLEFT for Venues",
    period: "Feb 2024 - May 2024",
    role: "Event Ticketing Platform",
    summary:
      "Live ticketing and QR check-ins with Stripe, processing 300+ transactions a month.",
    details:
      "Launched an event management platform with live ticketing and QR code check-ins, integrating Stripe to process 300+ transactions per month. Built across React, React Native and Next.js surfaces with admin subscription controls.",
    metrics: [
      { value: "300+", label: "Transactions / month" },
      { value: "3", label: "Platforms shipped" },
    ],
    stack: ["React", "React Native", "Next.js", "Stripe", "TypeScript"],
    img: "/apps/neverLeft.webp",
    iconLists: ["/re.svg", "/next.svg", "/tail.svg", "/ts.svg"],
    link: "https://www.neverleft.co.uk/",
    linkTitle: "neverleft.co.uk",
    cta: "View project overview",
    featured: true,
    ai: false,
  },
  {
    id: 2,
    title: "Curl Compass",
    period: "Mar 2024 - May 2024",
    role: "Health Journaling App",
    summary:
      "Health-journaling app adopted by 100+ users in its first month, with real-time analytics.",
    details:
      "Developed a health-journaling app adopted by 100+ users in its first month, with secure authentication, goal tracking and a real-time analytics dashboard. Built on React Native with a Node.js and MongoDB backend.",
    metrics: [
      { value: "100+", label: "Users in month one" },
      { value: "Live", label: "On Play Store" },
    ],
    stack: ["React Native", "Node.js", "MongoDB", "TypeScript"],
    img: "/apps/curlCompass.webp",
    iconLists: ["/re.svg", "/ts.svg", "/c.svg", "/tail.svg"],
    link: "https://play.google.com/store/apps/details?id=com.hairjournel",
    linkTitle: "Play Store",
    cta: "View project profile",
    featured: false,
    ai: false,
  },
  {
    id: 3,
    title: "Aab Books",
    period: "2023 - 2024",
    role: "Cross-Platform Reader",
    summary:
      "Mobile, web and desktop reader with advanced search across 24+ books simultaneously.",
    details:
      "Developed a mobile, web and desktop book reader with enriched reader features including highlights, bookmarks and notes. Built a powerful advanced search module enabling users to search across 24+ books simultaneously.",
    metrics: [
      { value: "24+", label: "Books searchable at once" },
      { value: "3", label: "Platforms from one codebase" },
    ],
    stack: ["React", "React Native", "Electron.js", "TypeScript"],
    img: "/apps/aabBooks.webp",
    iconLists: ["/re.svg", "/ts.svg", "/tail.svg", "/c.svg"],
    link: "https://www.lucistrust.org/",
    linkTitle: "Lucis Trust",
    cta: "View project",
    featured: false,
    ai: false,
  },
  {
    id: 6,
    title: "Custom Websites Club",
    period: "Nov 2022 - Aug 2023",
    role: "AI Website Builder",
    summary:
      "Drag-and-drop builder wired to the OpenAI API, cutting design effort by 60%.",
    details:
      "Created an AI-based website builder with drag-and-drop widgets and live preview, connecting the OpenAI API to auto-generate content and cut design effort by 60%. Backend services powered by Node.js, Node-RED and MongoDB.",
    metrics: [
      { value: "-60%", label: "Design effort" },
      { value: "-40%", label: "Client onboarding time" },
    ],
    stack: ["React", "Node.js", "Node-RED", "MongoDB", "OpenAI API"],
    img: "/apps/customWebsitesClub.webp",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://www.customwebsites.club/",
    linkTitle: "customwebsites.club",
    cta: "Explore project details",
    featured: false,
    ai: true,
  },
];

/* ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
      "Exceptional programmer. Professional but friendly and personable. The project was delivered on time and at a fair and reasonable price. Great communication and went above and beyond for me as a client. I would fully recommend Talha for your project.",
    name: "Verified client",
    title: "Python Project",
    href: "https://www.freelancer.pk/u/talhaatwork?review_context_id=38818759&review_type=project&frm=talhaatwork&sb=t",
    avatar: "/person1.svg",
  },
  {
    quote:
      "Talha is a very talented freelancer. He works very hard, which is unforgettable. Thanks for your hard work.",
    name: "Verified client",
    title: "iOS Application",
    href: "https://www.freelancer.pk/u/talhaatwork?review_context_id=38989815&review_type=project&frm=talhaatwork&sb=t",
    avatar: "/person2.svg",
  },
  {
    quote: "Perfect! Will recommend and keep working with him.",
    name: "Verified client",
    title: "Website Development",
    href: "https://www.freelancer.pk/u/talhaatwork?review_context_id=38906779&review_type=project&frm=talhaatwork&sb=t",
    avatar: "/person3.svg",
  },
  {
    quote: "Diligent with his work.",
    name: "Verified client",
    title: "Web Application",
    href: "https://www.freelancer.pk/u/talhaatwork?review_context_id=38785201&review_type=project&frm=talhaatwork&sb=t",
    avatar: "/person4.svg",
  },
];

/* ------------------------------------------------------------------ *
 * Highlight metrics
 * ------------------------------------------------------------------ */

export const highlights = [
  {
    id: 1,
    label: "Experience",
    stat: "5+",
    unit: "years",
    value: "Shipping web, mobile and desktop products end to end.",
  },
  {
    id: 2,
    label: "Reach",
    stat: "10,000+",
    unit: "users",
    value: "Supported across the products and systems I have shipped.",
  },
  {
    id: 3,
    label: "Recognition",
    stat: "Top 1%",
    unit: "on WakaTime",
    value: "Among 500,000+ developers in both 2024 and 2025.",
  },
  {
    id: 4,
    label: "Impact",
    stat: "+40%",
    unit: "platform performance",
    value: "Plus a 25% improvement in feature turnaround time.",
  },
];

/* ------------------------------------------------------------------ *
 * Experience — verbatim from the CV
 * ------------------------------------------------------------------ */

export const workExperience = [
  {
    id: 1,
    company: "Open Drawing",
    title: "Senior Software Engineer",
    period: "Sep 2025 - Present",
    start: "2025",
    location: "Costa Mesa, California (Remote)",
    current: true,
    desc: "Owning architecture end to end across three production products, from API contracts through the React and Next.js interfaces that consume them.",
    points: [
      "Own architecture end to end for 3 production products (Admin, Staff and End-User portals), from API contracts through the React and Next.js interfaces that consume them.",
      "Re-architected rendering and state management to improve performance and reliability under peak load.",
      "Standardized a shared component library and API client layer across all 3 products, removing an estimated third of duplicated code and shortening feature delivery.",
    ],
    stack: ["Next.js", "React", "TypeScript", "AI/OCR", "Node.js"],
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    company: "Isoft Studios",
    title: "Senior Software Engineer",
    period: "Mar 2025 - Sep 2025",
    start: "2025",
    location: "Lahore, Pakistan",
    current: false,
    desc: "Owned 4+ MERN projects end to end and built an AI-powered survey platform on LangChain serving 10,000+ users.",
    points: [
      "Owned 4+ MERN stack projects end to end, including database schema design in MongoDB, REST API architecture in Nest.js and Express, and the React frontends that shipped on top.",
      "Built an AI-powered survey application (OurOffice) using LangChain with dynamic prompt templates and Twilio SMS integration, handling 10,000+ users.",
      "Mentored developers on a 6-person team and introduced structured code reviews, improving feature turnaround by 25%.",
    ],
    stack: ["LangChain", "Nest.js", "MongoDB", "React", "Twilio"],
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    company: "Zweidevs",
    title: "Software Engineer",
    period: "Aug 2023 - Mar 2025",
    start: "2023",
    location: "Lahore, Pakistan",
    current: false,
    desc: "Shipped 4+ cross-platform applications reaching 1,000+ active users, and cut peak-load API response times by roughly a third.",
    points: [
      "Shipped 4+ cross-platform applications end to end with React, React Native, Electron.js and a Node.js/MongoDB backend, reaching 1,000+ active users.",
      "Redesigned MongoDB schema and query patterns for the two highest-traffic services, cutting API response times under peak load by roughly a third.",
      "Scoped technical estimates and timelines for high-priority proposals, directly contributing to $5,000+ in won client deals.",
    ],
    stack: ["React Native", "Electron.js", "React", "Node.js", "MongoDB"],
    className: "md:col-span-2",
    thumbnail: "/exp3.webp",
  },
  {
    id: 4,
    company: "Nayyar Technologies",
    title: "Software Engineer",
    period: "Jun 2021 - Aug 2023",
    start: "2021",
    location: "Lahore, Pakistan",
    current: false,
    desc: "Built the backend and drag-and-drop UI for an AI-powered website builder, cutting client onboarding time by 40%.",
    points: [
      "Built both the backend and the drag-and-drop UI for an AI-powered website builder, cutting client onboarding time by 40%.",
      "Designed and integrated 20+ RESTful APIs with Node.js and Express, replacing a legacy Node-RED backend and improving system modularity.",
      "Lifted platform performance by 40% and client sales by 15% through backend refactoring and real-time React and Redux UI work.",
    ],
    stack: ["Node.js", "Express", "React", "Redux", "Node-RED"],
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

/* ------------------------------------------------------------------ *
 * Education & achievements
 * ------------------------------------------------------------------ */

export const education = {
  degree: "Bachelor of Science in Information Technology",
  institution: "University of Education, Lahore",
  note: "Merit scholarship recipient.",
  coursework: [
    "Data Structures",
    "Advanced Web Development",
    "Software Engineering",
  ],
};

export const achievements = [
  {
    id: 1,
    stat: "Top 1%",
    title: "WakaTime, 2024 & 2025",
    description:
      "Ranked in the top 1% of 500,000+ developers, with 1,389+ hours of tracked active coding per year.",
  },
  {
    id: 2,
    stat: "2nd / 43",
    title: "PUCON national competition",
    description:
      "Placed second out of 43 competing universities at PUCON, hosted by Punjab University.",
  },
];

export const journeyCards = [
  {
    id: 1,
    title: "Education",
    label: "Background",
    description:
      "Bachelor of Science in Information Technology from the University of Education, Lahore, on a merit scholarship. Coursework in data structures, advanced web development and software engineering.",
    canvasClassName: "bg-emerald-900 rounded-3xl overflow-hidden",
    colors: undefined,
    animationSpeed: 5.1,
  },
  {
    id: 2,
    title: "Achievements",
    label: "Recognition",
    description:
      "Top 1% of 500,000+ developers on WakaTime in both 2024 and 2025 with 1,389+ hours tracked per year, and runner-up at PUCON among teams from 43 universities.",
    canvasClassName: "bg-pink-900 rounded-3xl overflow-hidden",
    colors: [
      [255, 166, 158],
      [221, 255, 247],
    ],
    animationSpeed: 3,
  },
  {
    id: 3,
    title: "Interests",
    label: "Focus areas",
    description:
      "Applied AI and agentic systems, blockchain and Web3, open-source work, and coding challenges that sharpen systems thinking and product execution.",
    canvasClassName: "bg-sky-600 rounded-3xl overflow-hidden",
    colors: [[125, 211, 252]],
    animationSpeed: 3,
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    href: "https://github.com/TalhaAbbas55",
    label: "GitHub",
  },
  {
    id: 2,
    img: "/link.svg",
    href: "https://www.linkedin.com/in/talha-abbas-developer/",
    label: "LinkedIn",
  },
  {
    id: 3,
    img: "/wha.svg",
    href: "https://wa.me/923095589184",
    label: "WhatsApp",
  },
];
