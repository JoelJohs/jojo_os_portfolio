# Sistema de Terminal

## Arquitectura General

El sistema de terminal implementa una interfaz de línea de comandos (CLI) completamente funcional dentro de un layout de sistema operativo cyberpunk. Se divide en dos áreas principales: viewport para contenido GUI y terminal dock para la interfaz CLI.

---

## Estructura de Componentes

```
┌── Terminal System
    ├── UI Layer
    │   ├── x-terminal (Web Component)
    │   └── Layout CSS (viewport + dock)
    ├── Core Logic
    │   ├── shell.js (intérprete de comandos)
    │   ├── commandParser.js (parser de input)
    │   └── REGISTRY (definición de comandos)
    └── Communication
        ├── events/bus.js (pub/sub system)
        └── events/types.js (event constants)
```

---

## Layout del Sistema

### Proporciones de Pantalla
- **Viewport:** 75vh (3/4 del alto) - Contenido GUI
- **Terminal Dock:** 25vh (1/4 del alto) - Interfaz CLI

### Estructura HTML
```html
<body>
    <div class="scanlines"></div>
    
    <main id="app">
      <section id="viewport">
        <!-- Contenido principal -->
      </section>
      
      <section id="terminal-dock">
        <x-terminal></x-terminal>
      </section>
    </main>
</body>
```

---

## Componente Terminal (x-terminal)

### Web Component Architecture

```javascript
export class Terminal extends HTMLElement {
  constructor() {
    super();
    this.history = [];
  }
}
```

### Ciclo de Vida

1. **Registration:** `customElements.define("x-terminal", Terminal)`
2. **Connection:** `connectedCallback()` ejecuta al agregar al DOM
3. **Render:** Construye estructura HTML interna
4. **Setup:** Configura event listeners y system listeners

### Estructura DOM Interna

```html
<x-terminal>
  <div class="terminal-content">
    <div class="terminal-output" id="output">
      <!-- Líneas de salida del sistema -->
    </div>
    <div class="command-line">
      <span class="prompt">visitor@jojo-os:~$</span>
      <input 
        type="text" 
        class="cmd-input" 
        placeholder="Type 'help' to see all commands"
        autocomplete="off" 
        spellcheck="false" 
        autofocus>
    </div>
  </div>
</x-terminal>
```

---

## Sistema de Eventos

### Comunicación Desacoplada

El terminal utiliza un sistema publish/subscribe para comunicación:

#### Eventos que EMITE
```javascript
// Input del usuario al sistema
emit(EVENTS.CLI_INPUT, command);
```

#### Eventos que ESCUCHA
```javascript
// Respuesta del sistema
on(EVENTS.CLI_OUTPUT, (text) => {
  this.printLine(text);
});

// Orden de limpieza
on(EVENTS.CLI_CLEAR, () => {
  this.querySelector("#output").innerHTML = "";
});
```

### Flujo de Comunicación

```
Usuario → Input → CLI_INPUT → Shell → CLI_OUTPUT → Terminal → Usuario
```

---

## Sistema Shell

### Command Parser

Convierte texto crudo a estructura ejecutable:

```javascript
// "  echo   hello world  "
// ↓ parseInput()
// { command: "echo", args: ["hello", "world"] }
```

**Características:**
- Case insensitive
- Manejo flexible de espacios
- Estructura limpia siempre

### Command Registry

```javascript
const REGISTRY = {
  help: (args) => "comandos disponibles: help, echo, clear",
  echo: (args) => args.join(" "),
  clear: (args) => {
    emit(EVENTS.CLI_CLEAR);
    return null;
  }
};
```

### Flujo de Ejecución

1. **Parse:** Input a estructura organizada
2. **Validate:** Verifica comando existe
3. **Lookup:** Busca en REGISTRY
4. **Execute:** Ejecuta con manejo de errores
5. **Respond:** Emite resultado o error

---

## Manejo de Errores

