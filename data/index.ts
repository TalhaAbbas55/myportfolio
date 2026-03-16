export const personalInfo = {
  name: "Talha Abbas",
  headline: "Full-stack product engineer and Technical Lead",
  title: "Software Engineer | Full-Stack Developer | Technical Lead",
  summary:
    "5+ years delivering systems at scale. Experience spans frontend architecture, backend design, mobile platforms, and shipping products with global teams. Core stack: React, Next.js, Node.js, MongoDB, Express—with depth in performance, API design, and production reliability.",
  email: "talhaatdev@gmail.com",
  phone: "+92 309 5589184",
  alternatePhone: "0309 5589184",
  location: "Lahore, Pakistan",
  address: "House no 473, M Block, Sabzazar",
  portfolio: "https://talha-abbas-portfolio.vercel.app/",
  github: "https://github.com/TalhaAbbas55",
  linkedin: "https://www.linkedin.com/in/talha-abbas-developer/",
};

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title:
      "I build production software end to end, from user-facing applications to APIs, platform logic, and product architecture.",
    description: "Profile",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Collaborating with remote teams across the Globe",
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
      "Strong across frontend, backend, integrations, and the engineering discipline required to ship complete systems.",
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
      "Top 1% WakaTime ranking and national competition recognition, backed by consistent product delivery.",
    description: "Highlights",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title:
      "5+ years across web, mobile, desktop, Web3, AI-assisted workflows, and high-traffic product environments.",
    description: "Career snapshot",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title:
      "Open to building ambitious products for web, mobile, and internal platforms.",
    description: "Let's connect",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const stackLists = {
  left: ["React", "Next.js", "TypeScript", "React Native"],
  right: ["Node.js", "Express", "MongoDB", "Nest.js"],
};

export const projects = [
  {
    id: 1,
    title: "NEVERLEFT for Venues",
    period: "Feb 2024 - May 2024",
    summary:
      "Real-time ticketing & venue management with QR entry, Stripe payments, and admin subscription controls.",
    details:
      "Built a real-time venue and ticketing experience with QR-based entry flows, Stripe payments, and admin subscription management across React, React Native, and Next.js surfaces.",
    img: "/apps/neverLeft.png",
    iconLists: ["/re.svg", "/next.svg", "/tail.svg", "/ts.svg"],
    link: "https://www.neverleft.co.uk/",
    linkTitle: "NeverLeft",
    cta: "View project overview",
  },
  {
    id: 2,
    title: "Curl Compass",
    period: "Mar 2024 - May 2024",
    summary:
      "Mobile wellness app for tracking health goals with journaling and progress insights.",
    details:
      "Developed a mobile application that acts as a journal for females to track their heart health progress, including personalized tracking, reminders, and visualization of trends.",
    img: "/apps/curlCompass.png",
    iconLists: ["/re.svg", "/ts.svg", "/c.svg", "/tail.svg"],
    link: "https://play.google.com/store/apps/details?id=com.hairjournel",
    linkTitle: "Play Store",
    cta: "View project profile",
  },
  {
    id: 3,
    title: "Aab Books",
    period: "2023 - 2024",
    summary:
      "Cross-platform book reader with bookmarks, highlights, notes, and multi-book search.",
    details:
      "Developed mobile, web, and desktop book reader application with enriched reader features including highlights, bookmarks, and notes. Built powerful search and advanced search module enabling users to search across 24+ books simultaneously.",
    img: "/apps/aabBooks.png",
    iconLists: ["/re.svg", "/ts.svg", "/tail.svg", "/c.svg"],
    link: "https://www.lucistrust.org/",
    linkTitle: "Lucis Trust",
    cta: "View project",
  },
  {
    id: 4,
    title: "Our Office Trivvy",
    period: "2023 - 2024",
    summary:
      "Workplace platform for hiring, retention, and team performance analytics.",
    details:
      "Built the OurOffice platform and tools to improve hiring, retention, and organizational performance. Enabled teams to measure what matters, turn plans into action, and engage safely and effectively.",
    img: "/apps/OurOffice.png",
    iconLists: ["/next.svg", "/ts.svg", "/c.svg", "/tail.svg"],
    link: "https://www.ouroffice.io/",
    linkTitle: "OurOffice",
    cta: "View details",
  },
  {
    id: 5,
    title: "OpenDrawing",
    period: "2024 - Present",
    summary:
      "Automated electrical diagram conversion into structured BOMs and asset data.",
    details:
      "Led engineering on platform converting electrical diagrams into system-ready bills of material. Implemented OCR, domain-specific AI models, automated component counting, and structured data generation for seamless BOM and asset management integration.",
    img: "/apps/OpenDrawing.png",
    iconLists: ["/next.svg", "/ts.svg", "/c.svg", "/tail.svg"],
    link: "https://opendrawing.ai/",
    linkTitle: "OpenDrawing",
    cta: "Explore project",
  },
  {
    id: 6,
    title: "Custom Websites Club",
    period: "Nov 2022 - Aug 2023",
    summary:
      "AI-driven website builder with drag-and-drop UI and live preview.",
    details:
      "Built an AI-based website builder with dynamic widgets, live preview capabilities, and backend services powered by Node.js, Node-RED, and MongoDB.",
    img: "/apps/customWebsitesClub.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://www.customwebsites.club/",
    linkTitle: "Custom Websites Club",
    cta: "Explore project details",
  },
];

