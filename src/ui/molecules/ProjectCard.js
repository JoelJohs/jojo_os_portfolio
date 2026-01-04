import { t, getLanguage } from "../../core/i18n/i18n.js";

export class ProjectCard extends HTMLElement {
  set data(project) {
    this._p = project;
    this.render();
  }

  render() {
    const { title, description, status, tech_stack, urls, media, i18n } =
      this._p;
    const lang = typeof getLanguage === "function" ? getLanguage() : "en";

    const localizedTitle = i18n?.[lang]?.title || title;
    const localizedDesc = i18n?.[lang]?.description || description;
    const statusLabel = t(`projects.status.${status}`) || status;

    // Lógica de Renderizado de Links
    let linksHTML = "";

    // 1. Demo
    if (urls.demo) {
      linksHTML += `<a href="${
        urls.demo
      }" target="_blank" class="btn-link demo">[ ${t(
        "projects.actions.demo"
      )} ]</a>`;
    }

    // 2. Repo Principal
    if (urls.repository_main) {
      linksHTML += `<a href="${
        urls.repository_main.url
      }" target="_blank" class="btn-link repo">
                <span class="icon-git"></span> SRC: ${urls.repository_main.type.toUpperCase()}
            </a>`;
    }

    // 3. Repo Secundario
    if (urls.repository_sec) {
      linksHTML += `<a href="${
        urls.repository_sec.url
      }" target="_blank" class="btn-link repo-sec">
                + ${urls.repository_sec.type.toUpperCase()}
            </a>`;
    }

    // Render Principal
    this.innerHTML = `
            <article class="project-card ${status}">
                <div class="card-media">
                    ${
                      media.thumbnail
                        ? `<img src="${media.thumbnail}" alt="${title}" loading="lazy">`
                        : `<div class="no-img">IMG_NOT_FOUND</div>`
                    }
                    <div class="status-badge status-${status}">${statusLabel}</div>
                </div>
                
                <div class="card-content">
                  <h3 class="title">${localizedTitle}</h3>
                    <div class="tech-row">
                        ${tech_stack
                          .map((t) => `<span class="pill">${t}</span>`)
                          .join("")}
                    </div>
                  <p class="desc">${localizedDesc}</p>
                    
                    <div class="actions">
                        ${linksHTML}
                    </div>
                </div>
            </article>
        `;
  }
}

customElements.define("x-project-card", ProjectCard);
