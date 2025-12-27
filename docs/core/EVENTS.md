# Sistema de Eventos - Documentación Completa

## ¿Qué es el Sistema de Eventos?

Imagina que tienes una oficina grande con muchas personas (componentes) que necesitan comunicarse entre sí. En lugar de que cada persona grite o corra a hablar directamente con otras, tenemos un sistema de intercomunicación (event bus) que permite:

- **Cualquiera puede enviar un mensaje** (emitir un evento)
- **Cualquiera puede escuchar mensajes específicos** (suscribirse a eventos)
- **Nadie necesita conocer a nadie directamente** (desacoplamiento)

Este sistema es exactamente eso: una forma de que diferentes partes de tu aplicación se comuniquen sin estar directamente conectadas.

---

## Arquitectura de Archivos

El sistema de eventos vive en dos archivos principales:

```
src/core/events/
├── types.js       # El "diccionario" de todos los eventos posibles
└── bus.js         # El "sistema de intercomunicación" que maneja los mensajes
```

**Analogía:** 
- `types.js` es como el directorio telefónico que lista todos los posibles "extensiones" (eventos)
- `bus.js` es como el sistema de intercomunicación que conecta las llamadas

---

## types.js - El Diccionario de Eventos

### ¿Por qué necesitamos un diccionario?

Imagina que en una oficina grande, la gente grita nombres de departamentos diferentes:
- Alguien grita "¡Ventas!" y otro "¡ventas!" (diferente capitalización)
- Otro grita "¡Departamento de Ventas!" en lugar de solo "Ventas"
- Otro escribe "Vtas" (abreviado)

Esto causaría confusión, ¿verdad? El diccionario `types.js` resuelve este problema estableciendo **nombres oficiales y consistentes** para todos los eventos.

### Estructura del Diccionario

```javascript
export const EVENTS = {
  // Sistema - Eventos del sistema operativo
  SYS_BOOT: "sys:boot",           // Cuando la computadora se enciende
  SYS_SHUTDOWN: "sys:shutdown",   // Cuando la computadora se apaga

  // UI - Eventos de la interfaz de usuario
  UI_THEME_CHANGED: "ui:theme_changed",  // Cuando cambias el tema visual

  // CLI - Eventos de la terminal (línea de comandos)
  CLI_INPUT: "cli:input",    // Cuando escribes y presionas Enter
  CLI_OUTPUT: "cli:output",  // Cuando el sistema te responde
  CLI_CLEAR: "cli:clear",    // Cuando limpias la pantalla

  // CMD - Eventos de comandos específicos
  CMD_NOT_FOUND: "cmd:not_found",  // Cuando escribes un comando que no existe
  CMD_EXEC: "cmd:exec",            // Cuando un comando se ejecuta
};
```

### Entendiendo el Formato de Nombres

**Formato:** `CATEGORIA:ACCION`

**Ejemplos explicados:**
- `sys:boot` → "Sistema:Arrancar" → El sistema está arrancando
- `cli:input` → "Terminal:Entrada" → Alguien escribió en la terminal
- `cmd:exec` → "Comando:Ejecutar" → Un comando se está ejecutando

**Categorías explicadas:**
- `sys` = Eventos del sistema (como encender/apagar la computadora)
- `ui` = Eventos de la interfaz (como cambiar colores o temas)
- `cli` = Eventos de la terminal (como escribir comandos)
- `cmd` = Eventos de comandos específicos (como ejecutar "help" o "clear")

### Beneficios Prácticos del Diccionario

**1. Prevención de Errores de Tipeo**
```javascript
// ❌ MAL - Propenso a errores
on('syst:boot', callback);  // Error de tipeo! 'syst' en lugar de 'sys'

// ✅ BUENO - Seguro
on(EVENTS.SYS_BOOT, callback);  // Tu IDE te ayuda y no hay errores de tipeo
```

**2. Autocompletado en tu Editor**
Cuando escribes `EVENTS.`, tu editor te muestra todos los eventos disponibles, como un menú de opciones.

