# Architecture Guide

> **📚 Navigation Index** → [Core Systems](./CORE_SYSTEMS.md) | [UI Components](./UI_COMPONENTS.md) | [Styling](./STYLING.md)

---

## 🏗️ System Architecture

### Overview

Portfolio Vanilla implements a **cyberpunk-themed portfolio** using **vanilla web technologies** with a **component-based architecture**. The system follows modern web development patterns while maintaining zero external framework dependencies.

### Core Architecture Principles

| Principle | Implementation | Benefits |
|-----------|----------------|-----------|
| **Component-First** | Atomic Design (Atoms-Molecules-Organisms) | Reusable, maintainable UI |
| **Event-Driven** | Pub/Sub communication pattern | Decoupled, testable logic |
| **Modular** | Clear separation of concerns | Scalable, organized codebase |
| **Vanilla First** | No frameworks, pure web standards | Fast, lightweight, secure |
| **Theme-Driven** | Cyberpunk/neon aesthetic system | Consistent visual identity |

---

## 📁 Project Structure

```
portfolio_vanilla/
├── 📚 docs/                     # Documentation
│   ├── README.md                 # Main index
│   ├── ARCHITECTURE.md           # This guide
│   ├── CORE_SYSTEMS.md           # Terminal, events, i18n, viewport
│   ├── UI_COMPONENTS.md          # Component architecture
│   └── STYLING.md               # CSS architecture
├── 💻 src/                      # Source code
│   ├── core/                    # Business logic and systems
│   │   ├── i18n/               # Internationalization
│   │   ├── events/             # Event system
│   │   ├── system/             # Terminal and viewport
│   │   └── utils/              # DOM utilities
│   ├── ui/                      # User interface components
│   │   ├── atoms/              # Basic components
│   │   ├── molecules/          # Component combinations
│   │   └── organisms/          # Complex sections
│   ├── styles/                  # CSS and styling
│   │   ├── vars.css            # Design system variables
│   │   ├── reset.css           # Base reset styles
│   │   ├── base.css            # Global components
│   │   ├── layout.css          # Layout structure
│   │   └── components/         # Component-specific styles
│   └── main.js                  # Application entry point
├── data/                        # Data and configuration
│   ├── locales/                 # Translation files
│   └── db.js                   # Static data
├── 🌐 index.html                # Main HTML entry
├── 📦 package.json              # Dependencies and scripts
└── 🔒 .gitignore               # Git ignore rules
```

---

## 🎯 Core Concepts

### 1. Component Architecture (Atomic Design)

```
Atoms (Basic) → Molecules (Combinations) → Organisms (Complex Sections)
     ↓                 ↓                          ↓
LanguageSwitcher → ProfileCard → Terminal System
Button           → SearchField → Header Navigation
Input            → LoginForm   → Viewport Layout
```

### 2. Event-Driven Communication

```
User Action → Event Emitter → Event Bus → Event Listener → System Response
```

### 3. Layout System (75/25 Split)

```
┌─────────────────────────────────┐
│        Viewport (75vh)         │ ← Dynamic GUI content
│   (home/about/projects/etc.)    │
├─────────────────────────────────┤
│     Terminal Dock (25vh)       │ ← CLI interface
│   ┌─────────────────────────┐   │
│   │ visitor@jojo-os:~$     │   │
│   │ _ command input       │   │
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```

---

## 🧩 Component Organization

### Atomic Design Implementation

| Level | Purpose | Examples | File Location |
|-------|---------|----------|---------------|
| **🧱 Atoms** | Indivisible UI elements | LanguageSwitcher, Button, Input | `src/ui/atoms/` |
| **🔬 Molecules** | Simple combinations | ProfileCard, SearchField | `src/ui/molecules/` |
| **🧬 Organisms** | Complex sections | Terminal, Header, Viewport | `src/ui/organisms/` |

### Component Lifecycle

1. **Definition** - Web Component class definition
2. **Registration** - `customElements.define()`
3. **Connection** - `connectedCallback()` when added to DOM
4. **Rendering** - Internal HTML structure creation
5. **Event Setup** - Event listeners and system integration
6. **Disconnection** - Cleanup when removed from DOM

---

## 🔄 Data Flow Architecture

### Event Communication Pattern

```
┌─────────────────┐    emit()    ┌─────────────┐    on()    ┌─────────────────┐
│   Component A   │ ──────────────→ │ Event Bus   │ ───────────→ │   Component B   │
│ (Event Emitter) │               │ (Pub/Sub)   │             │ (Event Listener)│
└─────────────────┘               └─────────────┘             └─────────────────┘
```

### Example Flow: Terminal Navigation

```
User: "about" → Terminal → CLI_INPUT Event → Shell → NAV_NAVIGATE Event → Viewport → ProfileCard
```

---

## 🎨 Design System Architecture

### CSS Organization (ITCSS Methodology)

```
1. reset.css      - Reset and base browser styles
2. vars.css       - Design system variables
3. base.css       - Global components and effects
4. layout.css     - Layout structure and grids
5. components/    - Component-specific styles
```

### Design Token Structure

```css
:root {
  /* Colors (The "Look") */
  --bg-deep-space: #02020a;
  --primary-neon: #bc13fe;
  
  /* Typography (The "Voice") */
  --font-mono: 'Fira Code', monospace;
  
  /* Effects (The "Juice") */
  --glow-text: 0 0 5px rgba(188, 19, 254, 0.7);
  
  /* Spacing (The "Rhythm") */
  --spacing-sm: 0.5rem;
}
```

