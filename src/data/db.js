export const PROJECTS_DB = [
  {
    id: "finguardian",
    title: "FinGuardian",
    description:
      "Aplicación fullstack para gestionar finanzas personales con autenticación JWT, dashboards y análisis por categoría.",
    status: "active",
    order: 3,
    media: {
      thumbnail: "assets/projects/finguardian.png",
      video_demo: "https://youtu.be/n2SL2EVgVLw",
    },
    tech_stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    urls: {
      demo: "https://youtu.be/n2SL2EVgVLw",
      repository_main: {
        url: "https://github.com/JoelJohs/finguardian_client",
        type: "frontend",
      },
      repository_sec: {
        url: "https://github.com/JoelJohs/finguardian_backend",
        type: "backend",
      },
    },
    i18n: {
      en: {
        title: "FinGuardian",
        description:
          "Fullstack personal finance app with JWT auth, dashboards, and category analytics.",
      },
      es: {
        title: "FinGuardian",
        description:
          "Aplicación fullstack para gestionar finanzas personales con autenticación JWT, dashboards y análisis por categoría.",
      },
    },
  },
  {
    id: "jojoos-terminal",
    title: "JojoOS Terminal (Actual)",
    description:
      "Portafolio actual estilo terminal/cyberpunk con CLI/GUI, logros y temas dinámicos.",
    status: "active",
    order: 1,
    media: {
      thumbnail: "assets/projects/jojo-os.png",
      video_demo: null,
    },
    tech_stack: ["Vanilla JS", "Web Components", "CSS Variables"],
    urls: {
      demo: "https://joeljohs.github.io/jojo_os_portfolio/",
      repository_main: {
        url: "https://github.com/JoelJohs/jojo_os_portfolio",
        type: "frontend",
      },
      repository_sec: null,
    },
    i18n: {
      en: {
        title: "JojoOS Terminal (Current)",
        description:
          "Current cyberpunk terminal-style portfolio with CLI/GUI, achievements, and dynamic themes.",
      },
      es: {
        title: "JojoOS Terminal (Actual)",
        description:
          "Portafolio actual estilo terminal/cyberpunk con CLI/GUI, logros y temas dinámicos.",
      },
    },
  },
  {
    id: "portfolio-astro-v3",
    title: "Portafolio Personal (Astro) — Legacy",
    description:
      "Portafolio anterior construido con Astro y TypeScript; muestra stack, experiencia y el primer sistema de logros.",
    status: "active",
    order: 2,
    media: {
      thumbnail: "assets/projects/portfolio.png",
      video_demo: null,
    },
    tech_stack: ["Astro", "TypeScript"],
    urls: {
      demo: "https://joeljohs-portfolio-v3.vercel.app/",
      repository_main: {
        url: "https://github.com/JoelJohs/portfolio_v3",
        type: "frontend",
      },
      repository_sec: null,
    },
    i18n: {
      en: {
        title: "Personal Portfolio (Astro) — Legacy",
        description:
          "Previous portfolio built with Astro and TypeScript featuring the first achievement system.",
      },
      es: {
        title: "Portafolio Personal (Astro) — Legacy",
        description:
          "Portafolio anterior construido con Astro y TypeScript; muestra stack, experiencia y el primer sistema de logros.",
      },
    },
  },
];
