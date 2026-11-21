/**
 * CENTRAL DATA AND CONFIGURATION FILE
 * Personal 3D Developer Portfolio for CHIDIMILLA ANUSHA
 * AI/ML & AIoT Engineer & Project Lead
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  poster: string;
  description: string;
  problemStatement: string;
  solution: string;
  myContribution: string[];
  keyInnovation: string;
  technologies: string[];
  repoUrl?: string; // Displayed ONLY when a valid URL is available
  liveUrl?: string;
  videoUrl?: string;
  embedUrl?: string;
  driveUrl?: string;
  tags?: string[];
  researchPublication?: string;
  coreCapabilities?: string[];
  kind?: 'software' | 'research' | 'embedded' | 'agentic' | 'security';
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  badge?: string;
  description: string;
  responsibilities: string[];
  recognition?: string;
  additionalContext?: string;
  image?: string;
  imageAlt?: string;
  collaborationPartner?: string;
}

export interface SkillItem {
  name: string;
  level: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  badgeText: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  type: string;
  badgeColor?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
}

/* ───────────── 1. BASIC & SITE INFO ───────────── */
export const SITE = {
  name: 'Chidimilla Anusha',
  firstName: 'CHIDIMILLA',
  lastName: 'ANUSHA',
  pageTitle: 'CHIDIMILLA ANUSHA | AI & IoT Engineer',
  role: 'AI & IoT ENGINEER',
  specialisation:
    'Generative AI | Edge AI | Internet of Things | Embedded Systems | Machine Learning | Cloud Technologies | RAG | Deep Learning | Prompt Engineering',
  email: 'canusha835@gmail.com', // Professional contact email
  github: 'https://github.com/anusha975',
  linkedin: 'https://www.linkedin.com/in/chidimilla-anusha-004350323/',
  leetcode: 'https://leetcode.com/u/chidimilla',
  resumePdfUrl: '/assets/Chidimilla_Anusha_Resume.pdf',
  available: true,
  status: 'Open to AI & IoT Engineering Opportunities',
};

/* ───────────── 2. HERO SECTION ───────────── */
export const HERO = {
  eyebrow: "HELLO, I'M",
  headlineFirst: 'CHIDIMILLA',
  headlineLast: 'ANUSHA',
  headline: 'CHIDIMILLA ANUSHA',
  roleTitle: 'AI & IoT ENGINEER',
  secondaryRoleTitle: 'IoT Firmware and Cloud Engineer & Project Lead',
  roles: ['AI & IoT ENGINEER', 'AI/ML & AIoT ENGINEER'] as [string, string],
  description:
    'Building intelligent systems through Embedded Engineering, Edge AI and Generative AI.',
  supportingLine:
    'From connected devices to intelligent applications — engineering technology that makes an impact.',
  image: '/assets/hero-red-bg.jpg',
  portraitPlaceholder: '/assets/anusha-portrait.jpg',
  imageAlt: 'Portrait of Chidimilla Anusha',
  imagePosition: '69% center',
};

/* ───────────── 3. LOADING SCREEN ───────────── */
export const LOADER = {
  statement: 'CONNECTING THE PHYSICAL WORLD WITH INTELLIGENCE.',
  redWords: ['CONNECTING', 'PHYSICAL', 'INTELLIGENCE'],
};

/* ───────────── 4. KEY NUMERICAL HIGHLIGHTS ───────────── */
export const CLIENT_STATS = [
  { id: 'stat-leetcode', value: 500, suffix: '+', label: 'LeetCode Problems Solved' },
  { id: 'stat-sensors', value: 1000, suffix: '+', label: 'Sensor Readings Evaluated' },
  { id: 'stat-bandwidth', value: 25, suffix: '%', label: 'Transmission Bandwidth Saved' },
  { id: 'stat-ieee', value: 1, suffix: '', label: 'IEEE Publication (ICACRS 2025)' },
];

