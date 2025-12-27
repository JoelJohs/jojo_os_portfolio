import "./ui/atoms/LanguageSwitcher.js";
import { updateLocalizedText } from "./core/utils/dom.js";

// Botloader
document.addEventListener("DOMContentLoaded", () => {
  // Aplica las traducciones iniciales
  updateLocalizedText();

  // Log temporal
  console.log("[System] Boot sequence initiated.");
});
