# Styling Guide

> **📚 Navigation Index** → [Architecture](./ARCHITECTURE.md) | [Core Systems](./CORE_SYSTEMS.md) | [UI Components](./UI_COMPONENTS.md)

---

## 🎯 Quick Access

| System | Purpose | Quick Links |
|--------|---------|-------------|
| **[CSS Architecture](#css-architecture)** | ITCSS methodology and file organization | [ITCSS Layers](#itcss-layers) • [File Structure](#css-file-structure) |
| **[Design Tokens](#design-tokens)** | CSS variables and design system | [Colors](#color-system) • [Typography](#typography-system) • [Effects](#effect-system) |
| **[Layout System](#layout-system)** | Component layout and page structure | [75/25 Layout](#7525-split-layout) • [Grid System](#grid-system) |
| **[Component Styles](#component-styles)** | Component-specific styling | [Atoms](#atoms-styling) • [Molecules](#molecules-styling) • [Organisms](#organisms-styling) |

---

## 🏗️ CSS Architecture

### ITCSS Methodology

The project follows **Inverted Triangle CSS (ITCSS)** methodology for scalable, maintainable styling:

```
1. reset.css      - Generic (broadest scope)
2. vars.css       - Settings (configuration)
3. base.css       - Base (HTML elements)
4. layout.css     - Layout (page structure)
5. components/    - Components (most specific)
```

### Benefits of ITCSS

| Benefit | Implementation | Impact |
|---------|----------------|---------|
| **Scalability** | Organized by specificity | Easy to add new styles |
| **Maintainability** | Clear separation of concerns | Quick to locate and modify |
| **Performance** | Optimized CSS cascade | Fewer style conflicts |
| **Consistency** | Systematic approach | Predictable styling patterns |

### CSS File Structure

```
src/styles/
├── reset.css           # Browser reset and base settings
├── vars.css            # Design system variables
├── base.css            # Global components and effects
├── layout.css          # Page layout structure
└── components/         # Component-specific styles
    ├── terminal.css     # Terminal component
    ├── header.css       # Header navigation
    ├── profile-card.css # Profile card molecule
    └── ...             # Other component styles
```

---

## 🎨 Design Tokens

### Color System

The cyberpunk theme uses a **hierarchical color palette** with neon accents:

```css
:root {
  /* Background Colors - Dark Space Theme */
  --bg-deep-space: #02020a;     /* Almost black - main background */
  --bg-navy: #0a0a22;             /* Dark navy blue */
  --bg-panel: #1a1a3e;            /* Slightly lighter for panels */
  
  /* Primary Colors - Neon Violet/Purple */
  --primary-neon: #bc13fe;          /* Main accent color */
  --primary-dim: #8b0bce;           /* Dimmed version */
  --primary-violet: #9400d3;        /* Alternative violet */
  
  /* Accent Colors - Electric Blue */
  --accent-cyan: #00ffff;           /* Bright cyan for highlights */
  --accent-blue: #0077ff;           /* Electric blue */
  
  /* Status Colors - Scarlet & Blood */
  --danger-scarlet: #ff1744;        /* Error alerts */
  --danger-blood: #8b0000;          /* Dark danger */
  
  /* Text Colors */
  --text-main: #e0e0e0;            /* Primary text */
  --text-muted: #6e6e8e;            /* Secondary text */
  --text-dim: #4a4a6e;             /* Dimmed text */
  
  /* Functional Colors */
  --success: #4caf50;               /* Success states */
  --warning: #ff9800;               /* Warning states */
  --error: #f44336;                 /* Error states */
}
```

### Typography System

```css
:root {
  /* Font Families */
  --font-mono: 'Fira Code', 'Consolas', 'Monaco', monospace;
  --font-display: 'Orbitron', 'Arial', sans-serif;
  --font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Font Sizes - Modular Scale */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 2rem;        /* 32px */
  --text-4xl: 2.5rem;     /* 40px */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Effect System (Neon & Glow Effects)

```css
:root {
  /* Neon Glow Effects */
  --glow-violet: 0 0 10px rgba(188, 19, 254, 0.8),
                 0 0 20px rgba(188, 19, 254, 0.6),
                 0 0 30px rgba(188, 19, 254, 0.4);
  
  --glow-cyan: 0 0 10px rgba(0, 255, 255, 0.8),
               0 0 20px rgba(0, 255, 255, 0.6),
               0 0 30px rgba(0, 255, 255, 0.4);
  
  --glow-scarlet: 0 0 10px rgba(255, 23, 68, 0.8),
                  0 0 20px rgba(255, 23, 68, 0.6),
                  0 0 30px rgba(255, 23, 68, 0.4);
  
  /* Text Glow */
  --glow-text: 0 0 5px rgba(188, 19, 254, 0.7);
  --glow-text-cyan: 0 0 5px rgba(0, 255, 255, 0.7);
  
  /* Box Shadows */
  --shadow-neon: 0 0 20px rgba(188, 19, 254, 0.3);
  --shadow-inset: inset 0 0 10px rgba(188, 19, 254, 0.1);
  --shadow-panel: 0 4px 20px rgba(0, 0, 0, 0.5);
  
  /* Border Styles */
  --border-neon: 1px solid rgba(188, 19, 254, 0.5);
  --border-dim: 1px solid rgba(188, 19, 254, 0.2);
  --border-bright: 1px solid var(--primary-neon);
}
```

### Spacing & Sizing System

```css
:root {
  /* Spacing - 8px grid system */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.25rem;     /* 4px */
  --radius-md: 0.5rem;      /* 8px */
  --radius-lg: 0.75rem;     /* 12px */
  --radius-xl: 1rem;        /* 16px */
  --radius-full: 9999px;
  
  /* Z-Index Scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-toast: 1080;
}
```

---

## 📐 Layout System

### 75/25 Split Layout

The main layout uses a **fixed vertical split** between viewport and terminal:

```css
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--bg-deep-space);
}

/* Viewport - 75% of vertical height */
#viewport {
  flex: 1; /* Takes remaining space (75vh) */
  position: relative;
  overflow-y: auto;
  background: linear-gradient(
    135deg,
    var(--bg-deep-space) 0%,
    var(--bg-navy) 50%,
    var(--bg-panel) 100%
  );
  border-bottom: 2px solid var(--primary-dim);
  box-shadow: 0 2px 10px rgba(188, 19, 254, 0.2);
}

/* Terminal Dock - 25% of vertical height */
#terminal-dock {
  height: 25vh;
  min-height: 200px;
  background: linear-gradient(
    to bottom,
    rgba(2, 2, 10, 0.9),
    rgba(10, 10, 22, 0.95)
  );
  border-top: 1px solid rgba(188, 19, 254, 0.3);
  box-shadow: 0 -5px 20px rgba(188, 19, 254, 0.1);
  position: relative;
}
```

### Grid System

```css
/* Responsive grid system */
.grid {
  display: grid;
  gap: var(--spacing-md);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive grids */
@media (max-width: 768px) {
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
```

### Flexbox Utilities

```css
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.items-start {
  align-items: flex-start;
}
```

---

## 🎭 Component Styles

### Atoms Styling

#### Language Switcher
```css
.lang-btn {
  background: transparent;
  border: var(--border-dim);
  color: var(--text-muted);
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: var(--radius-sm);
}

.lang-btn:hover {
  color: var(--primary-neon);
  border-color: var(--primary-dim);
  box-shadow: var(--glow-text);
}

.lang-btn .active {
  color: var(--primary-neon);
  font-weight: var(--font-semibold);
  text-shadow: var(--glow-text);
}
```

#### Button Component
```css
.cyber-btn {
  background: transparent;
  border: var(--border-dim);
  color: var(--text-main);
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: var(--radius-sm);
  position: relative;
  overflow: hidden;
}

.cyber-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(188, 19, 254, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.cyber-btn:hover {
  color: var(--primary-neon);
  border-color: var(--primary-neon);
  text-shadow: var(--glow-text);
  box-shadow: var(--shadow-neon);
}

.cyber-btn:hover::before {
  left: 100%;
}

.cyber-btn--primary {
  background: rgba(188, 19, 254, 0.1);
  border-color: var(--primary-neon);
  color: var(--primary-neon);
}

.cyber-btn--primary:hover {
  background: rgba(188, 19, 254, 0.2);
}
```

### Molecules Styling

#### Profile Card
```css
.profile-card {
  background: linear-gradient(
    135deg,
    rgba(26, 26, 62, 0.9),
    rgba(10, 10, 34, 0.9)
  );
  border: var(--border-neon);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-panel);
  position: relative;
  overflow: hidden;
}

.profile-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--primary-dim),
    var(--primary-neon),
    var(--primary-dim)
  );
  animation: glow-pulse 2s infinite;
}

.profile-name {
  color: var(--primary-neon);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  margin-bottom: var(--spacing-sm);
  text-shadow: var(--glow-text);
}

.profile-role {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  margin-bottom: var(--spacing-md);
}

.profile-stats {
  display: flex;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-md);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.stat-label {
  color: var(--text-dim);
  font-size: var(--text-sm);
  font-family: var(--font-mono);
}

.stat-value {
  color: var(--accent-cyan);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  text-shadow: var(--glow-text-cyan);
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```

### Organisms Styling

#### Terminal Component
```css
x-terminal {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  font-family: var(--font-mono);
  color: var(--text-main);
}

/* CRT Scanlines Effect */
x-terminal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 2;
}

/* Viñeteado Effect */
x-terminal::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  pointer-events: none;
  z-index: 3;
}

.terminal-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: var(--spacing-md);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.terminal-output {
  flex: 1;
  margin-bottom: var(--spacing-sm);
  white-space: pre-wrap;
  overflow-y: auto;
  padding-right: var(--spacing-sm);
}

.terminal-line {
  margin-bottom: var(--spacing-xs);
  font-size: var(--text-sm);
  line-height: var(--leading-tight);
}

.terminal-line.muted {
  color: var(--text-muted);
  opacity: 0.8;
}

.command-line {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-top: var(--border-dim);
  margin-top: auto;
}

.prompt {
  color: var(--primary-neon);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  margin-right: var(--spacing-sm);
  text-shadow: var(--glow-text);
}

.cmd-input {
  background: transparent;
  border: none;
  color: var(--text-main);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  caret-color: var(--primary-neon);
  flex: 1;
  outline: none;
}

.cmd-input::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
  font-style: italic;
}

