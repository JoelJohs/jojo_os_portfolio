# UI Components Guide

> **📚 Navigation Index** → [Architecture](./ARCHITECTURE.md) | [Core Systems](./CORE_SYSTEMS.md) | [Styling](./STYLING.md)

---

## 🎯 Quick Access

| Level | Components | Examples | File Location |
|-------|------------|----------|---------------|
| **[🧱 Atoms](#atoms)** | Basic indivisible elements | LanguageSwitcher, Button, Input | `src/ui/atoms/` |
| **[🔬 Molecules](#molecules)** | Simple combinations | ProfileCard, SearchField | `src/ui/molecules/` |
| **[🧬 Organisms](#organisms)** | Complex sections | Terminal, Viewport | `src/ui/organisms/` |

---

## 🧱 Atoms

### Overview

Atoms are the **smallest indivisible UI components**. They cannot be broken down further without losing their functionality and are completely independent.

### Characteristics

- **Single Responsibility** - One specific function
- **Reusable** - Used in multiple contexts  
- **Independent** - No dependencies on other components
- **Simple Logic** - Usually presentation only
- **No Child Components** - Standalone elements

### LanguageSwitcher Example

```javascript
import { setLanguage, getLanguage, onLanguageChange } from "../../core/i18n/i18n.js";

export class LanguageSwitcher extends HTMLElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this._unsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
    this._unsubscribe = onLanguageChange(() => this.render());
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
    if (typeof this._unsubscribe === "function") {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  handleClick() {
    const current = getLanguage();
    const next = current === "es" ? "en" : "es";
    setLanguage(next);
  }

  render() {
    const lang = getLanguage();
    this.innerHTML = `
      <button class="lang-btn">
        [ <span class="${lang === "es" ? "active" : ""}">ES</span> / 
          <span class="${lang === "en" ? "active" : ""}">EN</span> ]
      </button>
    `;
  }
}

customElements.define("x-lang-switch", LanguageSwitcher);
```

### Atom Patterns

#### Button Component
```javascript
class CyberButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'medium';
    const disabled = this.hasAttribute('disabled');
    
    this.innerHTML = `
      <button class="cyber-btn cyber-btn--${variant} cyber-btn--${size}" 
              ${disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('cyber-button', CyberButton);
```

#### Input Component
```javascript
class CyberInput extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'placeholder', 'size'];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const size = this.getAttribute('size') || 'medium';
    
    this.innerHTML = `
      <div class="cyber-input-wrapper cyber-input--${size}">
        <input type="${type}" 
               class="cyber-input" 
               placeholder="${placeholder}"
               autocomplete="off">
        <div class="cyber-input-border"></div>
      </div>
    `;
  }
}

customElements.define('cyber-input', CyberInput);
```

### Atom Structure

```
src/ui/atoms/
├── LanguageSwitcher.js    # Language switcher (current)
├── Button.js             # Action buttons
├── Input.js              # Text inputs
├── Icon.js               # SVG icons
├── Badge.js              # Status badges
├── Avatar.js             # User avatars
└── index.js              # Export barrel
```

---

## 🔬 Molecules

### Overview

Molecules are **simple combinations of 2-4 atoms** that work together to form a specific functional unit. They have basic logic and state management.

### Characteristics

- **Combines Atoms** - Groups 2-4 basic components
- **Cooperative** - Atoms work together toward a goal
- **Simple Logic** - Basic state and behavior
- **Specific Purpose** - Solves particular UI problem

### ProfileCard Example

```javascript
class ProfileCard extends HTMLElement {
  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data || {};
  }

  render() {
    const name = this.data?.name || "Unknown";
    const role = this.data?.role || "";
    const stats = this.data?.stats || {};
    
    this.innerHTML = `
      <div class="profile-card">
        <div class="profile-header">
          <h2 class="profile-name">${name}</h2>
          <p class="profile-role">${role}</p>
        </div>
        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-label">STR</span>
            <span class="stat-value">${stats.str ?? "-"}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">INT</span>
            <span class="stat-value">${stats.int ?? "-"}</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("x-profile-card", ProfileCard);
```

#### Usage Example
```javascript
// In viewport system
if (route === "about") {
  const card = stage.querySelector("x-profile-card");
  if (card) {
    card.data = {
      name: "Joel Johs",
      role: "SysAdmin",
      stats: { str: "MAX", int: "MAX" }
    };
  }
}
```

### Molecule Patterns

#### SearchField Component
```javascript
class SearchField extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="search-field">
        <cyber-input placeholder="Search projects..." 
                     size="large">
        </cyber-input>
        <cyber-button variant="primary" size="large">
          🔍 Search
        </cyber-button>
      </div>
    `;
  }

  setupEventListeners() {
    const input = this.querySelector('cyber-input input');
    const button = this.querySelector('cyber-button');
    
    const handleSearch = () => {
      const query = input.value.trim();
      if (query) {
        this.emit('search', { query });
      }
    };

    button.addEventListener('click', handleSearch);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }

  emit(eventName, data) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }
}

