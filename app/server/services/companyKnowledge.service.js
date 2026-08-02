// APP/server/services/companyKnowledge.service.js

import Blog from "../models/blog.model.js";
import Project from "../models/project.model.js";
import Team from "../models/team.model.js";

/**
 * Compiles real-time company knowledge from live MongoDB collections
 * @returns {Promise<string>} Clean, formatted markdown string for system prompt injection
 */
export const getLiveCompanyKnowledge = async () => {
  try {
    const [blogs, projects, team] = await Promise.all([
      Blog.find({ status: "published" }).select("title category shortDescription slug").limit(10),
      Project.find({ status: "published" }).select("title category description client techStack liveDemoUrl slug").limit(10),
      Team.find({ isActive: true }).select("name displayName role designation department specialization bio techStack slug").limit(10),
    ]);

    let knowledge = `### VERIFIED LIVE AKSHU TECHNOLOGIES KNOWLEDGE BASE:\n\n`;

    knowledge += `#### ABOUT AKSHU TECHNOLOGIES:\n`;
    knowledge += `AKSHU Technologies is an elite software development agency & digital transformation studio founded and led by Founder & CEO Ankit Yadav.\n`;
    knowledge += `Founder & CEO: Ankit Yadav\n`;
    knowledge += `Core Email: admin@akshu.com | Contact Page: /contact\n\n`;

    knowledge += `#### CORE SERVICES & CAPABILITIES:\n`;
    knowledge += `- Web Development (React, Next.js, Node.js, Express, MongoDB, Tailwind CSS, PostgreSQL)\n`;
    knowledge += `- Mobile App Development (React Native, iOS, Android, Cross-platform)\n`;
    knowledge += `- AI & Machine Learning Solutions (AI Chatbots, Custom LLMs, Automation, Predictive Analytics)\n`;
    knowledge += `- Enterprise Software & SaaS (ERPs, Healthcare & Hospital Management Systems, E-Commerce Portals, Cloud Infrastructure)\n\n`;

    if (projects && projects.length > 0) {
      knowledge += `#### RECENT FEATURED PROJECTS:\n`;
      projects.forEach((p) => {
        const title = p.title;
        const cat = p.category || "Web App";
        const desc = p.description || p.shortDescription || "";
        const tech = p.techStack ? p.techStack.join(", ") : "";
        knowledge += `- **${title}** (${cat}): ${desc}. Tech: [${tech}]. URL: /projects/${p.slug || p._id}\n`;
      });
      knowledge += `\n`;
    }

    if (team && team.length > 0) {
      knowledge += `#### KEY TEAM MEMBERS & EXPERTS:\n`;
      team.forEach((t) => {
        const name = t.displayName || t.name;
        const role = t.designation || t.role;
        const dept = t.department || "Engineering";
        const spec = t.specialization || "";
        knowledge += `- **${name}**: ${role} (${dept}). Specialization: ${spec}. Profile: /team/${t.slug || t._id}\n`;
      });
      knowledge += `\n`;
    }

    if (blogs && blogs.length > 0) {
      knowledge += `#### RECENT BLOGS & TECHNICAL INSIGHTS:\n`;
      blogs.forEach((b) => {
        knowledge += `- **${b.title}** (${b.category || "Tech"}): ${b.shortDescription || ""}. URL: /blog/${b.slug || b._id}\n`;
      });
      knowledge += `\n`;
    }

    return knowledge;
  } catch (error) {
    console.error("Error generating company knowledge base:", error);
    return `AKSHU Technologies is a leading software engineering firm specializing in Web Development, Mobile Apps, AI Chatbots, and Cloud Solutions.`;
  }
};
