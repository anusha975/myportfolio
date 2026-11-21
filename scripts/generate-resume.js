import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const { width, height } = page.getSize();
  const margin = 40;
  let y = height - 40;

  const primaryColor = rgb(0.05, 0.05, 0.07);
  const redColor = rgb(0.9, 0.03, 0.14);
  const grayColor = rgb(0.35, 0.35, 0.38);
  const lineColor = rgb(0.8, 0.8, 0.8);

  function drawText(text, size, font, color = primaryColor, xOffset = margin) {
    page.drawText(text, {
      x: xOffset,
      y,
      size,
      font,
      color,
    });
    y -= size + 2;
  }

  function drawSectionHeading(heading) {
    y -= 5;
    page.drawText(heading, {
      x: margin,
      y,
      size: 10,
      font: fontBold,
      color: primaryColor,
    });
    y -= 3;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 1,
      color: primaryColor,
    });
    y -= 8;
  }

  // Header Name
  page.drawText('ANUSHA CHIDIMILLA', {
    x: width / 2 - (fontBold.widthOfTextAtSize('ANUSHA CHIDIMILLA', 18) / 2),
    y,
    size: 18,
    font: fontBold,
    color: primaryColor,
  });
  y -= 18;

  // Contact line
  const contactText1 = 'canusha835@gmail.com  |  Warangal, Telangana';
  page.drawText(contactText1, {
    x: width / 2 - (fontRegular.widthOfTextAtSize(contactText1, 9) / 2),
    y,
    size: 9,
    font: fontRegular,
    color: redColor,
  });
  y -= 13;

  const contactText2 = 'linkedin.com/in/chidimilla-anusha-004350323  |  github.com/anusha975  |  leetcode.com/u/chidimilla';
  page.drawText(contactText2, {
    x: width / 2 - (fontRegular.widthOfTextAtSize(contactText2, 8.5) / 2),
    y,
    size: 8.5,
    font: fontRegular,
    color: grayColor,
  });
  y -= 10;

  // PROFESSIONAL SUMMARY
  drawSectionHeading('PROFESSIONAL SUMMARY');
  const summaryText = 'B.Tech Computer Science student and IoT Firmware and Cloud Engineer & Project Lead at MAAD IoT Solutions, with industrial experience building AI applications in Python, including a RAG assistant using vector databases, a ResNet-50 computer vision classifier with Grad-CAM explanations, and an Edge AI anomaly-filtering pipeline published at IEEE ICACRS 2025. Certified in Azure AI Fundamentals, Microsoft AI Agents, and Claude Code.';
  
  // Wrap summary
  const words = summaryText.split(' ');
  let line = '';
  for (const w of words) {
    const testLine = line + (line ? ' ' : '') + w;
    if (fontRegular.widthOfTextAtSize(testLine, 8) > (width - 2 * margin)) {
      drawText(line, 8, fontRegular, grayColor);
      line = w;
    } else {
      line = testLine;
    }
  }
  if (line) drawText(line, 8, fontRegular, grayColor);

  // SKILLS
  drawSectionHeading('SKILLS');
  const skillsList = [
    { label: 'Programming:', val: 'Python, Java, SQL, C, Embedded C' },
    { label: 'AI/ML & GenAI:', val: 'Machine Learning, Deep Learning, Computer Vision, Generative AI, LLMs, RAG, FAISS, ChromaDB, LangChain, Edge AI' },
    { label: 'Cloud & IoT:', val: 'Microsoft Azure AI, Google Cloud, AWS IoT Core, Embedded C, ESP32, MQTT, LoRa' },
    { label: 'Core CS:', val: 'Data Structures & Algorithms, Object-Oriented Programming (OOP), DBMS, Operating Systems' },
    { label: 'Tools:', val: 'Git, GitHub, VS Code, Unit Testing, Debugging & Hardware Troubleshooting' },
  ];
  for (const s of skillsList) {
    page.drawText(s.label, { x: margin, y, size: 8, font: fontBold, color: primaryColor });
    page.drawText(s.val, { x: margin + 78, y, size: 8, font: fontRegular, color: grayColor });
    y -= 10.5;
  }

  // WORK EXPERIENCE
  drawSectionHeading('WORK EXPERIENCE');
  // MAAD
  page.drawText('IoT Firmware and Cloud Engineer & Project Lead', { x: margin, y, size: 9, font: fontBold, color: primaryColor });
  y -= 11;
  page.drawText('MAAD IoT Solutions Pvt. Ltd. (India), in collaboration with Green Guard AI Solutions (USA)', { x: margin, y, size: 8, font: fontOblique, color: primaryColor });
  page.drawText('03/2026 – Present', { x: width - margin - 75, y, size: 8, font: fontBold, color: redColor });
  y -= 11;
  const expPoints = [
    'Built real-time Embedded C firmware for sensor-based IoT products with reliable data acquisition and device communication.',
    'Integrated REST APIs and MQTT with AWS IoT Core; debugged and maintained device-to-cloud communication on Linux devices.',
    'Leading and coordinating IoT project development, hardware-software integration, and technical deployment activities.',
    'Partnered with hardware engineers and software teams to resolve firmware, connectivity, and data-flow issues through root-cause analysis.',
  ];
  for (const p of expPoints) {
    page.drawText('•', { x: margin + 5, y, size: 7.5, font: fontBold, color: redColor });
    page.drawText(p, { x: margin + 14, y, size: 7.5, font: fontRegular, color: grayColor });
    y -= 10;
  }

  // Symbiosis
  y -= 2;
  page.drawText('Summer Research Intern', { x: margin, y, size: 8.5, font: fontBold, color: primaryColor });
  y -= 10.5;
  page.drawText('Symbiosis University', { x: margin, y, size: 8, font: fontOblique, color: primaryColor });
  page.drawText('05/2025 – 07/2025', { x: width - margin - 75, y, size: 8, font: fontBold, color: redColor });
  y -= 11;
  const symPoints = [
    'Built a Python Edge AI pipeline for anomaly detection on 1,000+ LoRa-enabled agricultural sensor readings.',
    'Applied Z-score, IQR, and threshold validation to optimize transmission, cutting wireless traffic ~25% with false positives under 2%.',
  ];
  for (const p of symPoints) {
    page.drawText('•', { x: margin + 5, y, size: 7.5, font: fontBold, color: redColor });
    page.drawText(p, { x: margin + 14, y, size: 7.5, font: fontRegular, color: grayColor });
    y -= 10;
  }

  // PROJECTS
  drawSectionHeading('FEATURED PROJECTS');
  const projects = [
    { title: 'Explainable Pneumonia Detection', tech: 'Python, TensorFlow, ResNet-50, Grad-CAM, Streamlit', desc: 'Trained a ResNet-50 classifier on 3,000+ chest X-ray images (90%+ accuracy) with Grad-CAM visual heatmaps for clinical explainability.' },
    { title: 'RAG-Based PDF Assistant', tech: 'Python, LangChain, FAISS, ChromaDB, LLMs, RAG', desc: 'Built a document-grounded Q&A application using RAG with embeddings stored in vector databases for accurate context-aware responses.' },
    { title: 'Automatic Fire Detection & Water Sprinkler', tech: 'Embedded C, ESP32, Sensors, MQTT', desc: 'Developed real-time ESP32 firmware that monitors flame sensors, actuates water sprinklers upon fire detection, and sends MQTT alerts.' },
    { title: 'Buy for Me: AI-Powered Personal Commerce Agent', tech: 'Generative AI, LLMs, NLP, E-commerce APIs, Razorpay', desc: 'Conversational shopping agent that interprets natural-language requests, manages multi-item carts, and completes secure Razorpay checkout.' },
    { title: 'AI-Powered Code Risk & Bug Detection Platform', tech: 'Python, Static Analysis, ML, RAG, GitHub APIs, AI Security', desc: 'Privacy-preserving AI platform analyzing source code and GitHub pull requests for vulnerabilities, bugs, and development risk scoring.' },
  ];
  for (const prj of projects) {
    page.drawText(`• ${prj.title}`, { x: margin, y, size: 8, font: fontBold, color: primaryColor });
    page.drawText(` | ${prj.tech}`, { x: margin + fontBold.widthOfTextAtSize(`• ${prj.title}`, 8), y, size: 7.5, font: fontOblique, color: grayColor });
    y -= 9.5;
    page.drawText(prj.desc, { x: margin + 12, y, size: 7.5, font: fontRegular, color: grayColor });
    y -= 10;
  }

  // PUBLICATION
  drawSectionHeading('PUBLICATION');
  page.drawText('ADOS: A Real-Time Edge Anomaly Filtering Framework for Reliable LoRa-Based Smart Agriculture', { x: margin, y, size: 8, font: fontBold, color: primaryColor });
  y -= 9.5;
  page.drawText('IEEE International Conference on Advances in Computing, Communication and Robotics (ICACRS 2025)', { x: margin, y, size: 7.5, font: fontOblique, color: redColor });
  y -= 10;

  // EDUCATION
  drawSectionHeading('EDUCATION');
  page.drawText('Bachelor of Technology (B.Tech) in Computer Science and Engineering', { x: margin, y, size: 8, font: fontBold, color: primaryColor });
  y -= 9.5;
  page.drawText('Kakatiya Institute of Technology and Science, Warangal', { x: margin, y, size: 7.5, font: fontRegular, color: grayColor });
  page.drawText('2023 – 2027', { x: width - margin - 55, y, size: 7.5, font: fontBold, color: primaryColor });
  y -= 10;
  page.drawText('Intermediate (MPC) — Sri Chaitanya Junior College', { x: margin, y, size: 7.5, font: fontRegular, color: grayColor });
  page.drawText('2021 – 2023', { x: width - margin - 55, y, size: 7.5, font: fontBold, color: primaryColor });
  y -= 10;

  // CERTIFICATIONS & ACHIEVEMENTS
  drawSectionHeading('CERTIFICATIONS & ACHIEVEMENTS');
  const certsLine1 = 'Certifications: Azure AI Fundamentals (Microsoft), AI Agents in Action (Microsoft), Claude Code (Anthropic), Google Cloud Computing, GitHub Copilot';
  const certsLine2 = 'Honors: Best IoT Developer of the Month (MAAD), Best Active Participant (Microsoft AI Agents), GSSoC 2025 Contributor, 500+ LeetCode Solved';
  page.drawText(certsLine1, { x: margin, y, size: 7.5, font: fontRegular, color: grayColor });
  y -= 9.5;
  page.drawText(certsLine2, { x: margin, y, size: 7.5, font: fontBold, color: primaryColor });

  const pdfBytes = await doc.save();
  const outPath = path.resolve('public/assets/Chidimilla_Anusha_Resume.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log('Successfully generated PDF resume at:', outPath);
}

generateResume().catch(console.error);

