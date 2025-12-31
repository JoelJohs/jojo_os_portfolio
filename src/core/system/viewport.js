import { on } from "../events/bus.js";
import { EVENTS } from "../events/types.js";

export function initViewport() {
  const stage = document.getElementById("content-stage");
  if (!stage) return;

  const renderView = (viewName, viewData) => {
    stage.innerHTML = "";

    switch (viewName) {
      case "home": {
        stage.innerHTML =
          "<h1>HOME SECURE SERVER</h1><p>Welcome back, User.</p>";
        break;
      }
      case "about": {
        const card = document.createElement("x-profile-card");
        card.data = {
          name: "Joel Johs",
          role: "SysAdmin",
          stats: { str: "MAX", int: "MAX" },
        };
        stage.appendChild(card);
        break;
      }
      case "loading": {
        stage.innerHTML = '<div class="loader">DECRYPTING DATA...</div>';
        break;
      }
      case "projects": {
        const grid = document.createElement("x-project-grid");
        if (viewData) {
          grid.projects = viewData;
        }
        stage.appendChild(grid);
        break;
      }
      case "contact": {
        stage.innerHTML = "<h1>ENCRYPTED CHANNEL</h1><p>Send a message...</p>";
        break;
      }
      default: {
        stage.innerHTML = "<h1>404 NOT FOUND</h1><p>Route does not exist.</p>";
      }
    }
  };

  renderView("home");

  on(EVENTS.NAV_NAVIGATE, (payload) => {
    let viewName = payload;
    let viewData = null;

    if (typeof payload === "object") {
      viewName = payload?.view || payload?.route;
      viewData = payload?.data || null;
    }

    renderView(viewName, viewData);
  });
}
