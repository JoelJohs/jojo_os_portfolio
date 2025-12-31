# Sistema de Viewport y Navegación

## Arquitectura General

El sistema de viewport gestiona el contenido dinámico del área principal (75vh) respondiendo a comandos de navegación desde la terminal. Implementa un sistema de routing simple basado en eventos.

---

## Estructura de Componentes

```
┌── Viewport System
    ├── UI Layer
    │   ├── #viewport (main container)
    │   └── #content-stage (dynamic content area)
    ├── Core Logic
    │   ├── viewport.js (navigation controller)
    │   └── ROUTES (content definitions)
    └── Communication
        ├── events/bus.js (pub/sub system)
        └── EVENTS.NAV_NAVIGATE (navigation trigger)
```

---

## Viewport Controller (viewport.js)

### Sistema de Routing

```javascript
import { on } from "../events/bus.js";
import { EVENTS } from "../events/types.js";

const ROUTES = {
  home: "<h1>HOME SECURE SERVER</h1><p>Welcome back, User.</p>",
  about: "<x-profile-card></x-profile-card>",
  projects: "<h1>PROJECTS GRID</h1><p>Loading modules...</p>",
  contact: "<h1>ENCRYPTED CHANNEL</h1><p>Send a message...</p>",
};
```

### Inicialización

```javascript
export function initViewport() {
  const stage = document.getElementById("content-stage");
  if (!stage) return;

  // 1. Establecer contenido inicial
  stage.innerHTML = ROUTES.home;

  // 2. Escuchar eventos de navegación
  on(EVENTS.NAV_NAVIGATE, (route) => {
    const content = ROUTES[route] || "<h1>404 NOT FOUND</h1><p>Route does not exist.</p>";
    
    if (content) {
      // 3. Aplicar transición simple
      stage.innerHTML = content;

      // 4. Configurar componentes dinámicos
      if (route === "about") {
        const card = stage.querySelector("x-profile-card");
        if (card) {
          card.data = {
            name: "Joel Johs",
            role: "SysAdmin", 
            stats: { str: "MAX", int: "MAX" },
          };
        }
      }
    }
  });
}
```

---

## Flujo de Navegación

### Comunicación entre Componentes

```
Terminal (user input) → Shell → NAV_NAVIGATE event → Viewport → Content Update
```

### Paso a Paso

1. **Input Usuario**: Usuario escribe `about` en terminal
2. **Shell Processing**: Shell emite `emit(EVENTS.NAV_NAVIGATE, "about")`
3. **Viewport Response**: Viewport escucha evento y actualiza contenido
4. **Component Setup**: Se configuran componentes dinámicos (ProfileCard)
5. **Visual Update**: Contenido nuevo se renderiza en viewport

---

## Sistema de Rutas

### Rutas Disponibles

| Ruta | Contenido | Componentes |
|------|-----------|-------------|
| **home** | Mensaje de bienvenida | Texto estático |
| **about** | Perfil personal | `x-profile-card` |
| **projects** | Grid de proyectos | Placeholder |
| **contact** | Formulario contacto | Placeholder |
| **404** | Página no encontrada | Texto error |

### Contenido Dinámico

#### Route: about

```javascript
// Configuración automática del ProfileCard
if (route === "about") {
  const card = stage.querySelector("x-profile-card");
  if (card) {
    card.data = {
      name: "Joel Johs",
      role: "SysAdmin",
      stats: { str: "MAX", int: "MAX" },
    };
  }
}
```

---

## Manejo de Errores

### Ruta No Encontrada

```javascript
const content = ROUTES[route] || "<h1>404 NOT FOUND</h1><p>Route does not exist.</p>";
```

### Elementos Faltantes

```javascript
const stage = document.getElementById("content-stage");
if (!stage) return; // Salida temprana si no existe el contenedor
```

---

## Integración con el Sistema

### Eventos que ESCUCHA

```javascript
on(EVENTS.NAV_NAVIGATE, (route) => {
  // Procesa navegación a nueva ruta
});
```

### Dependencias

- **events/bus.js**: Sistema de comunicación pub/sub
- **events/types.js**: Definición de constantes de eventos
- **Componentes UI**: Web Components como `x-profile-card`

---

## Características Técnicas

### Performance

- **Efficient DOM**: Actualización mínima del DOM
- **Event-Driven**: Comunicación desacoplada
- **Simple Transitions**: Sin animaciones complejas

### Seguridad

- **Sanitización**: Contenido HTML controlado
- **Validation**: Validación de rutas existentes
- **Error Boundaries**: Manejo graceful de errores

### Extensibilidad

- **Fácil agregar rutas**: Solo agregar a objeto ROUTES
- **Component setup**: Configuración personalizada por ruta
- **Flexible content**: Soporta HTML, Web Components, texto

---

## Mejoras Futuras

### Transiciones Animadas

```javascript
// Futuro: transiciones suaves entre rutas
stage.style.opacity = "0";
setTimeout(() => {
  stage.innerHTML = content;
  stage.style.opacity = "1";
}, 300);
```

### Routing Avanzado

```javascript
// Futuro: rutas con parámetros
const ROUTES = {
  "project/:id": (params) => `<h1>Project ${params.id}</h1>`,
  "user/:name": (params) => `<h1>User Profile: ${params.name}</h1>`,
};
```

### Lazy Loading

```javascript
// Futuro: carga dinámica de componentes
const loadComponent = async (route) => {
  if (route === "projects") {
    const { ProjectsGrid } = await import("../components/ProjectsGrid.js");
    return "<projects-grid></projects-grid>";
  }
};
```

---

## Buenas Prácticas

### Separación de Responsabilidades

- **Viewport.js**: Control de navegación únicamente
- **Shell.js**: Procesamiento de comandos
- **Components.js**: Lógica de componentes específicos

### Consistencia

- **Mensajes cyberpunk**: "ACCESSING sector: HOME"
- **Error handling**: 404 con mensaje claro
- **Data patterns**: Estructura consistente para datos de componentes

### Mantenibilidad

- **Rutas centralizadas**: Objeto ROUTES único
- **Event constants**: Uso de EVENTS.NAV_NAVIGATE
- **Clear interfaces**: Métodos con nombres descriptivos

---

## Resumen de Beneficios

### Para Desarrolladores

- **Modular**: Sistema desacoplado y extensible
- **Debuggable**: Flujo claro y logging implícito
- **Maintainable**: Código organizado y predecible
- **Testable**: Componentes aislados y mocks sencillos

### Para Usuarios

- **Responsive**: Navegación instantánea
- **Consistente**: Misma estética cyberpunk en todas las rutas
- **Intuitivo**: Comandos simples y claros
- **Robusto**: Manejo elegante de errores

### Para el Sistema

- **Performance**: Mínimo impacto en rendimiento
- **Scalable**: Fácil agregar nuevas rutas y componentes
- **Secure**: Control de contenido y validación
- **Flexible**: Adaptable a diferentes tipos de contenido

Este sistema proporciona una base sólida para experiencias de navegación integradas con terminal, manteniendo la estética cyberpunk y las mejores prácticas de desarrollo web moderno.