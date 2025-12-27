import "./ui/atoms/LanguageSwitcher.js";
import { updateLocalizedText } from "./core/utils/dom.js";
import { onLanguageChange } from "./core/i18n/i18n.js";

/**
 * Inicialización de la aplicación
 */

// 1. Suscribir la actualización del DOM al cambio de idioma
onLanguageChange(() => {
  updateLocalizedText();
});

// 2. Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Primera carga de textos (usando el idioma detectado automáticamente)
  updateLocalizedText();

  // Inyectar el botón de idioma si no está en el HTML
  const app = document.getElementById("app");
  const switcher = document.createElement("x-lang-switch");
  app.appendChild(switcher);
});