/* ───────────── 5. ABOUT ME SECTION ───────────── */
export const ABOUT = {
  heading: 'BEYOND THE CODE.',
  eyebrow: 'ENGINEERING AT THE INTERSECTION OF HARDWARE & INTELLIGENCE',
  portrait: '/assets/anusha-portrait.jpg',
  portraitAlt: 'Professional portrait of Chidimilla Anusha',
  portraitCaption: 'CHIDIMILLA ANUSHA · IoT FIRMWARE & CLOUD ENGINEER & PROJECT LEAD',
  paragraphs: [
    'I am a Computer Science Engineering student at Kakatiya Institute of Technology and Science, Warangal (2023–2027), with practical experience in IoT firmware, cloud integration, embedded systems and AI-driven applications.',
    'Currently working as an IoT Firmware and Cloud Engineer & Project Lead at MAAD IoT Solutions Pvt. Ltd., I work on embedded firmware, sensor integration, device communication, debugging and cloud connectivity.',
    'My technical journey has evolved from connecting physical devices to processing sensor data intelligently, applying Edge AI techniques and exploring Generative AI solutions.',
    'I am also an IEEE-published author, contributing to research on real-time Edge AI anomaly filtering for LoRa-based smart agriculture.',
  ],
  visualJourney: [
    {
      step: 'IoT',
      title: 'Physical Connectivity',
      detail: 'Interfacing microcontrollers, buses (SPI, I2C, UART) and low-power radios.',
    },
    {
      step: 'Sensors',
      title: 'Transduction & Sampling',
      detail: 'Analog/digital acquisition, noise suppression and calibration routines.',
    },
    {
      step: 'Data',
      title: 'Serialization & Ingestion',
      detail: 'Lightweight payloads, MQTT brokers, REST APIs and edge buffering.',
    },
    {
      step: 'Edge AI',
      title: 'On-Device Inference',
      detail: 'Statistical anomaly filtering, latency reduction and low-power ML.',
    },
    {
      step: 'Machine Learning',
      title: 'Predictive Modeling',
      detail: 'Supervised pipelines, deep vision (ResNet-50) and model explainability.',
    },
    {
      step: 'Generative AI',
      title: 'Autonomous Reasoning',
      detail: 'Retrieval-Augmented Generation (RAG), vector indexing and LLM agent flows.',
    },
  ],
  timeline: [
    {
      year: '2023',
      title: 'Computer Science Engineering Journey',
      description:
        'Commenced Bachelor of Technology in Computer Science and Engineering at Kakatiya Institute of Technology and Science, Warangal.',
    },
    {
      year: '2025',
      title: 'Summer Research Internship & IEEE Publication',
      description:
        'Conducted Summer Research Internship at Symbiosis University and contributed to IEEE ICACRS 2025 published research on the ADOS framework.',
    },
    {
      year: '2026',
      title: 'IoT Firmware & Cloud Engineer & Project Lead at MAAD',
      description:
        'Leading IoT engineering projects, developing industrial firmware, and managing device-to-cloud integrations at MAAD IoT Solutions Pvt. Ltd.',
    },
    {
      year: '2026',
      title: 'Expanding into Generative AI & Autonomous Agent Solutions',
      description:
        'Architecting Retrieval-Augmented Generation (RAG), AI security auditing platforms, conversational commerce agents, and Edge AI systems.',
    },
  ],
};

/* ───────────── 6. PROFESSIONAL EXPERIENCE ───────────── */
export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'maad-iot',
    company: 'MAAD IoT Solutions Pvt. Ltd. (India)',
    role: 'IoT Firmware and Cloud Engineer & Project Lead',
    duration: 'March 2026 – Present',
    location: 'India • International Collaboration',
    badge: 'Industrial Production & Leadership',
    image: '/assets/anusha-portrait.jpg',
    imageAlt: 'Chidimilla Anusha at MAAD IoT Solutions Pvt. Ltd. in collaboration with Green Guard AI Solutions (USA)',
    collaborationPartner: 'Green Guard AI Solutions (USA)',
    description:
      'Working as an IoT Firmware and Cloud Engineer & Project Lead at MAAD IoT Solutions Pvt. Ltd. (India) in strategic collaboration with Green Guard AI Solutions (USA), driving industrial embedded engineering, IoT firmware development, device-to-cloud integration and project execution.',
    responsibilities: [
      'Developing and debugging robust Embedded C firmware for connected devices.',
      'Leading and coordinating IoT engineering project development and sprint deliverables.',
      'Integrating sensors and microcontroller-based architectures.',
      'Implementing MQTT and REST API-based device-to-cloud telemetry pipelines.',
      'Engineering high-reliability SPI and I2C multi-peripheral communication.',
      'Performing hardware-software integration, automated test harnesses and signal analysis.',
      'Troubleshooting firmware edge-cases, wireless connectivity and end-to-end data flow.',
      'Coordinating international technical implementation, validation and cloud deployment.',
    ],
    recognition: 'Best IoT Developer of the Month – MAAD IoT Solutions.',
    additionalContext:
      'MAAD IoT Solutions Pvt. Ltd. (India) in strategic collaboration with Green Guard AI Solutions (USA).',
  },
  {
    id: 'symbiosis-research',
    company: 'Symbiosis University',
    role: 'Summer Research Intern',
    duration: 'May 2025 – July 2025',
    location: 'Edge AI & Smart Systems Lab',
    badge: 'IEEE Research Publication',
    description:
      'Research: ADOS – A Real-Time Edge Anomaly Filtering Framework for Reliable LoRa-Based Smart Agriculture.',
    responsibilities: [
      'Built a Python Edge AI pipeline for anomaly detection on 1,000+ LoRa-enabled agricultural sensor readings.',
      'Applied Z-score, IQR, and threshold validation to optimize transmission, cutting wireless traffic ~25% with false positives under 2%.',
      'Developed lightweight filtering algorithms tailored for resource-constrained edge hardware.',
      'Contributed directly to research published at IEEE ICACRS 2025.',
    ],
    recognition: 'IEEE ICACRS 2025 Published Contribution',
    additionalContext:
      'Demonstrated high energy conservation and channel duty-cycle optimization for smart agriculture nodes.',
  },
];

