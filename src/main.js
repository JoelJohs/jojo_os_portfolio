// -- Imports --
import "./ui/atoms/LanguageSwitcher.js";
import { updateLocalizedText } from "./core/utils/dom.js";
import { emit, on } from "./core/events/bus.js";
import { EVENTS } from "./core/events/types.js";
import { initShell } from "./core/system/shell.js";

// -- Subscriptions --
on(EVENTS.SYS_BOOT, () => {
  console.log(
    "%c [SYS_BOOT] Kernel Loaded ",
    "background: #bc13fe; color: #fff; padding: 2px;"
  );
});

// -- CLI Logger --
on(EVENTS.CLI_OUTPUT, (text) => {
  console.log(
    "%c[SYSTEM RESPONSE] %c" + text,
    "color: #00f3ff; font-weight:bold;",
    "color: #e0e0e0;"
  );
});

// -- Bootloader --
document.addEventListener("DOMContentLoaded", () => {
  // Aplica las traducciones iniciales
  updateLocalizedText();

  // 1. Inicializar el Shell (ponerlo a escuchar)
  initShell();

  // 2. Simulación de boot y comandos de prueba
  setTimeout(() => {
    emit(EVENTS.SYS_BOOT);

    // 3. PRUEBA AUTOMÁTICA: Simular que el usuario escribe 'help'
    console.log('[USER SIMULATION] Typing "help"...');
    emit(EVENTS.CLI_INPUT, "help");

    // Prueba 2: Simular un comando con argumentos
    setTimeout(() => {
      console.log('[USER SIMULATION] Typing "echo Hello Cyberpunk"...');
      emit(EVENTS.CLI_INPUT, "echo Hello Cyberpunk");
    }, 500);
  }, 1000);
});
