// -- UI Components --
import "./ui/atoms/LanguageSwitcher.js";
import "./ui/molecules/ProfileCard.js";
import "./ui/molecules/ProjectCard.js";
import "./ui/molecules/ContactForm.js";
import "./ui/molecules/ConsoleNav.js";
import "./ui/organisms/ProjectGrid.js";
import "./ui/organisms/Terminal.js";
import "./ui/organisms/BootScreen.js";
import "./ui/organisms/SystemDashboard.js";

// -- Core Systems --
import { updateLocalizedText } from "./core/utils/dom.js";
import { on } from "./core/events/bus.js";
import { EVENTS } from "./core/events/types.js";
import { initShell } from "./core/system/shell.js";
import { initViewport } from "./core/system/viewport.js";
import { initAudio } from "./core/system/audio.js";

// -- System Lifecycle --

on(EVENTS.SYS_BOOT, () => {
  console.log("%c [SYS] KERNEL ONLINE ", "background: #bc13fe; color: #fff;");
  // Aquí el BootScreen ya desapareció visualmente
});

document.addEventListener("DOMContentLoaded", () => {
  try {
    // 1. Inicializar sistemas (sin hacer ruido visual aún)
    updateLocalizedText();
    initShell();
    initViewport();
    initAudio();

    // 2. Inyectar la Secuencia de Arranque
    const app = document.getElementById("app");
    const bootScreen = document.createElement("x-boot-screen");

    // Lo agregamos al body para que cubra absolutamente todo
    document.body.appendChild(bootScreen);

    // NOTA: Ya no hacemos emit(EVENTS.SYS_BOOT) aquí manualmente.
    // El componente x-boot-screen lo hará cuando termine su animación.
  } catch (error) {
    console.error("CRITICAL FAILURE:", error);
  }
});
