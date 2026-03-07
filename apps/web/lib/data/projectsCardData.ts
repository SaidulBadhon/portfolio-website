/**
 * Projects data for the card grid + modal (ported from portfolio.saidulbadhon.com).
 * Icon keys map to react-icons in the Projects component.
 */
export type ProjectIconKey =
  | "rocket"
  | "code"
  | "bolt"
  | "brain"
  | "cubes"
  | "database"
  | "globe";

export interface ProjectCardItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  icon: ProjectIconKey;
  type: string;
  image: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  role: string;
  duration: string;
  links: { live: string; github: string };
}

export const projectsCardData: ProjectCardItem[] = [
  {
    id: "jutsu-web3-copilot",
    title: "Jutsu | Web3 Copilot",
    description:
      "Jutsu is the fastest way to build and deploy decentralized apps.",
    tags: ["Next JS", "Near VM", "Blockchain", "Web3"],
    gradient: "from-violet-500 to-purple-600",
    icon: "rocket",
    type: "Project I worked on",
    image: "/projects/web3.png",
    longDescription:
      "Jutsu Web3 Copilot is a revolutionary platform that accelerates the development and deployment of decentralized applications. It provides developers with an intuitive interface, pre-built templates, and seamless integration with blockchain networks, reducing the time from concept to deployment by up to 70%.",
    features: [
      "One-click dApp deployment to multiple blockchain networks",
      "Pre-built smart contract templates and components",
      "Real-time testing and debugging environment",
      "Integrated wallet management and transaction monitoring",
      "Cross-chain compatibility with NEAR, Ethereum, and more",
    ],
    technologies: [
      "Next.js",
      "NEAR Protocol",
      "TypeScript",
      "Rust",
      "Web3.js",
      "IPFS",
    ],
    role: "Full Stack Developer",
    duration: "Jan 2024 - Present",
    links: { live: "https://jutsu.ai", github: "#" },
  },
  {
    id: "jutsu-ide",
    title: "Jutsu IDE",
    description:
      "AI-powered decentralized code editor for building Web3 applications with intelligent code completion and blockchain integration.",
    tags: ["CodeMirror", "Near Protocol", "Blockchain", "Web3"],
    gradient: "from-blue-500 to-cyan-500",
    icon: "code",
    type: "Project I worked on",
    image: "/projects/ai-ide.png",
    longDescription:
      "Jutsu IDE is an AI-powered decentralized code editor specifically designed for Web3 development. It features intelligent code completion, real-time smart contract analysis, and seamless blockchain integration, enabling developers to build, test, and deploy smart contracts entirely in the browser.",
    features: [
      "AI-powered code completion and suggestions",
      "In-browser smart contract compilation and deployment",
      "Real-time security vulnerability detection",
      "Multi-language support (Rust, Solidity, AssemblyScript)",
      "Integrated terminal and file system",
      "Collaborative editing with real-time sync",
    ],
    technologies: [
      "CodeMirror",
      "NEAR Protocol",
      "Monaco Editor",
      "TypeScript",
      "WASM",
      "WebSocket",
    ],
    role: "Core Developer",
    duration: "Jan 2023 - Dec 2023",
    links: { live: "https://ide.jutsu.ai", github: "#" },
  },
  {
    id: "postt-ai",
    title: "Postt.ai",
    description:
      "AI-powered developer relations platform automating community engagement and support.",
    tags: [
      "AI",
      "Next.js",
      "TypeScript",
      "Developer Relations",
      "Automation",
    ],
    gradient: "from-emerald-500 to-teal-500",
    icon: "bolt",
    type: "Project I worked on",
    image: "/projects/ai-platform.png",
    longDescription:
      "Postt.ai is an innovative developer relations platform that leverages artificial intelligence to automate community engagement, support ticket resolution, and content generation. It helps developer-focused companies scale their community efforts while maintaining personalized interactions.",
    features: [
      "AI-powered support ticket auto-resolution",
      "Automated community engagement across Discord, Telegram, and Twitter",
      "Intelligent FAQ generation from documentation",
      "Developer sentiment analysis and reporting",
      "Multi-platform bot integration",
      "Custom training on company-specific knowledge",
    ],
    technologies: [
      "Next.js",
      "OpenAI",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Discord.js",
      "Twitter API",
    ],
    role: "Lead Developer & Project Manager",
    duration: "Jul 2024 - Present",
    links: { live: "https://postt.ai", github: "#" },
  },
  {
    id: "ai-developer-workspace",
    title: "AI-Powered Developer Workspace",
    description:
      "AI workspace with vector database and big data processing for developers.",
    tags: ["AI", "Vector DB", "Big Data", "Python", "Machine Learning"],
    gradient: "from-orange-500 to-amber-500",
    icon: "brain",
    type: "Project I worked on",
    image: "/projects/ai-ide.png",
    longDescription:
      "A comprehensive AI-powered workspace designed for developers working with large-scale data processing and machine learning. Features include vector database integration for semantic search, big data pipeline management, and Small Language Model (SLM) fine-tuning capabilities.",
    features: [
      "Vector database integration for semantic code search",
      "Big data pipeline visualization and management",
      "Small Language Model (SLM) fine-tuning tools",
      "Real-time collaborative notebooks",
      "GPU resource management and optimization",
      "Model versioning and experiment tracking",
    ],
    technologies: [
      "Python",
      "Pinecone",
      "Pandas",
      "PyTorch",
      "FastAPI",
      "Redis",
      "Docker",
      "Kubernetes",
    ],
    role: "Full Stack Engineer",
    duration: "Aug 2023 - Jun 2024",
    links: { live: "#", github: "#" },
  },
  {
    id: "nearcon-ticketing",
    title: "NEARCON 2023 Ticketing System",
    description:
      "Decentralized ticketing system for NEARCON 2023 conference.",
    tags: [
      "Web3",
      "Blockchain",
      "NEAR Protocol",
      "React",
      "Smart Contracts",
    ],
    gradient: "from-pink-500 to-rose-500",
    icon: "cubes",
    type: "Project I worked on",
    image: "/projects/web3.png",
    longDescription:
      "A fully decentralized ticketing system built for NEARCON 2023, one of the largest Web3 conferences. The system handled thousands of attendees with NFT-based tickets, ensuring transparency, preventing fraud, and providing a seamless check-in experience.",
    features: [
      "NFT-based tickets with transferability controls",
      "QR code generation and validation",
      "Real-time attendance tracking on-chain",
      "Multi-tier ticket system (General, VIP, Speaker)",
      "POAP (Proof of Attendance Protocol) integration",
      "Analytics dashboard for organizers",
    ],
    technologies: [
      "NEAR Protocol",
      "React",
      "Rust",
      "TypeScript",
      "Wallet Connect",
      "IPFS",
    ],
    role: "Smart Contract Developer",
    duration: "Jun 2023 - Oct 2023",
    links: { live: "https://nearcon.dev", github: "#" },
  },
  {
    id: "cystellar-dashboard",
    title: "CyStellar Risk Intelligence Dashboard",
    description:
      "Geospatial data visualization dashboard for insurance risk intelligence.",
    tags: ["React.js", "Data Visualization", "Geospatial", "APIs", "Dashboard"],
    gradient: "from-indigo-500 to-violet-500",
    icon: "database",
    type: "Project I worked on",
    image: "/projects/dashboard.png",
    longDescription:
      "A sophisticated geospatial data visualization dashboard for CyStellar's satellite-driven risk intelligence platform. The dashboard transforms complex environmental and satellite data into actionable insights for insurance companies and risk analysts.",
    features: [
      "Interactive geospatial maps with satellite imagery",
      "Real-time environmental risk monitoring",
      "Custom risk scoring algorithms visualization",
      "Historical data trend analysis",
      "Automated report generation",
      "Multi-layer data overlay system",
    ],
    technologies: [
      "React.js",
      "D3.js",
      "Mapbox GL",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "AWS",
    ],
    role: "Frontend Developer Intern",
    duration: "Jul 2022 - Dec 2022",
    links: { live: "https://cystellar.com", github: "#" },
  },
  {
    id: "dokan-gg",
    title: "Dokan.gg Platform",
    description: "Full-stack gaming platform serving the gaming community.",
    tags: ["Full-Stack", "Product Management", "React", "Node.js", "MongoDB"],
    gradient: "from-green-500 to-emerald-500",
    icon: "globe",
    type: "Project I worked on",
    image: "/projects/gaming.png",
    longDescription:
      "Dokan.gg is a comprehensive gaming platform that connects gamers, provides marketplace functionality, and builds community features. As founder and lead developer, I built the entire platform from scratch, managing both technical development and business operations.",
    features: [
      "Gaming marketplace with secure transactions",
      "Community forums and discussion boards",
      "Real-time matchmaking system",
      "User profiles with gaming statistics",
      "Tournament management system",
      "Steam and Discord integration",
    ],
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Socket.io",
      "Redis",
      "AWS",
    ],
    role: "Founder & CEO",
    duration: "Apr 2022 - Present",
    links: { live: "https://dokan.gg", github: "#" },
  },
];
