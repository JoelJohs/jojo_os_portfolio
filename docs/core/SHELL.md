# Sistema Shell - Documentación Completa

## ¿Qué es el Sistema Shell?

Imagina que estás frente a una computadora antigua con una pantalla negra y texto verde. Escribes comandos como `help`, `clear`, o `echo hello` y la computadora responde. 

El sistema Shell es exactamente eso: **una terminal de comandos funcional dentro de tu portfolio** que interpreta lo que escribes, ejecuta acciones correspondientes, y te muestra los resultados.

**Analogía:** Es como el intérprete de una embajada. Tú hablas en tu idioma (escribes comandos), el intérprete (el shell) entiende lo que quieres decir, traduce al lenguaje de la computadora (ejecuta funciones), y te devuelve la respuesta en tu idioma (muestra resultados).

---

## Arquitectura de Archivos

El sistema Shell vive en dos archivos principales:

```
src/core/system/
├── shell.js           # El "intérprete" principal que maneja los comandos
└── commandParser.js   # El "traductor" que entiende lo que escribes
```

**Analogía:**
- `commandParser.js` = El traductor que entiende lo que dices
- `shell.js` = El intérprete principal que coordina todo

---

## commandParser.js - El Traductor de Comandos

### ¿Qué hace exactamente?

Cuando escribes en la terminal algo como `"  open   about-me  "` (con espacios extra), el traductor necesita entender:
1. ¿Cuál es el comando principal? (`open`)
2. ¿Cuáles son los argumentos? (`about-me`)
3. Ignorar los espacios extra y mayúsculas/minúsculas

### Función Principal: `parseInput(inputString)`

**Propósito:** Tomar el texto crudo que escribes y convertirlo en una estructura organizada que la computadora pueda entender.

**Parámetros:**
- `inputString`: El texto exacto que escribes en la terminal (ej: `"  open   about-me  "`)

**Retorno:** Un objeto organizado con dos partes:
```javascript
{
  command: 'open',      // El comando principal
  args: ['about-me']    // Los argumentos como lista
}
```

### Proceso de Traducción Paso a Paso

```javascript
export function parseInput(inputString) {
  // Paso 1: Si no hay texto, devolver estructura vacía
  if (!inputString) return { command: "", args: [] };

  // Paso 2: Limpiar y separar el texto
  const tokens = inputString.trim().split(/\s+/);
  
  // Paso 3: Identificar comando y argumentos
  const command = tokens[0].toLowerCase(); // Primer palabra = comando
  const args = tokens.slice(1);            // Resto = argumentos

  return { command, args };
}
```

**Explicación detallada de cada paso:**

#### Paso 1: Validación inicial
```javascript
if (!inputString) return { command: "", args: [] };
```
- **¿Qué hace?** Si no escribiste nada (string vacío o null), devuelve una estructura vacía
- **¿Por qué?** Evita errores cuando intentas procesar texto que no existe

#### Paso 2: Limpieza y separación
```javascript
const tokens = inputString.trim().split(/\s+/);
```
- **`trim()`**: Quita espacios al inicio y final
  - `"  hello world  "` → `"hello world"`
- **`split(/\s+/)`**: Separa por espacios, manejando múltiples espacios
  - `"hello    world"` → `["hello", "world"]` (no crea elementos vacíos)

**Ejemplos de transformación:**
```
"  help  "        → ["help"]
"echo hello"      → ["echo", "hello"]
"open   about me" → ["open", "about", "me"]
```

#### Paso 3: Identificación de partes
```javascript
const command = tokens[0].toLowerCase(); // Primer elemento = comando
const args = tokens.slice(1);            // Elementos restantes = argumentos
```
- **`toLowerCase()`**: Convierte a minúsculas para que `HELP`, `help`, `Help` funcionen igual
- **`slice(1)`**: Toma todo excepto el primer elemento (los argumentos)

**Ejemplos completos:**
```
Entrada: "HELP"
Tokens: ["help"]
Resultado: { command: "help", args: [] }

Entrada: "echo Hello World"
Tokens: ["echo", "Hello", "World"]
Resultado: { command: "echo", args: ["Hello", "World"] }

Entrada: "  open   about-me  "
Tokens: ["open", "about-me"]
Resultado: { command: "open", args: ["about-me"] }
```

---

## shell.js - El Intérprete Principal

### ¿Qué hace exactamente?

