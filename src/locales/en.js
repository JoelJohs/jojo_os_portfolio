export default {
  system: {
    title: "JOJO-OS v1.0",
    boot: "SYSTEM INITIALIZING...",
    status: "STATUS: ONLINE",
    lang_label: "LANGUAGE",
  },
  ui: {
    home: "Home",
    projects: "Projects",
    about: "About Me",
    contact: "Contact",
    or: "or",
  },
  dashboard: {
    role: "Backend / Fullstack Developer",
    stack: ">> ACTIVE STACK",
    welcome_title: "WELCOME TO JOJO-OS",
    welcome_body: "System Online. Accessing portfolio database...",
    hint: "Try typing:",
    next_level: "Next Level in:",
    days: "days",
    achievements: "Achievements",
    keep_exploring: "Keep exploring!",
  },
  achievements: {
    cli_user: {
      title: "Hackerman",
      desc: "Used the CLI for the first time",
    },
    avatar_switch: {
      title: "Pixel Shifter",
      desc: "Toggled the avatar into pixel art",
    },
    easter_egg_1: {
      title: "The Chosen One",
      desc: "Found the Matrix theme",
    },
    spam: {
      title: "Clear History",
      desc: "Used clear command",
    },
    sudo: {
      title: "Nice Try",
      desc: "Tried to use sudo privileges",
    },
    coffee_break: {
      title: "Caffeinated",
      desc: "Took a coffee break",
    },
    theme_switcher: {
      title: "Chameleon",
      desc: "Changed themes",
    },
    vault_unlocked: {
      title: "Archivist",
      desc: "Opened the achievements vault",
    },
    shell: {
      title: "Achievements",
      locked: "Locked: {count} remaining",
      complete: "All achievements unlocked.",
    },
  },
  achievementHints: {
    avatar: "Toggle the avatar between normal and pixel art.",
    theme: "Cycle through themes; one is drenched in green rain.",
    cli: "Any first command wakes the terminal.",
    clear: "Need space? 'clear' or 'cls' wipes the feed.",
    sudo: "Privileged access is locked, but asking still leaves a trace.",
    coffee: "The console can brew coffee on request.",
    contact: "'ping contact' also opens the secure channel.",
    projects:
      "You can jump into projects straight from the console (cd projects).",
  },
  projects: {
    empty: "NO MODULES FOUND IN SECTOR.",
    actions: {
      demo: "LIVE DEMO",
    },
    status: {
      active: "Active",
      developing: "In progress",
      archived: "Archived",
    },
  },
  contactForm: {
    title: "OPEN SECURE CHANNEL",
    subtitle: "Send an encrypted payload and we will respond ASAP.",
    name: "Name / Alias",
    email: "Secure Email",
    message: "Message",
    placeholder_name: "Neo",
    placeholder_email: "neo@matrix.io",
    placeholder_message: "Trace route, send payload...",
    submit: "Transmit",
    status_sent: "Payload transmitted. Await response.",
    direct_contact_title: "DIRECT CONNECTION",
    email: "jojohersa21@gmail.com",
    linkedin: "LinkedIn",
    github: "GitHub",
    timezone: "Time zone (GMT-6)",
    availability: "Available for collaborations and opportunities",
  },
  viewport: {
    loading: "DECRYPTING DATA...",
    not_found_title: "404 NOT FOUND",
    not_found_body: "Route does not exist.",
  },
  terminal: {
    placeholder: "Type 'help' to see all commands",
  },
  bio: {
    intro: "I'm Joel, a developer focused on solid foundations...",
  },
  boot: {
    kernel: "INITIALIZING KERNEL...",
    memory: "CHECKING MEMORY INTEGRITY... OK",
    filesystem: "MOUNTING VIRTUAL FILESYSTEM... OK",
    drivers: "LOADING DRIVERS: [VIDEO] [AUDIO] [INPUT]",
    profile: "DECRYPTING USER PROFILE...",
    connection: "ESTABLISHING SECURE CONNECTION...",
    ready: "SYSTEM READY.",
  },
  tech_stack: {
    title: "Core Technologies",
    subtitle: "My main and favorite technologies.",
    tabs: {
      languages: "Languages",
      frameworks: "Frameworks",
      tools: "Tools",
      databases: "Databases",
    },
  },
  about: {
    public_record: "ABOUT_ME.md",
    secret_data: ".SECRET_DATA",
    public_html: `
<div class="doc-paper">
  <div class="doc-header">
    <div class="doc-info">
      <h2>Joel Josafat Hernández Saucedo</h2>
      <h3 class="role">Fullstack Developer | Backend Focus</h3>
      <p class="meta">📍 Morelia, Michoacán | 📧 jojohersa21@gmail.com</p>
      <p class="summary">
        Backend-focused developer with 3+ years building web apps and scalable APIs. I prioritize clean code, solid architecture, and clear communication between teams to ship reliable systems.
      </p>
    </div>
  </div>

  <hr class="doc-divider">

  <section class="doc-section">
    <h4>>> OPERATIONS LOG (Experience)</h4>

    <div class="job-item">
      <div class="job-head">
        <span class="job-title">IT Assistant / Developer</span>
        <span class="job-date">Feb 2025 - Present</span>
      </div>
      <div class="job-company">ABV Electric Supply</div>
      <ul class="job-bullets">
        <li>Develop and optimize REST APIs with Django + PostgreSQL.</li>
        <li>Integrate backend services with frontend clients to improve data flow.</li>
        <li>Collaborate with ops to harden deployments and documentation.</li>
      </ul>
    </div>

    <div class="job-item">
      <div class="job-head">
        <span class="job-title">Fullstack Developer (Freelance)</span>
        <span class="job-date">Jan 2023 - Jan 2025</span>
      </div>
      <ul class="job-bullets">
        <li>Built management systems and POS solutions with React and Express.</li>
        <li>Designed relational schemas and implemented JWT-secured APIs.</li>
        <li>Delivered client-ready dashboards with clear reporting.</li>
      </ul>
    </div>

    <div class="job-item">
      <div class="job-head">
        <span class="job-title">IT Support & Internal Dev</span>
        <span class="job-date">Feb 2020 - Jan 2025</span>
      </div>
      <div class="job-company">Power Energy</div>
      <ul class="job-bullets">
        <li>Automated admin workflows and maintained internal tools.</li>
        <li>Supported infrastructure and ensured data continuity.</li>
      </ul>
    </div>
  </section>

  <section class="doc-section">
    <h4>>> EDUCATION</h4>
    <div class="edu-item"><strong>Computer Systems Engineering</strong> — Instituto Tecnológico de Morelia (2020 - 2025)</div>
    <div class="edu-item"><strong>Técnico en Informática</strong> — CECyTEM (2015 - 2018)</div>
  </section>

  <section class="doc-section">
    <h4>>> TECH STACK</h4>
    <div class="stack-grid">
      <span class="stack-chip">Python · Django · FastAPI</span>
      <span class="stack-chip">JavaScript / TypeScript</span>
      <span class="stack-chip">React · NestJS · Express</span>
      <span class="stack-chip">PostgreSQL · MySQL</span>
      <span class="stack-chip">Docker · Git</span>
    </div>
  </section>

  <section class="doc-section">
    <h4>>> LANGUAGES</h4>
    <ul class="lang-list">
      <li>Spanish — Native</li>
      <li>English — B2 (professional)</li>
    </ul>
  </section>

  <section class="doc-section">
    <h4>>> SOFT SKILLS</h4>
    <div class="stack-grid">
      <span class="stack-chip">Clear communication</span>
      <span class="stack-chip">Technical ownership</span>
      <span class="stack-chip">Problem solving</span>
      <span class="stack-chip">Team collaboration</span>
    </div>
  </section>
</div>
`,

    secret_html: `
<div class="secret-terminal">
  <div class="secret-header">🔓 ARCHIVE: PERSONALITY_REAL.json</div>

  <div class="secret-body">
    <p class="console-text">I don't really know how to talk about myself; I just know I love coding and the dopamine rush of fixing bugs.</p>

    <div class="meme-container">
      <img src="assets/img/se-adapta.jpg" alt="Mahoraga adapts" class="meme-img">
      <div class="meme-caption">STATUS: ADAPTING TO ANY SITUATION...</div>
    </div>

<pre><code class="language-json">const aboutJoel = {
  nick: "Jojo",
  class: "Backend mage / Fullstack warrior",
  fuel: "Coffee (critical)",
  mission: "Be a better man and a true warrior",
  stats: {
    strength: "Gym",
    intelligence: "Always learning (.NET / Angular loading...)",
    charisma: "Sarcasm level B2"
  },
  hobbies: [
    "Living for my daughter (my everything)",
    "Video games (since the SNES)",
    "Trying (and failing) to tire my dog"
  ],
  favorites: {
    games: [
      "Monster Hunter",
      "Chrono Trigger",
      "Pokémon",
      "The Legend of Zelda",
      "Metal Gear Solid",
      "Fire Emblem"
    ],
    movies: ["Atlantis: The Lost Empire", "Star Wars Saga", "Avatar Saga"]
  }
};
</code></pre>

    <blockquote class="quote">
      "Today I have more questions than answers; that's why I've come so far in search of clarity. My story is one of thousands, and the world will not suffer if it ends prematurely."
      <footer>- Ezio Auditore</footer>
    </blockquote>

    <p class="console-text">Dev philosophy: it's not just making it work, it's understanding why it works and turning messy bugs into solid systems.</p>
  </div>
</div>
`,
  },
};