.cmd-input:focus {
  background: rgba(188, 19, 254, 0.05);
  box-shadow: var(--shadow-inset);
}
```

---

## 🎭 Animation System

### Keyframe Animations

```css
/* Glitch Text Effect */
@keyframes glitch {
  0%, 100% {
    text-shadow: 
      var(--glow-text),
      2px 2px 0 var(--danger-scarlet),
      -2px -2px 0 var(--accent-cyan);
  }
  25% {
    text-shadow: 
      var(--glow-text),
      -2px 2px 0 var(--danger-scarlet),
      2px -2px 0 var(--accent-cyan);
  }
  50% {
    text-shadow: 
      var(--glow-text),
      2px -2px 0 var(--danger-scarlet),
      -2px 2px 0 var(--accent-cyan);
  }
  75% {
    text-shadow: 
      var(--glow-text),
      -2px -2px 0 var(--danger-scarlet),
      2px 2px 0 var(--accent-cyan);
  }
}

/* Neon Pulse */
@keyframes neon-pulse {
  0%, 100% {
    opacity: 1;
    text-shadow: var(--glow-text);
  }
  50% {
    opacity: 0.8;
    text-shadow: 0 0 3px rgba(188, 19, 254, 0.5);
  }
}

/* Scanline Animation */
@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* Terminal Cursor Blink */
@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