**3. Cambios Seguros**
Si necesitas cambiar el nombre de un evento, solo lo cambias en un lugar (el diccionario) y se actualiza en toda la aplicación.

**4. Documentación Viva**
El diccionario mismo es la lista de todos los eventos que existen. No necesitas buscar en otro lugar.

---

## bus.js - El Sistema de Comunicación

### ¿Cómo funciona el Event Bus?

Imagina una oficina con un sistema de intercomunicación:

1. **Registro de Suscriptores**: Las personas dicen "quiero escuchar mensajes sobre 'Ventas'"
2. **Envío de Mensajes**: Alguien envía un mensaje "Hay un cliente en Ventas"
3. **Distribución**: El sistema intercomunicación avisa a todos los que se registraron para escuchar mensajes de "Ventas"

El event bus funciona exactamente así.

### Estructura Interna del Sistema

```javascript
const subscribers = {};
// Esto se ve así internamente:
// {
//   "sys:boot": [función1, función2, función3],
//   "ui:theme_changed": [función4, función5],
//   "cli:input": [función6]
// }
```

**Explicación:**
- **Claves** (las comillas): Los nombres de los eventos
- **Valores** (los corchetes): Listas de funciones que quieren escuchar ese evento

---

## Las Tres Funciones Principales

### 1. `on(eventName, callback)` - "Quiero escuchar este evento"

**Propósito:** Registrarse para recibir notificaciones cuando ocurra un evento específico.

**Analogía:** Es como decirle al recepcionista "Avisame cuando llegue alguien del departamento de Ventas".

**Parámetros:**
- `eventName`: El nombre del evento que quieres escuchar (ej: `'sys:boot'`)
- `callback`: La función que se ejecutará cuando ocurra el evento

**Retorno:** Una función especial para cancelar la suscripción (muy importante para evitar problemas)

**Ejemplo completo y explicado:**
```javascript
import { on } from './core/events/bus.js';
import { EVENTS } from './core/events/types.js';

// Me registro para escuchar cuando el sistema arranque
const unsubscribe = on(EVENTS.SYS_BOOT, () => {
  console.log('¡El sistema arrancó! Hago algo ahora...');
});

// Más tarde, si ya no quiero escuchar...
unsubscribe();  // Cancelo mi suscripción
```

**¿Qué pasa internamente?**
1. El sistema busca si ya hay alguien escuchando `sys:boot`
2. Si no hay, crea una lista vacía para ese evento
3. Agrega tu función a la lista de interesados
4. Te devuelve una función para que puedas cancelar cuando quieras

### 2. `emit(eventName, payload)` - "Enviar un mensaje a todos"

**Propósito:** Enviar una notificación a todos los que están escuchando un evento específico.

**Analogía:** Es como enviar un anuncio por el intercomunicación "Atención: El sistema está arrancando".

**Parámetros:**
- `eventName`: El nombre del evento que estás enviando (ej: `'sys:boot'`)
- `payload`: Datos adicionales que quieres enviar (opcional)

**Ejemplo completo y explicado:**
```javascript
import { emit } from './core/events/bus.js';
import { EVENTS } from './core/events/types.js';

// Envío el evento de arranque del sistema
emit(EVENTS.SYS_BOOT, { 
  timestamp: Date.now(),
  user: 'admin'
});
```

**¿Qué pasa internamente?**
1. El sistema busca quiénes están escuchando `sys:boot`
2. Ejecuta todas las funciones registradas para ese evento
3. Les pasa el payload (datos adicionales) a cada una
4. Si alguna función falla, no afecta a las demás (el sistema es resistente)

### 3. `off(eventName, callback)` - "No quiero escuchar más este evento"

**Propósito:** Cancelar una suscripción específica.

**Analogía:** Es como decirle al recepcionista "Ya no me avises cuando llegue alguien de Ventas".

**Nota:** Esta función es interna, normalmente la usas a través de la función que te devuelve `on()`.

