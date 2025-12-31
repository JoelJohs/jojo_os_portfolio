# Core Systems Guide

> **📚 Navigation Index** → [Architecture](./ARCHITECTURE.md) | [UI Components](./UI_COMPONENTS.md) | [Styling](./STYLING.md)

---

## 🎯 Quick Access

| System | Purpose | Quick Links |
|--------|---------|-------------|
| **[Terminal System](#terminal-system)** | CLI interface and command processing | [Commands](#terminal-commands) • [Layout](#terminal-layout) • [Integration](#terminal-integration) |
| **[Event System](#event-system)** | Pub/sub communication pattern | [API](#event-api) • [Constants](#event-constants) • [Examples](#event-examples) |
| **[i18n System](#i18n-system)** | Internationalization and localization | [Translation](#translation-function) • [Languages](#language-management) • [Usage](#i18n-usage) |
| **[Viewport System](#viewport-system)** | Dynamic content navigation | [Routing](#viewport-routing) • [Integration](#viewport-integration) • [Content](#viewport-content) |

---

## 🖥️ Terminal System

### Architecture Overview

The terminal system implements a **cyberpunk-themed CLI interface** that integrates with the viewport for dynamic content navigation. It combines Web Components with event-driven communication.

### Component Structure

```
┌── Terminal System
├── UI Layer
│   ├── x-terminal (Web Component)
│   └── Layout CSS (viewport + dock)
├── Core Logic
│   ├── shell.js (command interpreter)
│   ├── commandParser.js (input parser)
│   └── REGISTRY (command definitions)
└── Communication
    ├── events/bus.js (pub/sub system)
    └── events/types.js (event constants)
```

### Layout Structure (75/25 Split)

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

### Terminal Commands

#### Navigation Commands

```javascript
const NAVIGATION_COMMANDS = {
  home: () => {
    emit(EVENTS.NAV_NAVIGATE, "home");
    return "Jumping to sector: HOME";
  },
  about: () => {
    emit(EVENTS.NAV_NAVIGATE, "about");
    return "Retrieving personnel file...";
  },
  projects: () => {
    emit(EVENTS.NAV_NAVIGATE, "projects");
    return "Accessing project repository...";
  },
  contact: () => {
    emit(EVENTS.NAV_NAVIGATE, "contact");
    return "Opening secure channel...";
  }
};
```

#### System Commands

```javascript
const SYSTEM_COMMANDS = {
  clear: () => {
    emit(EVENTS.CLI_CLEAR);
    return null; // No output, just clear
  },
  echo: (args) => args.join(" "),
  help: () => "Available sectors: home, about, projects, contact. System cmds: clear, echo."
};
```

### Command Processing Flow

1. **User Input** → Terminal captures text
2. **Parse** → `commandParser.js` structures input
3. **Validate** → Shell checks command existence
4. **Execute** → Command function runs with args
5. **Respond** → Result emitted to terminal

```javascript
// Example: "echo Hello World"
Input → Parse → {command: "echo", args: ["Hello", "World"]} → Execute → "Hello World"
```

### Terminal Component Implementation

```javascript
export class Terminal extends HTMLElement {
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
          <input type="text" class="cmd-input" placeholder="Type 'help' to see all commands" 
                 autocomplete="off" spellcheck="false" autofocus>
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

    // Auto-focus management
    this.addEventListener("click", () => input.focus());
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
```

### Terminal Integration

#### Events it EMITS
```javascript
emit(EVENTS.CLI_INPUT, command); // User input
```

#### Events it LISTENS to
```javascript
on(EVENTS.CLI_OUTPUT, (text) => {
  this.printLine(text);
});

on(EVENTS.CLI_CLEAR, () => {
  this.querySelector("#output").innerHTML = "";
});
```

---

## 📡 Event System

### Architecture Overview

**Publish/Subscribe pattern** for **decoupled communication** between components. Components don't need to know about each other, they just emit and listen to events.

### Core Components

```
┌── Event System
├── types.js (Event Constants)
├── bus.js (Implementation)
└── Components (Producers/Consumers)
```

### Event Constants (types.js)

```javascript
export const EVENTS = {
  // System Events
  SYS_BOOT: "sys:boot",
  SYS_SHUTDOWN: "sys:shutdown",

  // UI Events
  UI_THEME_CHANGED: "ui:theme_changed",

  // Navigation Events
  NAV_NAVIGATE: "nav:navigate",

  // Terminal (CLI) Events
  CLI_INPUT: "cli:input",    // User pressed Enter
  CLI_OUTPUT: "cli:output",  // System response
  CLI_CLEAR: "cli:clear",    // Clear terminal

  // Command Events
  CMD_NOT_FOUND: "cmd:not_found",
  CMD_EXEC: "cmd:exec",     // Specific command executed
};
```

#### Naming Convention

Format: `CATEGORY:ACTION`

- `sys` - System-level events
- `ui` - User interface events
- `nav` - Navigation events
- `cli` - Terminal interface events
- `cmd` - Command-specific events

### Event Bus Implementation (bus.js)

```javascript
const subscribers = {}; // {eventName: [callback1, callback2, ...]}

export function on(eventName, callback) {
  if (!subscribers[eventName]) {
    subscribers[eventName] = [];
  }
  subscribers[eventName].push(callback);
  
  // Return cleanup function
  return () => off(eventName, callback);
}

export function emit(eventName, payload) {
  if (!subscribers[eventName]) return;
  
  subscribers[eventName].forEach((callback) => {
    try {
      callback(payload);
    } catch (error) {
      console.error(`[EventBus] Error in listener for "${eventName}":`, error);
    }
  });
}

function off(eventName, callback) {
  if (!subscribers[eventName]) return;
  subscribers[eventName] = subscribers[eventName].filter(cb => cb !== callback);
}
```

### Event API

#### Subscribe to Events
```javascript
import { on, EVENTS } from '../core/events/bus.js';

const unsubscribe = on(EVENTS.CLI_OUTPUT, (text) => {
  console.log('Terminal output:', text);
});

// Cleanup when needed
unsubscribe();
```

#### Emit Events
```javascript
import { emit, EVENTS } from '../core/events/bus.js';

emit(EVENTS.NAV_NAVIGATE, 'about');
emit(EVENTS.CLI_OUTPUT, 'Command executed successfully');
```

### Event Examples

#### Terminal Navigation Flow
```javascript
// User types "about" in terminal
1. Terminal emits: EVENTS.CLI_INPUT with "about"
2. Shell listens to EVENTS.CLI_INPUT
3. Shell processes command and emits: EVENTS.NAV_NAVIGATE with "about"
4. Viewport listens to EVENTS.NAV_NAVIGATE
5. Viewport updates content to show ProfileCard
6. Shell emits: EVENTS.CLI_OUTPUT with "Retrieving personnel file..."
7. Terminal listens to EVENTS.CLI_OUTPUT and displays message
```

#### Language Change Flow
```javascript
// User changes language
1. LanguageSwitcher calls: setLanguage('es')
2. i18n system emits: EVENTS.UI_LANGUAGE_CHANGED with 'es'
3. Components listening update their text
4. DOM utilities update all [data-i18n] elements
```

---

## 🌍 i18n System

### Architecture Overview

**Custom internationalization system** without external dependencies. Supports multiple languages with automatic detection and persistent storage.

### File Structure

```
src/core/i18n/
├── index.js        # Main entry point
└── i18n.js         # Core i18n logic

data/locales/
├── es.js          # Spanish dictionary
└── en.js          # English dictionary
```

### Dictionary Structure

```javascript
// es.js
export default {
  system: {
    boot: "INICIANDO SISTEMA...",
    ready: "SISTEMA LISTO"
  },
  ui: {
    projects: "Proyectos",
    about: "Acerca de",
    contact: "Contacto"
  },
  terminal: {
    help: "Sectores disponibles: home, about, projects, contact",
    prompt: "visitante@jojo-os:~$"
  }
};
```

### i18n API

#### Translation Function
```javascript
import { t } from '../core/i18n';

t('system.boot')        // "INICIANDO SISTEMA..."
t('ui.projects')        // "Proyectos"
t('nonexistent.key')    // "nonexistent.key" (fallback)
```

#### Language Management
```javascript
import { setLanguage, getCurrentLanguage, getAvailableLanguages } from '../core/i18n';

// Change language
setLanguage('es');       // true if successful, false if not available

// Get current language
const current = getCurrentLanguage(); // 'es' or 'en'

// Get available languages
const available = getAvailableLanguages(); // ['es', 'en']
```

### Language Detection

Automatic detection in this order:

1. **localStorage** - Previously saved preference
2. **Browser language** - `navigator.language`
3. **Default** - Fallback to English

```javascript
function detectLanguage() {
  // 1. Check localStorage
  const stored = localStorage.getItem('jojo_os_language');
  if (stored && DICTIONARIES[stored]) return stored;
  
  // 2. Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (DICTIONARIES[browserLang]) return browserLang;
  
  // 3. Use default
  return 'en';
}
```

### DOM Integration

#### Data Attribute Translation
```html
<h1 data-i18n="system.boot">Loading...</h1>
<p data-i18n="ui.projects">Projects</p>
<button data-i18n="ui.about">About</button>
```

#### JavaScript Integration
```javascript
import { updateLocalizedText } from '../core/utils/dom.js';

// Update all [data-i18n] elements
updateLocalizedText();

// Manual translation for dynamic content
const element = document.createElement('div');
element.textContent = t('system.ready');
```

### Language Change Listeners

```javascript
import { onLanguageChange } from '../core/i18n';

const unsubscribe = onLanguageChange((newLang) => {
  console.log(`Language changed to: ${newLang}`);
  // Re-render components, update UI, etc.
});

// Cleanup when needed
unsubscribe();
```

---

## 🖼️ Viewport System

### Architecture Overview

**Dynamic content system** that responds to navigation events. Renders different content sections based on terminal commands.

### Component Structure

```
┌── Viewport System
├── HTML Structure
│   ├── #viewport (container)
│   └── #content-stage (dynamic area)
├── JavaScript Controller
│   ├── viewport.js (navigation logic)
│   └── ROUTES (content definitions)
└── Event Integration
    └── EVENTS.NAV_NAVIGATE listener
```

### HTML Layout

```html
<main id="app">
  <section id="viewport">
    <div id="content-stage">
      <!-- Dynamic content injected here -->
    </div>
  </section>
  
  <section id="terminal-dock">
    <x-terminal></x-terminal>
  </section>
</main>
```

### Viewport Routing

```javascript
const ROUTES = {
  home: "<h1>HOME SECURE SERVER</h1><p>Welcome back, User.</p>",
  about: "<x-profile-card></x-profile-card>",
  projects: "<h1>PROJECTS GRID</h1><p>Loading modules...</p>",
  contact: "<h1>ENCRYPTED CHANNEL</h1><p>Send a message...</p>"
};

export function initViewport() {
  const stage = document.getElementById("content-stage");
  if (!stage) return;

  // Set initial content
  stage.innerHTML = ROUTES.home;

  // Listen for navigation events
  on(EVENTS.NAV_NAVIGATE, (route) => {
    const content = ROUTES[route] || "<h1>404 NOT FOUND</h1><p>Route does not exist.</p>";
    
    if (content) {
      stage.innerHTML = content;
      
      // Configure dynamic components
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
    }
  });
}
```

### Content Types

#### Static HTML Content
```javascript
const staticContent = "<h1>Static Title</h1><p>Static description</p>";
```

#### Web Component Content
```javascript
const componentContent = "<x-profile-card></x-profile-card>";
```

#### Dynamic Content with Data
```javascript
const dynamicContent = (data) => `
  <div class="user-profile">
    <h2>${data.name}</h2>
    <p>${data.role}</p>
  </div>
`;
```

### Navigation Flow

```
User Command → Shell → NAV_NAVIGATE Event → Viewport → Content Update
     "about"    →       → emit("nav:navigate", "about") →      → ProfileCard
```

### Error Handling

```javascript
const content = ROUTES[route] || `
  <div class="error-404">
    <h1>404 NOT FOUND</h1>
    <p>Route "${route}" does not exist.</p>
  </div>
`;
```

### Component Integration

#### ProfileCard Setup
```javascript
if (route === "about") {
  const card = stage.querySelector("x-profile-card");
  if (card) {
    // Set data property (triggers render)
    card.data = {
      name: "Joel Johs",
      role: "SysAdmin",
      stats: { str: "MAX", int: "MAX" }
    };
  }
}
```

#### Future Component Integration
```javascript
// Future: Projects Grid
if (route === "projects") {
  const grid = stage.querySelector("projects-grid");
  if (grid) {
    grid.projects = await fetchProjects();
  }
}
```

---

## 🔄 System Integration

### Complete Navigation Flow Example

```
1. User types "about" in terminal
   ↓
2. Terminal captures input and emits CLI_INPUT event
   ↓
3. Shell listens to CLI_INPUT, processes command
   ↓
4. Shell emits NAV_NAVIGATE event with "about"
   ↓
5. Viewport listens to NAV_NAVIGATE, updates content
   ↓
6. ProfileCard component renders with data
   ↓
7. Shell emits CLI_OUTPUT with confirmation message
   ↓
8. Terminal displays confirmation to user
```

### Event Communication Map

```
┌─────────────────┐    emit()    ┌─────────────┐    on()    ┌─────────────────┐
│   Terminal     │ ──────────────→ │ Event Bus   │ ───────────→ │     Shell      │
│  (CLI Input)   │               │ (Pub/Sub)   │             │ (Processing)   │
└─────────────────┘               └─────────────┘             └─────────────────┘
                                                                 │
                                                                 emit()
                                                                 │
                                                                 ↓
┌─────────────────┐    on()     ┌─────────────┐    emit()    ┌─────────────────┐
│   Viewport     │ ←───────────── │ Event Bus   │ ←──────────── │     Shell      │
│ (Content)      │               │ (Pub/Sub)   │             │ (Navigation)   │
└─────────────────┘               └─────────────┘             └─────────────────┘
```

### Performance Considerations

1. **Event Listeners**: Always return cleanup functions
2. **DOM Updates**: Minimal, targeted updates only
3. **Component Lifecycle**: Proper cleanup in disconnectedCallback
4. **Memory Management**: Remove unused event listeners

### Error Handling Patterns

```javascript
try {
  const result = action(args);
  if (result) {
    emit(EVENTS.CLI_OUTPUT, result);
  }
} catch (error) {
  if (error.name === "SyntaxError") {
    emit(EVENTS.CLI_OUTPUT, `[ERROR] Invalid syntax: ${error.message}`);
  } else {
    emit(EVENTS.CLI_OUTPUT, `[ERROR] System failure: ${error.message}`);
  }
  console.error(`[Shell] Command failed:`, error);
}
```

---

## 🔧 Development Guidelines

### Adding New Commands

```javascript
const REGISTRY = {
  // Existing commands...
  
  newCommand: (args) => {
    // Process arguments
    return "Command executed successfully";
  }
};
```

### Adding New Event Types

```javascript
// 1. Add to types.js
export const EVENTS = {
  // Existing events...
  NEW_FEATURE: "new:feature"
};

// 2. Emit from producer
emit(EVENTS.NEW_FEATURE, data);

// 3. Listen in consumer
on(EVENTS.NEW_FEATURE, (data) => {
  // Handle event
});
```

### Adding New Languages

```javascript
// 1. Create data/locales/fr.js
export default {
  system: {
    boot: "DÉMARRAGE DU SYSTÈME...",
    ready: "SYSTÈME PRÊT"
  },
  // ... other translations
};

// 2. Add to DICTIONARIES in i18n.js
import fr from '../../data/locales/fr.js';
const DICTIONARIES = { es, en, fr };
```

This core systems architecture provides a robust foundation for the cyberpunk-themed portfolio with clear separation of concerns, event-driven communication, and modular extensibility.