### Animation Classes

```css
.glitch-text {
  color: var(--primary-neon);
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  text-align: center;
  animation: glitch 2s infinite;
}

.neon-pulse {
  animation: neon-pulse 2s infinite;
}

.scanline-effect::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-neon);
  animation: scanline 4s linear infinite;
}
```

---

## 📱 Responsive Design

### Breakpoint System

```css
:root {
  /* Breakpoint values */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Mobile First Approach */
@media (min-width: 640px) {
  /* Small screens and up */
}

@media (min-width: 768px) {
  /* Medium screens and up */
}

@media (min-width: 1024px) {
  /* Large screens and up */
}

@media (min-width: 1280px) {
  /* Extra large screens and up */
}
```

### Mobile Adaptations

```css
/* Terminal Dock on Mobile */
@media (max-width: 768px) {
  #terminal-dock {
    height: 30vh;
    min-height: 180px;
  }
  
  .terminal-content {
    padding: var(--spacing-sm);
  }
  
  .terminal-line {
    font-size: var(--text-xs);
  }
}

/* Profile Card on Mobile */
@media (max-width: 480px) {
  .profile-card {
    padding: var(--spacing-lg);
  }
  
  .profile-stats {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}
```

---

## 🔧 Development Guidelines

### CSS Organization Rules

1. **Follow ITCSS Order** - Import files in correct specificity order
2. **Use BEM Naming** - Block__Element--Modifier convention
3. **Leverage Variables** - Always use design tokens
4. **Mobile First** - Progressive enhancement approach
5. **Performance First** - Optimize selectors and animations

### Writing CSS Guidelines

```css
/* ✅ Good: Specific, efficient, uses variables */
.profile-card__title {
  color: var(--primary-neon);
  font-size: var(--text-2xl);
  font-family: var(--font-display);
  margin-bottom: var(--spacing-md);
}

/* ❌ Bad: Generic, hardcoded values */
h2 {
  color: #bc13fe;
  font-size: 2rem;
  font-family: "Orbitron", sans-serif;
  margin-bottom: 16px;
}
```

### Animation Performance

```css
/* ✅ Good: Hardware accelerated properties */
.transform-animation {
  transform: translateX(100px);
  opacity: 0.8;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* ❌ Bad: Expensive properties */
.expensive-animation {
  width: 100px;
  height: 100px;
  transition: width 0.3s ease, height 0.3s ease;
}
```

---

## 🎯 Theming System

### Creating Theme Variants

```css
/* Dark Theme (Default) */
:root {
  --bg-primary: var(--bg-deep-space);
  --text-primary: var(--text-main);
  --accent-primary: var(--primary-neon);
}

/* Light Theme (Future) */
[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent-primary: #6366f1;
}

/* Matrix Theme (Future) */
[data-theme="matrix"] {
  --bg-primary: #000000;
  --text-primary: #00ff00;
  --accent-primary: #00ff41;
}
```

### Theme Switching

```css
/* Smooth theme transitions */
* {
  transition: background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}
```

---

This styling system provides a comprehensive, maintainable, and scalable approach to cyberpunk-themed UI with clear organization, design tokens, and responsive behavior. The ITCSS methodology ensures logical CSS architecture while the design token system enables consistent theming and easy customization.