---

## 🔧 Technology Stack

### Core Technologies

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **HTML5** | Structure & semantics | Native web standard |
| **CSS3** | Styling & animations | Powerful, no dependencies |
| **JavaScript ES6+** | Logic & interactivity | Modern features, vanilla |
| **Web Components** | Component architecture | Native, framework-free |
| **CSS Grid/Flexbox** | Layout system | Modern, responsive |

### Development Tools

| Tool | Purpose | Configuration |
|------|---------|---------------|
| **pnpm** | Package management | Fast, efficient |
| **live-server** | Development server | Auto-reload |
| **Git** | Version control | Distributed workflow |

---

## 📐 Layout Architecture

### Main Layout Structure

```html
<body>
  <div class="scanlines"></div>          <!-- CRT Effect Layer -->
  
  <main id="app">
    <section id="viewport">              <!-- 75vh - Dynamic Content -->
      <div id="content-stage">
        <!-- Content injected by viewport system -->
      </div>
    </section>
    
    <section id="terminal-dock">         <!-- 25vh - CLI Interface -->
      <x-terminal></x-terminal>         <!-- Web Component -->
    </section>
  </main>
</body>
```

### Responsive Design Principles

- **Fluid Layouts**: `vh`, `%`, and flexible units
- **Mobile-First**: Progressive enhancement
- **Performance**: Minimal reflows and repaints
- **Accessibility**: Semantic HTML and keyboard navigation

---

## 🚀 Performance Architecture

### Optimization Strategies

1. **Minimal Dependencies** - Zero framework overhead
2. **Efficient DOM** - Strategic component updates
3. **CSS Performance** - Hardware-accelerated animations
4. **Bundle Size** - Only necessary code loaded
5. **Lazy Loading** - Components loaded on demand

### Performance Metrics

| Metric | Target | Implementation |
|---------|--------|----------------|
| **Bundle Size** | <100KB | Vanilla JS, minimal CSS |
| **First Contentful Paint** | <1s | Optimized asset loading |
| **Time to Interactive** | <2s | Progressive enhancement |
| **Lighthouse Score** | 95+ | Performance best practices |

---

## 🛡️ Security Architecture

### Security Principles

1. **No eval()** - Safe code execution
2. **textContent** - XSS prevention
3. **CSP Headers** - Content Security Policy
4. **No External Dependencies** - Reduced attack surface
5. **Input Sanitization** - Safe data handling

### Safe Data Handling

```javascript
// ✅ Safe: textContent prevents XSS
element.textContent = userInput;

// ❌ Dangerous: innerHTML allows injection
element.innerHTML = userInput; // NEVER do this
```

---

## 🔄 Development Workflow

### Git Workflow

```
main (production)
├── feature/terminal-system
├── feature/i18n-implementation
└── feature/component-architecture
```

### Development Process

1. **Feature Branch** - Create for new functionality
2. **Development** - Implement with documentation
3. **Testing** - Manual and automated checks
4. **Documentation** - Update relevant guides
5. **Pull Request** - Code review and merge
6. **Deploy** - GitHub Pages deployment

---

## 📏 Code Quality Standards

### JavaScript Standards

- **ES6+ Features** - Modern syntax and patterns
- **Component Pattern** - Web Components class-based
- **Event-Driven** - Pub/Sub communication
- **Error Handling** - Comprehensive try/catch
- **Documentation** - JSDoc comments

### CSS Standards

- **ITCSS** - Inverted Triangle methodology
- **BEM Naming** - Block__Element--Modifier
- **CSS Variables** - Design token system
- **Mobile-First** - Progressive enhancement
- **Performance** - Optimized selectors and animations

---

## 🎯 Future Architecture Considerations

### Scalability Plans

| Area | Current | Future Enhancement |
|-------|---------|-------------------|
| **Components** | Basic atomic design | Advanced component library |
| **State Management** | Event-based | Centralized state store |
| **Routing** | Simple viewport system | Advanced routing with history |
| **Data** | Static files | CMS integration |
| **Performance** | Optimized | PWA capabilities |

### Extensibility Points

1. **New Components** - Add to atoms/molecules/organisms
2. **New Commands** - Extend terminal registry
3. **New Languages** - Add to locales/
4. **New Themes** - Modify CSS variables
5. **New Features** - Follow established patterns

---

## 🔍 Debugging Architecture

### Debug Tools

1. **Console Logging** - Structured logging system
2. **Event Monitoring** - Event bus debugging
3. **Component Inspection** - Web Components devtools
4. **Performance Profiling** - Browser devtools
5. **Error Tracking** - Comprehensive error handling

### Common Debug Patterns

```javascript
// Event debugging
console.log(`[Event] ${EVENTS.CLI_INPUT} emitted:`, data);

// Component debugging
console.log(`[Component] ${this.constructor.name} connected`);

// System debugging
console.log(`[System] Shell initialized with ${Object.keys(REGISTRY).length} commands`);
```

---

This architecture provides a solid foundation for a modern, performant, and maintainable cyberpunk-themed portfolio using vanilla web technologies. The component-based design, event-driven communication, and modular structure ensure the system can grow and evolve while maintaining code quality and performance.