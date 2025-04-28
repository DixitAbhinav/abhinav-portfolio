import { Command, Cloud, Database, ShieldCheck } from "lucide-react";
const techStacks = [
  {
    title: "Backend & APIs",
    icon: Command,
    skills: [
      "Node.js & Express",
      "REST & GraphQL",
      "Prisma & TypeORM",
      "Go & Fiber",
      "Java & Spring Boot",
      "Python & Flask",
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
      "Tailwind CSS & Bootstrap",
      "AWS",
    ],
    description: "Building responsive user interfaces and cloud solutions",
  },
  {
    title: "Database & DevOps",
    icon: Database,
    skills: [
      "MongoDB & PostgreSQL",
      "Docker & Kubernetes",
      "Redis & Caching",
      "CI/CD Pipelines",
      "Shell Scripting",
      "Linux & Bash",
    ],
    description: "Managing databases and infrastructure",
  },
  {
    title: "Testing & Automation",
    icon: ShieldCheck,
    skills: [
      "Jest & Mocha",
      "Cypress & Selenium",
      "Postman & Insomnia",
      "GitHub Actions",
      "Travis CI & Jenkins",
      "Docker Compose",
    ],
    description: "Writing tests and automating workflows",
  },
];

export default techStacks;
