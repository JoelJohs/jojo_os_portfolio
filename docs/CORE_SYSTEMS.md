# Guía de Sistemas Centrales

> **📚 Índice de Navegación** → [Arquitectura](./ARCHITECTURE.md) | [Componentes de UI](./UI_COMPONENTS.md) | [Estilos](./STYLING.md)

---

## 🎯 Acceso Rápido

| Sistema | Propósito | Enlaces Rápidos |
|--------|---------|-------------|
| **[Sistema de Terminal](#sistema-de-terminal)** | Interfaz CLI y procesamiento de comandos | [Comandos](#comandos-de-terminal) • [Layout](#layout-de-terminal) • [Integración](#integración-de-terminal) |
| **[Sistema de Eventos](#sistema-de-eventos)** | Patrón de comunicación pub/sub | [API](#api-de-eventos) • [Constantes](#constantes-de-eventos) • [Ejemplos](#ejemplos-de-eventos) |
| **[Sistema i18n](#sistema-i18n)** | Internacionalización y localización | [Traducción](#función-de-traducción) • [Gestión de Idiomas](#gestión-de-idiomas) • [Uso](#uso-de-i18n) |
| **[Sistema de Viewport](#sistema-de-viewport)** | Navegación de contenido dinámico | [Enrutamiento](#enrutamiento-de-viewport) • [Integración](#integración-de-viewport) • [Contenido](#contenido-de-viewport) |

---

## 🖥️ Sistema de Terminal

### Descripción General de la Arquitectura

El sistema de terminal implementa una **interfaz CLI con temática cyberpunk** que se integra con el viewport para la navegación de contenido dinámico. Combina Web Components con comunicación orientada a eventos.

### Estructura de Componentes

```
┌── Sistema de Terminal
├── Capa de UI
│   ├── x-terminal (Web Component)
│   └── CSS de Layout (viewport + dock)
├── Lógica Central
│   ├── shell.js (intérprete de comandos)
│   ├── commandParser.js (analizador de entrada)
│   └── REGISTRY (definiciones de comandos)
└── Comunicación
    ├── events/bus.js (sistema pub/sub)
    └── events/types.js (constantes de eventos)
```

### Estructura de Layout (División 75/25)

```
┌─────────────────────────────────┐
│        Viewport (75vh)         │ ← Contenido dinámico de la GUI
│   (home/about/projects/etc.)    │
├─────────────────────────────────┤
│     Muelle de la Terminal (25vh)       │ ← Interfaz CLI
│   ┌─────────────────────────┐   │
│   │ visitor@jojo-os:~$     │   │
│   │ _ entrada de comando      │   │
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Comandos de Terminal

#### Comandos de Navegación

```javascript
const NAVIGATION_COMMANDS = {
  home: () => {
    emit(EVENTS.NAV_NAVIGATE, "home");
    return "Saltando al sector: HOME";
  },
  about: () => {
    emit(EVENTS.NAV_NAVIGATE, "about");
    return "Recuperando archivo de personal...";
  },
  projects: () => {
    emit(EVENTS.NAV_NAVIGATE, "projects");
    return "Accediendo al repositorio de proyectos...";
  },
  contact: () => {
    emit(EVENTS.NAV_NAVIGATE, "contact");
    return "Abriendo canal seguro...";
  }
};
```

#### Comandos del Sistema

```javascript
const SYSTEM_COMMANDS = {
  clear: () => {
    emit(EVENTS.CLI_CLEAR);
    return null; // Sin salida, solo limpiar
  },
  echo: (args) => args.join(" "),
  help: () => "Sectores disponibles: home, about, projects, contact. Comandos del sistema: clear, echo."
};
```

### Flujo de Procesamiento de Comandos

1. **Entrada del Usuario** → La terminal captura el texto
2. **Análisis (Parse)** → `commandParser.js` estructura la entrada
3. **Validación** → El shell comprueba la existencia del comando
4. **Ejecución** → La función del comando se ejecuta con argumentos
5. **Respuesta** → El resultado se emite a la terminal

```javascript
// Ejemplo: "echo Hola Mundo"
Entrada → Análisis → {command: "echo", args: ["Hola", "Mundo"]} → Ejecución → "Hola Mundo"
```

### Implementación del Componente Terminal

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
          <span class="prompt">visitante@jojo-os:~$</span>
          <input type="text" class="cmd-input" placeholder="Escribe 'help' para ver todos los comandos" 
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
        this.printLine(`visitante@jojo-os:~$ ${command}`, "muted");
        emit(EVENTS.CLI_INPUT, command);
        input.value = "";
      }
    });

    // Gestión del auto-focus
    this.addEventListener("click", () => input.focus());
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
```

### Integración de Terminal

#### Eventos que EMITE
```javascript
emit(EVENTS.CLI_INPUT, command); // Entrada del usuario
```

#### Eventos que ESCUCHA
```javascript
on(EVENTS.CLI_OUTPUT, (text) => {
  this.printLine(text);
});

on(EVENTS.CLI_CLEAR, () => {
  this.querySelector("#output").innerHTML = "";
});
```

---

## 📡 Sistema de Eventos

### Descripción General de la Arquitectura

**Patrón Publicar/Suscribir (Publish/Subscribe)** para una **comunicación desacoplada** entre componentes. Los componentes no necesitan conocerse entre sí, solo emiten y escuchan eventos.

### Componentes Centrales

```
┌── Sistema de Eventos
├── types.js (Constantes de Eventos)
├── bus.js (Implementación)
└── Componentes (Productores/Consumidores)
```

### Constantes de Eventos (types.js)

```javascript
export const EVENTS = {
  // Eventos del Sistema
  SYS_BOOT: "sys:boot",
  SYS_SHUTDOWN: "sys:shutdown",

  // Eventos de UI
  UI_THEME_CHANGED: "ui:theme_changed",

  // Eventos de Navegación
  NAV_NAVIGATE: "nav:navigate",

  // Eventos de la Terminal (CLI)
  CLI_INPUT: "cli:input",    // El usuario presionó Enter
  CLI_OUTPUT: "cli:output",  // Respuesta del sistema
  CLI_CLEAR: "cli:clear",    // Limpiar la terminal

  // Eventos de Comandos
  CMD_NOT_FOUND: "cmd:not_found",
  CMD_EXEC: "cmd:exec",     // Se ejecutó un comando específico
};
```

#### Convención de Nombres

Formato: `CATEGORÍA:ACCIÓN`

- `sys` - Eventos a nivel de sistema
- `ui` - Eventos de la interfaz de usuario
- `nav` - Eventos de navegación
- `cli` - Eventos de la interfaz de la terminal
- `cmd` - Eventos específicos de comandos

### Implementación del Bus de Eventos (bus.js)

```javascript
const subscribers = {}; // {eventName: [callback1, callback2, ...]}

export function on(eventName, callback) {
  if (!subscribers[eventName]) {
    subscribers[eventName] = [];
  }
  subscribers[eventName].push(callback);
  
  // Devuelve una función de limpieza
  return () => off(eventName, callback);
}

export function emit(eventName, payload) {
  if (!subscribers[eventName]) return;
  
  subscribers[eventName].forEach((callback) => {
    try {
      callback(payload);
    } catch (error) {
      console.error(`[EventBus] Error en el listener para "${eventName}":`, error);
    }
  });
}

function off(eventName, callback) {
  if (!subscribers[eventName]) return;
  subscribers[eventName] = subscribers[eventName].filter(cb => cb !== callback);
}
```

### API de Eventos

#### Suscribirse a Eventos
```javascript
import { on, EVENTS } from '../core/events/bus.js';

const unsubscribe = on(EVENTS.CLI_OUTPUT, (text) => {
  console.log('Salida de la terminal:', text);
});

// Limpieza cuando sea necesario
unsubscribe();
```

#### Emitir Eventos
```javascript
import { emit, EVENTS } from '../core/events/bus.js';

emit(EVENTS.NAV_NAVIGATE, 'about');
emit(EVENTS.CLI_OUTPUT, 'Comando ejecutado con éxito');
```

### Ejemplos de Eventos

#### Flujo de Navegación de la Terminal
```javascript
// El usuario escribe "about" en la terminal
1. La terminal emite: EVENTS.CLI_INPUT con "about"
2. El shell escucha EVENTS.CLI_INPUT
3. El shell procesa el comando y emite: EVENTS.NAV_NAVIGATE con "about"
4. El viewport escucha EVENTS.NAV_NAVIGATE
5. El viewport actualiza el contenido para mostrar ProfileCard
6. El shell emite: EVENTS.CLI_OUTPUT con "Recuperando archivo de personal..."
7. La terminal escucha EVENTS.CLI_OUTPUT y muestra el mensaje
```

#### Flujo de Cambio de Idioma
```javascript
// El usuario cambia el idioma
1. LanguageSwitcher llama a: setLanguage('es')
2. El sistema i18n emite: EVENTS.UI_LANGUAGE_CHANGED con 'es'
3. Los componentes que escuchan actualizan su texto
4. Las utilidades del DOM actualizan todos los elementos [data-i18n]
```

---

## 🌍 Sistema i18n

### Descripción General de la Arquitectura

**Sistema de internacionalización personalizado** sin dependencias externas. Soporta múltiples idiomas con detección automática y almacenamiento persistente.

### Estructura de Archivos

```
src/core/i18n/
├── index.js        # Punto de entrada principal
└── i18n.js         # Lógica central de i18n

data/locales/
├── es.js          # Diccionario en español
└── en.js          # Diccionario en inglés
```

### Estructura del Diccionario

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

### API de i18n

#### Función de Traducción
```javascript
import { t } from '../core/i18n';

t('system.boot')        // "INICIANDO SISTEMA..."
t('ui.projects')        // "Proyectos"
t('nonexistent.key')    // "nonexistent.key" (fallback)
```

#### Gestión de Idiomas
```javascript
import { setLanguage, getCurrentLanguage, getAvailableLanguages } from '../core/i18n';

// Cambiar idioma
setLanguage('es');       // true si tiene éxito, false si no está disponible

// Obtener idioma actual
const current = getCurrentLanguage(); // 'es' o 'en'

// Obtener idiomas disponibles
const available = getAvailableLanguages(); // ['es', 'en']
```

### Detección de Idioma

Detección automática en este orden:

1. **localStorage** - Preferencia guardada previamente
2. **Idioma del navegador** - `navigator.language`
3. **Por defecto** - Fallback a inglés

```javascript
function detectLanguage() {
  // 1. Comprobar localStorage
  const stored = localStorage.getItem('jojo_os_language');
  if (stored && DICTIONARIES[stored]) return stored;
  
  // 2. Comprobar el idioma del navegador
  const browserLang = navigator.language.split('-')[0];
  if (DICTIONARIES[browserLang]) return browserLang;
  
  // 3. Usar el por defecto
  return 'en';
}
```

### Integración con el DOM

#### Traducción con Atributos de Datos
```html
<h1 data-i18n="system.boot">Loading...</h1>
<p data-i18n="ui.projects">Projects</p>
<button data-i18n="ui.about">About</button>
```

#### Integración con JavaScript
```javascript
import { updateLocalizedText } from '../core/utils/dom.js';

// Actualiza todos los elementos [data-i18n]
updateLocalizedText();

// Traducción manual para contenido dinámico
const element = document.createElement('div');
element.textContent = t('system.ready');
```

### Escuchas de Cambio de Idioma

```javascript
import { onLanguageChange } from '../core/i18n';

const unsubscribe = onLanguageChange((newLang) => {
  console.log(`Idioma cambiado a: ${newLang}`);
  // Volver a renderizar componentes, actualizar UI, etc.
});

// Limpieza cuando sea necesario
unsubscribe();
```

---

## 🖼️ Sistema de Viewport

### Descripción General de la Arquitectura

**Sistema de contenido dinámico** que responde a eventos de navegación. Renderiza diferentes secciones de contenido basadas en los comandos de la terminal.

### Estructura de Componentes

```
┌── Sistema de Viewport
├── Estructura HTML
│   ├── #viewport (contenedor)
│   └── #content-stage (área dinámica)
├── Controlador JavaScript
│   ├── viewport.js (lógica de navegación)
│   └── ROUTES (definiciones de contenido)
└── Integración de Eventos
    └── Escucha de EVENTS.NAV_NAVIGATE
```

### Layout HTML

```html
<main id="app">
  <section id="viewport">
    <div id="content-stage">
      <!-- Contenido dinámico inyectado aquí -->
    </div>
  </section>
  
  <section id="terminal-dock">
    <x-terminal></x-terminal>
  </section>
</main>
```

### Enrutamiento de Viewport

```javascript
const ROUTES = {
  home: "<h1>SERVIDOR SEGURO HOME</h1><p>Bienvenido de nuevo, Usuario.</p>",
  about: "<x-profile-card></x-profile-card>",
  projects: "<h1>REJILLA DE PROYECTOS</h1><p>Cargando módulos...</p>",
  contact: "<h1>CANAL ENCRIPTADO</h1><p>Enviar un mensaje...</p>"
};

export function initViewport() {
  const stage = document.getElementById("content-stage");
  if (!stage) return;

  // Establecer contenido inicial
  stage.innerHTML = ROUTES.home;

  // Escuchar eventos de navegación
  on(EVENTS.NAV_NAVIGATE, (route) => {
    const content = ROUTES[route] || "<h1>404 NO ENCONTRADO</h1><p>La ruta no existe.</p>";
    
    if (content) {
      stage.innerHTML = content;
      
      // Configurar componentes dinámicos
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

### Tipos de Contenido

#### Contenido HTML Estático
```javascript
const staticContent = "<h1>Título Estático</h1><p>Descripción estática</p>";
```

#### Contenido de Web Component
```javascript
const componentContent = "<x-profile-card></x-profile-card>";
```

#### Contenido Dinámico con Datos
```javascript
const dynamicContent = (data) => `
  <div class="user-profile">
    <h2>${data.name}</h2>
    <p>${data.role}</p>
  </div>
`;
```

### Flujo de Navegación

```
Comando del Usuario → Shell → Evento NAV_NAVIGATE → Viewport → Actualización de Contenido
     "about"         →       → emit("nav:navigate", "about") →      → ProfileCard
```

### Manejo de Errores

```javascript
const content = ROUTES[route] || `
  <div class="error-404">
    <h1>404 NO ENCONTRADO</h1>
    <p>La ruta "${route}" no existe.</p>
  </div>
`;
```

### Integración de Componentes

#### Configuración de ProfileCard
```javascript
if (route === "about") {
  const card = stage.querySelector("x-profile-card");
  if (card) {
    // Establece la propiedad data (desencadena el renderizado)
    card.data = {
      name: "Joel Johs",
      role: "SysAdmin",
      stats: { str: "MAX", int: "MAX" }
    };
  }
}
```

#### Integración Futura de Componentes
```javascript
// Futuro: Rejilla de Proyectos
if (route === "projects") {
  const grid = stage.querySelector("projects-grid");
  if (grid) {
    grid.projects = await fetchProjects();
  }
}
```

---

## 🔄 Integración del Sistema

### Ejemplo Completo de Flujo de Navegación

```
1. El usuario escribe "about" en la terminal
   ↓
2. La terminal captura la entrada y emite el evento CLI_INPUT
   ↓
3. El shell escucha CLI_INPUT, procesa el comando
   ↓
4. El shell emite el evento NAV_NAVIGATE con "about"
   ↓
5. El viewport escucha NAV_NAVIGATE, actualiza el contenido
   ↓
6. El componente ProfileCard se renderiza con datos
   ↓
7. El shell emite CLI_OUTPUT con un mensaje de confirmación
   ↓
8. La terminal muestra la confirmación al usuario
```

### Mapa de Comunicación de Eventos

```
┌─────────────────┐    emit()    ┌─────────────┐    on()    ┌─────────────────┐
│   Terminal     │ ──────────────→ │ Bus de Eventos │ ───────────→ │     Shell      │
│ (Entrada CLI)  │               │ (Pub/Sub)   │             │ (Procesamiento)   │
└─────────────────┘               └─────────────┘             └─────────────────┘
                                                                 │
                                                                 emit()
                                                                 │
                                                                 ↓
┌─────────────────┐    on()     ┌─────────────┐    emit()    ┌─────────────────┐
│   Viewport     │ ←───────────── │ Bus de Eventos │ ←──────────── │     Shell      │
│ (Contenido)    │               │ (Pub/Sub)   │             │ (Navegación)   │
└─────────────────┘               └─────────────┘             └─────────────────┘
```

### Consideraciones de Rendimiento

1. **Escuchas de Eventos**: Siempre devolver funciones de limpieza
2. **Actualizaciones del DOM**: Mínimas y solo en áreas específicas
3. **Ciclo de Vida del Componente**: Limpieza adecuada en disconnectedCallback
4. **Gestión de Memoria**: Eliminar escuchas de eventos no utilizadas

### Patrones de Manejo de Errores

```javascript
try {
  const result = action(args);
  if (result) {
    emit(EVENTS.CLI_OUTPUT, result);
  }
} catch (error) {
  if (error.name === "SyntaxError") {
    emit(EVENTS.CLI_OUTPUT, `[ERROR] Sintaxis inválida: ${error.message}`);
  } else {
    emit(EVENTS.CLI_OUTPUT, `[ERROR] Fallo del sistema: ${error.message}`);
  }
  console.error(`[Shell] Falló el comando:`, error);
}
```

---

## 🔧 Directrices de Desarrollo

### Añadir Nuevos Comandos

```javascript
const REGISTRY = {
  // Comandos existentes...
  
  newCommand: (args) => {
    // Procesar argumentos
    return "Comando ejecutado con éxito";
  }
};
```

### Añadir Nuevos Tipos de Eventos

```javascript
// 1. Añadir a types.js
export const EVENTS = {
  // Eventos existentes...
  NEW_FEATURE: "new:feature"
};

// 2. Emitir desde el productor
emit(EVENTS.NEW_FEATURE, data);

// 3. Escuchar en el consumidor
on(EVENTS.NEW_FEATURE, (data) => {
  // Manejar el evento
});
```

### Añadir Nuevos Idiomas

```javascript
// 1. Crear data/locales/fr.js
export default {
  system: {
    boot: "DÉMARRAGE DU SYSTÈME...",
    ready: "SYSTÈME PRÊT"
  },
  // ... otras traducciones
};

// 2. Añadir a DICTIONARIES en i18n.js
import fr from '../../data/locales/fr.js';
const DICTIONARIES = { es, en, fr };
```

Esta arquitectura de sistemas centrales proporciona una base sólida para el portafolio con temática cyberpunk con una clara separación de responsabilidades, comunicación orientada a eventos y extensibilidad modular.