El shell es como el **cerebro central de la terminal**. Recibe los comandos traducidos, busca qué hacer con cada uno, ejecuta las acciones correspondientes, y maneja los errores.

### Componentes Principales del Shell

#### 1. El Registro de Comandos (REGISTRY)

```javascript
const REGISTRY = {
  help: (args) => {
    return "comandos disponibles: help, echo, clear";
  },
  echo: (args) => {
    return args.join(" ");
  },
  clear: (args) => {
    emit(EVENTS.CLI_CLEAR);
    return null;
  },
  // Más comandos se agregarán aquí
};
```

**¿Qué es el REGISTRY?**
Es como un **directorio de servicios**. Cada comando es un servicio que puedes solicitar:

- **`help`**: Te muestra la lista de comandos disponibles
- **`echo`**: Repite lo que le escribas (como un eco)
- **`clear`**: Limpia la pantalla de la terminal

**Estructura de cada comando:**
- **Clave**: El nombre del comando (ej: `help`)
- **Valor**: Una función que recibe argumentos y devuelve una respuesta

**Explicación de cada comando:**

##### Comando `help`
```javascript
help: (args) => {
  return "comandos disponibles: help, echo, clear";
}
```
- **Propósito**: Mostrar ayuda al usuario
- **Argumentos**: No los usa (recibe `args` pero los ignora)
- **Retorno**: String con la lista de comandos disponibles

##### Comando `echo`
```javascript
echo: (args) => {
  return args.join(" ");
}
```
- **Propósito**: Repetir exactamente lo que el usuario escriba
- **Argumentos**: Los une con espacios para reconstruir el mensaje original
- **Ejemplo**: `echo hello world` → `"hello world"`

##### Comando `clear`
```javascript
clear: (args) => {
  emit(EVENTS.CLI_CLEAR);
  return null;
}
```
- **Propósito**: Limpiar la pantalla de la terminal
- **Acción**: Emite un evento para que otros componentes limpien la UI
- **Retorno**: `null` (no muestra texto, solo realiza la acción)

#### 2. La Función de Inicialización: `initShell()`

```javascript
export function initShell() {
  on(EVENTS.CLI_INPUT, (inputString) => {
    // ... lógica principal del shell
  });
  
  console.log("[Shell] System initialized and listening...");
}
```

**¿Qué hace `initShell()`?**
Es como **encender el sistema de la terminal**. Se suscribe para escuchar cuando el usuario escribe comandos y los procesa.

### Flujo Complejo de Procesamiento de Comandos

Cuando escribes un comando y presionas Enter, esto es lo que sucede paso a paso:

```javascript
on(EVENTS.CLI_INPUT, (inputString) => {
  // Paso 1: Traducir el input del usuario
  const { command, args } = parseInput(inputString);

  // Paso 2: Validar que haya un comando
  if (!command) return;

  // Paso 3: Buscar el comando en el registro
  const action = REGISTRY[command];

  // Paso 4: Ejecutar o mostrar error
  if (action) {
    // 4a: El comando existe, ejecutarlo
    try {
      const response = action(args);
      if (response) {
        emit(EVENTS.CLI_OUTPUT, response);
      }
    } catch (error) {
      // 4b: Manejo de errores específicos
    }
  } else {
    // 4c: El comando no existe
    emit(EVENTS.CMD_NOT_FOUND, command);
    emit(EVENTS.CLI_OUTPUT, `Command not found: "${command}". Type "help".`);
  }
});
```

**Explicación detallada de cada paso:**

#### Paso 1: Traducción del Input
```javascript
const { command, args } = parseInput(inputString);
```
- Usa el traductor (`commandParser`) para convertir el texto crudo en estructura organizada
- Ejemplo: `"echo hello"` → `{ command: "echo", args: ["hello"] }`

#### Paso 2: Validación
```javascript
if (!command) return;
```
- Si no hay comando (usuario presionó Enter sin escribir nada), no hace nada
- Evita procesamiento innecesario

#### Paso 3: Búsqueda en Registro
```javascript
const action = REGISTRY[command];
```
- Busca si el comando existe en el directororio de servicios
- Si existe, `action` es la función a ejecutar
- Si no existe, `action` es `undefined`

#### Paso 4: Ejecución o Error

