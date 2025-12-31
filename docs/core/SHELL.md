# Sistema Shell

## Terminal de Comandos

Implemento una terminal de comandos funcional que interpreta input del usuario, ejecuta acciones correspondientes y muestra resultados.

---

## Arquitectura

```
src/core/system/
├── shell.js           # Intérprete principal de comandos
└── commandParser.js   # Parser de input de usuario
```

---

## commandParser.js - Parser de Comandos

Convierte el string crudo del usuario en estructura ejecutable.

### Función Principal

```javascript
export function parseInput(inputString) {
  if (!inputString) return { command: "", args: [] };

  // Limpiar espacios y separar por espacios múltiples
  const tokens = inputString.trim().split(/\s+/);

  // Primer token = comando, resto = argumentos
  const command = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  return { command, args };
}
```

### Proceso de Transformación

```
"  echo   hello world  "
↓ trim()
"echo   hello world"
↓ split(/\s+/)
["echo", "hello", "world"]
↓ asignación
{ command: "echo", args: ["hello", "world"] }
```

### Características

- **Case insensitive**: `HELP` y `help` funcionan igual
- **Espacios flexibles**: Maneja múltiples espacios
- **Estructura limpia**: Siempre devuelve objeto con command y args

---

## shell.js - Intérprete Principal

Coordina la ejecución de comandos y maneja errores.

### Registro de Comandos

```javascript
const REGISTRY = {
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
  },
  clear: () => {
    emit(EVENTS.CLI_CLEAR);
    return null;
  },
  help: () =>
    "Available sectors: home, about, projects, contact. System cmds: clear, echo.",
  echo: (args) => args.join(" "),
};
```

### Inicialización

```javascript
export function initShell() {
  on(EVENTS.CLI_INPUT, (inputString) => {
    // 1. Parsear input
    const { command, args } = parseInput(inputString);

    if (!command) return;

    // 2. Buscar comando en registro
    const action = REGISTRY[command];

    // 3. Ejecutar o mostrar error
    if (action) {
      try {
        const response = action(args);
        if (response) {
          emit(EVENTS.CLI_OUTPUT, response);
        }
      } catch (error) {
        // Manejo de errores específicos
        if (error.name === "SyntaxError") {
          emit(EVENTS.CLI_OUTPUT, `[ERROR] Invalid input: ${error.message}`);
        } else if (error.name === "RangeError") {
          emit(EVENTS.CLI_OUTPUT, `[ERROR] Argument out of range: ${error.message}`);
        } else {
          emit(EVENTS.CLI_OUTPUT, `[ERROR] Critical failure in ${command}: ${error.message}`);
        }
        console.error(`[Shell] ${command} failed:`, error);
      }
    } else {
      emit(EVENTS.CMD_NOT_FOUND, command);
      emit(EVENTS.CLI_OUTPUT, `Command not found: "${command}". Type "help".`);
    }
  });

  console.log("[Shell] System initialized and listening...");
}
```

### Flujo de Ejecución

1. **Parse**: Convierte input a estructura organizada
2. **Validate**: Verifica que haya comando
3. **Lookup**: Busca comando en REGISTRY
4. **Execute**: Ejecuta con manejo de errores
5. **Respond**: Emite resultado o error

---

## Manejo de Errores

### Jerarquía de Errores

- **SyntaxError**: Error de sintaxis en input
- **RangeError**: Argumentos fuera de rango
- **Error genérico**: Fallos críticos internos

### Logging

```javascript
console.error(`[Shell] ${command} failed:`, error);
```

Muestra errores completos en consola para debugging.

---

## Integración con Eventos

### Eventos que ESCUCHA

```javascript
on(EVENTS.CLI_INPUT, (inputString) => {
  // Procesa input del usuario
});
```

### Eventos que EMITE

```javascript
// Resultado de comando
emit(EVENTS.CLI_OUTPUT, response);

// Limpieza de terminal
emit(EVENTS.CLI_CLEAR);

// Navegación a nueva sección
emit(EVENTS.NAV_NAVIGATE, route);

// Comando no encontrado
emit(EVENTS.CMD_NOT_FOUND, command);
```

---

## Ejemplos de Uso

