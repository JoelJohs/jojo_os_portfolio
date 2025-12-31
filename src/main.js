// -- UI Components (Web Components Registration) --
import "./ui/atoms/LanguageSwitcher.js";
import "./ui/organisms/terminal.js";

// -- Core Systems --
import { updateLocalizedText } from "./core/utils/dom.js";
import { emit, on } from "./core/events/bus.js";
import { EVENTS } from "./core/events/types.js";
import { initShell } from "./core/system/shell.js";

// -- System Lifecycle --

/**
 * Escucha el evento de arranque para realizar tareas post-carga.
 * En el futuro, aquí ocultaremos el preloader.
 */
on(EVENTS.SYS_BOOT, () => {
  console.log(
    "%c [SYS] KERNEL ONLINE ",
    "background: #bc13fe; color: #fff; padding: 2px; border-radius: 2px;"
  );
});

// -- Boot Sequence --

document.addEventListener("DOMContentLoaded", () => {
  try {
    // 1. I18N: inicializa las traducciones iniciales
    updateLocalizedText();

    // 2. KERNEL: inicializa el shell
    initShell();

    // 3. BOOT: inicia el sistema con un pequeño delay para que el dom esté listo
    setTimeout(() => {
      emit(EVENTS.SYS_BOOT);
    }, 100);
  } catch (error) {
    console.error("CRITICAL SYSTEM FAILURE:", error);
  }
});