##### 4a: Comando Existe - Ejecución Segura
```javascript
try {
  const response = action(args);
  if (response) {
    emit(EVENTS.CLI_OUTPUT, response);
  }
} catch (error) {
  // Manejo de errores...
}
```
- **`try/catch`**: Ejecuta el comando de forma segura
- **`response`**: Guarda lo que el comando devolvió
- **`if (response)`**: Si hay respuesta, la muestra en la terminal
- **Si no hay respuesta** (como en `clear`), no muestra nada

##### 4b: Manejo de Errores Específicos
```javascript
catch (error) {
  if (error.name === "SyntaxError") {
    emit(EVENTS.CLI_OUTPUT, `[ERROR] Invalid input: ${error.message}`);
  } else if (error.name === "RangeError") {
    emit(EVENTS.CLI_OUTPUT, `[ERROR] Argument out of range: ${error.message}`);
  } else {
    emit(EVENTS.CLI_OUTPUT, `[ERROR] Critical failure in ${command}: ${error.message}`);
  }
  console.error(`[Shell] ${command} failed:`, error);
}
```

**Tipos de errores manejados:**

- **SyntaxError**: Error de sintaxis en el input del usuario
  - Ejemplo: Usuario escribe algo que no se puede procesar
  - Mensaje: `[ERROR] Invalid input: [descripción del error]`

- **RangeError**: Error de rango en los argumentos
  - Ejemplo: Comando espera número entre 1-10 y usuario escribe 15
  - Mensaje: `[ERROR] Argument out of range: [descripción del error]`

- **Error genérico**: Cualquier otro error crítico
  - Ejemplo: Error interno del comando
  - Mensaje: `[ERROR] Critical failure in [comando]: [descripción del error]`

**Logging para debugging:**
```javascript
console.error(`[Shell] ${command} failed:`, error);
```
- Muestra el error completo en la consola del navegador para debugging

##### 4c: Comando No Existe
```javascript
else {
  emit(EVENTS.CMD_NOT_FOUND, command);
  emit(EVENTS.CLI_OUTPUT, `Command not found: "${command}". Type "help".`);
}
```
- **`CMD_NOT_FOUND`**: Evento para que otros componentes sepan que un comando no existió
- **Mensaje amigable**: Le dice al usuario qué pasó y cómo obtener ayuda

---

## Integración con el Sistema de Eventos

El Shell se integra perfectamente con el sistema de eventos:

### Eventos que el Shell ESCUCHA:
```javascript
on(EVENTS.CLI_INPUT, (inputString) => {
  // Procesa cuando el usuario escribe y presiona Enter
});
```

### Eventos que el Shell EMITE:
```javascript
// Cuando un comando produce texto para mostrar
emit(EVENTS.CLI_OUTPUT, response);

// Cuando se ejecuta el comando clear
emit(EVENTS.CLI_CLEAR);

// Cuando un comando no existe
emit(EVENTS.CMD_NOT_FOUND, command);
```

**Flujo completo de eventos:**
1. Usuario escribe → `CLI_INPUT` → Shell procesa
2. Shell ejecuta comando → `CLI_OUTPUT` → Terminal muestra resultado
3. Comando clear → `CLI_CLEAR` → Terminal limpia pantalla
4. Comando no encontrado → `CMD_NOT_FOUND` → Sistema reacciona

---

## Ejemplos Prácticos de Uso

### Escenario 1: Usuario escribe "help"
```
Input: "help"
1. parseInput("help") → { command: "help", args: [] }
2. REGISTRY["help"] → función help
3. help([]) → "comandos disponibles: help, echo, clear"
4. emit(CLI_OUTPUT, "comandos disponibles: help, echo, clear")
5. Terminal muestra: "comandos disponibles: help, echo, clear"
```

### Escenario 2: Usuario escribe "echo Hello World"
```
Input: "echo Hello World"
1. parseInput("echo Hello World") → { command: "echo", args: ["Hello", "World"] }
2. REGISTRY["echo"] → función echo
3. echo(["Hello", "World"]) → "Hello World"
4. emit(CLI_OUTPUT, "Hello World")
5. Terminal muestra: "Hello World"
```

### Escenario 3: Usuario escribe "clear"
```
Input: "clear"
1. parseInput("clear") → { command: "clear", args: [] }
2. REGISTRY["clear"] → función clear
3. clear([]) → emit(CLI_CLEAR) + return null
4. Terminal recibe CLI_CLEAR y limpia la pantalla
5. No se muestra texto (response es null)
```

