import { on, emit } from "../events/bus.js";
import { EVENTS } from "../events/types.js";
import { parseInput } from "./commandParser.js";
import { fetchProjects } from "../repositories/projectRepository.js";

const REGISTRY = {
  home: () => {
    emit(EVENTS.NAV_NAVIGATE, "home");
    return "Jumping to sector: HOME";
  },
  about: () => {
    emit(EVENTS.NAV_NAVIGATE, "about");
    return "Retrieving personnel file...";
  },
  projects: async () => {
    emit(EVENTS.NAV_NAVIGATE, "loading");
    emit(EVENTS.CLI_OUTPUT, "Connecting to secure database...");

    try {
      const projects = await fetchProjects();
      emit(EVENTS.NAV_NAVIGATE, { view: "projects", data: projects });
      return `Access granted. ${projects.length} modules loaded.`;
    } catch (error) {
      return `[ERROR] Connection failed: ${error.message}`;
    }
  },
  contact: () => {
    emit(EVENTS.NAV_NAVIGATE, "contact");
    return "Opening secure channel...";
  },
  clear: () => {
    emit(EVENTS.CLI_CLEAR);
    return null;
  },
  help: () =>
    "Available sectors: home, about, projects, contact. System cmds: clear, echo.",
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
          emit(EVENTS.CLI_OUTPUT, response);
        }
      } catch (error) {
        emit(EVENTS.CLI_OUTPUT, `[ERROR] Critical failure in ${command}.`);
        console.error(`[Shell] ${command} failed:`, error);
      }
    } else {
      emit(EVENTS.CLI_OUTPUT, `Access denied: "${command}" unknown.`);
    }
  });
}
