# Guía de Arquitectura

> **📚 Índice de Navegación** → [Sistemas Centrales](./CORE_SYSTEMS.md) | [Componentes de UI](./UI_COMPONENTS.md) | [Estilos](./STYLING.md)

---

## 🏗️ Arquitectura del Sistema

### Descripción General

Portfolio Vanilla implementa un **portafolio con temática cyberpunk** utilizando **tecnologías web vanilla** con una **arquitectura basada en componentes**. El sistema sigue patrones de desarrollo web modernos manteniendo cero dependencias de frameworks externos.

### Principios Fundamentales de la Arquitectura

| Principio | Implementación | Beneficios |
|-----------|----------------|-----------|
| **Componentes Primero** | Atomic Design (Átomos-Moléculas-Organismos) | UI reutilizable y mantenible |
| **Orientado a Eventos** | Patrón de comunicación Pub/Sub | Lógica desacoplada y comprobable |
| **Modular** | Clara separación de responsabilidades | Código base escalable y organizado |
| **Vanilla Primero** | Sin frameworks, estándares web puros | Rápido, ligero y seguro |
| **Impulsado por el Tema** | Sistema de estética Cyberpunk/neón | Identidad visual consistente |

---

## 📁 Estructura del Proyecto

```
portfolio_vanilla/
├── 📚 docs/                     # Documentación
│   ├── README.md                 # Índice principal
│   ├── ARCHITECTURE.md           # Esta guía
│   ├── CORE_SYSTEMS.md           # Terminal, eventos, i18n, viewport
│   ├── UI_COMPONENTS.md          # Arquitectura de componentes
│   └── STYLING.md               # Arquitectura CSS
├── 💻 src/                      # Código fuente
│   ├── core/                    # Lógica de negocio y sistemas
│   │   ├── i18n/               # Internacionalización
│   │   ├── events/             # Sistema de eventos
│   │   ├── system/             # Terminal y viewport
│   │   └── utils/              # Utilidades del DOM
│   ├── ui/                      # Componentes de la interfaz de usuario
│   │   ├── atoms/              # Componentes básicos
│   │   ├── molecules/          # Combinaciones de componentes
│   │   └── organisms/          # Secciones complejas
│   ├── styles/                  # CSS y estilos
│   │   ├── vars.css            # Variables del sistema de diseño
│   │   ├── reset.css           # Estilos de reseteo base
│   │   ├── base.css            # Componentes globales
│   │   ├── layout.css          # Estructura del layout
│   │   └── components/         # Estilos específicos de componentes
│   └── main.js                  # Punto de entrada de la aplicación
├── data/                        # Datos y configuración
│   ├── locales/                 # Archivos de traducción
│   └── db.js                   # Datos estáticos
├── 🌐 index.html                # Entrada principal HTML
├── 📦 package.json              # Dependencias y scripts
└── 🔒 .gitignore               # Reglas de ignorar de Git
```

---

## 🎯 Conceptos Centrales

### 1. Arquitectura de Componentes (Atomic Design)

```
Átomos (Básicos) → Moléculas (Combinaciones) → Organismos (Secciones Complejas)
      ↓                  ↓                           ↓
LanguageSwitcher → ProfileCard → Sistema de Terminal
Botón            → SearchField → Navegación del Header
Input            → LoginForm   → Layout del Viewport
```

### 2. Comunicación Orientada a Eventos

```
Acción del Usuario → Emisor de Eventos → Bus de Eventos → Escucha de Eventos → Respuesta del Sistema
```

### 3. Sistema de Layout (División 75/25)

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

---

## 🧩 Organización de Componentes

### Implementación de Atomic Design

| Nivel | Propósito | Ejemplos | Ubicación del Archivo |
|-------|-----------|----------|---------------|
| **🧱 Átomos** | Elementos de UI indivisibles | LanguageSwitcher, Botón, Input | `src/ui/atoms/` |
| **🔬 Moléculas** | Combinaciones simples | ProfileCard, SearchField | `src/ui/molecules/` |
| **🧬 Organismos** | Secciones complejas | Terminal, Header, Viewport | `src/ui/organisms/` |

### Ciclo de Vida del Componente

