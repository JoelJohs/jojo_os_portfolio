/**
 * Compact Sidebar Panel Component
 * Cyberpunk themed compact sidebar with avatar, achievements, and clock
 */

import { on } from '../../core/events/bus.js';
import { EVENTS } from '../../core/events/types.js';
import { getMyAge } from '../../core/utils/profile.js';
import { getAchievementStats } from '../../core/system/achievements.js';
import { t, onLanguageChange } from '../../core/i18n/i18n.js';

export class CompactSidebarPanel extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.avatarAchievementUnlocked = false;
    this.stats = getMyAge();
    this.achievements = getAchievementStats();
    this._unsubscribeLang = null;
    this._unsubscribeAchievement = null;
  }

  connectedCallback() {
    this.render();
    this.startClock();
    this.setupEventListeners();
    this.setupLanguageListener();
  }

  disconnectedCallback() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (typeof this._unsubscribeLang === "function") this._unsubscribeLang();
    if (typeof this._unsubscribeAchievement === "function") this._unsubscribeAchievement();
  }

  disconnectedCallback() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (this._unsubscribeAchievement) {
      document.removeEventListener('sys:achievement_progress', this._unsubscribeAchievement);
    }
  }

  render() {
    const currentLang = localStorage.getItem('jojo-avatar-state') || 'normal';
    
    this.innerHTML = `
      <!-- Avatar + Profile Section -->
      <div class="sidebar-section">
        <div class="section-title">
          <span class="icon">👤</span>
          ${t('dashboard.profile') || 'PROFILE'}
        </div>
        <div class="avatar-profile-section">
          <div class="compact-avatar-frame" onclick="this.parentElement.parentElement.parentElement.parentElement.parentElement.toggleAvatar()">
            <img src="${currentLang === 'pixel' ? 'assets/img/avatar_pa.jpg' : 'assets/img/avatar.jpg'}" 
                 alt="Joel Avatar" class="compact-avatar-img">
          </div>
          <div class="profile-info">
            <h3>Joel Josafat Hernández Saucedo</h3>
            <p class="role">${t("dashboard.role")}</p>
            <div class="xp-compact">
              <div class="xp-labels">
                <span>Lvl ${this.stats.level}</span>
                <span>${this.stats.currentXP} / ${this.stats.neededXP} XP</span>
              </div>
              <div class="xp-bar-compact">
                <div class="xp-fill-compact" style="width: ${this.stats.xpPercent.toFixed(2)}%"></div>
              </div>
              <small class="xp-text">${t("dashboard.next_level")} ${this.stats.neededXP - this.stats.currentXP} ${t("dashboard.days")}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievements Section -->
      <div class="sidebar-section">
        <div class="section-title">
          <span class="icon">🏆</span>
          ${t('dashboard.achievements') || 'ACHIEVEMENTS'}
        </div>
        <div class="achievements-compact-section">
          <div class="achievement-stats">
            <div class="achievement-count">
              <span class="count">${this.achievements.unlocked}</span>
              <span class="total">/ ${this.achievements.total}</span>
            </div>
            <div class="progress-compact">
              <div class="progress-fill-compact" style="width: ${(this.achievements.unlocked / this.achievements.total) * 100}%"></div>
            </div>
            <small>${t('dashboard.keep_exploring')}</small>
          </div>
        </div>
      </div>

      <!-- Clock Section -->
      <div class="sidebar-section">
        <div class="section-title">
          <span class="icon">🕐</span>
          ${t('dashboard.time') || 'SYSTEM TIME'}
        </div>
        <div class="clock-compact-section">
          <div class="digital-clock-compact" id="compact-clock">00:00</div>
          <div class="date-compact" id="compact-date">YYYY-MM-DD</div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Avatar toggle is now handled by onclick in render()
    this.avatarFrame = this.querySelector('.compact-avatar-frame');
    if (this.avatarFrame) {
      this.avatarFrame.addEventListener('click', () => this.toggleAvatar());
    }
  }

  toggleAvatar() {
    const current = localStorage.getItem('jojo-avatar-state') || 'normal';
    const next = current === 'normal' ? 'pixel' : 'normal';
    localStorage.setItem('jojo-avatar-state', next);
    
    const avatarImg = this.querySelector('.compact-avatar-img');
    if (avatarImg) {
      avatarImg.src = next === 'pixel' ? 'assets/img/avatar_pa.jpg' : 'assets/img/avatar.jpg';
      
       // Emit achievement for first pixel art toggle
      if (next === 'pixel' && !this.avatarAchievementUnlocked) {
        this.avatarAchievementUnlocked = true;
        emit('sys:avatar_toggle', { firstTime: true });
      }
    }
  }

  updateAchievementsDisplay() {
    const achievementsSection = this.querySelector('.achievements-section');
    if (!achievementsSection) return;
    
    const countEl = achievementsSection.querySelector('.achievement-count');
    const totalEl = achievementsSection.querySelector('.achievement-total');
    const progressFill = achievementsSection.querySelector('.progress-fill-compact');
    
    if (countEl) countEl.textContent = this.achievements.unlocked;
    if (totalEl) totalEl.textContent = this.achievements.total;
    if (progressFill) {
      const percentage = (this.achievements.unlocked / this.achievements.total) * 100;
      progressFill.style.width = `${percentage}%`;
    }
  }
  }

  startClock() {
    const update = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("es-MX", { hour12: false });
      const date = now.toLocaleDateString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const clockEl = this.querySelector("#compact-clock");
      const dateEl = this.querySelector("#compact-date");
      if (clockEl) clockEl.textContent = time;
      if (dateEl) dateEl.textContent = date;
    };
    update();
    this.clockInterval = setInterval(update, 1000);
  }
}

customElements.define('compact-sidebar-panel', CompactSidebarPanel);

export default CompactSidebarPanel;