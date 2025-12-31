export const PROJECTS_DB = [
  // Los datos de momento son falsos simplemente para revisar como funcionan y poder ir ajustando la UI
  {
    id: "portfolio-v1",
    title: "JojoOS Terminal",
    description:
      "Hybrid CLI/GUI Portfolio based on Vanilla JS + Clean Architecture. A cyberpunk experience for the web.",
    status: "developing", // active, archived, developing
    order: 1,
    media: {
      thumbnail: "assets/img/projects/jojo-os-thumb.jpg", // Asegúrate de tener una img placeholder
      video_demo: null,
    },
    tech_stack: ["Vanilla JS", "Web Components", "CSS Variables"],
    urls: {
      demo: "#",
      repository_main: {
        url: "https://github.com/tu-usuario/jojo-os",
        type: "frontend",
      },
      repository_sec: null,
    },
  },
  {
    id: "lms-system",
    title: "School LMS Core",
    description:
      "Learning Management System with multi-tenant architecture for custom school branding.",
    status: "active",
    order: 2,
    media: {
      thumbnail: "assets/img/projects/lms-thumb.jpg",
      video_demo: "https://youtube.com/watch?v=...",
    },
    tech_stack: ["Node.js", "PostgreSQL", "Microservices"],
    urls: {
      demo: "https://lms-demo.com",
      repository_main: {
        url: "https://github.com/tu-usuario/lms-backend",
        type: "backend",
      },
      repository_sec: {
        url: "https://github.com/tu-usuario/lms-front",
        type: "frontend",
      },
    },
  },
];