---

## Patrones de Uso Prácticos

### Patrón 1: Componente que Escucha Eventos

```javascript
class TerminalComponent {
  constructor() {
    // Me registro para escuchar cuando el tema cambie
    this.unsubscribe = on(EVENTS.UI_THEME_CHANGED, this.handleThemeChange);
  }
  
  // Esta función se ejecutará cada vez que el tema cambie
  handleThemeChange = (newTheme) => {
    console.log(`Cambiando tema a: ${newTheme}`);
    this.updateColors(newTheme);
  }
  
  // Método para limpiar cuando el componente se destruye
  destroy() {
    console.log('Destruyendo componente, cancelando suscripciones...');
    this.unsubscribe();  // ¡Muy importante para evitar memory leaks!
  }
}

// Uso:
const terminal = new TerminalComponent();
// ... el componente funciona y escucha eventos
terminal.destroy();  // Limpieza propera
```

### Patrón 2: Módulo que Envía Eventos

```javascript
// En un archivo de comandos de terminal
import { emit } from './core/events/bus.js';
import { EVENTS } from './core/events/types.js';

export function executeCommand(command) {
  console.log(`Ejecutando comando: ${command}`);
  
  // Envío evento de que se está ejecutando un comando
  emit(EVENTS.CMD_EXEC, {
    command: command,
    timestamp: Date.now(),
    status: 'executing'
  });
  
  // ... lógica del comando aquí
  
  // Envío evento de que el comando terminó
  emit(EVENTS.CMD_EXEC, {
    command: command,
    timestamp: Date.now(),
    status: 'completed',
    result: 'Command executed successfully'
  });
}
```

### Patrón 3: Comunicación Entre Módulos que no se Conocen

```javascript
// Módulo A: Sistema de arranque
// No sabe nada sobre el Módulo B
import { emit } from './core/events/bus.js';
import { EVENTS } from './core/events/types.js';

export function bootSystem() {
  console.log('Iniciando sistema...');
  
  // Envío evento sin saber quién lo escuchará
  emit(EVENTS.SYS_BOOT, { bootTime: Date.now() });
}

// Módulo B: Logger de sistema
// No sabe nada sobre el Módulo A
import { on } from './core/events/bus.js';
import { EVENTS } from './core/events/types.js';

// Me registro para escuchar arranques del sistema
on(EVENTS.SYS_BOOT, (data) => {
  console.log(`[LOGGER] Sistema arrancó a las ${new Date(data.bootTime)}`);
});
```

**Beneficio clave:** El Módulo A y el Módulo B nunca se importan directamente entre sí. Se comunican a través del event bus, lo que los hace completamente independientes.

---

## Características Avanzadas y Protección

### Manejo de Errores Inteligente

```javascript
// Dentro de emit(), el sistema hace esto:
subscribers[eventName].forEach((callback) => {
  try {
    callback(payload);  // Ejecuta la función del suscriptor
  } catch (error) {
    // Si una función falla, no deja que las demás dejen de funcionar
    console.error(`[EventBus] Error en listener para "${eventName}":`, error);
  }
});
```

**¿Por qué es importante?**
Imagina que 10 personas están escuchando un evento y la persona #5 tiene un error en su código. Sin esta protección, las personas #6, #7, #8, #9 y #10 nunca recibirían el mensaje. Con este sistema, solo la persona #5 falla, las demás siguen funcionando.

### Prevención de Memory Leaks

**¿Qué es un memory leak?**
Es como suscribirte a un boletín de noticias pero nunca darte de baja. Con el tiempo, tu buzón se llena de correos que no lees, consumiendo memoria y recursos.

**¿Cómo lo prevenimos?**
```javascript
// ❌ MAL - Memory leak potencial
on(EVENTS.SYS_BOOT, callback);  // Nunca te das de baja

// ✅ BUENO - Cleanup propero
const unsubscribe = on(EVENTS.SYS_BOOT, callback);
// ... cuando ya no necesitas escuchar
unsubscribe();  // Te das de baja correctamente
```