1. **Definición** - Definición de la clase del Web Component
2. **Registro** - `customElements.define()`
3. **Conexión** - `connectedCallback()` cuando se añade al DOM
4. **Renderizado** - Creación de la estructura HTML interna
5. **Configuración de Eventos** - Escuchas de eventos e integración con el sistema
6. **Desconexión** - Limpieza cuando se elimina del DOM

---

## 🔄 Arquitectura de Flujo de Datos

### Patrón de Comunicación de Eventos

```
┌─────────────────┐    emit()    ┌─────────────┐    on()    ┌─────────────────┐
│   Componente A  │ ──────────────→ │ Bus de Eventos │ ───────────→ │   Componente B  │
│ (Emisor de Eventos) │               │   (Pub/Sub)  │             │ (Escucha de Eventos)│
└─────────────────┘               └─────────────┘             └─────────────────┘
```

### Ejemplo de Flujo: Navegación por la Terminal

```
Usuario: "about" → Terminal → Evento CLI_INPUT → Shell → Evento NAV_NAVIGATE → Viewport → ProfileCard
```

---

## 🎨 Arquitectura del Sistema de Diseño

### Organización de CSS (Metodología ITCSS)

```
1. reset.css      - Reseteo y estilos base del navegador
2. vars.css       - Variables del sistema de diseño
3. base.css       - Componentes y efectos globales
4. layout.css     - Estructura del layout y rejillas
5. components/    - Estilos específicos de componentes
```

### Estructura de Tokens de Diseño

```css
:root {
  /* Colores (La "Apariencia") */
  --bg-deep-space: #02020a;
  --primary-neon: #bc13fe;
  
  /* Tipografía (La "Voz") */
  --font-mono: 'Fira Code', monospace;
  
  /* Efectos (El "Jugo") */
  --glow-text: 0 0 5px rgba(188, 19, 254, 0.7);
  
  /* Espaciado (El "Ritmo") */
  --spacing-sm: 0.5rem;
}
```

---

## 🔧 Pila Tecnológica

### Tecnologías Principales

| Tecnología | Propósito | Por Qué se Eligió |
|------------|-----------|------------|
| **HTML5** | Estructura y semántica | Estándar web nativo |
| **CSS3** | Estilos y animaciones | Potente, sin dependencias |
| **JavaScript ES6+** | Lógica e interactividad | Características modernas, vanilla |
| **Web Components** | Arquitectura de componentes | Nativo, sin frameworks |
| **CSS Grid/Flexbox** | Sistema de layout | Moderno, responsivo |

### Herramientas de Desarrollo

| Herramienta | Propósito | Configuración |
|------|-----------|---------------|
| **pnpm** | Gestión de paquetes | Rápido, eficiente |
| **live-server** | Servidor de desarrollo | Recarga automática |
| **Git** | Control de versiones | Flujo de trabajo distribuido |

---

## 📐 Arquitectura del Layout

### Estructura Principal del Layout

```html
<body>
  <div class="scanlines"></div>          <!-- Capa de Efecto CRT -->
  
  <main id="app">
    <section id="viewport">              <!-- 75vh - Contenido Dinámico -->
      <div id="content-stage">
        <!-- Contenido inyectado por el sistema del viewport -->
      </div>
    </section>
    
    <section id="terminal-dock">         <!-- 25vh - Interfaz CLI -->
      <x-terminal></x-terminal>         <!-- Web Component -->
    </section>
  </main>
</body>
```

### Principios de Diseño Responsivo

- **Layouts Fluidos**: `vh`, `%`, y unidades flexibles
- **Mobile-First**: Mejora progresiva
- **Rendimiento**: Mínimos reflows y repaints
- **Accesibilidad**: HTML semántico y navegación por teclado

---

## 🚀 Arquitectura de Rendimiento

### Estrategias de Optimización

1. **Dependencias Mínimas** - Cero sobrecarga de frameworks
2. **DOM Eficiente** - Actualizaciones estratégicas de componentes
3. **Rendimiento de CSS** - Animaciones aceleradas por hardware
4. **Tamaño del Paquete** - Solo se carga el código necesario
5. **Carga Diferida (Lazy Loading)** - Componentes cargados bajo demanda

### Métricas de Rendimiento

