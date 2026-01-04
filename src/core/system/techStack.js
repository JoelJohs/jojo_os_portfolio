/**
 * Tech Stack Management System
 * Handles all technology stack data operations
 */

import techStackData from "../../data/techStack.js";

class TechStackManager {
  constructor() {
    this.data = techStackData;
  }

  /**
   * Get complete tech stack
   * @returns {Object} Complete tech stack data
   */
  getTechStack() {
    return this.data;
  }

  /**
   * Get stack by specific category
   * @param {string} category - Category name (languages, frameworks, tools, databases, systems)
   * @returns {Object|null} Category data or null if not found
   */
  getStackByCategory(category) {
    return this.data[category] || null;
  }

  /**
   * Get all available categories
   * @returns {string[]} Array of category names
   */
  getCategories() {
    return Object.keys(this.data);
  }

  /**
   * Get formatted progress bar for skill level
   * @param {number} level - Skill level (1-5)
   * @returns {string} Progress bar string
   */
  getProgressBar(level) {
    const filled = "■".repeat(level);
    const empty = "□".repeat(5 - level);
    return `${filled}${empty}`;
  }

  /**
   * Get category display name
   * @param {string} category - Category key
   * @returns {string} Formatted display name
   */
  getCategoryDisplayName(category) {
    const names = {
      languages: "Languages",
      frameworks: "Frameworks",
      tools: "Tools",
      databases: "Databases",
      systems: "Systems",
    };
    return names[category] || category;
  }
}

// Create singleton instance
const techStack = new TechStackManager();

export default techStack;