### Debug y Desarrollo

El sistema expone una interfaz de debugging en el navegador:

```javascript
// En la consola del navegador puedes hacer:
window.SystemBus.subscribers;  // Ver todos los suscriptores activos
window.SystemBus.emit('sys:boot');  // Enviar eventos manualmente para probar
```

---

## Integración con el Tema Cyberpunk/Terminal

El sistema de eventos está diseñado para complementar la estética de terminal de computadora antigua:

**Nombres de eventos estilo sistema:**
- `sys:boot` → Suena como mensaje de sistema real
- `cmd:exec` → Parece comando de terminal auténtico

**Logging estilo debugging:**
- Los errores se muestran como `[EventBus] Error...` 
- Parece salida de consola de sistema real

**Comunicación desacoplada:**
- Simula cómo los componentes de un sistema real se comunican
- Cada módulo funciona como un "proceso" independiente

---

## Buenas Prácticas y Errores Comunes

### ✅ Práctica 1: Siempre usar el diccionario

```javascript
// ✅ CORRECTO - Seguro y consistente
import { EVENTS } from './core/events/types.js';
on(EVENTS.SYS_BOOT, callback);

// ❌ INCORRECTO - Propenso a errores
on('sys:boot', callback);  // Podrías escribir 'syst:boot' por error
```

### ✅ Práctica 2: Siempre hacer cleanup

```javascript
// ✅ CORRECTO - Sin memory leaks
class Component {
  constructor() {
    this.unsubscribe = on(EVENTS.SYS_BOOT, this.handleBoot);
  }
  
  destroy() {
    this.unsubscribe();  // Limpieza propera
  }
}

// ❌ INCORRECTO - Memory leak potencial
class Component {
  constructor() {
    on(EVENTS.SYS_BOOT, this.handleBoot);  // Nunca te das de baja
  }
}
```

### ✅ Práctica 3: Nombres descriptivos

```javascript
// ✅ CORRECTO - Claros y específicos
CLI_INPUT: "cli:input",      // Entrada de terminal
CMD_EXEC: "cmd:exec",        // Ejecución de comando

// ❌ INCORRECTO - Vagos o confusos
CLICK: "click",              // ¿Qué click? ¿Dónde?
STUFF: "stuff",              // ¿Qué cosa?
```

### ✅ Práctica 4: Payload estructurado

```javascript
// ✅ CORRECTO - Datos organizados y claros
emit(EVENTS.CMD_EXEC, {
  command: 'help',
  result: 'Available commands: help, clear, exit',
  timestamp: Date.now(),
  user: 'admin'
});

// ❌ INCORRECTO - Datos desorganizados
emit(EVENTS.CMD_EXEC, 'help result admin 12345');  // ¿Qué significa cada cosa?
```

---

## Resumen y Cuándo Usar

### ¿Cuándo usar el sistema de eventos?

**Usa eventos cuando:**
- Múltiples componentes necesitan reaccionar a lo mismo
- Los componentes no deben conocerse directamente
- Quieres una arquitectura modular y desacoplada
- Necesitas comunicación asíncrona entre partes de la app

**No uses eventos cuando:**
- Solo necesitas una llamada directa a una función
- Los componentes están naturalmente acoplados
- Necesitas un valor de retorno inmediato
- La comunicación es simple y puntual

### Analogía Final

Piensa en el sistema de eventos como el **sistema nervioso** de tu aplicación:

- **Eventos** = Señales nerviosas (información que se transmite)
- **Suscriptores** = Receptores nerviosos (partes que reaccionan)
- **Event Bus** = El sistema nervioso central (coordina todo)
- **Desacoplamiento** = Cada parte funciona independientemente pero en conjunto

Este sistema permite que tu aplicación crezca de manera modular, mantenible y robusta, manteniendo cada parte independiente pero perfectamente coordinada.