// -- UI Components --
import "./ui/atoms/LanguageSwitcher.js";
import "./ui/molecules/ProfileCard.js";
import "./ui/molecules/ProjectCard.js";
import "./ui/molecules/ContactForm.js";
import "./ui/molecules/ConsoleNav.js";
import "./ui/molecules/GithubWidget.js";
import "./ui/organisms/ProjectGrid.js";
import "./ui/organisms/terminal.js";
import "./ui/organisms/BootScreen.js";
import "./ui/organisms/SystemDashboard.js";
import "./ui/organisms/AboutViewer.js";
import "./ui/organisms/TechStack.js";
import "./ui/molecules/Toast.js";

// -- Core Systems --
import { updateLocalizedText } from "./core/utils/dom.js";
import { on } from "./core/events/bus.js";
import { EVENTS } from "./core/events/types.js";
import { initShell } from "./core/system/shell.js";
import { initViewport } from "./core/system/viewport.js";
import { initAudio } from "./core/system/audio.js";
import { initTheme } from "./core/system/theme.js";
import { initAchievements } from "./core/system/achievements.js";

on(EVENTS.SYS_BOOT, () => {
  console.log("%c [SYS] KERNEL ONLINE ", "background: #bc13fe; color: #fff;");
});

document.addEventListener("DOMContentLoaded", () => {
  try {
    updateLocalizedText();
    initShell();
    initViewport();
    initAudio();
    initTheme();
    initAchievements();

    document.body.appendChild(document.createElement("x-toast-manager"));

    const app = document.getElementById("app");
    const bootScreen = document.createElement("x-boot-screen");

    document.body.appendChild(bootScreen);
  } catch (error) {
    console.error("CRITICAL FAILURE:", error);
  }
});