/* ───────────── 7. TECHNICAL SKILLS (5 CATEGORIES) ───────────── */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming',
    description: 'Foundational systems and algorithmic languages for firmware and AI development.',
    skills: [
      { name: 'Python', level: 'AI/ML, Data Engineering & Scripting', highlight: true },
      { name: 'Embedded C', level: 'Microcontroller Firmware Development', highlight: true },
      { name: 'C', level: 'Low-Level Systems & Firmware Core', highlight: true },
      { name: 'Java', level: 'Object-Oriented Architecture & Algorithms' },
      { name: 'SQL', level: 'Relational Database Queries & Schema Design' },
    ],
  },
  {
    id: 'embedded-iot',
    name: 'Embedded Systems & IoT',
    description: 'Hardware interfaces, real-time operating environments, and connected device protocols.',
    skills: [
      { name: 'Microcontrollers & ESP32', level: 'Dual-Core Architecture & Peripherals', highlight: true },
      { name: 'RTOS', level: 'Real-Time Task Scheduling & Semaphores', highlight: true },
      { name: 'MQTT', level: 'Lightweight Pub/Sub Device Telemetry', highlight: true },
      { name: 'LoRa', level: 'Long-Range Wireless RF Transmission', highlight: true },
      { name: 'Embedded Linux', level: 'Kernel Drivers & System Automation' },
      { name: 'SPI', level: 'High-Speed Bus Communication Protocol' },
      { name: 'I2C', level: 'Multi-Master Sensor Bus Architecture' },
      { name: 'REST APIs', level: 'HTTP/HTTPS Device Endpoints' },
    ],
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & GenAI',
    description: 'Machine learning algorithms, agentic workflows, edge inference, and modern Generative AI.',
    skills: [
      { name: 'Generative AI', level: 'Multi-Modal Pipelines & Prompt Systems', highlight: true },
      { name: 'Machine Learning', level: 'Predictive Modeling, Scikit-Learn & Algorithms', highlight: true },
      { name: 'Deep Learning', level: 'Neural Networks, PyTorch & Model Training', highlight: true },
      { name: 'RAG', level: 'Retrieval-Augmented Generation & Ingestion', highlight: true },
      { name: 'Large Language Models (LLMs)', level: 'Fine-Tuning, Inference & API Integration', highlight: true },
      { name: 'AI Agents', level: 'Autonomous Task Workflows & Tool Calling', highlight: true },
      { name: 'Edge AI', level: 'Microcontroller On-Device Anomaly Detection', highlight: true },
      { name: 'LangChain', level: 'Chains, Memory & Agentic Tool Orchestration', highlight: true },
      { name: 'Prompt Engineering', level: 'Few-Shot, Chain-of-Thought & Optimization', highlight: true },
    ],
  },
  {
    id: 'cloud-tools',
    name: 'Cloud & Engineering Tools',
    description: 'DevOps, IoT platforms, cloud dashboards, and professional developer tooling.',
    skills: [
      { name: 'AWS IoT Core', level: 'Cloud Telemetry Ingestion & Device Rules', highlight: true },
      { name: 'Git & GitHub', level: 'Version Control, Branching & PR Auditing', highlight: true },
      { name: 'Streamlit', level: 'Interactive Clinical & AI Web Applications', highlight: true },
      { name: 'Google Cloud', level: 'Cloud Computing & ML Infrastructure' },
      { name: 'Unit Testing & Debugging', level: 'Root-Cause Analysis & Signal Logic' },
      { name: 'Linux', level: 'Command-Line Tooling & Shell Scripting' },
    ],
  },
  {
    id: 'cs-fundamentals',
    name: 'Computer Science Fundamentals',
    description: 'Core theoretical and structural foundations driving robust software architecture.',
    skills: [
      { name: 'Data Structures & Algorithms', level: '500+ LeetCode Challenges Solved', highlight: true },
      { name: 'Object-Oriented Programming (OOP)', level: 'Modular Architecture & SOLID Principles', highlight: true },
      { name: 'Operating Systems', level: 'Process Concurrency, Memory & Schedulers' },
      { name: 'DBMS', level: 'Normalization, ACID Transactions & Indexing' },
      { name: 'Computer Networks', level: 'OSI Reference Model, Sockets & Routing' },
    ],
  },
];

