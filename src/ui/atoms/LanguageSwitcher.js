import { setLanguage, getLanguage, onLanguageChange } from "../../core/i18n";

export class LanguageSwitcher extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    // Escuchar el cambio de idioma al hacer click
    this.addEventListener("click", () => {
      const current = getLanguage();
      const next = current === "es" ? "en" : "es";
      setLanguage(next);
    });

    // Escuchar cambios de idioma para re-renderizar el componente
    onLanguageChange(() => this.render());
  }

  render() {
    const lang = getLanguage();

    this.innerHTML = `
            <button class="lang-btn">
                [ <span class="${lang === "es" ? "active" : ""}">ES</span> / 
                  <span class="${lang === "en" ? "active" : ""}">EN</span> ]
            </button>
        `;
  }
}

// Definicion del componente web de LanguageSwitcher
customElements.define("x-lang-switch", LanguageSwitcher);