customElements.define('search-field', SearchField);
```

#### LoginForm Component
```javascript
class LoginForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <form class="login-form">
        <div class="form-group">
          <label>Email</label>
          <cyber-input type="email" placeholder="user@domain.com"></cyber-input>
        </div>
        <div class="form-group">
          <label>Password</label>
          <cyber-input type="password" placeholder="••••••••"></cyber-input>
        </div>
        <div class="form-actions">
          <cyber-button type="submit" variant="primary">
            Access System
          </cyber-button>
        </div>
      </form>
    `;
  }

  setupEventListeners() {
    const form = this.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      this.emit('login', { data: Object.fromEntries(formData) });
    });
  }

  emit(eventName, data) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }
}

customElements.define('login-form', LoginForm);
```

### Molecule Structure

```
src/ui/molecules/
├── ProfileCard.js         # User profile display (current)
├── SearchField.js         # Input + button combination
├── LoginForm.js           # Multiple inputs + button
├── NavigationItem.js      # Icon + text link
├── StatCard.js           # Value + label display
└── index.js              # Export barrel
```

---

## 🧬 Organisms

### Overview

Organisms are **complex sections** that combine multiple atoms and molecules to form complete, autonomous systems with sophisticated logic and state management.

### Characteristics

- **Complex Structure** - Combines many components
- **Autonomous** - Functions as independent system
- **Complex Logic** - Advanced state and behavior
- **Specific Purpose** - Solves major business problems

### Terminal Organism

```javascript
export class Terminal extends HTMLElement {
  constructor() {
    super();
    this.history = [];
    this.setupEventListeners = this.setupEventListeners.bind(this);
    this.setupSystemListeners = this.setupSystemListeners.bind(this);
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.setupSystemListeners();
  }

  render() {
    this.innerHTML = `
      <div class="terminal-content">
        <div class="terminal-output" id="output"></div>
        <div class="command-line">
          <span class="prompt">visitor@jojo-os:~$</span>
          <input type="text" 
                 class="cmd-input" 
                 placeholder="Type 'help' to see all commands"
                 autocomplete="off" 
                 spellcheck="false" 
                 autofocus>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const input = this.querySelector(".cmd-input");
    
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = input.value.trim();
        this.printLine(`visitor@jojo-os:~$ ${command}`, "muted");
        emit(EVENTS.CLI_INPUT, command);
        input.value = "";
      }
    });

    this.addEventListener("click", () => input.focus());
    
    setTimeout(() => input.focus(), 100);
  }

  setupSystemListeners() {
    on(EVENTS.CLI_OUTPUT, (text) => {
      this.printLine(text);
    });

    on(EVENTS.CLI_CLEAR, () => {
      this.querySelector("#output").innerHTML = "";
    });
  }

  printLine(text, type = "") {
    const output = this.querySelector("#output");
    const line = document.createElement("div");
    line.className = `terminal-line ${type}`;
    line.textContent = text; // XSS protection
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }
}

