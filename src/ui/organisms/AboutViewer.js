import { PROFESSIONAL_DATA, SECRET_DATA } from "../../data/about.js";
import { getPlayerStats } from "../../core/utils/profile.js";
import { t, onLanguageChange } from "../../core/i18n/i18n.js";

export class AboutViewer extends HTMLElement {
  constructor() {
    super();
    this.mode = "public"; // 'public' | 'secret'
    this._unsubscribe = null;
  }

  set initialMode(val) {
    this.mode = val || "public";
    this.render();
  }

  connectedCallback() {
    this.render();
    // Subscribe to language changes
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
    const stats = getPlayerStats();

    this.innerHTML = `
            <div class="about-container">
                <div class="about-tabs">
                    <button class="tab-btn ${
                      this.mode === "public" ? "active" : ""
                    }" id="btn-public">
                        📄 ${t("about.public_record")}
                    </button>
                    <button class="tab-btn ${
                      this.mode === "secret" ? "active secret-glitch" : ""
                    }" id="btn-secret">
                        🔒 ${t("about.secret_data")}
                    </button>
                </div>

                <div class="about-content">
                    ${
                      this.mode === "public"
                        ? this.renderPublic(stats)
                        : this.renderSecret()
                    }
                </div>
            </div>
        `;

    // Event Listeners
    this.querySelector("#btn-public").onclick = () => this.toggleMode("public");
    this.querySelector("#btn-secret").onclick = () => this.toggleMode("secret");
  }

  renderPublic(stats) {
    const p = PROFESSIONAL_DATA;
    const isCurrentPeriod = (period) => {
      const lang = localStorage.getItem("jojo_os_language") || "en";
      return period.includes(lang === "es" ? "Presente" : "Present");
    };

    return `
            <div class="cyber-terminal">
                <div class="terminal-header">
                    <div class="terminal-buttons">
                        <span class="btn-red"></span>
                        <span class="btn-yellow"></span>
                        <span class="btn-green"></span>
                    </div>
                    <div class="terminal-title">ACCESSING: /home/agent_records/public</div>
                </div>
                
                <div class="terminal-body">
                    <div class="scanline"></div>
                    
                    <div class="terminal-section">
                        <div class="section-header">
                            <span class="prompt">></span> <span class="command">${t(
                              "about.public.title"
                            )} --${t(
      "about.public.subtitle"
    ).toLowerCase()}</span>
                        </div>
                        
                        <div class="agent-info">
                            <div class="info-grid">
                                <div class="info-field">
                                    <span class="field-label">${t(
                                      "about.public.personal_info"
                                    )}:</span>
                                    <span class="field-value">${
                                      p.header.name
                                    }</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">ROLE:</span>
                                    <span class="field-value">${
                                      p.header.title
                                    }</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">LOCATION:</span>
                                    <span class="field-value">[${
                                      p.header.location
                                    }]</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">CONTACT:</span>
                                    <span class="field-value">${
                                      p.header.email
                                    }</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">CLEARANCE:</span>
                                    <span class="field-value clearance-high">LVL ${
                                      stats.level
                                    } [${Math.round(stats.xpPercent)}%]</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="terminal-separator"></div>
                    
                    <div class="terminal-section">
                        <div class="section-header">
                            <span class="prompt">></span> <span class="command">${t(
                              "about.public.executive_summary"
                            )}</span>
                        </div>
                        <div class="terminal-text">
                            ${p.header.summary}
                        </div>
                    </div>
                    
                    <div class="terminal-section">
                        <div class="section-header">
                            <span class="prompt">></span> <span class="command">${t(
                              "about.public.experience"
                            )}</span>
                        </div>
                        ${p.experience
                          .map(
                            (exp) => `
                            <div class="experience-item">
                                <div class="exp-header">
                                    <span class="exp-role">${exp.role}</span>
                                    <span class="exp-period ${
                                      isCurrentPeriod(exp.period)
                                        ? "current"
                                        : ""
                                    }">
                                        [${
                                          isCurrentPeriod(exp.period)
                                            ? t(
                                                "about.public.current_period"
                                              ).toUpperCase()
                                            : exp.period
                                        }]
                                    </span>
                                </div>
                                <div class="exp-company">>> ${exp.company}</div>
                                <div class="exp-desc">${exp.desc}</div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                    
                    <div class="terminal-section">
                        <div class="section-header">
                            <span class="prompt">></span> <span class="command">${t(
                              "about.public.knowledge_base"
                            )}</span>
                        </div>
                        <div class="stack-list">
                            ${p.skills
                              .map(
                                (skill, index) => `
                                <div class="stack-item" style="animation-delay: ${
                                  index * 0.1
                                }s">
                                    <span class="stack-index">${String(
                                      index + 1
                                    ).padStart(2, "0")}</span>
                                    <span class="stack-name">${skill}</span>
                                    <span class="stack-status">[ACTIVE]</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  renderSecret() {
    const s = SECRET_DATA;
    const jsonString = JSON.stringify(s.jsonBlock, null, 2)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return `
            <div class="secret-terminal">
                <div class="terminal-header">
                    <div class="terminal-buttons">
                        <span class="btn-red"></span>
                        <span class="btn-yellow"></span>
                        <span class="btn-green"></span>
                    </div>
                    <div class="terminal-title">DECRYPTING: /home/.about.secret</div>
                </div>
                
                <div class="secret-body">
                    <div class="scanline"></div>
                    <div class="glitch-overlay"></div>
                    
                    <div class="decrypt-header">
                        <span class="lock-icon">🔓</span> ${t(
                          "about.secret.title"
                        )}
                        <div class="decrypt-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>

                    <div class="console-text">
                        <span class="prompt">></span> <span class="comment">//</span> "${t(
                          "about.secret.intro"
                        )}"
                    </div>
                    
                    <div class="meme-container">
                        <img src="${
                          s.memeUrl
                        }" alt="Mahoraga Adapting" class="meme-img">
                        <div class="meme-caption">${t(
                          "about.secret.meme_caption"
                        )}</div>
                    </div>

                    <div class="code-block">
                        <div class="code-header">
                            <span class="comment"># ${t(
                              "about.secret.json_comment"
                            )}</span>
                        </div>
<pre><code class="language-json">${jsonString}</code></pre>
                    </div>

                    <div class="terminal-quote">
                        <div class="quote-header">
                            <span class="prompt">></span> <span class="quote-tag">QUOTE</span>
                        </div>
                        <div class="quote-text">
                            "${t("about.secret.philosophy")}"
                        </div>
                        <div class="quote-author">- Ezio Auditore</div>
                    </div>
                    
                    <div class="terminal-footer">
                        <span class="status-indicator active">●</span>
                        <span class="status-text">SYSTEM MONITORING ACTIVE</span>
                        <div class="matrix-rain"></div>
                    </div>
                </div>
            </div>
        `;
  }
}

customElements.define("x-about-viewer", AboutViewer);
