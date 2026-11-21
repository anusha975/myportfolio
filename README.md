# CHIDIMILLA ANUSHA — Personal 3D Developer Portfolio

A cinematic, interactive 3D portfolio website for **CHIDIMILLA ANUSHA**, AI/ML & AIoT Engineer. Built with **React 18**, **TypeScript**, **Three.js**, **GSAP**, **Framer Motion**, and **Tailwind CSS**.

---

## 🌟 Professional Identity & Highlights

- **Identity**: CHIDIMILLA ANUSHA
- **Title**: AI/ML & AIoT ENGINEER
- **Specialisation**: Generative AI | Edge AI | Internet of Things | Embedded Systems | Machine Learning | Cloud Technologies | RAG | Deep Learning | Prompt Engineering
- **Current Position**: IoT Firmware and Cloud Engineer at MAAD IoT Solutions Pvt. Ltd. (Strategic collaboration with Green Guard AI Solutions, USA)
- **Honor**: Best IoT Developer of the Month – MAAD IoT Solutions
- **Peer-Reviewed Research**: Author at **IEEE ICACRS 2025** (*ADOS: A Real-Time Edge Anomaly Filtering Framework for Reliable LoRa-Based Smart Agriculture*)
- **Education**: Bachelor of Technology in Computer Science & Engineering (2023–2027) at Kakatiya Institute of Technology and Science, Warangal

---

## 🎨 Visual Design & Theme

- **Primary Background**: `#080808` (Obsidian Dark)
- **Secondary Background**: `#111111` (Deep Charcoal)
- **Primary Accent**: `#E50924` (Crimson Red)
- **Secondary Accent**: `#8B0000` (Deep Dark Red)
- **Glassmorphism**: Translucent dark surfaces with subtle crimson borders, specular highlights, and ambient bloom
- **Atmospheric Effects**: Additive-blended WebGL 3D Starfield with forward scroll acceleration, cursor shockwaves, and physical spring-based 3D glass shards
- **Typography**: General Sans editorial bold typography with high visual hierarchy

---

## 🚀 Key Sections & Architecture

1. **Glitch Loading Screen**
   - High-impact loading countdown statement: *"CONNECTING THE PHYSICAL WORLD WITH INTELLIGENCE."*
   - Red highlighted keywords with glitch fragmentation transitions.

2. **Hero Section**
   - Left: *"HELLO, I'M"*, large editorial headline **CHIDIMILLA ANUSHA**, title badge, description, and 3 functional CTAs:
     - `Explore My Work` (Scrolls to Projects)
     - `Download Resume` (Opens interactive CV modal)
     - `Let's Connect` (Scrolls to Contact)
   - Right: Interactive 3D glass shards with physics spring integrators, breathing vertices, and iridescent crimson Fresnel reflections.

3. **Key Stats**
   - Interactive counter cards: 500+ LeetCode problems, 1000+ agricultural sensor readings evaluated, 25% LoRa transmission bandwidth saved, 1 IEEE research publication.

4. **About Me ("BEYOND THE CODE.")**
   - Narrative covering academic journey at KITS Warangal, industrial firmware role at MAAD IoT Solutions, and IEEE research.
   - Interactive visual journey: `IoT` → `Sensors` → `Data` → `Edge AI` → `Machine Learning` → `Generative AI`.
   - Milestones timeline (2023–2026).
   - Physically reactive swinging portrait frame with pointer drag and inertia.

5. **Professional Experience**
   - Interactive tabbed experience cards:
     - **MAAD IoT Solutions Pvt. Ltd.** (IoT Firmware & Cloud Engineer): Embedded C, MQTT/REST, SPI/I2C, sensor integration, hardware debugging, and "Best IoT Developer of the Month" badge.
     - **Symbiosis University** (Summer Research Intern): ADOS framework, statistical anomaly filtering (Z-score & IQR), 25% data reduction over LoRa, and IEEE ICACRS 2025 research publication.

6. **Technical Skills**
   - 5 interactive domain tabs:
     1. Programming (C, Embedded C, Python, Java, SQL)
     2. Embedded Systems & IoT (Microcontrollers, ARM, RTOS, Embedded Linux, UART, SPI, I2C, CAN, MQTT, LoRa, REST APIs, TCP/IP)
     3. Artificial Intelligence (Machine Learning, Generative AI, Edge AI, RAG, LangChain, FAISS, ChromaDB, LLM Applications, Explainable AI)
     4. Cloud & Tools (Git, GitHub, ThingSpeak, Blynk, Streamlit, VS Code, Linux)
     5. Computer Science Fundamentals (Data Structures & Algorithms, OOP, OS, DBMS, Computer Networks)
   - Animated tech stack logo marquee.

7. **Featured Projects**
   - 6 detailed engineering projects with modal breakdown (Problem, Solution, Contribution, Technologies, Key Innovation, and GitHub repository links where available):
     - *RAG-Based PDF Assistant* (LangChain, FAISS, ChromaDB, RAG)
     - *Explainable Pneumonia Detection* (ResNet-50, Grad-CAM, Streamlit)
     - *Automatic Fire Detection and Water Sprinkler System* (Embedded C, MQTT, Microcontrollers)
     - *ADOS – Edge AI Anomaly Filtering for Smart Agriculture* (IEEE ICACRS 2025)
     - *Smart Street Light System* (Sensor-Driven Energy Automation)
     - *AquaSense* (Sensor-Driven Water Telemetry)

8. **Research & Publications**
   - Dedicated section: *ADOS: A Real-Time Edge Anomaly Filtering Framework for Reliable LoRa-Based Smart Agriculture* (IEEE ICACRS 2025).
   - Interactive 4-phase dataflow diagram and empirical metrics (~25% bandwidth saved, 1,000+ readings evaluated).

9. **Achievements & Certifications**
   - Honors: IEEE Published Author, Best IoT Developer of the Month, Microsoft AI Agents in Action Award, 500+ LeetCode problems solved.
   - Certifications: Microsoft Azure AI (AI-900), Microsoft AI Agents in Action, Google Cloud ML, GitHub Copilot, Anthropic Claude Code, GUVI Python.

10. **Education**
    - Kakatiya Institute of Technology and Science, Warangal (B.Tech - CSE, 2023–2027)
    - Sri Chaitanya Junior College (Intermediate, 2021–2023)

11. **Contact & Transmissions**
    - Configurable channels: Email, LinkedIn, GitHub, LeetCode.
    - Functional contact form with client-side validation and mail client launch without claiming false server dispatch.

12. **Curriculum Vitae Modal**
    - Full-screen printable CV preview with direct "Print / Save PDF" and download trigger.

---

## 🛠️ Development & Deployment

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build
npm run build

# Preview production build locally
npm run preview
```

### Updating Content
All text content, links, and parameters are centralized in:
`src/data/portfolioData.ts`
Simply edit this file to update contacts, projects, or credentials.

### Replacing Images
- **Hero portrait**: Replace `public/assets/hero-red-bg.jpg` (1920x1080, subject positioned on right third).
- **About portrait placeholder**: Replace `public/media/portrait-placeholder.svg` with your actual photograph.
- **Project thumbnails**: Located in `public/assets/thumbnails/` (`project-1-1.jpg` to `project-6-3.jpg`).
