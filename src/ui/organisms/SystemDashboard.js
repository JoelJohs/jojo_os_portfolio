import { on, emit } from "../../core/events/bus.js";
import { EVENTS } from "../../core/events/types.js";
import { getMyAge } from "../../core/utils/profile.js";
import { t, onLanguageChange } from "../../core/i18n/i18n.js";
import { getAchievementStats } from "../../core/system/achievements.js";
import "./TechStack.js";

export class SystemDashboard extends HTMLElement {
  connectedCallback() {
    this.isPixelArt = localStorage.getItem("jojo-avatar-state") === "pixel";
    this.loadData();
    this.render();
    this.setupAvatarToggle();

    this._unsubscribeLang = onLanguageChange(() => {
      this.loadData();
      this.render();
      this.setupAvatarToggle();
    });
  }

  disconnectedCallback() {
    if (typeof this._unsubscribeLang === "function") this._unsubscribeLang();
    if (typeof this._unsubscribeAchievements === "function")
      this._unsubscribeAchievements();
  }

  loadData() {
    this.stats = getMyAge();
    this.achievements = getAchievementStats();
  }

  render() {
    this.innerHTML = `
      <div class="dashboard-grid">
        <div class="dash-panel main-profile-panel">
          <div class="profile-section">
            <div class="profile-header">
              <div class="avatar-frame avatar-toggle" id="avatar-toggle">
                <img src="${
                  this.isPixelArt
                    ? "assets/img/avatar_pa.jpg"
                    : "assets/img/avatar.jpg"
                }" alt="Joel Avatar" class="avatar-img">
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
                  <small class="xp-sub">${t("dashboard.next_level")}
                    ${this.stats.neededXP - this.stats.currentXP} ${t(
      "dashboard.days"
    )}
                  </small>
                </div>
              </div>
            </div>
          </div>
          
          <div class="achievements-section">
            <h3 class="panel-header">🏆 ${t("dashboard.achievements")}</h3>
            <div class="achievements-stats">
              <div class="achievement-count">
                <span class="count">${this.achievements.unlocked}</span>
                <span class="total">/ ${this.achievements.total}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${
                  (this.achievements.unlocked / this.achievements.total) * 100
                }%" data-progress="${
      (this.achievements.unlocked / this.achievements.total) * 100
    }"></div>
              </div>
              <small>${t("dashboard.keep_exploring")}</small>
            </div>
            <small class="hint-note dash-hint">${t(
              "achievementHints.avatar"
            )}</small>
          </div>
          
          <div class="welcome-section">
            <div class="welcome-header">
              <div class="status-indicator online"></div>
              <h2 class="system-title" data-text="${t(
                "dashboard.welcome_title"
              )}">${t("dashboard.welcome_title")}</h2>
            </div>
            <div class="system-info">
              <p class="welcome-message">${t("dashboard.welcome_body")}</p>
              <div class="quick-start">
                <div class="instruction-line">
                  <span class="prompt">$</span>
                  <span class="command hint">${t("dashboard.hint")}</span>
                </div>
                <div class="command-suggestions">
                  <span class="cmd-chip">ls</span>
                  <span class="cmd-chip">cd projects</span>
                  <span class="cmd-chip">theme matrix</span>
                </div>
                <small class="hint-note dash-hint-secondary">${t(
                  "achievementHints.cli"
                )} · ${t("achievementHints.clear")}
                  · ${t("achievementHints.coffee")}
                  · ${t("achievementHints.sudo")}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="dash-panel stack-panel">
          <x-tech-stack></x-tech-stack>
        </div>
      </div>
    `;
    this.setupAchievementListener();
  }

  setupAvatarToggle() {
    const avatarFrame = this.querySelector("#avatar-toggle");
    if (!avatarFrame) return;

    avatarFrame.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.isPixelArt = !this.isPixelArt;
      localStorage.setItem(
        "jojo-avatar-state",
        this.isPixelArt ? "pixel" : "normal"
      );
      emit(EVENTS.AVATAR_TOGGLE, {
        state: this.isPixelArt ? "pixel" : "normal",
      });

      const avatarImg = avatarFrame.querySelector(".avatar-img");
      if (avatarImg) {
        avatarImg.src = this.isPixelArt
          ? "assets/img/avatar_pa.jpg"
          : "assets/img/avatar.jpg";
      }

      // Add visual feedback
      avatarFrame.style.transform = "scale(0.95)";
      setTimeout(() => {
        avatarFrame.style.transform = "";
      }, 150);
    });
  }

  setupAchievementListener() {
    this._unsubscribeAchievements = on("sys:achievement", () => {
      // Update achievements data
      this.loadData();

      // Update the UI
      const countEl = this.querySelector(".achievement-count .count");
      const progressEl = this.querySelector(".progress-fill");

      if (countEl) {
        countEl.textContent = this.achievements.unlocked;
      }

      if (progressEl) {
        const percentage =
          (this.achievements.unlocked / this.achievements.total) * 100;
        progressEl.style.width = `${percentage}%`;
        progressEl.setAttribute("data-progress", percentage);
      }
    });
  }
}

customElements.define("x-system-dashboard", SystemDashboard);
