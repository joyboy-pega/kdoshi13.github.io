import { ExperienceItem, ProjectItem, EducationItem, ContactInfo } from '../types';

export const contactInfo: ContactInfo = {
  name: "Keval Doshi",
  title: "Test Engineer & Software QA Specialist",
  email: "kevaldoshi34223@gmail.com",
  phone: "7887554305",
  location: "Hadapsar, Pune, India",
  github: "https://github.com/kdoshi13",
  linkedin: "https://www.linkedin.com/in/keval-doshi"
};

export const skills: Record<string, string[]> = {
  "Programming Languages": ["C", "C++", "Python", "Java", "HTML", "CSS", "JavaScript", "SQL", "React Native", "GDScript"],
  "Databases": ["Oracle DB", "MySQL", "SQLite"],
  "Operating Systems": ["Windows", "Linux"],
  "Testing & QA": ["Game QA", "Telemetry Analysis", "Performance Profiling", "Bug Tracking", "Quality Assurance", "Software Testing", "PresentMon Automation"]
};

export const experience: ExperienceItem[] = [
  { 
    role: "Test Engineer", 
    company: "Globalstep", 
    period: "Jan 2026 - Present", 
    items: [
      "Performing software testing and quality assurance activities across diverse game and software platforms.", 
      "Streamlined bug reporting workflows by integrating real-time telemetry, hardware diagnostics (PresentMon), and automated video capture.", 
      "Enhanced testing cycle efficiency by automating data filing, crash logging, and performance profiling."
    ] 
  },
  { 
    role: "Legal Assistant", 
    company: "Simplify S", 
    period: "May 2024 - Oct 2024", 
    items: [
      "Managed and organized customer personal documents, ensuring strict accuracy and confidentiality of sensitive records.", 
      "Handled client correspondence via email and phone, addressing queries and providing timely status updates.", 
      "Maintained organized digital record-keeping systems to support efficient tracking and retrieval of client files."
    ] 
  }
];

export const projects: ProjectItem[] = [
  { 
    name: "ClipBug", 
    tech: "Telemetry Analysis, PresentMon, Automation", 
    desc: "Developed a unified desktop client for automated game QA that streamlined bug reporting workflows by integrating real-time telemetry, hardware diagnostics, and automated video capture." 
  },
  { 
    name: "Adventure of Kaya", 
    tech: "Godot Engine (v3.5.2), GDScript", 
    desc: "Created a 2D action-adventure game featuring quest mechanics, enemy AI, inventory systems, and sprite-based animations." 
  },
  { 
    name: "First Trip", 
    tech: "React Native, Expo, JavaScript, Supabase", 
    desc: "Developed a mobile application for travel experience sharing and ride-sharing with real-time synchronization." 
  },
  { 
    name: "Sales Management", 
    tech: "Python, Tkinter, SQLite3, Pillow", 
    desc: "Designed a desktop solution for small businesses to manage inventory, generate invoices, and produce daily sales reports." 
  }
];

export const education: EducationItem[] = [
  { degree: "Master of Computer Applications (MCA)", school: "Modern College of Engineering", period: "July 2024 - Present", detail: "Pursuing" },
  { degree: "Bachelor of Business Administration (Computer Application)", school: "MMCC", period: "July 2020 - July 2023", detail: "CGPA: 8.89" },
  { degree: "12th HSC", school: "SMT S.T.K Gujarati Junior College, Amravati", period: "July 2019 - Feb 2020", detail: "75.85%" },
  { degree: "10th SSC", school: "M.G.H.S", period: "July 2017 - Feb 2018", detail: "76.20%" }
];

export const summaryText = "Motivated Test Engineer and BBA in Computer Applications graduate with a strong foundation in Game QA, programming, and software development. Currently pursuing an MCA, with hands-on experience developing automated testing tools and streamlining quality assurance workflows. Skilled in telemetry analysis and performance profiling to deliver high-quality, evidence-backed bug reports in dynamic development environments.";
