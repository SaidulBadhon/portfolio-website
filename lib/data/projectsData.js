import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import jutsuWebImg from "@/public/jutsu-web.png";
import jutsuEditorImg from "@/public/jutsu-editor.png";

// jutsu.ai
import jutsuAi1Img from "@/public/assets/projects/jutsu.ai/1.png";
import jutsuAi2Img from "@/public/assets/projects/jutsu.ai/2.png";
import jutsuAi3Img from "@/public/assets/projects/jutsu.ai/3.png";
import jutsuAi4Img from "@/public/assets/projects/jutsu.ai/4.png";
import jutsuAi5Img from "@/public/assets/projects/jutsu.ai/5.png";
import jutsuAi6Img from "@/public/assets/projects/jutsu.ai/6.png";
import jutsuAi7Img from "@/public/assets/projects/jutsu.ai/7.png";
import jutsuAi8Img from "@/public/assets/projects/jutsu.ai/8.png";
import jutsuAi9Img from "@/public/assets/projects/jutsu.ai/9.png";
import jutsuAi10Img from "@/public/assets/projects/jutsu.ai/10.png";
import jutsuAiFullImg from "@/public/assets/projects/jutsu.ai/full.png";

export const projectsData = [
  {
    slug: "jutsu-ai",
    title: "Jutsu | Web3 Copilot",
    // label: "Jutsu.ai - AI Powered Decentralized Code Editor",
    description: `# Deploy Forever | Jutsu: Revolutionizing Blockchain Development
      
## Overview
**Deploy Forever | Jutsu** is a cutting-edge developer platform specifically engineered to streamline the process of building, launching, and hosting decentralized frontends. This platform represents a paradigm shift in blockchain application development, significantly reducing both the time and costs associated with development. 

## Key Features

### 1. **Ease of Transition for Web2 Developers**
- **Simplified Onboarding**: Jutsu lowers the barrier to entry, making it feasible for developers with experience in traditional web development (Web2) to transition smoothly into the blockchain space (Web3).
- **Intuitive Tools and Interfaces**: The platform offers user-friendly tools that align with the familiar paradigms of Web2 development, easing the learning curve.

### 2. **Expedited Development Process**
- **Rapid Prototyping**: Developers can quickly move from concept to prototype, accelerating the pace of innovation and testing.
- **Streamlined Workflows**: The platform provides streamlined workflows, making the development process more efficient and less prone to errors.

### 3. **Cost-Effective Solutions**
- **Lowered Development Costs**: By simplifying the development process, Jutsu significantly reduces the costs associated with blockchain application development.
- **Resource Optimization**: The platform's efficient use of resources ensures that developers can maximize their output while minimizing expenses.

### 4. **Full-Stack On-Chain Application Development**
- **End-to-End Capabilities**: Jutsu enables the development of full-stack applications that are entirely on-chain, offering end-to-end capabilities from backend logic to frontend presentation.
- **Decentralized Frontends**: Emphasizing the importance of decentralization, the platform ensures that the frontends are as decentralized as the backend, aligning with the core principles of blockchain technology.

## Target Audience

- **Web2 Developers**: Traditional web developers looking to venture into blockchain development.
- **Blockchain Enthusiasts**: Individuals passionate about blockchain technology and decentralized applications.
- **Startups and Enterprises**: Organizations aiming to explore or expand their presence in the blockchain domain.

## Conclusion

**Deploy Forever | Jutsu** is not just a tool; it's a gateway for innovation in the blockchain space. By democratizing access to blockchain technology, it enables a broader range of developers to contribute to the decentralized future. This platform is poised to be a game-changer in the way blockchain applications are developed, launched, and hosted.`,

    shortDescription:
      "Jutsu is the fastest way to build and deploy decentralized apps.",

    tags: ["Next JS", "Near VM", "Blockchain", "Web3"],
    coverArt: jutsuWebImg,
    websiteUrl: "https://jutsu.ai",

    gallery: [
      {
        url: jutsuAi1Img,
        description: "Jutsu Landing Page Image 1",
      },
      {
        url: jutsuAi2Img,
        description: "Jutsu Landing Page Image 2",
      },
      {
        url: jutsuAi3Img,
        description: "Jutsu Landing Page Image 3",
      },
      {
        url: jutsuAi4Img,
        description: "Jutsu Landing Page Image 4",
      },
      {
        url: jutsuAi5Img,
        description: "Jutsu Landing Page Image 5",
      },
      {
        url: jutsuAi6Img,
        description: "Jutsu Landing Page Image 6",
      },
      {
        url: jutsuAi7Img,
        description: "Jutsu Landing Page Image 7",
      },
      {
        url: jutsuAi8Img,
        description: "Jutsu Landing Page Image 8",
      },
      {
        url: jutsuAi9Img,
        description: "Jutsu Landing Page Image 9",
      },
      {
        url: jutsuAi10Img,
        description: "Jutsu Landing Page Image 10",
      },
      {
        url: jutsuAiFullImg,
        description: "Jutsu Landing Page Full Image",
      },
    ],
    reviews: [
      {
        name: "Sergey Gorbunov",
        title: "CEO of Near Protocol",
        description: `Jutsu represents a significant leap forward in making Web3 development accessible. The platform's ability to bridge Web2 and Web3 paradigms while maintaining enterprise-grade security is exactly what the ecosystem needs. This is the kind of innovation that will accelerate mainstream blockchain adoption.`,
        avatar: "https://i.imgur.com/0p0wX9G.jpg",
      },
      {
        name: "Alex Skidanov",
        title: "Co-founder of Near Protocol",
        description: `The technical architecture behind Jutsu is impressive. By abstracting away the complexity of blockchain infrastructure while preserving the power and flexibility developers need, it solves one of the biggest barriers to Web3 adoption. The developer experience is truly world-class.`,
        avatar: "https://i.imgur.com/0p0wX9G.jpg",
      },
      {
        name: "Illia Polosukhin",
        title: "Co-founder of NEAR Protocol",
        description: `What excites me most about Jutsu is how it democratizes blockchain development. We've seen firsthand how it reduces the learning curve from months to days. The AI-powered features and intuitive interface make it possible for any developer to build decentralized applications without sacrificing quality or security.`,
        avatar: "https://i.imgur.com/0p0wX9G.jpg",
      },
      {
        name: "Evgeny Kuzyakov",
        title: "Co-founder of NEAR Protocol",
        description: `Jutsu's approach to decentralized frontend hosting is revolutionary. The seamless integration with NEAR's infrastructure, combined with the permanent deployment model, creates a truly censorship-resistant development platform. This is the future of how dApps should be built and deployed.`,
        avatar: "https://i.imgur.com/0p0wX9G.jpg",
      },
    ],

    projectDuration: "2.5",
    projectTeam: "5",
    projectRole: "Front-end Developer",
    projectResponsibilities: [
      "Developed the front-end of the Jutsu IDE using React, Next.js, and Tailwind CSS.",
      "Implemented the design using Figma.",
      "Integrated the Jutsu IDE with the Near VM.",
    ],
  },
  {
    slug: "jutsu-ide",
    title: "Jutsu IDE",
    label: "Jutsu IDE - AI Powered Decentralized Code Editor",
    shortDescription:
      "AI-powered decentralized code editor for building Web3 applications with intelligent code completion and blockchain integration.",
    description: `# Jutsu IDE: AI-Powered Decentralized Code Editor

## Overview
**Jutsu IDE** is an innovative, AI-powered code editor built specifically for Web3 development. Combining the power of CodeMirror with blockchain technology, it provides developers with an intelligent development environment for creating decentralized applications.

## Key Features

### 1. **AI-Powered Code Assistance**
- **Intelligent Code Completion**: Advanced AI suggestions tailored for blockchain development
- **Smart Refactoring**: Automated code improvements and optimization suggestions
- **Context-Aware Help**: Real-time documentation and best practices for Web3 development

### 2. **Blockchain Integration**
- **NEAR Protocol Integration**: Seamless connection to NEAR blockchain
- **Smart Contract Development**: Built-in tools for writing, testing, and deploying smart contracts
- **Wallet Integration**: Direct integration with Web3 wallets for testing and deployment

### 3. **Modern Development Experience**
- **Real-Time Collaboration**: Work together with team members in real-time
- **Version Control**: Built-in Git integration for seamless code management
- **Customizable Interface**: Tailor the IDE to your workflow preferences

### 4. **Decentralized Architecture**
- **On-Chain Code Storage**: Store your code on the blockchain for permanent availability
- **Distributed Execution**: Run code in a decentralized environment
- **Censorship Resistant**: Your code remains accessible regardless of centralized service availability

## Technical Stack

Built with cutting-edge technologies including CodeMirror for the editor core, React for the UI, and NEAR Protocol for blockchain functionality.

## Conclusion

**Jutsu IDE** bridges the gap between traditional development tools and the decentralized web, providing developers with a familiar yet powerful environment for building the future of the internet.`,

    tags: ["CodeMirror", "Near Protocol", "Blockchain", "Web3"],
    imageUrl: jutsuEditorImg,
    websiteUrl: "https://ide.jutsu.ai",

    gallery: [
      {
        url: jutsuAi1Img,
        description: "Jutsu Landing Page Image 1",
      },
      {
        url: jutsuAi2Img,
        description: "Jutsu Landing Page Image 2",
      },
      {
        url: jutsuAi3Img,
        description: "Jutsu Landing Page Image 3",
      },
      {
        url: jutsuAi4Img,
        description: "Jutsu Landing Page Image 4",
      },
      {
        url: jutsuAi5Img,
        description: "Jutsu Landing Page Image 5",
      },
      {
        url: jutsuAi6Img,
        description: "Jutsu Landing Page Image 6",
      },
      {
        url: jutsuAi7Img,
        description: "Jutsu Landing Page Image 7",
      },
      {
        url: jutsuAi8Img,
        description: "Jutsu Landing Page Image 8",
      },
      {
        url: jutsuAi9Img,
        description: "Jutsu Landing Page Image 9",
      },
      {
        url: jutsuAi10Img,
        description: "Jutsu Landing Page Image 10",
      },
      {
        url: jutsuAiFullImg,
        description: "Jutsu Landing Page Full Image",
      },
    ],
    reviews: [
      {
        name: "Sergey Gorbunov",
        title: "CEO of Near Protocol",
        description: `The Jutsu IDE is a game-changer for blockchain development. Having an AI-powered code editor that understands Web3 patterns and smart contract development natively is exactly what our ecosystem needed. The integration with NEAR is seamless and the developer productivity gains are remarkable.`,
        avatar: "https://i.imgur.com/0p0wX9G.jpg",
      },
      {
        name: "Alex Skidanov",
        title: "Co-founder of Near Protocol",
        description: `I'm impressed by how Jutsu IDE combines the familiarity of traditional IDEs with blockchain-specific features. The real-time smart contract testing and deployment capabilities save developers countless hours. This is the kind of tooling that will bring the next million developers to Web3.`,
        avatar: "https://i.imgur.com/0p0wX9G.jpg",
      },
      {
        name: "Illia Polosukhin",
        title: "Co-founder of NEAR Protocol",
        description: `The AI assistance in Jutsu IDE is phenomenal. It understands blockchain context and provides intelligent suggestions that actually make sense for decentralized applications. The collaborative features and on-chain code storage demonstrate a deep understanding of what Web3 developers need.`,
        avatar: "https://i.imgur.com/0p0wX9G.jpg",
      },
      {
        name: "Evgeny Kuzyakov",
        title: "Co-founder of NEAR Protocol",
        description: `Jutsu IDE's decentralized architecture is brilliant. The fact that your code can be stored on-chain and remain accessible forever aligns perfectly with Web3 principles. The wallet integration and smart contract development workflow are the smoothest I've experienced in any blockchain IDE.`,
        avatar: "https://i.imgur.com/0p0wX9G.jpg",
      },
    ],

    projectDuration: "2.5",
    projectTeam: "5",
    projectRole: "Front-end Developer",
    projectResponsibilities: [
      "Developed the front-end of the Jutsu IDE using React, Next.js, and Tailwind CSS.",
      "Implemented the design using Figma.",
      "Integrated the Jutsu IDE with the Near VM.",
    ],
  },
  {
    slug: "postt-ai",
    title: "Postt.ai",
    shortDescription:
      "AI-powered developer relations platform automating community engagement and support.",
    description: `# Postt.ai: AI-Powered Developer Relations Platform

## Overview
**Postt.ai** is an innovative AI-powered platform designed to revolutionize developer relations by automating community engagement, onboarding, and support processes. The platform helps DevRel teams scale their impact while maintaining personalized interactions with their developer communities.

## Key Features

### 1. **Intelligent Community Engagement**
- **Automated Response System**: AI-driven responses to common developer questions
- **Smart Content Distribution**: Automatically share relevant content across multiple channels
- **Sentiment Analysis**: Monitor and analyze community sentiment in real-time

### 2. **Developer Onboarding Automation**
- **Personalized Onboarding Flows**: Tailored onboarding experiences based on developer profiles
- **Interactive Tutorials**: AI-generated tutorials and documentation
- **Progress Tracking**: Monitor developer journey and engagement metrics

### 3. **Support Optimization**
- **Intelligent Ticket Routing**: Automatically categorize and route support requests
- **Knowledge Base Integration**: AI-powered search across documentation and resources
- **Proactive Support**: Identify and address potential issues before they escalate

## Impact

Postt.ai empowers DevRel teams to focus on strategic initiatives while ensuring no developer question goes unanswered, significantly improving developer experience and community growth.`,
    tags: ["AI", "Next.js", "TypeScript", "Developer Relations", "Automation"],
    imageUrl: corpcommentImg,
    websiteUrl: "https://postt.ai",
  },
  {
    slug: "ai-workspace",
    title: "AI-Powered Developer Workspace",
    shortDescription:
      "AI workspace with vector database and big data processing for developers.",
    description: `# AI-Powered Developer Workspace

## Overview
An advanced AI-powered workspace built for developers at Jutsu, featuring cutting-edge vector database technology and big data processing capabilities to support small language models (SLMs) and AI-driven development workflows.

## Key Features

### 1. **Vector Database Integration**
- **Semantic Code Search**: Find code by meaning, not just keywords
- **Intelligent Code Recommendations**: Context-aware suggestions based on your codebase
- **Fast Similarity Matching**: Quickly find similar code patterns and solutions

### 2. **Big Data Processing**
- **Large-Scale Code Analysis**: Process and analyze massive codebases efficiently
- **Real-Time Insights**: Get instant feedback on code quality and patterns
- **Performance Optimization**: Identify bottlenecks and optimization opportunities

### 3. **AI-Driven Development**
- **Small Language Models**: Lightweight, fast AI models optimized for development tasks
- **Code Generation**: Generate boilerplate and common patterns automatically
- **Intelligent Refactoring**: AI-suggested improvements and modernization

## Technical Stack

Built with Python for data processing, modern vector databases for semantic search, and machine learning frameworks for AI capabilities.`,
    tags: ["AI", "Vector DB", "Big Data", "Python", "Machine Learning"],
    imageUrl: rmtdevImg,
    websiteUrl: null,
  },
  {
    slug: "web3-ticketing",
    title: "NEARCON 2023 Ticketing System",
    shortDescription:
      "Decentralized ticketing system for NEARCON 2023 conference.",
    description: `# NEARCON 2023 Ticketing System

## Overview
A blockchain-based ticketing system developed for NEARCON 2023, the premier conference for the NEAR Protocol ecosystem. This Web3 solution provides secure, transparent, and decentralized ticket management and verification.

## Key Features

### 1. **Blockchain-Powered Tickets**
- **NFT-Based Tickets**: Each ticket is a unique NFT on the NEAR blockchain
- **Immutable Records**: Permanent, tamper-proof ticket ownership records
- **Transferable Tickets**: Secure peer-to-peer ticket transfers without intermediaries

### 2. **Smart Contract Integration**
- **Automated Verification**: Smart contracts handle ticket validation automatically
- **Anti-Fraud Protection**: Blockchain technology prevents ticket duplication and fraud
- **Transparent Pricing**: All transactions are visible on the blockchain

### 3. **User Experience**
- **Wallet Integration**: Seamless integration with NEAR wallets
- **QR Code Verification**: Quick and easy ticket scanning at the venue
- **Mobile-Friendly**: Optimized for mobile devices for on-the-go access

## Impact

Successfully handled ticketing for thousands of attendees at NEARCON 2023, demonstrating the practical application of blockchain technology in event management.`,
    tags: ["Web3", "Blockchain", "NEAR Protocol", "React", "Smart Contracts"],
    imageUrl: wordanalyticsImg,
    websiteUrl: null,
  },
  {
    slug: "cystellar-dashboard",
    title: "CyStellar Risk Intelligence Dashboard",
    shortDescription:
      "Geospatial data visualization dashboard for insurance risk intelligence.",
    description: `# CyStellar Risk Intelligence Dashboard

## Overview
A sophisticated data visualization platform that transforms complex geospatial and environmental data into actionable insights for the insurance industry. The dashboard helps insurance companies assess and manage risk more effectively through intuitive, interactive visualizations.

## Key Features

### 1. **Geospatial Data Visualization**
- **Interactive Maps**: Dynamic, zoomable maps with multiple data layers
- **Heat Maps**: Visualize risk concentration across geographic regions
- **Custom Overlays**: Combine multiple data sources for comprehensive analysis

### 2. **Environmental Risk Analysis**
- **Climate Data Integration**: Real-time weather and climate risk indicators
- **Natural Disaster Tracking**: Monitor and predict natural disaster impacts
- **Historical Trend Analysis**: Analyze patterns over time to predict future risks

### 3. **Insurance Intelligence**
- **Risk Scoring**: Automated risk assessment based on multiple factors
- **Portfolio Analysis**: Visualize and analyze insurance portfolio exposure
- **Predictive Analytics**: AI-powered predictions for risk management

## Technical Implementation

Built with React.js for a responsive UI, integrated with multiple geospatial APIs, and featuring advanced data visualization libraries for clear, actionable insights.`,
    tags: ["React.js", "Data Visualization", "Geospatial", "APIs", "Dashboard"],
    imageUrl: corpcommentImg,
    websiteUrl: "https://cystellar.com",
  },
  {
    slug: "dokan-gg",
    title: "Dokan.gg Platform",
    shortDescription:
      "Full-stack gaming platform serving the gaming community.",
    description: `# Dokan.gg: Gaming Community Platform

## Overview
**Dokan.gg** is a comprehensive gaming platform that I founded and built from the ground up. The platform serves the gaming community by providing tools, resources, and services tailored to gamers' needs.

## Key Features

### 1. **Community Hub**
- **User Profiles**: Customizable profiles for gamers to showcase their achievements
- **Social Features**: Connect with other gamers, form teams, and build communities
- **Content Sharing**: Share gaming moments, strategies, and experiences

### 2. **Gaming Services**
- **Tournament Management**: Organize and participate in gaming tournaments
- **Matchmaking**: Find teammates and opponents for various games
- **Leaderboards**: Track rankings and compete with other players

### 3. **Platform Management**
- **Full-Stack Development**: Built and maintained the entire technology stack
- **Product Strategy**: Defined product roadmap and feature prioritization
- **Business Operations**: Managed all aspects of platform operations and growth

## Technical Stack

Developed using React for the frontend, Node.js for the backend, and MongoDB for data storage, ensuring a scalable and performant platform.

## Impact

Successfully built and launched a platform serving thousands of gamers, demonstrating end-to-end product development and entrepreneurial capabilities.`,
    tags: ["Full-Stack", "Product Management", "React", "Node.js", "MongoDB"],
    imageUrl: rmtdevImg,
    websiteUrl: "https://dokan.gg",
  },
];
