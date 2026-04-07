import { getPlayerStats } from "../core/utils/profile.js";

export const PROFESSIONAL_DATA = {
  header: {
    name: "Joel Josafat Hernández Saucedo",
    title:
      "Fullstack Developer (Backend-Focused) | Node.js • TypeScript • React • Next.js • PostgreSQL",
    location: "Morelia, Michoacán, Mexico",
    email: "jojohersa21@gmail.com",
    phone: "+52 438 100 4177",
    summary:
      "Fullstack developer focused on backend engineering using Node.js and TypeScript. Experience building REST APIs, SaaS systems, and scalable web applications. Background in React, Next.js, and relational database design.",
    cv_paths: {
      es: "assets/docs/Joel_Josafat_Hernández_Saucedo_CV.pdf",
      en: "assets/docs/Joel_Josafat_Hernández_Saucedo_CV.pdf",
    },
  },
  experience: [
    {
      role: "Fullstack Developer",
      company: "Voccalo",
      period: "Nov 2025 - Present",
      desc: "Migrated legacy React architecture to Next.js, designed multi-tenant SaaS architecture, standardized repo structure, and integrated frontend/back layers for scalable delivery.",
    },
    {
      role: "Backend / Fullstack Developer",
      company: "ABV Electric Supply",
      period: "Feb 2025 - Nov 2025",
      desc: "Built REST APIs with Django and PostgreSQL, implemented backend business logic, structured modular architecture, and integrated backend services with frontend interfaces.",
    },
    {
      role: "Fullstack Developer (Selected Projects)",
      company: "Freelance",
      period: "Jan 2024 - Present",
      desc: "Developed custom POS and business management systems, designed relational database architectures with PostgreSQL/MySQL, and built fullstack apps integrating backend APIs and frontend systems.",
    },
    {
      role: "Internal Systems & IT Support",
      company: "Power Energy",
      period: "Jan 2023 - Feb 2025",
      desc: "Developed internal management system replacing spreadsheet workflows, built automation tools for reporting and operations, and maintained IT infrastructure and continuity.",
    },
  ],
  education: [
    {
      degree: "Ingeniería en Sistemas Computacionales",
      school: "Instituto Tecnológico de Morelia",
      period: "Aug 2021 - Jun 2026",
    },
  ],
  skills: [
    "Backend: Node.js, Express, NestJS",
    "Frontend: React, Next.js",
    "Languages: JavaScript, TypeScript, Python",
    "Databases: PostgreSQL, MySQL",
    "Concepts: REST APIs, SaaS, Software Architecture, SDLC",
  ],
};

export const SECRET_DATA = {
  intro:
    "No sé muy bien cómo hablar de mí mismo, solo sé que me gusta programar y sentir la dopamina de arreglar un bug. Soy alguien simple que disfruta ver el resultado de su esfuerzo.",
  memeUrl: "assets/img/se-adapta.webp",
  jsonBlock: {
    pronouns: "he/him",
    nickname: "Jojo",
    stand: "Mahoraga (Adaptability)",
    traits: ["Slightly sarcastic", "Coffee Powered", "Bug Fixer"],
    hobbies: [
      "Vivir para mi hija",
      "Videojuegos (desde la SNES)",
      "Gimnasio (fuerza)",
      "Intentar cansar a mi perro",
    ],
    philosophy:
      "Today I have more questions than answers... My story is but one of thousands.",
  },
};
