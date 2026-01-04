import techStackData from "../../data/techStack.js";
import { t } from "../../core/i18n/i18n.js";

const LEVEL_MAX = 10;
const LEVEL_DESCRIPTIONS = {
  1: "1/10",
  2: "2/10",
  3: "3/10",
  4: "4/10",
  5: "5/10",
  6: "6/10",
  7: "7/10",
  8: "8/10",
  9: "9/10",
  10: "10/10",
};

export class TechStack extends HTMLElement {
  constructor() {
    super();
    this.activeTab = Object.keys(techStackData)[0];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const categories = Object.keys(techStackData);

    this.innerHTML = `
      <div class="tech-stack-panel">
        <div class="tech-stack-header">
            <h3 class="tech-stack-title">${t("tech_stack.title")}</h3>
            <p class="tech-stack-subtitle">${t("tech_stack.subtitle")}</p>
        </div>
        <div class="tech-stack-tabs">
          ${categories
            .map(
              (cat) =>
                `<button class="tech-stack-tab ${
                  this.activeTab === cat ? "active" : ""
                }" data-category="${cat}">${t(
                  `tech_stack.tabs.${cat}`
                )}</button>`
            )
            .join("")}
        </div>
        <div class="tech-stack-content">
          <div class="tech-stack-items">
            ${this.renderItems(this.activeTab)}
          </div>
        </div>
      </div>
    `;
  }

  renderItems(category) {
    const items = techStackData[category];
    if (!items) return "";

    return Object.entries(items)
      .map(([name, details]) => {
        const level = details.level || 0;
        const levelText = LEVEL_DESCRIPTIONS[level] || "Unknown";
        const isFavorite = details.favorite || false;

        const segments = Array(LEVEL_MAX)
          .fill(0)
          .map(
            (_, i) =>
              `<div class="progress-segment ${i < level ? "filled" : ""} ${
                isFavorite && i < level ? "favorite-progress" : ""
              }"></div>`
          )
          .join("");

        return `
          <div class="tech-stack-item ${isFavorite ? "favorite" : ""}">
            <div class="tech-stack-name">
              ${name}
              ${isFavorite ? `<span class="favorite-indicator">★</span>` : ""}
            </div>
            <div class="tech-stack-progress-bar">
                ${segments}
            </div>
            <div class="tech-stack-level ${isFavorite ? "favorite-level" : ""}">
                ${levelText}
            </div>
          </div>
        `;
      })
      .join("");
  }

  setupEventListeners() {
    this.querySelectorAll(".tech-stack-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        this.activeTab = e.target.dataset.category;
        this.render();
        this.setupEventListeners(); // Re-attach listeners after re-render
      });
    });
  }
}

customElements.define("x-tech-stack", TechStack);
