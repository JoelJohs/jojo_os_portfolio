# Sistema de Eventos

## Arquitectura Pub/Sub

Implemento un sistema de eventos basado en el patrón publish/subscribe para comunicación desacoplada entre componentes.

---

## Estructura de Archivos

```
src/core/events/
├── types.js       # Diccionario de constantes de eventos
└── bus.js         # Implementación del event bus
```

---

## types.js - Diccionario de Eventos

Centralizo todos los nombres de eventos para evitar errores de tipeo y mantener consistencia.

```javascript
export const EVENTS = {
  // Sistema
  SYS_BOOT: "sys:boot",
  SYS_SHUTDOWN: "sys:shutdown",

  // UI
  UI_THEME_CHANGED: "ui:theme_changed",

  // Terminal (CLI)
  CLI_INPUT: "cli:input",    // Usuario presionó Enter
  CLI_OUTPUT: "cli:output",  // Sistema responde texto
  CLI_CLEAR: "cli:clear",

  // Comandos
  CMD_NOT_FOUND: "cmd:not_found",
  CMD_EXEC: "cmd:exec",       // Comando específico se ejecutó
};
```

### Formato de Nombres

Uso el formato `CATEGORIA:ACCION`:

- `sys` - Eventos del sistema
- `ui` - Eventos de interfaz
- `cli` - Eventos de terminal
- `cmd` - Eventos de comandos

### Beneficios

1. **Prevención de errores**: Evita typos en nombres de eventos
2. **Autocompletado**: IDEs sugieren eventos disponibles
3. **Refactoring seguro**: Cambios en un solo lugar
4. **Documentación viva**: El diccionario es la lista de eventos

---

## bus.js - Event Bus

Implemento el sistema de comunicación pub/sub.

### Estado Interno

```javascript
const subscribers = {};
// {'EVENT_NAME': [callback1, callback2, ...] }
```

### API Pública

#### `on(eventName, callback)` - Suscripción

```javascript
export function on(eventName, callback) {
  if (!subscribers[eventName]) {
    subscribers[eventName] = [];
  }
  subscribers[eventName].push(callback);
  
  // Retorno función de cleanup
  return () => off(eventName, callback);
}
```

**Retorna:** Función `unsubscribe` para limpiar el listener.

#### `emit(eventName, payload)` - Emisión

```javascript
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
```

**Características:**
- Ejecuta todos los callbacks suscritos
- Manejo de errores con try/catch
- Un callback con error no afecta a otros listeners

#### `off(eventName, callback)` - Des-suscripción

```javascript
function off(eventName, callback) {
  if (!subscribers[eventName]) return;
  subscribers[eventName] = subscribers[eventName].filter(
    (cb) => cb !== callback
  );
}
```

### Debug

```javascript
window.SystemBus = { emit, subscribers };
```

Expongo el event bus para debugging en navegador.

---

## Patrones de Uso

### Suscripción con Cleanup

```javascript
import { on } from './core/events/bus.js';
import { EVENTS } from './core/events/types.js';

class Component {
  constructor() {
    this.unsubscribe = on(EVENTS.UI_THEME_CHANGED, this.handleThemeChange);
  }
  
  handleThemeChange = (theme) => {
    this.updateTheme(theme);
  }
  
  destroy() {
    this.unsubscribe(); // Prevenir memory leaks
  }
}
```

### Emisión con Payload

```javascript
import { emit } from './core/events/bus.js';
import { EVENTS } from './core/events/types.js';

emit(EVENTS.CMD_EXEC, {
  command: 'help',
  result: 'Available commands: ...',
  timestamp: Date.now()
});
```

### Comunicación Entre Módulos

```javascript
// Módulo A - Emite evento
import { emit } from './core/events/bus.js';
import { EVENTS } from './core/events/types.js';

export function bootSystem() {
  emit(EVENTS.SYS_BOOT);
}

// Módulo B - Escucha evento
import { on } from './core/events/bus.js';
import { EVENTS } from './core/events/types.js';

on(EVENTS.SYS_BOOT, () => {
  console.log('Sistema iniciado desde otro módulo');
});
```

---

## Características

### Manejo de Errores

El sistema es resiliente: si un listener falla, no afecta a los demás.

### Memory Leak Prevention

`on()` retorna función de cleanup para prevenir memory leaks.

### Desacoplamiento Total

- Emisores no conocen a los receptores
- Receptores no conocen a los emisores
- Comunicación mediada por el event bus

---

## Buenas Prácticas

### 1. Usar siempre el diccionario

```javascript
// ✅ Correcto
import { EVENTS } from './core/events/types.js';
on(EVENTS.SYS_BOOT, callback);

// ❌ Incorrecto
on('sys:boot', callback); // Propenso a errores
```

### 2. Cleanup de suscriptores

```javascript
// ✅ Correcto
const unsubscribe = on(EVENTS.SYS_BOOT, callback);
// ... usar unsubscribe() cuando sea necesario

// ❌ Incorrecto
on(EVENTS.SYS_BOOT, callback); // Memory leak potencial
```

### 3. Payload estructurado

```javascript
// ✅ Correcto
emit(EVENTS.CMD_EXEC, {
  command: 'help',
  result: '...',
  timestamp: Date.now()
});

// ❌ Incorrecto
emit(EVENTS.CMD_EXEC, 'help result');
```

---

## Integración con el Tema

Los nombres de eventos siguen la estética cyberpunk/terminal:

- `sys:boot` - Mensaje de sistema
- `cmd:exec` - Comando de terminal
- Logging estilo debugging: `[EventBus] Error...`

Este sistema proporciona comunicación desacoplada manteniendo la estética y filosofía del proyecto.