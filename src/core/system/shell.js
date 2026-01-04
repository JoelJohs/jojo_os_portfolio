import { on, emit } from "../events/bus.js";
import { EVENTS } from "../events/types.js";
import { parseInput } from "./commandParser.js";
import { fetchProjects } from "../repositories/projectRepository.js";
import { setTheme } from "./theme.js";

// Mapa del sistema de archivos virtual para validación
const FILE_SYSTEM = {
  "~": { type: "dir", view: "home" },
  projects: { type: "dir", view: "projects" },
  "about.txt": { type: "file", view: "about" },
  contact: { type: "executable", view: "contact" },
};

const loadProjects = async () => {
  emit(EVENTS.NAV_NAVIGATE, "loading");
  try {
    const projects = await fetchProjects();
    emit(EVENTS.NAV_NAVIGATE, { view: "projects", data: projects });
    return null;
  } catch (e) {
    return "Error loading projects.";
  }
};

// Mapa de comandos
const REGISTRY = {
  // --- NAVEGACIÓN (CD) ---
  cd: (args) => {
    const target = args[0] || "~"; // Si no hay arg, ir a home

    // Manejo de rutas simples
    if (target === "~" || target === "home" || target === "/") {
      emit(EVENTS.NAV_NAVIGATE, "home");
      return null; // Cambio visual silencioso
    }
    if (target === "projects" || target === "projects/") {
      return loadProjects();
    }
    if (target === "contact" || target === "contact/") {
      emit(EVENTS.NAV_NAVIGATE, "contact");
      return null;
    }
    if (target === "about" || target === "about.txt") {
      emit(EVENTS.NAV_NAVIGATE, "about");
      return null;
    }
    if (target === "..") {
      emit(EVENTS.NAV_NAVIGATE, "home"); // Back simple
      return "Returned to root.";
    }

    return `bash: cd: ${target}: No such directory`;
  },

  // --- LISTAR (LS) ---
  ls: (args) => {
    const target = args[0];

    if (target === "projects" || target === "projects/") {
      return fetchProjects().then((projects) => {
        const lines = projects
          .map((p) => `- ${p.title} [${p.status}]`)
          .join("\n");
        return { type: "text", value: lines };
      });
    }

    // Devuelve HTML formateado como columnas de linux
    return {
      type: "html",
      value: `
<span style="color: #2e59ff">projects/</span>&nbsp;&nbsp;
<span style="color: #e0e0e0">about.txt</span>&nbsp;&nbsp;
<span style="color: #bc13fe">contact*</span>&nbsp;&nbsp;
<span style="color: #e0e0e0">README.md</span>
      `,
    };
  },

  // --- LEER (CAT) ---
  cat: (args) => {
    const file = args[0];
    if (file === "about.txt" || file === "about") {
      emit(EVENTS.NAV_NAVIGATE, "about");
      return null;
    }
    if (file === "README.md") {
      return "JojoOS v1.0 - A Cyberpunk Portfolio Environment.";
    }
    return `cat: ${file}: No such file or directory`;
  },

  // --- PING (Para contacto) ---
  ping: (args) => {
    if (args[0] === "contact") {
      emit(EVENTS.NAV_NAVIGATE, "contact");
      return "Pinging secure channel... Connected.";
    }
    return "usage: ping <host>";
  },

  // --- ALIAS Y UTILIDADES ---
  cls: () => REGISTRY["clear"](),
  clear: () => {
    emit(EVENTS.CLI_CLEAR);
    return null;
  },

  whoami: () => "visitor@jojo-os (Guest User)",

  date: () => new Date().toString(),

help: () => ({
    type: "text",
    value:
      "Commands:\n" +
      " - ls [projects]\n" +
      " - cd <dir> (home, projects, about, contact, ..)\n" +
      " - cat <file> (about.txt abre About, README.md muestra info)\n" +
      " - ping contact\n" +
      " - clear | cls\n" +
      " - whoami\n" +
      " - date\n" +
      " - theme <default|matrix|cyberpunk>",
  }),

// --- TEMAS ---
  theme: (args) => {
    const name = args[0];
    if (!name) return "Usage: theme <default|matrix|cyberpunk>";
    
    if (setTheme(name)) {
      return `Theme loaded: [${name.toUpperCase()}]`;
    }
    return `Error: Theme "${name}" not found.`;
  },

  // --- COMANDOS SECRETOS ---
  sudo: () => {
    return {
      type: 'text',
      value: "<span style='color:red'>PERMISSION DENIED:</span> You didn't say the magic word."
    };
  },

  coffee: () => {
    return "Brewing... ☕ [██████████] 100% - Done. Here is your Java.";
  },

  '42': () => "The answer to life, the universe, and everything.",

  // --- SOPORTE LEGACY (Para que funcione el click en botones viejos si quedan) ---
  projects: () => ({ type: "text", value: "Use cd projects" }),
  home: () => ({ type: "text", value: "Use cd ~" }),
  about: () => ({ type: "text", value: "Use cd about" }),
  contact: () => ({ type: "text", value: "Use cd contact" }),
};

export function initShell() {
  on(EVENTS.CLI_INPUT, async (rawInput) => {
    const { command, args } = parseInput(rawInput);
    if (!command) return;

    const action = REGISTRY[command];
    if (action) {
      try {
        const response = await action(args);
        if (response) {
          emit(
            EVENTS.CLI_OUTPUT,
            typeof response === "string"
              ? { type: "text", value: response }
              : response
          );
        }
      } catch (err) {
        emit(EVENTS.CLI_OUTPUT, {
          type: "text",
          value: `Error: ${err.message}`,
        });
      }
    } else {
      emit(EVENTS.CMD_NOT_FOUND, command);
      emit(EVENTS.CLI_OUTPUT, {
        type: "text",
        value: `bash: ${command}: command not found`,
      });
    }
  });
}
