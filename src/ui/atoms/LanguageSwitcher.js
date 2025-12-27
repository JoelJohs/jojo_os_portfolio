import {
  setLanguage,
  getLanguage,
  onLanguageChange,
} from "../../core/i18n/i18n.js";

export class LanguageSwitcher extends HTMLElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this._unsubscribe = null;
  }

  connectedCallback() {
    // Renderizar cuando el elemento está montado
    this.render();

    // Añadir listener de click (usando función ligada para poder removerla)
    this.addEventListener("click", this.handleClick);

    // Suscribirse a cambios de idioma y guardar la función de unsubscribe
    this._unsubscribe = onLanguageChange(() => this.render());
  }

  disconnectedCallback() {
    // Limpiar listener de click
    this.removeEventListener("click", this.handleClick);

    // Cancelar la suscripción al cambio de idioma si existe
    if (typeof this._unsubscribe === "function") {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  handleClick() {
    const current = getLanguage();
    const next = current === "es" ? "en" : "es";
    setLanguage(next);
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