/* ───────────── 7b. MARQUEE TECH STACK ───────────── */
export const TECH_STACK = [
  'Python',
  'C',
  'Embedded C',
  'AI Agents',
  'Linux',
  'MQTT',
  'LoRa',
  'LangChain',
  'Git',
  'GitHub',
  'Streamlit',
  'SQL',
];

/* ───────────── 8. FEATURED PROJECTS (EXACTLY 5 PROJECTS) ───────────── */
export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'pneumonia-detection-xai',
    kind: 'software',
    title: 'Explainable Pneumonia Detection',
    subtitle: 'Interpretable Deep Learning for Chest Radiographs',
    category: 'Explainable AI / Healthcare AI',
    poster: '/assets/thumbnails/project-pneumonia.jpg',
    description:
      'An AI-powered medical image classification system that detects pneumonia from chest X-ray images and explains model predictions using Explainable AI techniques.',
    problemStatement:
      'Clinical adoption of medical AI is severely hindered by the black-box nature of deep neural networks, making healthcare practitioners skeptical about clinical reliability without visual verification of diagnostic grounds.',
    solution:
      'Integrated ResNet-50 transfer learning architecture with Grad-CAM (Gradient-weighted Class Activation Mapping) heatmaps that highlight the exact anatomical lung regions driving diagnostic predictions in an interactive clinician interface.',
    myContribution: [
      'Worked on pneumonia classification using ResNet-50.',
      'Applied Grad-CAM to generate visual explanations of model predictions.',
      'Developed an interactive Streamlit interface.',
      'Worked with a dataset containing 3,000+ chest X-ray images (achieving 90%+ diagnostic accuracy).',
    ],
    keyInnovation:
      "Combines deep learning-based medical image classification with visual explainability, helping users understand which image regions influenced the model's prediction.",
    technologies: ['Python', 'Deep Learning', 'ResNet-50', 'Grad-CAM', 'Explainable AI', 'Streamlit', 'TensorFlow'],
    // Note: No repoUrl as requested
  },
  {
    id: 'rag-pdf-assistant',
    kind: 'software',
    title: 'RAG-Based PDF Assistant',
    subtitle: 'Intelligent Contextual Document QA Pipeline',
    category: 'Generative AI / RAG',
    poster: '/assets/thumbnails/project-rag-pdf.jpg',
    description:
      'An intelligent document question-answering application that enables users to upload PDF documents and ask natural-language questions to retrieve relevant, context-aware answers.',
    problemStatement:
      'Standard LLMs hallucinate or fail when answering questions about specialized or private multi-page PDF documents, while traditional keyword search lacks semantic comprehension.',
    solution:
      'Constructed a document-grounded Q&A architecture using Retrieval-Augmented Generation that ingests PDFs, creates embeddings, stores them in FAISS/ChromaDB vector stores, and retrieves relevant passages to generate context-grounded answers.',
    myContribution: [
      'Designed the document ingestion and processing pipeline.',
      'Implemented text extraction and chunking.',
      'Worked on embedding generation and vector database integration.',
      'Implemented semantic retrieval and LLM-based response generation.',
    ],
    keyInnovation:
      'Combines document retrieval with generative AI to provide answers grounded in uploaded documents rather than relying entirely on general LLM knowledge.',
    technologies: ['Python', 'LangChain', 'FAISS', 'ChromaDB', 'LLMs', 'Retrieval-Augmented Generation'],
    repoUrl: 'https://github.com/anusha975/rag-ai-assistant',
  },
  {
    id: 'fire-detection-sprinkler',
    kind: 'embedded',
    title: 'Automatic Fire Detection and Water Sprinkler System',
    subtitle: 'Autonomous Flame Sensing & Actuation Network',
    category: 'IoT / Embedded Systems',
    poster: '/assets/thumbnails/project-fire-sprinkler.jpg',
    description:
      'An IoT-based fire detection and automatic water sprinkler system designed to identify fire conditions and activate an appropriate response mechanism.',
    problemStatement:
      'Delayed emergency response during warehouse or industrial fire outbreaks causes irreversible damage before human operators can react and actuate suppression systems.',
    solution:
      'Developed real-time ESP32 embedded firmware that monitors multiple flame and temperature sensors, executes interrupt-driven threshold logic to actuate water sprinkler valves, and broadcasts immediate incident alerts over MQTT.',
    myContribution: [
      'Worked on sensor integration and embedded system logic.',
      'Implemented fire detection conditions.',
      'Developed automatic sprinkler activation logic.',
      'Worked on IoT-based alert and monitoring functionality.',
    ],
    keyInnovation:
      'Integrates real-time sensor monitoring with automated physical response to reduce dependence on manual intervention.',
    technologies: ['Embedded C', 'IoT', 'Sensors', 'Microcontrollers', 'ESP32', 'MQTT'],
    repoUrl: 'https://github.com/anusha975/Automatic-Fire-Detection-Water-Sprinkler',
  },
  {
    id: 'buy-for-me-commerce-agent',
    kind: 'agentic',
    title: 'Buy for Me: AI-Powered Personal Commerce Agent',
    subtitle: 'Conversational Autonomous Shopping & Checkout Agent',
    category: 'Agentic AI / E-commerce',
    poster: '/assets/thumbnails/project-commerce-agent.jpg',
    description:
      'Buy for Me is an AI-powered personal commerce agent that understands natural-language shopping requests, recommends suitable products, manages multi-item carts and enables secure purchases through Razorpay.',
    problemStatement:
      'Conventional online shopping requires tedious multi-step filter adjustments and fragmented manual basket assembly, failing to handle complex contextual requests like "plan an organic skincare regimen under $50".',
    solution:
      'Built a conversational personal shopping agent that parses natural-language prompts, conducts semantic catalog matching, manages dynamic multi-item baskets, and seamlessly routes customers into a verified Razorpay payment flow.',
    myContribution: [
      'Worked on the AI-powered shopping assistant concept and user interaction flow.',
      'Designed natural-language shopping request interpretation.',
      'Worked on product recommendation and multi-item cart management workflows.',
      'Integrated the payment workflow using Razorpay.',
    ],
    keyInnovation:
      'Transforms traditional product searching and shopping into a conversational AI experience where users can describe what they need and receive suitable product recommendations through an intelligent shopping agent.',
    technologies: ['Generative AI', 'LLMs', 'Natural Language Processing', 'E-commerce APIs', 'Razorpay', 'Python'],
    // Note: No repoUrl as instructed
  },
  {
    id: 'code-risk-bug-detection',
    kind: 'security',
    title: 'AI-Powered Code Risk and Bug Detection Platform',
    subtitle: 'Privacy-Preserving Source Code & PR Security Auditor',
    category: 'AI Security / Software Engineering',
    poster: '/assets/thumbnails/project-code-risk.jpg',
    description:
      'A privacy-preserving AI platform for analysing source code and GitHub pull requests to identify security vulnerabilities, bugs, code quality issues and development risks.',
    problemStatement:
      'Sending proprietary source code to cloud-hosted LLM endpoints introduces catastrophic intellectual property leakages and regulatory violations for privacy-conscious software enterprises.',
    solution:
      'Engineered an offline-capable analysis pipeline that conducts local static code inspection, machine learning-driven risk scoring, AST parsing, and secret redaction, combined with localized RAG for contextual PR auditing without external data exposure.',
    coreCapabilities: [
      'Local static code analysis.',
      'ML-based risk scoring.',
      'Security vulnerability detection.',
      'Bug and code quality analysis.',
      'GitHub pull request analysis.',
      'Secret detection and redaction.',
      'RAG-based contextual analysis.',
      'Optional LLM-assisted explanations and recommendations.',
    ],
    myContribution: [
      'Presented as software engineering and AI security architecture design.',
      'Designed source-code static parsing, AST traversal, and vulnerability scanning.',
      'Engineered risk assessment algorithms and privacy-aware local processing pipelines.',
      'Integrated AI-assisted development workflows and GitHub API review integrations.',
    ],
    keyInnovation:
      'Combines local static analysis, machine learning-based risk scoring, secret redaction and retrieval-augmented generation to provide privacy-conscious code inspection without depending entirely on external LLM services.',
    technologies: [
      'Python',
      'Static Code Analysis',
      'Machine Learning',
      'GitHub APIs',
      'RAG',
      'LLMs',
      'Vector Databases',
      'AI Security',
    ],
    repoUrl: 'https://github.com/anusha975/AI-Powered-Code-Risk-Bug-Detection-Platform',
  },
];