### Jerarquía de Errores
- **SyntaxError:** Error de sintaxis en input
- **RangeError:** Argumentos fuera de rango
- **Error genérico:** Fallos críticos internos

### Logging y UX
```javascript
// Mensaje al usuario
emit(EVENTS.CLI_OUTPUT, `[ERROR] Invalid input: ${error.message}`);

// Logging para debugging
console.error(`[Shell] ${command} failed:`, error);
```

---

## Estilos y Efectos Visuales

### Efectos Cyberpunk

#### Scanlines (CRT Effect)
```css
x-terminal::before {
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
}
```

#### Viñeteado
```css
x-terminal::after {
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
}
```

### Layout Properties
- **Dock Height:** 25vh con min-height: 200px
- **Viewport Height:** 75vh restante
- **Separation:** Bordes con efectos neon

---

## Interacción Usuario

### Input Handling
```javascript
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value;
    this.printLine(`visitor@jojo-os:~$ ${command}`, "muted");
    emit(EVENTS.CLI_INPUT, command);
    input.value = "";
  }
});
```

### Auto-focus Management
```javascript
// Click anywhere focuses input
this.addEventListener("click", () => {
  input.focus();
});

// Auto-focus on render
setTimeout(() => {
  input.focus();
}, 100);
```

---

## Características Técnicas

### Seguridad
- **Sanitización:** `textContent` previene inyección HTML
- **Autocompletado desactivado:** Comportamiento terminal auténtico
- **Spellcheck desactivado:** Evita correcciones no deseadas

### Performance
- **Z-index Management:** Correcto stacking de elementos
- **Efficient DOM:** Manipulación mínima del DOM
- **Event Delegation:** Optimización de event listeners

### Accessibility
- **Keyboard Navigation:** Completamente keyboard-friendly
- **Focus Management:** Auto-focus y click-to-focus
- **Screen Reader:** Estructura semántica HTML5

---

## Extensibilidad

### Agregar Nuevos Comandos

```javascript
const REGISTRY = {
  // ... comandos existentes ...
  
  date: (args) => new Date().toLocaleString(),
  
  calc: (args) => {
    const expression = args.join(' ');
    try {
      return eval(expression).toString();
    } catch {
      throw new SyntaxError("Invalid expression");
    }
  }
};
```

### Mejoras Futuras
- Historial de comandos (flechas ↑/↓)
- Autocompletado con tab
- Comandos con parámetros opcionales
- Persistencia de configuración

---

## Arquitectura CSS

### Archivos de Estilos
```
src/styles/
├── vars.css          # Variables CSS y colores
├── layout.css        # Layout principal (75/25 split)
├── base.css          # Efectos globales (scanlines)
└── components/
    └── terminal.css  # Estilos específicos del terminal
```

### Variables Clave
```css
:root {
    --primary-neon: #bc13fe;
    --text-main: #e0e0e0;
    --text-muted: #6e6e8e;
    --bg-deep-space: #02020a;
    --glow-text: 0 0 5px rgba(188, 19, 254, 0.7);
}
```

---

## Resumen de Beneficios

### Para Desarrolladores
- **Modular:** Componentes desacoplados y reutilizables
- **Extensible:** Fácil agregar nuevos comandos
- **Debuggable:** Logging detallado y errores específicos
- **Maintainable:** Código organizado y documentado

### Para Usuarios
- **Auténtico:** Experiencia de terminal realista
- **Intuitivo:** Placeholder guía al usuario
- **Responsive:** Adaptable a cualquier pantalla
- **Inmersivo:** Efectos cyberpunk atmosféricos

### Para el Sistema
- **Performance:** Optimizado para velocidad
- **Seguro:** Protegido contra inyecciones
- **Accesible:** Compatible con estándares web
- **Scalable:** Arquitectura que crece con el proyecto

Este sistema proporciona una base sólida para experiencias de terminal interactivas manteniendo la estética cyberpunk y las mejores prácticas de desarrollo web moderno.