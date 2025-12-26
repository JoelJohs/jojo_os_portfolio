# Sistema de Estilos - Documentación

## Arquitectura CSS

El sistema de estilos sigue una metodología **ITCSS** (Inverted Triangle CSS) adaptada:

1. **reset.css** - Reset y configuraciones base (Capa 1)
2. **vars.css** - Variables CSS (Capa 2) 
3. **base.css** - Estilos base y componentes (Capa 3)
4. **layout.css** - Layout y estructura (Capa 4)

---

## reset.css

**Propósito**: Establecer base consistente entre navegadores y configuraciones iniciales.

### Características principales:

- **Box-sizing**: Aplica el modelo `border-box` de Paul Irish a todos los elementos
- **Reset básico**: Elimina márgenes y padding de elementos comunes
- **Configuración body**: 
  - `min-height: 100vh` - Asegura que el body ocupe toda la pantalla
  - `overflow-x: hidden` - Previene scroll horizontal no deseado
  - `-webkit-font-smoothing: antialiased` - Mejora renderizado de fuentes
- **Reset de formularios**: Elimina estilos por defecto de inputs, buttons y textareas

### Por qué esta estructura:
- El box-sizing border-box hace que los cálculos de dimensiones sean intuitivos
- El reset asegura consistencia visual entre navegadores
- Las configuraciones base establecen el fundamento para el tema cyberpunk

---

## vars.css

**Propósito**: Definir todo el sistema de diseño mediante variables CSS personalizadas.

### Estructura de variables:

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

### Por qué esta organización:
- **Mantenibilidad**: Cambiar el tema completo solo requiere modificar este archivo
- **Consistencia**: Todos los componentes usan las mismas variables
- **Legibilidad**: Nombres descriptivos que indican su propósito

---

## base.css

**Propósito**: Estilos base para componentes principales y efectos visuales clave.

### Componentes principales:

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

### Por qué estos estilos en base.css:
- Son componentes reutilizables en toda la aplicación
- Definen la identidad visual principal del tema
- Usan las variables de vars.css para mantener consistencia

---

## layout.css

**Propósito**: (Actualmente vacío) Destinado a estructuras de layout principales.

### Uso previsto:
- Grid systems
- Estructuras de página
- Componentes de navegación
- Layouts responsivos

### Por qué está separado:
- Mantiene base.css enfocado en componentes y efectos
- Permitirá evolucionar el layout sin afectar estilos base
- Sigue la separación de responsabilidades de ITCSS

---

## Flujo de Trabajo de Estilos

1. **Definir tema** en `vars.css`
2. **Resetear base** en `reset.css` 
3. **Crear componentes** en `base.css`
4. **Estructurar layout** en `layout.css`
5. **Importar en orden** en el HTML principal

Este enfoque asegura:
- **Consistencia** visual mediante variables
- **Mantenibilidad** con separación de responsabilidades
- **Escalabilidad** para futuros componentes
- **Performance** con CSS optimizado y vanilla