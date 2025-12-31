/**
 * Diccionario de constantes para evitar eventos repetidos o inconsistentes esparcidos por la app
 * ej: instead of using 'sys:boot' everywhere, use EVENTS.SYS_BOOT
 */

export const EVENTS = {
  // Sistema
  SYS_BOOT: "sys:boot",
  SYS_SHUTDOWN: "sys:shutdown",

  // UI
  UI_THEME_CHANGED: "ui:theme_changed",

  // NAVEGACIÓN (Nuevo)
  NAV_NAVIGATE: "nav:navigate",

  // Terminal (CLI)
  CLI_INPUT: "cli:input", // El usuario presionó Enter
  CLI_OUTPUT: "cli:output", // El sistema responde texto
  CLI_CLEAR: "cli:clear",

  // Comandos
  CMD_NOT_FOUND: "cmd:not_found",
  CMD_EXEC: "cmd:exec", // Un comando específico se ejecutó
};
