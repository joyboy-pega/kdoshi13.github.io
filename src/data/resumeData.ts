import { summaryText, experience, projects, skills, education } from './portfolioData';

export const RESUME_CONTENT: Record<string, { title: string, text: string[] }> = {
  'S': {
    title: 'Sage (Summary)',
    text: [
      "Greetings traveler! I am Keval Doshi, a Test Engineer & Software QA Specialist.",
      "I hold an MCA and a BBA in Computer Applications.",
      "I have a strong foundation in Game QA, programming, telemetry analysis, and software development.",
      "I specialize in developing automated testing tools and streamlining QA workflows with PresentMon and Python.",
      "My quests often involve telemetry analysis and performance profiling to deliver high-quality, evidence-backed bug reports.",
      "Explore this land to learn more about my journey!"
    ]
  },
  'E': {
    title: 'Ancient Archives (Education)',
    text: [
      "You inspect an ancient parchment scroll...",
      ...education.map(edu => `[ ${edu.period} ]\n${edu.degree}\n${edu.school}${edu.detail ? ` | ${edu.detail}` : ''}`)
    ]
  },
  'X': {
    title: 'The Blacksmith (Experience)',
    text: [
      "Work experience? I have forged my skills in the fires of the software industry.",
      `[ ${experience[0].period} ]\n${experience[0].role} at ${experience[0].company}`,
      experience[0].items.join("\n"),
      `[ ${experience[1].period} ]\n${experience[1].role} at ${experience[1].company}`,
      experience[1].items.join("\n")
    ]
  },
  'P': {
    title: 'Treasure Chest (Projects)',
    text: [
      "You open the heavy chest. Inside are artifacts of creation:",
      ...projects.map(proj => `[ ${proj.name} ] (${proj.tech})\n${proj.desc}`)
    ]
  },
  'K': {
    title: 'Training Grounds (Skills)',
    text: [
      "A sturdy training target stands here, engraved with disciplines:",
      ...Object.entries(skills).map(([cat, list]) => `[ ${cat} ]\n${list.join(', ')}`)
    ]
  }
};