### Escenario 4: Usuario escribe "comando-inexistente"
```
Input: "comando-inexistente"
1. parseInput("comando-inexistente") → { command: "comando-inexistente", args: [] }
2. REGISTRY["comando-inexistente"] → undefined
3. emit(CMD_NOT_FOUND, "comando-inexistente")
4. emit(CLI_OUTPUT, 'Command not found: "comando-inexistente". Type "help".')
5. Terminal muestra: "Command not found: "comando-inexistente". Type "help"."
```

---

## Cómo Agregar Nuevos Comandos

### Paso 1: Definir el comando en el REGISTRY

```javascript
const REGISTRY = {
  // ... comandos existentes ...
  
  // Nuevo comando: date
  date: (args) => {
    return new Date().toLocaleString();
  },
  
  // Nuevo comando: sum
  sum: (args) => {
    const numbers = args.map(arg => parseFloat(arg));
    if (numbers.some(isNaN)) {
      throw new SyntaxError("All arguments must be numbers");
    }
    return numbers.reduce((sum, num) => sum + num, 0).toString();
  },
};
```

### Paso 2: Probar el comando

```
> date
"12/27/2025, 3:45:30 PM"

> sum 5 10 15
"30"

> sum 5 hello 10
[ERROR] Invalid input: All arguments must be numbers
```

### Buenas Prácticas para Nuevos Comandos:

1. **Validación de argumentos**: Lanza errores específicos si los argumentos son inválidos
2. **Retorno consistente**: Siempre devuelve string o null
3. **Manejo de errores**: Usa `SyntaxError`, `RangeError` para errores predecibles
4. **Documentación**: Agrega el comando a la ayuda del comando `help`

---

## Características Avanzadas del Shell

### 1. Sistema de Errores Jerárquico

El shell maneja errores en capas:
- **Capa 1**: Errores de sintaxis (input inválido)
- **Capa 2**: Errores de rango (argumentos fuera de límites)
- **Capa 3**: Errores críticos (fallos internos)

### 2. Logging para Debugging

```javascript
console.error(`[Shell] ${command} failed:`, error);
```

- Muestra errores completos en consola del navegador
- Formato `[Shell]` para identificar fácilmente el origen
- Incluye el comando que falló para contexto

### 3. Comunicación Desacoplada

El shell no conoce directamente:
- Cómo se muestra la terminal
- Quién escucha los eventos
- Cómo se limpia la pantalla

Solo emite eventos y otros componentes reaccionan.

---

## Integración con el Tema Cyberpunk/Terminal

El sistema Shell está diseñado para sentirse como una terminal real:

### Nombres y Mensajes Estilo Sistema
- `[ERROR] Critical failure` → Suena a error de sistema real
- `Command not found` → Mensaje clásico de terminal
- `System initialized and listening...` → Startup message

### Comportamiento Auténtico
- **Case insensitive**: `HELP` y `help` funcionan igual
- **Espacios flexibles**: Maneja múltiples espacios como terminales reales
- **Respuestas inmediatas**: Sin delays artificiales, como terminal real

### Errores Estilo Debugging
- Formato `[ERROR] tipo: mensaje`
- Logging en consola con prefijo `[Shell]`
- Mensajes técnicos pero comprensibles

---

## Resumen y Arquitectura Final

### Flujo Completo del Sistema:

```
Usuario escribe "echo hello"
↓
Terminal emite CLI_INPUT
↓
Shell recibe el evento
↓
commandParser traduce: { command: "echo", args: ["hello"] }
↓
Shell busca en REGISTRY["echo"]
↓
Ejecuta echo(["hello"]) → "hello"
↓
Shell emite CLI_OUTPUT con "hello"
↓
Terminal muestra "hello"
```

### Responsabilidades Claras:

- **commandParser.js**: Solo traducir texto a estructura
- **shell.js**: Coordinar ejecución y manejar errores
- **REGISTRY**: Definir qué hace cada comando
- **Sistema de eventos**: Comunicación desacoplada

### Beneficios de esta Arquitectura:

1. **Modular**: Cada parte tiene una responsabilidad específica
2. **Extensible**: Fácil agregar nuevos comandos
3. **Robusto**: Manejo completo de errores
4. **Desacoplado**: El shell no conoce la UI
5. **Auténtico**: Se siente como una terminal real

Este sistema Shell proporciona una base sólida para una experiencia de terminal interactiva, manteniendo la estética cyberpunk y siendo completamente extensible para futuras funcionalidades del portfolio.