export const testimonials = [
  {
    quote:
      "Exceptional programmer. Professional but friendly and personable. The project was delivered on time and at a fair and reasonable price. Great communication and went above and beyond for me as a client. I would fully recommend Talha for your project.",
    name: "Client Review (Click to view)",
    title: "Python Project",
    href: "https://www.freelancer.pk/u/talhaatwork?review_context_id=38818759&review_type=project&frm=talhaatwork&sb=t",
    avatar: "/person1.svg",
  },
  {
    quote:
      "Talha is very talented Freelancer .. He work very hard which is unforgettable .. Thanks for your hard work",
    name: "Client Review (Click to view)",
    title: "IOS Application",
    href: "https://www.freelancer.pk/u/talhaatwork?review_context_id=38989815&review_type=project&frm=talhaatwork&sb=t",
    avatar: "/person2.svg",
  },
  {
    quote: "Perfect!! Will recommend and keep working with him!",
    name: "Client Review (Click to view)",
    title: "Website Development ",
    href: "https://www.freelancer.pk/u/talhaatwork?review_context_id=38906779&review_type=project&frm=talhaatwork&sb=t",
    avatar: "/person3.svg",
  },
  {
    quote: "Diligent with his work",
    name: "Client Review (Click to view)",
    title: "Web Application",
    href: "https://www.freelancer.pk/u/talhaatwork?review_context_id=38785201&review_type=project&frm=talhaatwork&sb=t",
    avatar: "/person4.svg",
  },
];

export const highlights = [
  {
    id: 1,
    label: "Experience",
    value: "5+ years building web, mobile, and desktop products",
  },
  {
    id: 2,
    label: "Users",
    value: "Products and systems supporting 10,000+ users",
  },
  {
    id: 3,
    label: "Recognition",
    value: "Top 1% on WakaTime with 1,389+ coding hours tracked",
  },
  {
    id: 4,
    label: "Impact",
    value: "Feature turnaround improved by 25% and API performance by 40%",
  },
];

export const workExperience = [
  {
    id: 1,
    company: "OpenDrawing",
    title: "Senior Frontend Developer ",
    period: "Sep 2025 - Present",
    location: "Colorado, United States ",
    desc: "Led engineering across admin, staff, and end-user products while maintaining full-stack web and blockchain applications using React, Next.js and JavaScript.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    company: "ISOFT STUDIOS",
    title: "Software Engineer",
    period: "Mar 2025 - Sep 2025",
    location: "Lahore, Pakistan",
    desc: "Delivered 4+ production-ready client applications while leading both application and backend execution for systems optimized around 5,000+ concurrent users.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    company: "Zweidevs",
    title: "Frontend Developer ",
    period: "Aug 2023 - Mar 2025",
    location: "Lahore, Pakistan",
    desc: "Built and scaled 6+ web and mobile products across React, React Native, Next.js, and Electron.js, while improving MongoDB and API response times by 30% and helping secure multiple client engagements.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    company: "Nayyer Technologies",
    title: "Frontend Developer / Software Engineer / Full-Stack Developer",
    period: "Jun 2021 - Aug 2023",
    location: "Lahore, Pakistan",
    desc: "Built AI-assisted website builder capabilities, migrated legacy admin workflows from Node-RED to React, created drag-and-drop builder systems, and engineered 20+ REST APIs with measurable performance gains.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const journeyCards = [
  {
    id: 1,
    title: "Education",
    label: "Background",
    description:
      "Bachelor of Science in Information Technology from the University of Education, Lahore, completed in June 2024 with a scholarship. Earlier completed Higher Secondary in Computer Science at Punjab Group of Colleges, also on scholarship.",
    canvasClassName: "bg-emerald-900 rounded-3xl overflow-hidden",
    colors: undefined,
    animationSpeed: 5.1,
  },
  {
    id: 2,
    title: "Achievements",
    label: "Recognition",
    description:
      "Ranked in the top 1% among 500,000+ developers on WakaTime, recording 1,389+ coding hours, and earned runner-up at PUCON, finishing second among teams from 43 universities.",
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
      "Interested in blockchain and Web3, AI integration, open-source work, and coding challenges that sharpen systems thinking and product execution.",
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