| Métrica | Objetivo | Implementación |
|---------|--------|----------------|
| **Tamaño del Paquete** | <100KB | Vanilla JS, CSS mínimo |
| **First Contentful Paint** | <1s | Carga de activos optimizada |
| **Time to Interactive** | <2s | Mejora progresiva |
| **Puntuación de Lighthouse** | 95+ | Mejores prácticas de rendimiento |

---

## 🛡️ Arquitectura de Seguridad

### Principios de Seguridad

1. **No eval()** - Ejecución de código segura
2. **textContent** - Prevención de XSS
3. **Cabeceras CSP** - Política de Seguridad de Contenido
4. **Sin Dependencias Externas** - Superficie de ataque reducida
5. **Sanitización de Entradas** - Manejo seguro de datos

### Manejo Seguro de Datos

```javascript
// ✅ Seguro: textContent previene XSS
element.textContent = userInput;

// ❌ Peligroso: innerHTML permite inyección
element.innerHTML = userInput; // NUNCA hagas esto
```

---

## 🔄 Flujo de Trabajo de Desarrollo

### Flujo de Trabajo de Git

```
main (producción)
├── feature/terminal-system
├── feature/i18n-implementation
└── feature/component-architecture
```

### Proceso de Desarrollo

1. **Rama de Característica (Feature Branch)** - Crear para nueva funcionalidad
2. **Desarrollo** - Implementar con documentación
3. **Pruebas** - Verificaciones manuales y automatizadas
4. **Documentación** - Actualizar guías relevantes
5. **Pull Request** - Revisión de código y fusión
6. **Despliegue** - Despliegue en GitHub Pages

---

## 📏 Estándares de Calidad del Código

### Estándares de JavaScript

- **Características de ES6+** - Sintaxis y patrones modernos
- **Patrón de Componentes** - Web Components basados en clases
- **Orientado a Eventos** - Comunicación Pub/Sub
- **Manejo de Errores** - try/catch exhaustivo
- **Documentación** - Comentarios JSDoc

### Estándares de CSS

- **ITCSS** - Metodología del Triángulo Invertido
- **Nomenclatura BEM** - Block__Element--Modifier
- **Variables CSS** - Sistema de tokens de diseño
- **Mobile-First** - Mejora progresiva
- **Rendimiento** - Selectores y animaciones optimizadas

---

## 🎯 Consideraciones Futuras de la Arquitectura

### Planes de Escalabilidad

| Área | Actual | Mejora Futura |
|-------|---------|-------------------|
| **Componentes** | Diseño atómico básico | Biblioteca de componentes avanzada |
| **Gestión de Estado** | Basado en eventos | Almacén de estado centralizado |
| **Enrutamiento** | Sistema de viewport simple | Enrutamiento avanzado con historial |
| **Datos** | Archivos estáticos | Integración con CMS |
| **Rendimiento** | Optimizado | Capacidades de PWA |

### Puntos de Extensibilidad

1. **Nuevos Componentes** - Añadir a átomos/moléculas/organismos
2. **Nuevos Comandos** - Extender el registro de la terminal
3. **Nuevos Idiomas** - Añadir a locales/
4. **Nuevos Temas** - Modificar las variables CSS
5. **Nuevas Características** - Seguir los patrones establecidos

---

## 🔍 Arquitectura de Depuración

### Herramientas de Depuración

1. **Registro en Consola (Console Logging)** - Sistema de registro estructurado
2. **Monitorización de Eventos** - Depuración del bus de eventos
3. **Inspección de Componentes** - Herramientas de desarrollo de Web Components
4. **Perfilado de Rendimiento** - Herramientas de desarrollo del navegador
5. **Seguimiento de Errores** - Manejo de errores exhaustivo

### Patrones Comunes de Depuración

```javascript
// Depuración de eventos
console.log(`[Evento] ${EVENTS.CLI_INPUT} emitido:`, data);

// Depuración de componentes
console.log(`[Componente] ${this.constructor.name} conectado`);

// Depuración del sistema
console.log(`[Sistema] Shell inicializado con ${Object.keys(REGISTRY).length} comandos`);
```

---

Esta arquitectura proporciona una base sólida para un portafolio con temática cyberpunk moderno, de alto rendimiento y mantenible, utilizando tecnologías web vanilla. El diseño basado en componentes, la comunicación orientada a eventos y la estructura modular aseguran que el sistema pueda crecer y evolucionar manteniendo la calidad del código y el rendimiento.