### Comando help

```
Input: "help"
→ parseInput: { command: "help", args: [] }
→ REGISTRY["help"]: función help
→ help([]): "Available sectors: home, about, projects, contact. System cmds: clear, echo."
→ emit(CLI_OUTPUT, "Available sectors: home, about, projects, contact. System cmds: clear, echo.")
```

### Comando echo

```
Input: "echo Hello World"
→ parseInput: { command: "echo", args: ["Hello", "World"] }
→ REGISTRY["echo"]: función echo
→ echo(["Hello", "World"]): "Hello World"
→ emit(CLI_OUTPUT, "Hello World")
```

### Comando clear

```
Input: "clear"
→ parseInput: { command: "clear", args: [] }
→ REGISTRY["clear"]: función clear
→ clear([]): emit(CLI_CLEAR) + return null
→ Terminal limpia pantalla, sin mostrar texto
```

### Comandos de Navegación

#### Comando home

```
Input: "home"
→ parseInput: { command: "home", args: [] }
→ REGISTRY["home"]: función home
→ home([]): emit(NAV_NAVIGATE, "home") + return "Jumping to sector: HOME"
→ Viewport muestra contenido HOME
```

#### Comando about

```
Input: "about"
→ parseInput: { command: "about", args: [] }
→ REGISTRY["about"]: función about
→ about([]): emit(NAV_NAVIGATE, "about") + return "Retrieving personnel file..."
→ Viewport muestra ProfileCard
```

#### Comando projects

```
Input: "projects"
→ parseInput: { command: "projects", args: [] }
→ REGISTRY["projects"]: función projects
→ projects([]): emit(NAV_NAVIGATE, "projects") + return "Accessing project repository..."
→ Viewport muestra contenido de proyectos
```

#### Comando contact

```
Input: "contact"
→ parseInput: { command: "contact", args: [] }
→ REGISTRY["contact"]: función contact
→ contact([]): emit(NAV_NAVIGATE, "contact") + return "Opening secure channel..."
→ Viewport muestra formulario de contacto
```

---

## Extensión de Comandos

### Agregar Nuevo Comando

```javascript
const REGISTRY = {
  // ... comandos existentes ...
  
  date: (args) => {
    return new Date().toLocaleString();
  },
  
  calc: (args) => {
    const expression = args.join(' ');
    try {
      return eval(expression).toString();
    } catch {
      throw new SyntaxError("Invalid expression");
    }
  },
  
  // Comando de navegación personalizado
  custom: () => {
    emit(EVENTS.NAV_NAVIGATE, "custom");
    return "Loading custom sector...";
  }
};
```

### Buenas Prácticas

1. **Validación de argumentos**: Lanza errores específicos
2. **Retorno consistente**: Siempre string o null
3. **Manejo de errores**: Usa SyntaxError, RangeError
4. **Documentación**: Agrega a ayuda del comando help

---

## Características

### Comunicación Desacoplada

El shell no conoce directamente:
- Cómo se muestra la terminal
- Quién escucha los eventos
- Cómo se limpia la pantalla

Solo emite eventos y otros componentes reaccionan.

### Comportamiento Auténtico

- **Case insensitive**: `HELP` y `help` funcionan igual
- **Espacios flexibles**: Maneja múltiples espacios
- **Respuestas inmediatas**: Sin delays artificiales

### Estilo Cyberpunk

- Mensajes estilo sistema: `[ERROR] Critical failure`
- Logging con prefijo: `[Shell]`
- Nombres de eventos estilo terminal

---

## Resumen

### Responsabilidades

- **commandParser.js**: Traducir texto a estructura
- **shell.js**: Coordinar ejecución y manejar errores
- **REGISTRY**: Definir qué hace cada comando
- **Eventos**: Comunicación desacoplada

### Beneficios

1. **Modular**: Cada parte con responsabilidad específica
2. **Extensible**: Fácil agregar nuevos comandos
3. **Robusto**: Manejo completo de errores
4. **Desacoplado**: El shell no conoce la UI
5. **Auténtico**: Se siente como terminal real

Este sistema proporciona una base sólida para experiencia de terminal interactiva manteniendo la estética cyberpunk.