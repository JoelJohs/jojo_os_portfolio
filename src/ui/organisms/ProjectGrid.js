import "../molecules/ProjectCard.js";
import { t } from "../../core/i18n/i18n.js";

export class ProjectGrid extends HTMLElement {
  constructor() {
    super();
  }

  set projects(data) {
    this._projects = data;
    this.render();
  }

  render() {
    this.innerHTML = "";
    this.className = "project-grid-container"; // Para CSS Grid

    if (!this._projects || this._projects.length === 0) {
      this.innerHTML = `<div class="empty-state">${t("projects.empty")}</div>`;
      return;
    }

    this._projects.forEach((proj) => {
      const card = document.createElement("x-project-card");
      card.data = proj;
      this.appendChild(card);
    });

    const hint = document.createElement("div");
    hint.className = "project-grid-hint hint-note";
    hint.innerHTML = `<span class="hint-icon">🧭</span><span>${t(
      "achievementHints.projects"
    )}</span>`;
    this.appendChild(hint);
  }
}

customElements.define("x-project-grid", ProjectGrid);
