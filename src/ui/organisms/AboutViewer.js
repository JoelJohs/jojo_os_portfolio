import { PROFESSIONAL_DATA, SECRET_DATA } from '../../data/about.js';
import { getPlayerStats } from '../../core/utils/profile.js';

export class AboutViewer extends HTMLElement {
    constructor() {
        super();
        this.mode = 'public'; // 'public' | 'secret'
    }

    set initialMode(val) {
        this.mode = val || 'public';
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    toggleMode(newMode) {
        this.mode = newMode;
        this.render();
    }

    render() {
        const stats = getPlayerStats();
        
        this.innerHTML = `
            <div class="about-container">
                <div class="about-tabs">
                    <button class="tab-btn ${this.mode === 'public' ? 'active' : ''}" id="btn-public">
                        📄 PUBLIC_RECORD.txt
                    </button>
                    <button class="tab-btn ${this.mode === 'secret' ? 'active secret-glitch' : ''}" id="btn-secret">
                        🔒 .SECRET_DATA
                    </button>
                </div>

                <div class="about-content">
                    ${this.mode === 'public' ? this.renderPublic(stats) : this.renderSecret()}
                </div>
            </div>
        `;

        // Event Listeners
        this.querySelector('#btn-public').onclick = () => this.toggleMode('public');
        this.querySelector('#btn-secret').onclick = () => this.toggleMode('secret');
    }

    renderPublic(stats) {
        const p = PROFESSIONAL_DATA;
        return `
            <div class="doc-paper">
                <div class="doc-header">
                    <div class="doc-photo">
                        <img src="assets/img/avatar.jpg" alt="Profile">
                    </div>
                    <div class="doc-info">
                        <h2>${p.header.name}</h2>
                        <h3 class="role">${p.header.title}</h3>
                        <p class="meta">📍 ${p.header.location} | 📧 ${p.header.email}</p>
                        
                        <div class="level-badge">
                            <span>LVL ${stats.level}</span>
                            <div class="mini-bar"><div style="width:${stats.xpPercent}%"></div></div>
                        </div>
                    </div>
                </div>
                
                <hr class="doc-divider">
                
                <section class="doc-section">
                    <h4>>> RESUMEN EJECUTIVO</h4>
                    <p>${p.header.summary}</p>
                </section>

                <section class="doc-section">
                    <h4>>> EXPERIENCIA OPERATIVA</h4>
                    ${p.experience.map(exp => `
                        <div class="job-item">
                            <div class="job-head">
                                <span class="job-title">${exp.role}</span>
                                <span class="job-date">${exp.period}</span>
                            </div>
                            <div class="job-company">${exp.company}</div>
                            <p class="job-desc">${exp.desc}</p>
                        </div>
                    `).join('')}
                </section>

                <section class="doc-section">
                    <h4>>> BASE DE CONOCIMIENTOS (STACK)</h4>
                    <div class="stack-grid">
                        ${p.skills.map(s => `<span class="stack-chip">${s}</span>`).join('')}
                    </div>
                </section>
            </div>
        `;
    }

    renderSecret() {
        const s = SECRET_DATA;
        const jsonString = JSON.stringify(s.jsonBlock, null, 2);
        
        return `
            <div class="secret-terminal">
                <div class="secret-header">
                    <span class="lock-icon">🔓</span> DECRYPTED SUCCESSFULLY
                </div>

                <div class="secret-body">
                    <p class="console-text">"${s.intro}"</p>
                    
                    <div class="meme-container">
                        <img src="${s.memeUrl}" alt="Mahoraga Adapting" class="meme-img">
                        <span class="meme-caption">STATUS: ADAPTING TO ANY SITUATION...</span>
                    </div>

                    <div class="code-block">
<pre><code class="language-json">
// A more technical "About me"
const aboutJoel = ${jsonString};
</code></pre>
                    </div>

                    <blockquote class="quote">
                        "${s.jsonBlock.philosophy}"
                        <footer>- Ezio Auditore</footer>
                    </blockquote>
                </div>
            </div>
        `;
    }
}

customElements.define('x-about-viewer', AboutViewer);