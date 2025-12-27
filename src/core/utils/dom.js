import { t } from "../i18n";

/**
 * Busca todos los elementos con data-i18n y actualiza su texto según el idioma actual
 */

export function updateLocalizedText() {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerText = t(key);
  });
}
