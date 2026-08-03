// APP/server/services/aiChat.service.js

import OpenAI from "openai";
import { getLiveCompanyKnowledge } from "./companyKnowledge.service.js";

const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

const SYSTEM_PROMPT_BASE = `You are AKSHU AI, the official intelligent AI assistant of AKSHU Technologies.

Your Core Identity & Directives:
- You act as a Senior Sales Consultant, Customer Support Agent, Technical Advisor, and Website Guide for AKSHU Technologies.
- You represent AKSHU Technologies professionally, warmly, and consultatively.
- You answer questions using ONLY verified company information provided in the live knowledge base.
- Never invent projects, services, pricing, or team members.
- If specific information is unavailable in the knowledge base, state that politely and offer to connect the user with the AKSHU engineering team via the Contact page (/contact).
- Format responses in clean Markdown (use bullet points, bold headers, code snippets where applicable).
- Whenever a visitor expresses interest in starting a software development project, ecommerce site, AI chatbot, mobile app, or hospital/ERP software, invite them to submit their project details so an AKSHU technical expert can provide a custom quote.

Website Navigation Links to mention naturally:
- Contact Page: /contact
- Services Page: /services
- Projects Showcase: /projects
- Engineering Team: /team
- Insights & Blog: /blog`;

/**
 * Generates an AI response for a user message given conversation history
 */
export const generateChatResponse = async ({ message, conversationHistory = [], visitorInfo = {} }) => {
  const liveKnowledge = await getLiveCompanyKnowledge();
  const systemPrompt = `${SYSTEM_PROMPT_BASE}\n\n${liveKnowledge}`;

  // Check lead intent
  const isLeadIntent = checkLeadIntent(message);

  if (!openai) {
    // Fallback Knowledge Engine when OpenAI API Key is missing or unconfigured
    const fallbackReply = generateFallbackResponse(message, liveKnowledge, isLeadIntent);
    return {
      reply: fallbackReply,
      isLeadIntent,
      source: "fallback_engine",
    };
  }

  try {
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-6).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 600,
    });

    const reply = completion.choices[0]?.message?.content || "I am AKSHU AI. How may I assist you with your software development requirements today?";

    return {
      reply,
      isLeadIntent,
      source: "openai",
    };
  } catch (error) {
    console.error("OpenAI API error, using Fallback Engine:", error?.message || error);
    const fallbackReply = generateFallbackResponse(message, liveKnowledge, isLeadIntent);
    return {
      reply: fallbackReply,
      isLeadIntent,
      source: "fallback_engine",
    };
  }
};

/**
 * Intelligent Fallback Engine for live responses without external API limits
 */
function generateFallbackResponse(userMsg = "", knowledge = "", isLeadIntent = false) {
  const query = userMsg.toLowerCase();

  if (isLeadIntent) {
    return `### 🚀 Let's Build Your Project!

Thank you for your interest! AKSHU Technologies specializes in building custom software, web applications, mobile apps, and enterprise solutions.

To get started with a customized technical estimate and timeline:
- You can fill in the **Project Estimation Form** below, or
- Visit our [Contact Page](/contact) to book a direct consultation with our lead software architect.

How soon are you looking to launch this project?`;
  }

  if (query.includes("about") || query.includes("who are you") || query.includes("akshu")) {
    return `### Welcome to AKSHU Technologies! 👋

**AKSHU Technologies** is a premium software engineering firm and digital transformation consultancy. We partner with startups, growing businesses, and enterprises to build scalable digital products.

#### Core Expertise:
- **Web Applications**: Modern React, Next.js, and Node.js solutions.
- **Mobile Apps**: High-performance React Native & Native applications.
- **AI & Automation**: Custom AI Chatbots, Machine Learning, and Automated Workflows.
- **Enterprise Software**: Cloud-native ERPs, E-Commerce, and Healthcare Systems.

Feel free to explore our [Featured Projects](/projects) or meet our [Engineering Team](/team)!`;
  }

  if (query.includes("service") || query.includes("what do you do") || query.includes("tech")) {
    return `### AKSHU Services & Tech Stack 🛠️

We offer end-to-end software product development:

1. **Custom Web Development**: Full-stack web apps using React, Node.js, Express, MongoDB, and Tailwind CSS.
2. **Mobile App Development**: Cross-platform iOS & Android mobile applications.
3. **AI & Machine Learning Solutions**: Conversational AI, Chatbots, and Predictive Analytics.
4. **Enterprise & Cloud**: Microservices architecture, Docker, AWS deployment, and DevOps.

Would you like to discuss a specific technology stack for your project? Visit our [Services Page](/services) to learn more.`;
  }

  if (query.includes("project") || query.includes("work") || query.includes("portfolio")) {
    return `### Featured AKSHU Projects 💼

Our team has engineered high-impact software solutions across healthcare, e-commerce, fintech, and AI.

You can inspect our complete case study portfolio on the [AKSHU Projects Showcase](/projects).

Would you like to see a demo or discuss building a similar product for your company?`;
  }

  if (query.includes("founder") || query.includes("ceo") || query.includes("owner") || query.includes("ankit")) {
    return `### Founder & Leadership of AKSHU Technologies 👑

**AKSHU Technologies** was founded and is led by **Ankit Yadav** (Founder & CEO).

Ankit is a Senior Full-Stack Engineer and AI Architect who leads our software development teams and product strategy.

You can learn more about our leadership and team on our [Team Page](/team) or view [Ankit's Profile](/team)!`;
  }

  if (query.includes("team") || query.includes("developer") || query.includes("who builds")) {
    return `### Meet the AKSHU Engineering Team 👥

Our team consists of senior full-stack developers, UI/UX architects, AI engineers, and cloud infrastructure specialists dedicated to crafting high-quality software.

Explore our team member profiles, tech stacks, and career achievements on our [Team Page](/team).`;
  }

  if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("reach")) {
    return `### Contact AKSHU Technologies 📬

We would love to discuss your project!

- **Email**: admin@akshu.com
- **Direct Message**: [Visit Contact Form](/contact)
- **Office Location**: AKSHU HQ

Ready to start? Let us know your project requirements!`;
  }

  return `Thank you for reaching out to AKSHU AI! 

I can assist you with information about our **Services**, **Projects**, **Tech Stack**, **Team Members**, and **Custom Software Estimates**.

What specific project or technology would you like to explore today? You can also visit our [Contact Page](/contact) to connect directly with our engineering team!`;
}

/**
 * Checks if user message indicates intent to build software/project
 */
function checkLeadIntent(msg = "") {
  const text = msg.toLowerCase();
  const keywords = [
    "need a",
    "want a",
    "build a",
    "develop",
    "hire",
    "price",
    "cost",
    "quote",
    "estimate",
    "ecommerce",
    "chatbot",
    "hospital",
    "erp",
    "app",
    "website",
    "project",
  ];
  return keywords.some((kw) => text.includes(kw));
}
