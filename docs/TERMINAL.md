# Terminal UI Component

## Componente de Terminal Interactiva

Implemento un componente de terminal funcional que proporciona experiencia de línea de comandos auténtica con comunicación bidireccional con el sistema shell.

---

## Estructura del Componente

```
src/ui/organisms/terminal.js
└── Terminal (Web Component)
    ├── Constructor y estado
    ├── Ciclo de vida (connectedCallback)
    ├── Renderizado (render)
    ├── Event listeners (setupEventListeners)
    └── Sistema listeners (setupSystemListeners)
```

---

## Arquitectura del Componente

### Web Component Personalizado

```javascript
export class Terminal extends HTMLElement {
  constructor() {
    super();
    this.history = [];  // Historial de comandos
  }
}
```

**Registro:** `customElements.define("x-terminal", Terminal);`

**Uso en HTML:** `<x-terminal></x-terminal>`

---

## Ciclo de Vida

### `connectedCallback()` - Inicialización

```javascript
connectedCallback() {
  this.render();              // 1. Construye el DOM
  this.setupEventListeners(); // 2. Configura interacciones usuario
  this.setupSystemListeners(); // 3. Configura comunicación sistema
}
```

El componente se inicializa automáticamente cuando se agrega al DOM.

---

## Estructura DOM (render())

```html
<div class="terminal">
  <div class="terminal-output" id="output">
    <!-- Líneas de salida del sistema -->
  </div>
  <div class="command-line">
    <span class="prompt">visitor@jojo-os:~$</span>
    <input type="text" class="cmd-input" 
           autocomplete="off" 
           spellcheck="false" 
           autofocus>
  </div>
</div>
```

### Elementos Clave

- **`#output`**: Contenedor para mostrar resultados
- **`.cmd-input`**: Input donde el usuario escribe comandos
- **`.prompt`**: Indicador visual de línea de comandos

---

## Interacción Usuario (setupEventListeners())

### 1. Detección de Enter

```javascript
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value;
    
    // A. Muestra comando ejecutado
    this.printLine(`visitor@jojo-os:~$ ${command}`, "muted");
    
    // B. Envía al sistema
    emit(EVENTS.CLI_INPUT, command);
    
    // C. Limpia input
    input.value = "";
  }
});
```

### 2. Auto-enfoque

```javascript
this.addEventListener("click", () => {
  input.focus();
});
```

**Comportamiento:** Click en cualquier parte del terminal enfoca el input.

---

## Comunicación Sistema (setupSystemListeners())

### Eventos que ESCUCHA

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

### Eventos que EMITE

```javascript
// Input del usuario al sistema
emit(EVENTS.CLI_INPUT, command);
```

---

## Método Auxiliar: printLine()

```javascript
printLine(text, type = "") {
  const output = this.querySelector("#output");
  const line = document.createElement("div");
  line.className = `terminal-line ${type}`;
  line.textContent = text;  // textContent para seguridad
  output.appendChild(line);

  // Auto-scroll al final
  this.scrollTop = this.scrollHeight;
}
```

### Características

- **Seguridad**: Usa `textContent` para prevenir inyección HTML
- **Flexibilidad**: Parámetro `type` para clases CSS adicionales
- **UX**: Auto-scroll para mantener visible el contenido nuevo

---

## Flujo de Interacción Completo

### 1. Usuario escribe comando
```
Input: "help"
↓
Elemento: .cmd-input.value = "help"
```

### 2. Usuario presiona Enter
```
Evento: keydown (Enter)
↓
Acción: printLine("visitor@jojo-os:~$ help", "muted")
↓
Acción: emit(EVENTS.CLI_INPUT, "help")
↓
Acción: input.value = ""
```

### 3. Sistema procesa y responde
```
Shell procesa "help"
↓
emit(EVENTS.CLI_OUTPUT, "comandos disponibles: help, echo, clear")
↓
Terminal escucha CLI_OUTPUT
↓
printLine("comandos disponibles: help, echo, clear")
```

---

## Estado Interno

### `history` Array

```javascript
this.history = [];  // Reservado para futura implementación
```

**Uso potencial:** 
- Navegación con flechas ↑/↓
- Persistencia de comandos
- Búsqueda en historial

---

## Estilos CSS Asociados

El componente depende de estos estilos (definidos en `styles/components/terminal.css`):

```css
.terminal {
  /* Contenedor principal */
}

.terminal-output {
  /* Área de salida */
}

.command-line {
  /* Línea de comandos */
}

.prompt {
  /* Indicador del sistema */
}

.cmd-input {
  /* Input del usuario */
}

.terminal-line {
  /* Líneas de salida */
}

.terminal-line.muted {
  /* Comandos ejecutados */
}
```

---

## Características de UX

### Autenticidad Terminal

- **Prompt realista**: `visitor@jojo-os:~$`
- **Comandos visibles**: Muestra lo que el usuario escribe
- **Respuesta inmediata**: Sin delays artificiales
- **Auto-scroll**: Siempre visible el contenido nuevo

### Seguridad

- **Sanitización**: `textContent` previene inyección HTML
- **Autocompletado desactivado**: Evita sugerencias del navegador
- **Spellcheck desactivado**: Comportamiento terminal auténtico

### Accesibilidad

- **Auto-enfoque**: Click anywhere enfoca input
- **Autofocus**: Input listo al cargar
- **Navegación**: Comportamiento keyboard-friendly

---

## Integración con el Sistema

### Comunicación Desacoplada

El terminal no conoce:
- Cómo se procesan los comandos
- Qué comandos están disponibles
- Cómo se manejan errores

Solo envía y recibe eventos.

### Flujo de Eventos

```
Usuario → Terminal → CLI_INPUT → Shell → CLI_OUTPUT → Terminal → Usuario
```

---

## Buenas Prácticas Implementadas

### 1. Separación de Responsabilidades

- **Terminal**: Solo UI y comunicación
- **Shell**: Lógica de comandos
- **Eventos**: Comunicación desacoplada

### 2. Seguridad

- `textContent` sobre `innerHTML`
- Validación de eventos
- Sin ejecución de código dinámico

### 3. Performance

- Event delegation donde es posible
- DOM manipulation mínima
- Sin re-renders innecesarios

---

## Extensibilidad

### Posibles Mejoras

```javascript
// Historial de comandos
this.history.push(command);

// Navegación con flechas
input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    input.value = this.history[this.historyIndex--];
  }
});

// Autocompletado
input.addEventListener("input", (e) => {
  const suggestions = this.getSuggestions(e.target.value);
  this.showSuggestions(suggestions);
});
```

### Temas Personalizables

```javascript
// Soporte para múltiples temas
this.setAttribute("theme", "matrix");
// o
this.setAttribute("prompt", "root@hackthebox:~#");
```

---

## Resumen

### Responsabilidades del Componente

1. **Renderizado**: Construir y mantener el DOM de la terminal
2. **Input**: Capturar comandos del usuario
3. **Output**: Mostrar resultados del sistema
4. **Comunicación**: Mediador entre usuario y sistema
5. **UX**: Comportamiento auténtico de terminal

### Beneficios

- **Modular**: Componente autocontenido
- **Desacoplado**: Solo comunicación por eventos
- **Seguro**: Prevención de inyección HTML
- **Auténtico**: Experiencia terminal realista
- **Extensible**: Base sólida para mejoras

Este componente proporciona la interfaz visual para la experiencia de terminal interactiva, manteniendo la estética cyberpunk y la arquitectura modular del proyecto.