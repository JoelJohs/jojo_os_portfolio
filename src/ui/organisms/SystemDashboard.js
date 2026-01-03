import { emit } from "../../core/events/bus.js";
import { EVENTS } from "../../core/events/types.js";
import { getMyAge } from "../../core/utils/profile.js";
import { t, onLanguageChange, getLanguage } from "../../core/i18n/i18n.js";

export class SystemDashboard extends HTMLElement {
  connectedCallback() {
    this.stats = getMyAge();
    this.render();
    this.startClock();
    this._unsubscribe = onLanguageChange(() => {
      this.stats = getMyAge();
      this.render();
      this.startClock(true);
    });
  }

  disconnectedCallback() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (typeof this._unsubscribe === "function") this._unsubscribe();
  }

  render() {
    this.innerHTML = `
            <div class="dashboard-grid">
                
                <div class="dash-panel profile-panel">
                  <div class="profile-header">
                    <div class="avatar-frame">
                      <img src="assets/img/avatar.jpg" alt="Joel Avatar" class="avatar-img">
                    </div>
                    <div class="profile-info">
                      <h2>Joel Josafat Hernández Saucedo</h2>
                      <p class="role">${t("dashboard.role")}</p>
                      <div class="xp-container">
                        <div class="xp-labels">
                          <span>Lvl ${this.stats.level}</span>
                          <span>${this.stats.currentXP} / ${
      this.stats.neededXP
    } XP</span>
                        </div>
                        <div class="xp-bar-bg">
                          <div class="xp-bar-fill" style="width: ${this.stats.xpPercent.toFixed(
                            2
                          )}%"></div>
                        </div>
                        <small class="xp-sub">${t("dashboard.next_level")} ${
      this.stats.neededXP - this.stats.currentXP
    } ${t("dashboard.days")}</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="dash-panel stack-panel">
                    <h3 class="panel-header">${t("dashboard.stack")}</h3>
                    <div class="tech-tags">
                        <span class="tag">NodeJS</span>
                        <span class="tag">NestJS</span>
                        <span class="tag">TypeScript</span>
                        <span class="tag">Docker</span>
                        <span class="tag">PostgreSQL</span>
                        <span class="tag">Astro</span>
                    </div>
                </div>

                <div class="dash-panel time-panel">
                    <h3 class="panel-header">${t("dashboard.time")}</h3>
                    <div class="digital-clock" id="clock">00:00</div>
                    <div class="date" id="date">YYYY-MM-DD</div>
                </div>

                <div class="dash-panel welcome-panel">
                    <h2 class="glitch-text" data-text="${t(
                      "dashboard.welcome_title"
                    )}">${t("dashboard.welcome_title")}</h2>
                    <p>${t("dashboard.welcome_body")}</p>
                    <p class="instruction">${t("dashboard.hint")}
                      <span class="cmd">ls</span> ${
                        t("ui.or") || "or"
                      } <span class="cmd">cd projects</span>
                    </p>
                </div>
            </div>
        `;
  }

  startClock(reset = false) {
    if (reset && this.clockInterval) clearInterval(this.clockInterval);
    const update = () => {
      const now = new Date();
      const locale = getLanguage() === "es" ? "es-MX" : "en-US";
      const time = now.toLocaleTimeString(locale, { hour12: false });
      const date = now.toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const clockEl = this.querySelector("#clock");
      if (clockEl) {
        clockEl.innerText = time;
        this.querySelector("#date").innerText = date;
      }
    };
    update();
    this.clockInterval = setInterval(update, 1000);
  }
}

customElements.define("x-system-dashboard", SystemDashboard);
