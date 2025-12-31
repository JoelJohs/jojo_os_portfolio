import { on, emit } from "../events/bus.js";
import { EVENTS } from "../events/types.js";
import { parseInput } from "./commandParser.js";

const REGISTRY = {
  home: () => {
    emit(EVENTS.NAV_NAVIGATE, "home");
    return "Jumping to sector: HOME";
  },
  about: () => {
    emit(EVENTS.NAV_NAVIGATE, "about");
    return "Retrieving personnel file...";
  },
  projects: () => {
    emit(EVENTS.NAV_NAVIGATE, "projects");
    return "Accessing project repository...";
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
  on(EVENTS.CLI_INPUT, (rawInput) => {
    const { command, args } = parseInput(rawInput);
    if (!command) return;

    const action = REGISTRY[command];
    if (action) {
      const response = action(args);
      if (response) {
        emit(EVENTS.CLI_OUTPUT, response);
      }
    } else {
      emit(EVENTS.CLI_OUTPUT, `Access denied: "${command}" unknown.`);
    }
  });
}
