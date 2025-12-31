import "../molecules/ProjectCard.js";

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
      this.innerHTML =
        '<div class="empty-state">NO MODULES FOUND IN SECTOR.</div>';
      return;
    }

    this._projects.forEach((proj) => {
      const card = document.createElement("x-project-card");
      card.data = proj;
      this.appendChild(card);
    });
  }
}

customElements.define("x-project-grid", ProjectGrid);
