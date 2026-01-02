# Documentación de Nuevas Características

> **📚 Índice de Navegación** → [Arquitectura](./ARCHITECTURE.md) | [Sistemas Centrales](./CORE_SYSTEMS.md) | [Componentes de UI](./UI_COMPONENTS.md) | [Estilos](./STYLING.md)

---

## 🎯 Acceso Rápido

| Característica | Estado | Ubicación | Enlaces Rápidos |
|---------|--------|----------|-------------|
| **[CLI de Terminal](#mejoras-del-sistema-de-terminal)** | ✅ Completo | `src/core/system/` + `src/ui/organisms/` | [Comandos](#registro-de-comandos) • [Procesamiento](#procesamiento-de-comandos) |
| **[Sistema i18n](#sistema-de-internacionalización)** | ✅ Completo | `src/core/i18n/` + `src/ui/atoms/` | [Detección de Idioma](#detección-de-idioma) • [Integración con el DOM](#integración-con-el-dom) |
| **[Gestión de Proyectos](#sistema-de-gestión-de-proyectos)** | ✅ Completo | `src/core/repositories/` + `src/ui/molecules/` | [Capa de Datos](#repositorio-de-proyectos) • [Componente de Rejilla](#componente-de-rejilla-de-proyectos) |
| **[Sistema de Contacto](#sistema-de-formulario-de-contacto)** | ✅ Completo | `src/ui/molecules/` | [Integración con Formspree](#integración-con-formspree) • [Feedback en la Terminal](#feedback-en-la-terminal) |
| **[Sistema de Eventos](#mejoras-del-sistema-de-eventos)** | ✅ Completo | `src/core/events/` | [Nuevos Eventos](#tipos-de-eventos-mejorados) • [Patrones de Comunicación](#patrones-de-comunicación) |

---

## 🖥️ Mejoras del Sistema de Terminal

### Expansión del Registro de Comandos

El sistema de terminal ahora incluye un registro de comandos completo con capacidades de procesamiento asíncrono:

```javascript
// src/core/system/shell.js - Registro de Comandos
const REGISTRY = {
  // Comandos de Navegación
  home: async () => {
    emit(EVENTS.NAV_NAVIGATE, "home");
    return "Saltando al sector: HOME";
  },
  about: async () => {
    emit(EVENTS.NAV_NAVIGATE, "about");
    return "Recuperando archivo de personal...";
  },
  projects: async () => {
    emit(EVENTS.NAV_NAVIGATE, "projects");
    return "Accediendo al repositorio de proyectos...";
  },
  contact: async () => {
    emit(EVENTS.NAV_NAVIGATE, "contact");
    return "Abriendo canal seguro...";
  },
  
  // Comandos del Sistema
  clear: async () => {
    emit(EVENTS.CLI_CLEAR);
    return null;
  },
  echo: async (args) => args.join(" "),
  help: async () => "Sectores disponibles: home, about, projects, contact. Comandos del sistema: clear, echo."
};
```

### Pipeline de Procesamiento de Comandos

Procesamiento de comandos mejorado con manejo de errores adecuado y soporte asíncrono:

```javascript
// src/core/system/shell.js - Lógica de Procesamiento
export async function executeCommand(input) {
  try {
    const { command, args } = parseCommand(input);
    
    if (!REGISTRY[command]) {
      emit(EVENTS.CMD_NOT_FOUND, command);
      return `Comando no encontrado: ${command}. Escribe 'help' para ver los comandos disponibles.`;
    }
    
    emit(EVENTS.CMD_EXEC, { command, args });
    const result = await REGISTRY[command](args);
    
    if (result) {
      emit(EVENTS.CLI_OUTPUT, result);
    }
    
    return result;
  } catch (error) {
    emit(EVENTS.SYS_ERROR, error);
    return `[ERROR] Fallo del sistema: ${error.message}`;
  }
}
```

### Características del Componente de Terminal

El componente de terminal (`src/ui/organisms/terminal.js`) ahora incluye:

- **Efectos CRT**: Scanlines y viñetas superpuestas
- **Historial de Comandos**: Mantiene el historial de entradas
- **Gestión de Auto-focus**: Comportamiento de clic para enfocar
- **Diseño Responsivo**: Muelle de terminal optimizado para móviles

---

## 🌍 Sistema de Internacionalización

### Algoritmo de Detección de Idioma

Detección automática de idioma con jerarquía de fallback:

```javascript
// src/core/i18n/i18n.js - Lógica de Detección
function detectLanguage() {
  // 1. Comprobar preferencia en localStorage
  const stored = localStorage.getItem('jojo_os_language');
  if (stored && DICTIONARIES[stored]) return stored;
  
  // 2. Comprobar idioma del navegador
  const browserLang = navigator.language.split('-')[0];
  if (DICTIONARIES[browserLang]) return browserLang;
  
  // 3. Usar fallback por defecto
  return 'en';
}
```

### Arquitectura del Sistema de Traducción

Sistema de traducción completo con actualizaciones reactivas:

```javascript
// src/core/i18n/i18n.js - Traducción Central
export function t(key, fallback = key) {
  const currentLang = getCurrentLanguage();
  const dictionary = DICTIONARIES[currentLang];
  
  return getNestedValue(dictionary, key) || fallback;
}

// Cambio de idioma reactivo
export function setLanguage(lang) {
  if (!DICTIONARIES[lang]) return false;
  
  CURRENT_LANGUAGE = lang;
  localStorage.setItem('jojo_os_language', lang);
  emit(EVENTS.UI_LANGUAGE_CHANGED, lang);
  
  return true;
}
```

### Integración con el DOM

Actualizaciones automáticas del DOM para contenido localizado:

```javascript
// src/core/utils/dom.js - Integración con el DOM
export function updateLocalizedText() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);
    
    if (element.tagName === 'INPUT' && element.type === 'placeholder') {
      element.placeholder = translation;
    } else {
      element.textContent = translation;
    }
  });
}
```

### Componente de Cambio de Idioma

Componente a nivel de átomo para cambiar de idioma:

```javascript
// src/ui/atoms/LanguageSwitcher.js - Lógica del Componente
export class LanguageSwitcher extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
    this._unsubscribe = onLanguageChange(() => this.render());
  }
  
  handleClick() {
    const current = getLanguage();
    const next = current === "es" ? "en" : "es";
    setLanguage(next);
  }
}
```

---

## 🎴 Sistema de Gestión de Proyectos

### Patrón de Repositorio de Proyectos

Capa de datos con patrón de repositorio y simulación asíncrona:

```javascript
// src/core/repositories/projectRepository.js - Implementación del Repositorio
export class ProjectRepository {
  async getAll() {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 500));
    return PROJECTS_DB;
  }
  
  async getById(id) {
    const projects = await this.getAll();
    return projects.find(project => project.id === id);
  }
  
  async filter(criteria) {
    const projects = await this.getAll();
    return projects.filter(project => 
      Object.entries(criteria).every(([key, value]) => 
        project[key] === value
      )
    );
  }
}
```

### Estructura de Datos de Proyectos

Esquema de proyecto completo con metadatos enriquecidos:

```javascript
// data/db.js - Esquema de la Base de Datos de Proyectos
const PROJECT_SCHEMA = {
  id: "id-unico-del-proyecto",
  title: "Título del Proyecto",
  description: "Breve descripción del proyecto",
  thumbnail: "/ruta/a/la/imagen.jpg",
  status: "activo|archivado|en-desarrollo",
  technologies: ["React", "Node.js", "MongoDB"],
  repositories: {
    main: { url: "url-github", type: "frontend|backend" },
    secondary: { url: "url-github", type: "frontend|backend" }
  },
  links: { demo: "url-demo", docs: "url-docs" }
};
```

### Componente de Rejilla de Proyectos

Contenedor a nivel de organismo para tarjetas de proyectos:

```javascript
// src/ui/organisms/ProjectGrid.js - Implementación de la Rejilla
export class ProjectGrid extends HTMLElement {
  constructor() {
    super();
    this._projects = [];
    this._repository = new ProjectRepository();
  }
  
  async connectedCallback() {
    await this.loadProjects();
  }
  
  async loadProjects() {
    try {
      this._projects = await this._repository.getAll();
      this.render();
    } catch (error) {
      this.renderErrorState();
    }
  }
}
```

### Componente de Tarjeta de Proyecto

Visualización de proyecto a nivel de molécula con características enriquecidas:

```javascript
// src/ui/molecules/ProjectCard.js - Implementación de la Tarjeta
export class ProjectCard extends HTMLElement {
  set data(project) {
    this._project = project;
    this.render();
  }
  
  render() {
    const { title, description, thumbnail, status, technologies, repositories } = this._project;
    
    this.innerHTML = `
      <article class="project-card project-card--${status}">
        <div class="project-thumbnail">
          <img src="${thumbnail}" alt="${title}" loading="lazy">
        </div>
        <div class="project-content">
          <h3 class="project-title">${title}</h3>
          <p class="project-description">${description}</p>
          <div class="project-tech">
            ${technologies.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
          </div>
          <div class="project-repos">
            ${Object.entries(repositories).map(([key, repo]) => 
              `<a href="${repo.url}" class="repo-link repo-link--${repo.type}">${key}</a>`
            ).join('')}
          </div>
        </div>
      </article>
    `;
  }
}
```

---

## 📧 Sistema de Formulario de Contacto

### Integración con Formspree

Envío seguro de formularios sin backend:

```javascript
// src/ui/molecules/contactForm.js - Envío de Formulario
async function submitForm(formData) {
  try {
    emit(EVENTS.FORM_SUBMIT_START);
    
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) throw new Error('El envío del formulario falló');
    
    emit(EVENTS.FORM_SUBMIT_SUCCESS);
    return await response.json();
  } catch (error) {
    emit(EVENTS.FORM_SUBMIT_ERROR, error);
    throw error;
  }
}
```

### Feedback en la Terminal

Comunicación del estado del formulario a través de la terminal:

```javascript
// src/ui/molecules/contactForm.js - Integración con la Terminal
function handleFormResponse(success, error = null) {
  if (success) {
    emit(EVENTS.CLI_OUTPUT, "✓ Mensaje transmitido con éxito");
    emit(EVENTS.CLI_OUTPUT, "Canal seguro cerrado");
  } else {
    emit(EVENTS.CLI_OUTPUT, `✗ Fallo en la transmisión: ${error.message}`);
    emit(EVENTS.CLI_OUTPUT, "Reintentando en 3 segundos...");
  }
}
```

### Implementación de Seguridad

Prevención de XSS y validación de entradas:

```javascript
// src/ui/molecules/contactForm.js - Medidas de Seguridad
function validateInput(input, type) {
  const validators = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: /^.{1,500}$/s
  };
  
  return validators[type]?.test(input) || false;
}

function safeDOMUpdate(element, content) {
  element.textContent = content; // Protección XSS
}
```

---

## 📡 Mejoras del Sistema de Eventos

### Tipos de Eventos Mejorados

Sistema de eventos expandido para nuevas características:

```javascript
// src/core/events/types.js - Nuevas Constantes de Eventos
export const EVENTS = {
  // Eventos existentes...
  
  // Eventos de Formulario
  FORM_SUBMIT_START: "form:submit_start",
  FORM_SUBMIT_SUCCESS: "form:submit_success",
  FORM_SUBMIT_ERROR: "form:submit_error",
  
  // Eventos de Idioma
  UI_LANGUAGE_CHANGED: "ui:language_changed",
  
  // Eventos de Proyectos
  PROJECTS_LOADED: "projects:loaded",
  PROJECTS_FILTERED: "projects:filtered",
  
  // Eventos de Terminal Mejorados
  CLI_COMMAND_EXEC: "cli:command_exec",
  CMD_NOT_FOUND: "cmd:not_found",
  CMD_EXEC: "cmd:exec"
};
```

### Patrones de Comunicación

Comunicación de componentes orientada a eventos:

```javascript
// Patrón de Cambio de Idioma
setLanguage('es') 
  → emit(EVENTS.UI_LANGUAGE_CHANGED, 'es')
  → LanguageSwitcher.render()
  → updateLocalizedText()
  → Todos los elementos [data-i18n] actualizados

// Patrón de Envío de Formulario
form.submit()
  → emit(EVENTS.FORM_SUBMIT_START)
  → Llamada a la API de Formspree
  → emit(EVENTS.FORM_SUBMIT_SUCCESS/ERROR)
  → Visualización de feedback en la terminal

// Patrón de Navegación
comando de terminal
  → emit(EVENTS.CLI_INPUT, comando)
  → shell.executeCommand()
  → emit(EVENTS.NAV_NAVIGATE, ruta)
  → viewport.updateContent()
```

---

## 🎨 Mejoras de Estilos

### Efectos de Terminal CRT

Efectos visuales avanzados para el componente de terminal:

```css
/* src/styles/components/terminal.css - Efectos CRT */
x-terminal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, 
    transparent 1px, transparent 2px
  );
  pointer-events: none;
  z-index: 2;
}

x-terminal::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%
  );
  pointer-events: none;
  z-index: 3;
}
```

### Estilos de Tarjeta de Proyecto

Tarjetas de proyecto con temática cyberpunk e indicadores de estado:

```css
/* src/styles/components/projects.css - Tarjetas de Proyecto */
.project-card {
  background: linear-gradient(135deg, rgba(26, 26, 62, 0.9), rgba(10, 10, 34, 0.9));
  border: 1px solid rgba(188, 19, 254, 0.3);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card:hover {
  border-color: var(--primary-neon);
  box-shadow: var(--shadow-neon);
  transform: translateY(-2px);
}

.project-card--active {
  border-color: var(--success);
}

.project-card--archived {
  opacity: 0.7;
  border-color: var(--text-muted);
}

.tech-pill {
  background: rgba(188, 19, 254, 0.1);
  border: 1px solid rgba(188, 19, 254, 0.3);
  color: var(--accent-cyan);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-family: var(--font-mono);
}
```

### Estilos de Formulario de Contacto

Elementos de formulario con temática cyberpunk:

```css
/* src/styles/components/contact.css - Estilos de Formulario */
.contact-form input,
.contact-form textarea {
  background: rgba(2, 2, 10, 0.8);
  border: 1px solid rgba(188, 19, 254, 0.3);
  color: var(--text-main);
  font-family: var(--font-mono);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--primary-neon);
  box-shadow: var(--shadow-inset);
  outline: none;
}

.contact-form button {
  background: rgba(188, 19, 254, 0.1);
  border: 1px solid var(--primary-neon);
  color: var(--primary-neon);
  font-family: var(--font-mono);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-form button:hover {
  background: rgba(188, 19, 254, 0.2);
  box-shadow: var(--glow-text);
}
```

---

## 📱 Mejoras de Diseño Responsivo

### Optimización de Terminal Móvil

```css
/* Adaptaciones de terminal móvil */
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
```

### Layout Móvil de Rejilla de Proyectos

```css
/* Rejilla de proyectos móvil */
@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
  
  .project-card {
    padding: var(--spacing-md);
  }
}
```

---

## 🔧 Optimizaciones de Rendimiento

### Implementación de Carga Diferida (Lazy Loading)

```javascript
// Carga diferida de datos de proyectos
async function loadProjects() {
  emit(EVENTS.UI_LOADING_START);
  
  try {
    const projects = await projectRepository.getAll();
    emit(EVENTS.PROJECTS_LOADED, projects);
    return projects;
  } catch (error) {
    emit(EVENTS.SYS_ERROR, error);
    throw error;
  } finally {
    emit(EVENTS.UI_LOADING_END);
  }
}
```

### Optimización del DOM

```javascript
// Actualizaciones eficientes del DOM con fragmento
const updateProjectsGrid = (projects) => {
  const fragment = document.createDocumentFragment();
  
  projects.forEach(project => {
    const card = createProjectCard(project);
    fragment.appendChild(card);
  });
  
  const container = document.getElementById('projects-grid');
  container.innerHTML = '';
  container.appendChild(fragment);
};
```

---

## 🛡️ Mejoras de Seguridad

### Prevención de XSS

```javascript
// Manipulación segura del DOM
const safeUpdate = (element, content) => {
  element.textContent = content; // Previene XSS
};

// Sanitización de entradas
const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};
```

### Seguridad de Formularios

```javascript
// Validación de formularios con comprobaciones de seguridad
const validateForm = (formData) => {
  const validations = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: /^.{1,500}$/s
  };
  
  return Object.entries(validations).every(([field, pattern]) => 
    pattern.test(formData.get(field))
  );
};
```

---

Esta documentación sigue la estructura del proyecto y mantiene el estilo personal y técnico de la documentación existente, al tiempo que cubre de manera exhaustiva todas las nuevas implementaciones y su integración en el sistema.
