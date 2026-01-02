# Guía de Componentes de UI

> **📚 Índice de Navegación** → [Arquitectura](./ARCHITECTURE.md) | [Sistemas Centrales](./CORE_SYSTEMS.md) | [Estilos](./STYLING.md)

---

## 🎯 Acceso Rápido

| Nivel | Componentes | Ejemplos | Ubicación del Archivo |
|-------|------------|----------|---------------|
| **[🧱 Átomos](#átomos)** | Elementos básicos indivisibles | LanguageSwitcher, Botón, Input | `src/ui/atoms/` |
| **[🔬 Moléculas](#moléculas)** | Combinaciones simples | ProfileCard, SearchField | `src/ui/molecules/` |
| **[🧬 Organismos](#organismos)** | Secciones complejas | Terminal, Viewport | `src/ui/organisms/` |

---

## 🧱 Átomos

### Descripción General

Los átomos son los **componentes de UI más pequeños e indivisibles**. No pueden descomponerse más sin perder su funcionalidad y son completamente independientes.

### Características

- **Responsabilidad Única** - Una función específica
- **Reutilizables** - Usados en múltiples contextos  
- **Independientes** - Sin dependencias de otros componentes
- **Lógica Simple** - Generalmente solo presentación
- **Sin Componentes Hijos** - Elementos autónomos

### Ejemplo de LanguageSwitcher

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

### Patrones de Átomos

#### Componente de Botón
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

#### Componente de Input
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

### Estructura de Átomos

```
src/ui/atoms/
├── LanguageSwitcher.js    # Selector de idioma (actual)
├── Button.js             # Botones de acción
├── Input.js              # Entradas de texto
├── Icon.js               # Iconos SVG
├── Badge.js              # Insignias de estado
├── Avatar.js             # Avatares de usuario
└── index.js              # Barril de exportación
```

---

## 🔬 Moléculas

### Descripción General

Las moléculas son **combinaciones simples de 2 a 4 átomos** que trabajan juntos para formar una unidad funcional específica. Tienen lógica básica y gestión de estado.

### Características

- **Combina Átomos** - Agrupa de 2 a 4 componentes básicos
- **Cooperativas** - Los átomos trabajan juntos hacia un objetivo
- **Lógica Simple** - Estado y comportamiento básicos
- **Propósito Específico** - Resuelve un problema de UI particular

### Ejemplo de ProfileCard

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
    const name = this.data?.name || "Desconocido";
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
            <span class="stat-label">FUE</span>
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

#### Ejemplo de Uso
```javascript
// En el sistema de viewport
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

### Patrones de Moléculas

#### Componente SearchField
```javascript
class SearchField extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="search-field">
        <cyber-input placeholder="Buscar proyectos..." 
                     size="large">
        </cyber-input>
        <cyber-button variant="primary" size="large">
          🔍 Buscar
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

#### Componente LoginForm
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
          <cyber-input type="email" placeholder="usuario@dominio.com"></cyber-input>
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <cyber-input type="password" placeholder="••••••••"></cyber-input>
        </div>
        <div class="form-actions">
          <cyber-button type="submit" variant="primary">
            Acceder al Sistema
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

### Estructura de Moléculas

```
src/ui/molecules/
├── ProfileCard.js         # Muestra de perfil de usuario (actual)
├── SearchField.js         # Combinación de input + botón
├── LoginForm.js           # Múltiples inputs + botón
├── NavigationItem.js      # Icono + enlace de texto
├── StatCard.js           # Muestra de valor + etiqueta
└── index.js              # Barril de exportación
```

---

## 🧬 Organismos

### Descripción General

Los organismos son **secciones complejas** que combinan múltiples átomos y moléculas para formar sistemas completos y autónomos con lógica y gestión de estado sofisticadas.

### Características

- **Estructura Compleja** - Combina muchos componentes
- **Autónomos** - Funcionan como un sistema independiente
- **Lógica Compleja** - Estado y comportamiento avanzados
- **Propósito Específico** - Resuelven problemas de negocio importantes

### Organismo de Terminal

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
          <span class="prompt">visitante@jojo-os:~$</span>
          <input type="text" 
                 class="cmd-input" 
                 placeholder="Escribe 'help' para ver todos los comandos"
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
        this.printLine(`visitante@jojo-os:~$ ${command}`, "muted");
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
    line.textContent = text; // Protección XSS
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }
}

customElements.define("x-terminal", Terminal);
```

### Patrones de Organismos

#### Componente de Navegación del Encabezado
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

#### Componente de Rejilla de Proyectos
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
            <a href="${project.demo}" class="project-link demo">Demo en Vivo</a>
            <a href="${project.github}" class="project-link github">GitHub</a>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('projects-grid', ProjectsGrid);
```

### Estructura de Organismos

```
src/ui/organisms/
├── terminal.js             # Interfaz de terminal (actual)
├── Header.js              # Navegación y encabezado
├── Viewport.js            # Contenedor de contenido
├── ProjectsGrid.js        # Muestra de proyectos
├── ContactForm.js         # Interfaz de contacto
└── index.js              # Barril de exportación
```

---

## 🏗️ Arquitectura de Componentes

### Árbol de Decisión

```
¿Es el componente lo más pequeño posible?
  ├── Sí → 🧱 ÁTOMO
  └── No → ¿Combina de 2 a 4 componentes simples?
          ├── Sí → 🔬 MOLÉCULA
          └── No → ¿Es una sección completa y autónoma?
                  ├── Sí → 🧬 ORGANISMO
                  └── No → Reconsiderar el diseño
```

### Reglas de Clasificación

| Regla | Átomos | Moléculas | Organismos |
|------|--------|-----------|-----------|
| **¿Divisible?** | No | Sí | Sí |
| **Cantidad de Combinaciones** | 0 | 2-4 | 5+ |
| **Complejidad Lógica** | Baja | Media | Alta |
| **Gestión de Estado** | Ninguna | Simple | Compleja |
| **Dependencias** | Ninguna | Átomos básicos | Múltiples átomos/moléculas |

### Ciclo de Vida del Componente

```javascript
class MyComponent extends HTMLElement {
  // 1. Constructor
  constructor() {
    super();
    this._data = null;
    this._unsubscribe = null;
  }

  // 2. Conectado al DOM
  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.setupSystemListeners();
  }

  // 3. Cambios de atributos (opcional)
  static get observedAttributes() {
    return ['data', 'variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data' && oldValue !== newValue) {
      this.data = JSON.parse(newValue);
    }
  }

  // 4. Desconectado del DOM
  disconnectedCallback() {
    this.cleanupEventListeners();
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  // 5. Setters/getters de propiedades
  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  // 6. Renderizado
  render() {
    this.innerHTML = `<div class="my-component">${this._data}</div>`;
  }

  // 7. Configuración de eventos
  setupEventListeners() {
    this.addEventListener('click', this.handleClick.bind(this));
  }

  // 8. Escuchas del sistema
  setupSystemListeners() {
    this._unsubscribe = on(EVENTS.SOME_EVENT, this.handleSystemEvent.bind(this));
  }

  // 9. Limpieza
  cleanupEventListeners() {
    this.removeEventListener('click', this.handleClick);
  }
}

customElements.define('my-component', MyComponent);
```

---

## 🎨 Integración de Estilos

### Nomenclatura de Clases CSS

#### Metodología BEM
```css
.component { /* Bloque */ }
.component__element { /* Elemento */ }
.component--modifier { /* Modificador */ }
```

#### Ejemplo
```css
/* Bloque */
.profile-card {
  background: var(--bg-panel);
  border-radius: var(--radius-md);
}

/* Elemento */
.profile-card__name {
  font-size: 1.5rem;
  color: var(--primary-neon);
}

/* Modificador */
.profile-card--compact {
  padding: var(--spacing-sm);
}
```

### Organización de Estilos de Componentes

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

### Integración de Temas

```css
.component {
  /* Usa variables CSS para tematización */
  background: var(--bg-panel);
  color: var(--text-main);
  border: 1px solid var(--primary-dim);
  
  /* Usa variables para efectos */
  box-shadow: var(--shadow-neon);
  text-shadow: var(--glow-text);
}
```

---

## 🔧 Directrices de Desarrollo

### Lista de Verificación para la Creación de Componentes

1. **[ ] Determinar Nivel** - ¿Átomo, Molécula u Organismo?
2. **[ ] Definir Interfaz** - Propiedades, eventos, atributos
3. **[ ] Implementar Ciclo de Vida** - connectedCallback, disconnectedCallback
4. **[ ] Añadir Manejo de Eventos** - Interacciones de usuario y eventos del sistema
5. **[ ] Crear Estilos** - CSS específico del componente con variables
6. **[ ] Añadir Documentación** - Ejemplos de uso y referencia de API
7. **[ ] Probar Integración** - Verificar en diferentes contextos

### Mejores Prácticas

#### Qué Hacer
- ✅ Usar elementos HTML semánticos
- ✅ Implementar una limpieza adecuada
- ✅ Usar variables CSS para tematización
- ✅ Manejar la accesibilidad
- ✅ Añadir un manejo de eventos adecuado
- ✅ Documentar la API del componente

#### Qué No Hacer
- ❌ Omitir la limpieza en disconnectedCallback
- ❌ Usar estilos en línea
- ❌ Crear componentes demasiado complejos
- ❌ Ignorar la accesibilidad
- ❌ Mezclar responsabilidades en un solo componente
- ❌ Escribir valores fijos, usar variables

### Prueba de Componentes

```javascript
// Ejemplo de enfoque de prueba
describe('ProfileCard', () => {
  let card;
  
  beforeEach(() => {
    card = document.createElement('x-profile-card');
    document.body.appendChild(card);
  });

  afterEach(() => {
    document.body.removeChild(card);
  });

  it('debería renderizar los datos del perfil', () => {
    card.data = {
      name: 'Usuario de Prueba',
      role: 'Desarrollador',
      stats: { str: '10', int: '15' }
    };
    
    expect(card.querySelector('.profile-name').textContent).toBe('Usuario de Prueba');
    expect(card.querySelector('.profile-role').textContent).toBe('Desarrollador');
  });
});
```

---

## 📁 Organización de Archivos

### Barriles de Exportación

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

### Patrones de Importación

```javascript
// Importaciones individuales
import { LanguageSwitcher } from '../ui/atoms/LanguageSwitcher.js';

// Importaciones de barril
import { LanguageSwitcher, Button, Input } from '../ui/atoms/index.js';

// Importación completa de UI
import { 
  LanguageSwitcher, 
  ProfileCard, 
  Terminal 
} from '../ui/index.js';
```

---

Esta arquitectura de componentes proporciona un enfoque escalable, mantenible y consistente para construir la interfaz del portafolio con temática cyberpunk, con una clara separación de responsabilidades y patrones reutilizables.