customElements.define("x-terminal", Terminal);
```

### Organism Patterns

#### Header Navigation Component
```javascript
class HeaderNavigation extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupNavigation();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <header class="system-header">
        <nav class="nav-tabs">
          <button class="tab active" data-route="home">HOME</button>
          <button class="tab" data-route="about">ABOUT</button>
          <button class="tab" data-route="projects">PROJECTS</button>
          <button class="tab" data-route="contact">CONTACT</button>
          <div class="nav-spacer"></div>
          <x-lang-switch></x-lang-switch>
        </nav>
      </header>
    `;
  }

  setupNavigation() {
    const tabs = this.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const route = tab.dataset.route;
        emit(EVENTS.NAV_NAVIGATE, route);
        this.updateActiveTab(tab);
      });
    });
  }

  updateActiveTab(activeTab) {
    const tabs = this.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');
  }

  setupEventListeners() {
    on(EVENTS.NAV_NAVIGATE, (route) => {
      const activeTab = this.querySelector(`[data-route="${route}"]`);
      if (activeTab) {
        this.updateActiveTab(activeTab);
      }
    });
  }
}

customElements.define('header-nav', HeaderNavigation);
```

#### Projects Grid Component
```javascript
class ProjectsGrid extends HTMLElement {
  constructor() {
    super();
    this._projects = [];
  }

  set projects(value) {
    this._projects = value;
    this.render();
  }

  get projects() {
    return this._projects;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="projects-grid">
        ${this._projects.map(project => this.createProjectCard(project)).join('')}
      </div>
    `;
  }

  createProjectCard(project) {
    return `
      <article class="project-card">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.technologies.map(tech => 
              `<span class="tech-badge">${tech}</span>`
            ).join('')}
          </div>
          <div class="project-links">
            <a href="${project.demo}" class="project-link demo">Live Demo</a>
            <a href="${project.github}" class="project-link github">GitHub</a>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('projects-grid', ProjectsGrid);
```

### Organism Structure

```
src/ui/organisms/
├── terminal.js             # Terminal interface (current)
├── Header.js              # Navigation and header
├── Viewport.js            # Content container
├── ProjectsGrid.js        # Project showcase
├── ContactForm.js         # Contact interface
└── index.js              # Export barrel
```

---

## 🏗️ Component Architecture

### Decision Tree

```
Is the component the smallest possible?
  ├── Yes → 🧱 ATOM
  └── No → Does it combine 2-4 simple components?
          ├── Yes → 🔬 MOLECULE
          └── No → Is it a complete, autonomous section?
                  ├── Yes → 🧬 ORGANISM
                  └── No → Reconsider design
```

### Classification Rules

| Rule | Atoms | Molecules | Organisms |
|------|--------|-----------|-----------|
| **Divisible?** | No | Yes | Yes |
| **Combination Count** | 0 | 2-4 | 5+ |
| **Logic Complexity** | Low | Medium | High |
| **State Management** | None | Simple | Complex |
| **Dependencies** | None | Basic atoms | Multiple atoms/molecules |

### Component Lifecycle

```javascript
class MyComponent extends HTMLElement {
  // 1. Constructor
  constructor() {
    super();
    this._data = null;
    this._unsubscribe = null;
  }

  // 2. Connected to DOM
  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.setupSystemListeners();
  }

  // 3. Attribute changes (optional)
  static get observedAttributes() {
    return ['data', 'variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data' && oldValue !== newValue) {
      this.data = JSON.parse(newValue);
    }
  }

  // 4. Disconnected from DOM
  disconnectedCallback() {
    this.cleanupEventListeners();
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  // 5. Property setters/getters
  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  // 6. Rendering
  render() {
    this.innerHTML = `<div class="my-component">${this._data}</div>`;
  }

  // 7. Event setup
  setupEventListeners() {
    this.addEventListener('click', this.handleClick.bind(this));
  }

  // 8. System listeners
  setupSystemListeners() {
    this._unsubscribe = on(EVENTS.SOME_EVENT, this.handleSystemEvent.bind(this));
  }

  // 9. Cleanup
  cleanupEventListeners() {
    this.removeEventListener('click', this.handleClick);
  }
}

customElements.define('my-component', MyComponent);
```

---

## 🎨 Styling Integration

### CSS Class Naming

#### BEM Methodology
```css
.component { /* Block */ }
.component__element { /* Element */ }
.component--modifier { /* Modifier */ }
```

#### Example
```css
/* Block */
.profile-card {
  background: var(--bg-panel);
  border-radius: var(--radius-md);
}

/* Element */
.profile-card__name {
  font-size: 1.5rem;
  color: var(--primary-neon);
}

/* Modifier */
.profile-card--compact {
  padding: var(--spacing-sm);
}
```

### Component Styles Organization

```
src/styles/components/
├── atoms/
│   ├── button.css
│   ├── input.css
│   └── language-switcher.css
├── molecules/
│   ├── profile-card.css
│   ├── search-field.css
│   └── login-form.css
└── organisms/
    ├── terminal.css
    ├── header.css
    └── projects-grid.css
```

### Theme Integration

```css
.component {
  /* Use CSS variables for theming */
  background: var(--bg-panel);
  color: var(--text-main);
  border: 1px solid var(--primary-dim);
  
  /* Use variables for effects */
  box-shadow: var(--shadow-neon);
  text-shadow: var(--glow-text);
}
```

---

## 🔧 Development Guidelines

### Component Creation Checklist

1. **[ ] Determine Level** - Atom, Molecule, or Organism?
2. **[ ] Define Interface** - Properties, events, attributes
3. **[ ] Implement Lifecycle** - connectedCallback, disconnectedCallback
4. **[ ] Add Event Handling** - User interactions and system events
5. **[ ] Create Styles** - Component-specific CSS with variables
6. **[ ] Add Documentation** - Usage examples and API reference
7. **[ ] Test Integration** - Verify in different contexts

### Best Practices

#### Do's
- ✅ Use semantic HTML elements
- ✅ Implement proper cleanup
- ✅ Use CSS variables for theming
- ✅ Handle accessibility
- ✅ Add proper event handling
- ✅ Document component API

#### Don'ts
- ❌ Skip cleanup in disconnectedCallback
- ❌ Use inline styles
- ❌ Create overly complex components
- ❌ Ignore accessibility
- ❌ Mix concerns in single component
- ❌ Hardcode values, use variables

### Testing Components

```javascript
// Example testing approach
describe('ProfileCard', () => {
  let card;
  
  beforeEach(() => {
    card = document.createElement('x-profile-card');
    document.body.appendChild(card);
  });

  afterEach(() => {
    document.body.removeChild(card);
  });

  it('should render profile data', () => {
    card.data = {
      name: 'Test User',
      role: 'Developer',
      stats: { str: '10', int: '15' }
    };
    
    expect(card.querySelector('.profile-name').textContent).toBe('Test User');
    expect(card.querySelector('.profile-role').textContent).toBe('Developer');
  });
});
```

---

## 📁 File Organization

### Export Barrels

```javascript
// src/ui/atoms/index.js
export { default as LanguageSwitcher } from './LanguageSwitcher.js';
export { default as Button } from './Button.js';
export { default as Input } from './Input.js';

// src/ui/molecules/index.js
export { default as ProfileCard } from './ProfileCard.js';
export { default as SearchField } from './SearchField.js';

// src/ui/organisms/index.js
export { default as Terminal } from './terminal.js';
export { default as HeaderNavigation } from './HeaderNavigation.js';

// src/ui/index.js
export * from './atoms';
export * from './molecules';
export * from './organisms';
```

### Import Patterns

```javascript
// Individual imports
import { LanguageSwitcher } from '../ui/atoms/LanguageSwitcher.js';

// Barrel imports
import { LanguageSwitcher, Button, Input } from '../ui/atoms/index.js';

// Full UI import
import { 
  LanguageSwitcher, 
  ProfileCard, 
  Terminal 
} from '../ui/index.js';
```

---

This component architecture provides a scalable, maintainable, and consistent approach to building the cyberpunk-themed portfolio interface with clear separation of concerns and reusable patterns.