import "./ui/atoms/LanguageSwitcher.js";
import "./ui/molecules/ProfileCard.js";
import "./ui/organisms/ProjectGrid.js";
import "./ui/organisms/terminal.js";

import { updateLocalizedText } from "./core/utils/dom.js";
import { emit, on } from "./core/events/bus.js";
import { EVENTS } from "./core/events/types.js";
import { initShell } from "./core/system/shell.js";
import { initViewport } from "./core/system/viewport.js";
import { initAudio } from "./core/system/audio.js";

on(EVENTS.SYS_BOOT, () => {
  console.log(
    "%c [SYS] KERNEL ONLINE ",
    "background: #bc13fe; color: #fff; padding: 2px; border-radius: 2px;"
  );
});

document.addEventListener("DOMContentLoaded", () => {
  updateLocalizedText();
  initShell();
  initAudio();
  initViewport();

  setTimeout(() => {
    emit(EVENTS.SYS_BOOT);
  }, 500);
});
