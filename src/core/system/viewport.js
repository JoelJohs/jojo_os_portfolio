import { on } from "../events/bus.js";
import { EVENTS } from "../events/types.js";
import { t, onLanguageChange } from "../i18n/i18n.js";

export function initViewport() {
  const stage = document.getElementById("content-stage");
  if (!stage) return;

  const renderView = (viewName, viewData) => {
    stage.innerHTML = "";

    switch (viewName) {
      case "home": {
        stage.innerHTML = "";
        stage.appendChild(document.createElement("x-system-dashboard"));
        break;
      }
      case "about": {
        stage.innerHTML = '<x-about-viewer></x-about-viewer>';
        const aboutEl = stage.querySelector('x-about-viewer');
        
        // Si viene información de modo en el payload (ej: { view: 'about', mode: 'secret' })
        if (viewData && viewData.mode) {
          aboutEl.initialMode = viewData.mode;
        }
        break;
      }
      case "loading": {
        stage.innerHTML = `<div class="loader">${t("viewport.loading")}</div>`;
        break;
      }
      case "projects": {
        console.log(`[VIEWPORT] Rendering projects view with data:`, viewData);
        const grid = document.createElement("x-project-grid");
        if (viewData) {
          console.log(
            `[VIEWPORT] Setting projects data:`,
            viewData.length,
            "items"
          );
          grid.projects = viewData;
        } else {
          console.log(`[VIEWPORT] No projects data provided`);
        }
        stage.appendChild(grid);
        break;
      }
      case "contact": {
        const contact = document.createElement("x-contact-form");
        stage.appendChild(contact);
        break;
      }
      default: {
        stage.innerHTML = `<h1>${t("viewport.not_found_title")}</h1><p>${t(
          "viewport.not_found_body"
        )}</p>`;
      }
    }
  };

  renderView("home");

  onLanguageChange(() => {
    renderView("home");
  });

  on(EVENTS.NAV_NAVIGATE, (payload) => {
    console.log(`[VIEWPORT] Navigation event received:`, payload);
    let viewName = payload;
    let viewData = null;

    if (typeof payload === "object") {
      viewName = payload?.view || payload?.route;
      viewData = payload?.data || null;
    }

    console.log(`[VIEWPORT] Rendering view: ${viewName}`, viewData);
    renderView(viewName, viewData);
  });
}
