import { on, emit } from "../../core/events/bus.js";
import { EVENTS } from "../../core/events/types.js";
import { t, onLanguageChange } from "../../core/i18n/i18n.js";

const PATH_MAP = {
  home: "~/",
  "~": "~/",
  projects: "~/projects",
  about: "~/about.txt",
  contact: "~/contact",
  loading: "~/projects",
};

export class ConsoleNav extends HTMLElement {
  constructor() {
    super();
    this.currentPath = PATH_MAP.home;
    this._unsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this._unsubscribe = onLanguageChange(() => this.render());
  }

  disconnectedCallback() {
    if (typeof this._unsubscribe === "function") {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  setupEventListeners() {
    on(EVENTS.NAV_NAVIGATE, (payload) => {
      const view =
        typeof payload === "object" ? payload?.view || payload?.route : payload;
      this.updatePath(view);
    });
  }

  updatePath(view) {
    this.currentPath = PATH_MAP[view] || PATH_MAP.home;
    const pathEl = this.querySelector(".console-path");
    if (pathEl) pathEl.textContent = this.currentPath;
  }

  navigateTo(view) {
    // Usa la misma ruta que la terminal (cd) para mantener lógica consistente
    if (view === "projects") {
      emit(EVENTS.CLI_INPUT, "cd projects");
      return;
    }
    if (view === "home" || view === "~") {
      emit(EVENTS.CLI_INPUT, "cd ~");
      return;
    }
    emit(EVENTS.CLI_INPUT, `cd ${view}`);
  }

  render() {
    this.innerHTML = `
      <nav class="console-nav">
        <div class="nav-segment host">jojo-os</div>
        <div class="nav-segment path console-path">${this.currentPath}</div>
        <div class="nav-links">
          <button data-nav="home" class="nav-btn">${
            t("ui.home") || "~/"
          }</button>
          <button data-nav="projects" class="nav-btn">${t(
            "ui.projects"
          )}</button>
          <button data-nav="about" class="nav-btn">${t("ui.about")}</button>
          <button data-nav="contact" class="nav-btn">${t("ui.contact")}</button>
          <x-lang-switch></x-lang-switch>
        </div>
        <button class="mobile-menu-toggle">☰</button>
      </nav>
      
      <div class="mobile-nav-overlay">
        <button class="mobile-nav-close">×</button>
        <div class="mobile-nav-menu">
          <button data-nav="home" class="nav-btn">${
            t("ui.home") || "~/"
          }</button>
          <button data-nav="projects" class="nav-btn">${t(
            "ui.projects"
          )}</button>
          <button data-nav="about" class="nav-btn">${t("ui.about")}</button>
          <button data-nav="contact" class="nav-btn">${t("ui.contact")}</button>
          <x-lang-switch></x-lang-switch>
        </div>
      </div>
    `;

    // Desktop nav buttons
    this.querySelectorAll(".nav-links .nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const view = e.target.dataset.nav;
        this.navigateTo(view);
      });
    });

    // Mobile nav buttons
    this.querySelectorAll(".mobile-nav-menu .nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const view = e.target.dataset.nav;
        this.navigateTo(view);
        this.closeMobileMenu();
      });
    });

    // Mobile menu toggle
    const toggleBtn = this.querySelector(".mobile-menu-toggle");
    const closeBtn = this.querySelector(".mobile-nav-close");
    const overlay = this.querySelector(".mobile-nav-overlay");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        overlay.classList.add("active");
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    }

    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.closeMobileMenu();
        }
      });
    }
  }

  closeMobileMenu() {
    const overlay = this.querySelector(".mobile-nav-overlay");
    if (overlay) {
      overlay.classList.remove("active");
    }
  }
}

customElements.define("x-console-nav", ConsoleNav);
