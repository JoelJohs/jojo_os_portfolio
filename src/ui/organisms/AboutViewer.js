import { t, onLanguageChange, getLanguage } from "../../core/i18n/i18n.js";

const EN_PUBLIC = null; // content provided by locale en.about.public_html
const EN_SECRET = null; // content provided by locale en.about.secret_html
const ES_PUBLIC = null; // content provided by locale es.about.public_html
const ES_SECRET = null; // content provided by locale es.about.secret_html

export class AboutViewer extends HTMLElement {
  constructor() {
    super();
    this.mode = "public";
    this._unsubscribe = null;
  }

  set initialMode(val) {
    this.mode = val || "public";
    this.render();
  }

  connectedCallback() {
    this.render();
    this._unsubscribe = onLanguageChange(() => this.render());
  }

  disconnectedCallback() {
    if (typeof this._unsubscribe === "function") {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  toggleMode(newMode) {
    this.mode = newMode;
    this.render();
  }

  render() {
    const lang = typeof getLanguage === "function" ? getLanguage() : "en";
    const locale = lang && lang.startsWith("es") ? "es" : "en";
    const content =
      this.mode === "public" ? t("about.public_html") : t("about.secret_html");

    this.innerHTML = `
      <div class="about-container markdown-shell">
        <div class="about-tabs">
          <button class="tab-btn ${
            this.mode === "public" ? "active" : ""
          }" id="btn-public">📄 ${t("about.public_record") || "Public"}</button>
          <button class="tab-btn ${
            this.mode === "secret" ? "active secret-glitch" : ""
          }" id="btn-secret">🔒 ${t("about.secret_data") || "Secret"}</button>
        </div>

        <div class="about-hint hint-note">
          <span class="hint-icon">🌧️</span>
          <span>${t("achievementHints.theme")}</span>
        </div>

        <div class="about-content">
          <div class="markdown-header">~/Documents/about.md</div>
          <div class="markdown-block">${content || ""}</div>
        </div>
      </div>
    `;

    const btnPublic = this.querySelector("#btn-public");
    const btnSecret = this.querySelector("#btn-secret");
    if (btnPublic) btnPublic.onclick = () => this.toggleMode("public");
    if (btnSecret) btnSecret.onclick = () => this.toggleMode("secret");
  }
}

customElements.define("x-about-viewer", AboutViewer);
