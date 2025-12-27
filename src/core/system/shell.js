// -- Imports --
import { on, emit } from "../events/bus.js";
import { EVENTS } from "../events/types.js";
import { parseInput } from "./commandParser.js";

// -- Registro de los comandos --
const REGISTRY = {
  help: (args) => {
    return "comandos disponibles: help, echo, clear";
  },
  echo: (args) => {
    return args.join(" ");
  },
  clear: (args) => {
    emit(EVENTS.CLI_CLEAR);
    return null;
  },
  // Agregare los demas comandos segun vaya haciendo cada seccion del portfolio
};

// -- Iniciar el shell --
export function initShell() {
  on(EVENTS.CLI_INPUT, (inputString) => {
    // 1. Procesamiento de los inputs
    const { command, args } = parseInput(inputString);

    if (!command) return;

    // 2. Buscamos los comandos en el registro
    const action = REGISTRY[command];

    // 3. control de errores
    if (action) {
      try {
        const response = action(args);
        if (response) {
          emit(EVENTS.CLI_OUTPUT, response);
        }
      } catch (error) {
        if (error.name === "SyntaxError") {
          emit(EVENTS.CLI_OUTPUT, `[ERROR] Invalid input: ${error.message}`);
        } else if (error.name === "RangeError") {
          emit(
            EVENTS.CLI_OUTPUT,
            `[ERROR] Argument out of range: ${error.message}`
          );
        } else {
          emit(
            EVENTS.CLI_OUTPUT,
            `[ERROR] Critical failure in ${command}: ${error.message}`
          );
        }
        console.error(`[Shell] ${command} failed:`, error);
      }
    } else {
      emit(EVENTS.CMD_NOT_FOUND, command);
      emit(EVENTS.CLI_OUTPUT, `Command not found: "${command}". Type "help".`);
    }
  });

  console.log("[Shell] System initialized and listening...");
}
