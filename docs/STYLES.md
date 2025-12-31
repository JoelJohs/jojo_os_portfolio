# Sistema de Estilos

## Arquitectura CSS

Sigo una metodología **ITCSS** (Inverted Triangle CSS) adaptada:

1. **reset.css** - Reset y configuraciones base (Capa 1)
2. **vars.css** - Variables CSS (Capa 2) 
3. **base.css** - Estilos base y componentes (Capa 3)
4. **layout.css** - Layout y estructura (Capa 4)

---

## reset.css

Establezco base consistente entre navegadores y configuraciones iniciales.

### Características principales

- **Box-sizing**: Aplico el modelo `border-box` de Paul Irish a todos los elementos
- **Reset básico**: Elimino márgenes y padding de elementos comunes
- **Configuración body**: 
  - `min-height: 100vh` - Aseguro que el body ocupe toda la pantalla
  - `overflow-x: hidden` - Previene scroll horizontal no deseado
  - `-webkit-font-smoothing: antialiased` - Mejoro renderizado de fuentes
- **Reset de formularios**: Elimino estilos por defecto de inputs, buttons y textareas

### Por qué esta estructura

- El box-sizing border-box hace que los cálculos de dimensiones sean intuitivos
- El reset asegura consistencia visual entre navegadores
- Las configuraciones base establecen el fundamento para el tema cyberpunk

---

## vars.css

Defino todo el sistema de diseño mediante variables CSS personalizadas.

### Estructura de variables

#### 1. Paleta de Colores (The "Look")

- **Fondos**: Jerarquía de oscuros con tintes azules
  - `--bg-deep-space`: Casi negro, base del tema
  - `--bg-navy`: Para paneles secundarios
  - `--bg-panel`: Para ventanas/tarjetas
- **Primarios**: Violets & Purples (colores principales del tema)
- **Acentos**: Azules eléctricos (texto informativo)
- **Estado**: Scarlet & Blood (errores, alertas)

#### 2. Tipografía

- `--font-mono`: Fira Code para código y texto técnico
- `--font-display`: Orbitron para títulos grandes (opcional)

#### 3. Efectos (The "Juice")

- **Sombras de neón**: Predefinidas para efectos glow
- **Bordes**: Estilos consistentes para elementos UI
- **UI**: Variables de espaciado y radio de bordes

### Por qué esta organización

- **Mantenibilidad**: Cambiar el tema completo solo requiere modificar este archivo
- **Consistencia**: Todos los componentes usan las mismas variables
- **Legibilidad**: Nombres descriptivos que indican su propósito

---

## base.css

Estilos base para componentes principales y efectos visuales clave.

### Componentes principales

#### 1. Scanlines Effect

```css
.scanlines
```

- **Propósito**: Crear efecto de monitor CRT antiguo
- **Implementación**: Gradiente lineal repetido cada 4px
- **Características**:
  - `position: fixed` - Cubre toda la pantalla
  - `pointer-events: none` - No interfiere con interacciones
  - `z-index: 9999` - Siempre visible por encima del contenido
  - `opacity: 0.6` - Sutil pero perceptible

#### 2. Boot Screen

```css
.boot-screen
```

- **Propósito**: Pantalla de carga/arrque estilo terminal
- **Layout**: Flexbox centrado vertical y horizontalmente
- **Usos**: Pantalla inicial, estados de carga, sección principal

#### 3. Títulos y Estado

```css
h1, .status
```

- **Títulos**: Usan variables de neón con efecto glow
- **Estado**: Elementos de alerta con borde y fondo sutil

### Por qué estos estilos en base.css

- Son componentes reutilizables en toda la aplicación
- Definen la identidad visual principal del tema
- Usan las variables de vars.css para mantener consistencia

---

## layout.css

Define la estructura principal del layout con sistema viewport/terminal-dock.

### Estructura Principal

#### Layout 75/25 Split

```css
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--bg-deep-space);
}

#viewport {
  flex: 1; /* 75vh del espacio */
  position: relative;
  overflow-y: auto;
  background: linear-gradient(
    135deg,
    var(--bg-deep-space) 0%,
    var(--bg-navy) 50%,
    var(--bg-panel) 100%
  );
  border-bottom: 2px solid var(--primary-dim);
  box-shadow: 0 2px 10px rgba(188, 19, 254, 0.2);
}

#terminal-dock {
  height: 25vh; /* 25vh del espacio */
  min-height: 200px;
  background: linear-gradient(
    to bottom,
    rgba(2, 2, 10, 0.9),
    rgba(10, 10, 22, 0.95)
  );
  border-top: 1px solid rgba(188, 19, 254, 0.3);
  box-shadow: 0 -5px 20px rgba(188, 19, 254, 0.1);
  position: relative;
}
```

#### Terminal Integration

```css
x-terminal {
  height: 100%;
  width: 100%;
  margin: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  position: relative;
}
```

### Características del Layout

- **Responsive**: Adaptable a cualquier tamaño de pantalla
- **Cyberpunk Aesthetics**: Gradientes y efectos de neón
- **Performance**: Optimizado con CSS puro
- **Accessibility**: Estructura semántica HTML5

### Por qué esta estructura

- **Separación clara**: Viewport para GUI, dock para CLI
- **Proporciones fijas**: 75/25 para balance visual
- **Efectos visuales**: Gradientes y sombras cyberpunk
- **Flexibilidad**: Contenido dinámico en viewport

---

## Componentes Específicos

### components/terminal.css

Estilos especializados para el componente terminal:

```css
x-terminal {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}

/* Efectos CRT integrados */
x-terminal::before {
  /* Scanlines effect */
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
}

x-terminal::after {
  /* Viñeteado */
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
}
```

### components/header.css

Estilos para sistema de navegación y headers:

```css
.system-header {
  background: rgba(17, 17, 37, 0.8);
  border-bottom: 1px solid rgba(188, 19, 254, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-tabs {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  height: 3rem;
  gap: 0.5rem;
}
```

---

## Flujo de Trabajo de Estilos

1. **Definir tema** en `vars.css`
2. **Resetear base** en `reset.css` 
3. **Crear componentes** en `base.css`
4. **Estructurar layout** en `layout.css`
5. **Estilos específicos** en `components/`
6. **Importar en orden** en el HTML principal

Este enfoque asegura:

- **Consistencia** visual mediante variables
- **Mantenibilidad** con separación de responsabilidades
- **Escalabilidad** para futuros componentes
- **Performance** con CSS optimizado y vanilla
- **Modularidad** con componentes específicos