/* ───────────── 9. RESEARCH & PUBLICATIONS ───────────── */
export const RESEARCH_PUBLICATION = {
  heading: 'RESEARCH THAT MAKES AN IMPACT.',
  badge: 'IEEE ICACRS 2025 Published Author',
  title:
    'ADOS: A Real-Time Edge Anomaly Filtering Framework for Reliable LoRa-Based Smart Agriculture',
  conference:
    'IEEE International Conference on Advances in Computing, Communication and Robotics (ICACRS 2025)',
  publicationUrl: 'https://ieeexplore.ieee.org', // Configurable publication link
  summary:
    'A real-time Edge AI framework that identifies and suppresses anomalous agricultural sensor readings at the microcontroller level before transmission over LoRa channels, drastically extending node battery life and optimizing communication throughput.',
  highlights: [
    'Real-time anomaly filtering designed specifically for smart agriculture microclimates.',
    'Statistical anomaly detection computed entirely at the edge on resource-constrained hardware.',
    'LoRa-based sensor communication with minimized duty-cycle channel congestion.',
    'Approximately 25% reduction in unnecessary data transmission achieved with false positives under 2%.',
    'Empirical evaluation involving 1,000+ real-world agricultural sensor readings.',
  ],
  architecturePhases: [
    { title: 'Soil & Climate Sensors', desc: 'Continuous sampling of moisture, temperature, and ambient parameters.' },
    { title: 'Edge Statistical Filter', desc: 'Real-time Z-score & IQR testing on the ESP32 microcontroller.' },
    { title: 'Decision Gate', desc: 'Spurious spikes and noise packets dropped locally; verified alerts preserved.' },
    { title: 'LoRa Packet Dispatch', desc: 'Only valid, high-fidelity agricultural telemetry transmitted to gateway.' },
  ],
};

