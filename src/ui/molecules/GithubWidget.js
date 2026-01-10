import { fetchGithubStats } from '../../core/repositories/githubRepository.js';
import { t, onLanguageChange, getLanguage } from '../../core/i18n/i18n.js';

export class GithubWidget extends HTMLElement {
    constructor() {
        super();
        this.username = 'joeljohs';
    }

    async connectedCallback() {
        this._unsubscribeLang = onLanguageChange(() => {
            // Re-render con nuevo idioma si ya tenemos datos
            if (this.currentStats) {
                this.render(this.currentStats);
            }
        });
        
        this.renderLoading();
        const stats = await fetchGithubStats(this.username);
        this.currentStats = stats;
        this.render(stats);
    }

    disconnectedCallback() {
        if (typeof this._unsubscribeLang === "function") this._unsubscribeLang();
    }

    renderLoading() {
        this.innerHTML = `
            <div class="gh-container loading-state">
                <span class="blink">${t("github.establishing")}</span>
            </div>`;
    }

    render(stats) {
        // Si falló la carga (offline), mostramos estado offline
        if (stats.repos === 'ERR') {
             this.innerHTML = `<div class="gh-container error-state">${t("github.offline")}</div>`;
             return;
        }

        this.innerHTML = `
            <div class="gh-container">
                <div class="gh-header">
                    <div class="gh-title">
                        <span class="icon">⚡</span> ${t("github.title")}
                    </div>
                    <div class="gh-status">
                        <span class="status-light"></span> ${t("github.online")}
                    </div>
                </div>

                <div class="gh-grid">
                    <div class="gh-stat-box">
                        <span class="gh-value">${stats.repos}</span>
                        <span class="gh-label">${t("github.repos")}</span>
                    </div>
                    <div class="gh-stat-box">
                        <span class="gh-value">${stats.stars}</span>
                        <span class="gh-label">${t("github.stars")}</span>
                    </div>
                    <div class="gh-stat-box">
                        <span class="gh-value">${stats.followers}</span>
                        <span class="gh-label">${t("github.nodes")}</span>
                    </div>
                </div>

                <a href="${stats.url}" target="_blank" class="gh-footer-btn">
                    ${t("github.access_terminal")}
                </a>
            </div>
        `;
    }
}

customElements.define('x-github-widget', GithubWidget);