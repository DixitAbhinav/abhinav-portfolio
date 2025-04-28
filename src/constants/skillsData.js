import { Command, Cloud, Database } from "lucide-react";

export const skillCategories = [
  {
    title: "Backend & APIs",
    icon: Command,
    skills: [
      "Node.js & Express",
      "REST & GraphQL",
      "Prisma & TypeORM",
      "Go & Fiber",
      "Java & Spring Boot",
    ],
    description: "Developing scalable APIs and backend services",
  },
  {
    title: "Frontend & Cloud",
    icon: Cloud,
    skills: [
      "HTML & CSS",
      "JavaScript & TypeScript",
      "Framer Motion",
      "React & Next.js",
      "AWS",
    ],
    description: "Building responsive user interfaces and cloud solutions",
  },
  {
    title: "Database & DevOps",
    icon: Database,
    skills: ["MongoDB & PostgreSQL", "Docker & Kubernetes"],
    description: "Managing databases and infrastructure",
  },
];