/* ───────────── 10. ACHIEVEMENTS & CERTIFICATIONS ───────────── */
export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'maad-best-developer',
    title: 'Best IoT Developer of the Month',
    organization: 'MAAD IoT Solutions Pvt. Ltd.',
    year: '2026',
    description:
      'Awarded for outstanding embedded firmware architecture, hardware debugging, and device-to-cloud integrations.',
    badgeText: 'Industry Leadership',
  },
  {
    id: 'ieee-author',
    title: 'IEEE Published Author',
    organization: 'IEEE ICACRS 2025',
    year: '2025',
    description:
      'Published research on real-time Edge AI anomaly filtering framework for LoRa-based smart agriculture.',
    badgeText: 'Peer-Reviewed Research',
  },
  {
    id: 'microsoft-ai-agents',
    title: 'Best Active Participant Award',
    organization: 'Microsoft AI Agents in Action',
    year: '2025',
    description:
      'Recognized for exceptional contribution and hands-on implementation during Microsoft AI Agents hackathons.',
    badgeText: 'Microsoft Award',
  },
  {
    id: 'gssoc-contributor',
    title: 'GSSoC 2025 Contributor',
    organization: 'GirlScript Summer of Code',
    year: '2025',
    description:
      'Contributed to open-source software and machine learning tooling under GirlScript Summer of Code.',
    badgeText: 'Open Source Honor',
  },
  {
    id: 'leetcode-500',
    title: '500+ LeetCode Problems Solved',
    organization: 'LeetCode Platform',
    year: '2024–2026',
    description:
      'Demonstrated rigorous mastery across Data Structures, Dynamic Programming, Graph Theory, and Systems Algorithms.',
    badgeText: 'Algorithmic Mastery',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'ms-ai-agents',
    title: 'AI Agents in Action',
    issuer: 'Microsoft Learn',
    type: 'Autonomous AI Agents',
    badgeColor: '#00A4EF',
  },
  {
    id: 'azure-ai-900',
    title: 'Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft Learn',
    type: 'Cloud & Artificial Intelligence',
    badgeColor: '#0078D4',
  },
  {
    id: 'anthropic-fluency',
    title: 'AI Fluency',
    issuer: 'Anthropic',
    type: 'Foundation Models & Prompt Architecture',
    badgeColor: '#D97706',
  },
  {
    id: 'anthropic-claude',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    type: 'Advanced Agentic Engineering',
    badgeColor: '#F59E0B',
  },
  {
    id: 'google-cloud-ml',
    title: 'Cloud Computing & Machine Learning',
    issuer: 'Google Cloud',
    type: 'Cloud Infrastructure & Distributed AI',
    badgeColor: '#4285F4',
  },
  {
    id: 'github-copilot',
    title: 'GitHub Copilot',
    issuer: 'Microsoft / GitHub',
    type: 'AI-Assisted Engineering',
    badgeColor: '#ffffff',
  },
  {
    id: 'nxtwave-genai',
    title: 'Generative AI Workshop',
    issuer: 'NxtWave',
    type: 'LLM Systems & Prompt Design',
    badgeColor: '#10B981',
  },
  {
    id: 'nxtwave-ibm',
    title: 'AI – IBM SkillsBuild',
    issuer: 'NxtWave / IBM',
    type: 'Cognitive Computing & Data Science',
    badgeColor: '#6366F1',
  },
];

