export class ProjectCard extends HTMLElement {
  set data(project) {
    this._p = project;
    this.render();
  }

  render() {
    const { title, description, status, tech_stack, urls, media } = this._p;

    // Lógica de Renderizado de Links
    let linksHTML = "";

    // 1. Demo
    if (urls.demo) {
      linksHTML += `<a href="${urls.demo}" target="_blank" class="btn-link demo">[ LIVE DEMO ]</a>`;
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
                    <div class="status-badge status-${status}">${status}</div>
                </div>
                
                <div class="card-content">
                    <h3 class="title">${title}</h3>
                    <div class="tech-row">
                        ${tech_stack
                          .map((t) => `<span class="pill">${t}</span>`)
                          .join("")}
                    </div>
                    <p class="desc">${description}</p>
                    
                    <div class="actions">
                        ${linksHTML}
                    </div>
                </div>
            </article>
        `;
  }
}

customElements.define("x-project-card", ProjectCard);