/* ───────────── 11. EDUCATION ───────────── */
export const EDUCATION: EducationItem[] = [
  {
    institution: 'Kakatiya Institute of Technology and Science, Warangal',
    degree: 'Bachelor of Technology (B.Tech) – Computer Science and Engineering',
    period: '2023 – 2027',
    location: 'Warangal, Telangana',
    description:
      'Rigorous academic program encompassing Computer Science fundamentals, Embedded Firmware, Artificial Intelligence, Edge Computing, and Cloud Architecture.',
    highlights: [
      'Focus areas: Embedded C, IoT Firmware, Machine Learning, Operating Systems & Networks',
      'Published author at IEEE ICACRS 2025 on real-time Edge AI anomaly filtering',
      'IoT Firmware & Cloud Engineer and Project Lead at MAAD IoT Solutions Pvt. Ltd.',
    ],
  },
  {
    institution: 'Sri Chaitanya Junior College',
    degree: 'Intermediate (MPC – Mathematics, Physics, Chemistry)',
    period: '2021 – 2023',
    location: 'Telangana',
    description:
      'Strong analytical foundation in advanced mathematics, applied physics, and computational logic.',
    highlights: [
      'Focus on calculus, vectors, mechanics, and physical sciences',
      'Developed strong algorithmic problem-solving discipline',
    ],
  },
];

/* ───────────── 12. SOCIAL LINKS & CONTACT ───────────── */
export const SOCIALS = [
  { id: 'email', label: 'Email', href: `mailto:${SITE.email}`, value: SITE.email },
  { id: 'linkedin', label: 'LinkedIn', href: SITE.linkedin, value: 'chidimilla-anusha-004350323' },
  { id: 'github', label: 'GitHub', href: SITE.github, value: 'anusha975' },
  { id: 'leetcode', label: 'LeetCode', href: SITE.leetcode, value: 'chidimilla' },
] as const;

export const CONTACT_INFO = {
  heading: "LET'S CONNECT AND BUILD SOMETHING GREAT.",
  description:
    "Have an opportunity, collaboration or interesting idea involving AI, Generative AI, Embedded Systems or IoT? I'd love to connect and explore possibilities.",
  email: SITE.email,
  github: SITE.github,
  linkedin: SITE.linkedin,
  leetcode: SITE.leetcode,
  resumePdfUrl: SITE.resumePdfUrl,
};
