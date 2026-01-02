# Portfolio Vanilla - Índice de Documentación

> **🚀 Acceso Rápido** → [Guía de Arquitectura](./ARCHITECTURE.md) | [Sistemas Centrales](./CORE_SYSTEMS.md) | [Nuevas Características](./NEW_FEATURES.md) | [Componentes de UI](./UI_COMPONENTS.md) | [Guía de Estilos](./STYLING.md)

---

## 📚 Estructura de la Documentación

### 📖 Guías Principales

| Guía | Descripción | Enlaces Rápidos |
|-------|-------------|-------------|
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Arquitectura completa del sistema y estructura del proyecto | [Estructura del Proyecto](./ARCHITECTURE.md#project-structure) • [Conceptos Centrales](./ARCHITECTURE.md#core-concepts) |
| **[CORE_SYSTEMS.md](./CORE_SYSTEMS.md)** | Sistemas de terminal, viewport, i18n y eventos | [Sistema de Terminal](./CORE_SYSTEMS.md#terminal-system) • [Eventos](./CORE_SYSTEMS.md#event-system) • [I18n](./CORE_SYSTEMS.md#i18n-system) |
| **[UI_COMPONENTS.md](./UI_COMPONENTS.md)** | Arquitectura de componentes y ejemplos | [Átomos](./UI_COMPONENTS.md#atoms) • [Moléculas](./UI_COMPONENTS.md#molecules) • [Organismos](./UI_COMPONENTS.md#organisms) |
| **[STYLING.md](./STYLING.md)** | Arquitectura CSS, variables y sistema de diseño | [Variables CSS](./STYLING.md#css-variables) • [Layout](./STYLING.md#layout-system) • [Componentes](./STYLING.md#component-styles) |
| | **[NEW_FEATURES.md](./NEW_FEATURES.md)** | Documentación completa de todas las características recién implementadas | [Sistema de Terminal](./NEW_FEATURES.md#terminal-system-enhancements) • [Sistema i18n](./NEW_FEATURES.md#internationalization-system) • [Rejilla de Proyectos](./NEW_FEATURES.md#project-management-system) |

---

## 🎯 Inicio Rápido

### ¿Nuevo en el Proyecto?
1. **[Visión General de la Arquitectura](./ARCHITECTURE.md)** - Entiende el panorama general
2. **[Sistemas Centrales](./CORE_SYSTEMS.md)** - Aprende sobre la terminal y la navegación
3. **[Nuevas Características](./NEW_FEATURES.md)** - Explora todas las características implementadas
4. **[Componentes de UI](./UI_COMPONENTS.md)** - Construye interfaces
5. **[Estilos](./STYLING.md)** - Aplica el tema cyberpunk

### ¿Necesitas Información Específica?
- **¿Nuevas Características?** → [Nuevas Características → Lista Completa](./NEW_FEATURES.md#-quick-access)
- **¿Comandos de la Terminal?** → [Sistemas Centrales → Terminal](./CORE_SYSTEMS.md#terminal-system)
- **¿Añadir un Componente?** → [Componentes de UI → Arquitectura](./UI_COMPONENTS.md#component-architecture)
- **¿Cambiar el Tema?** → [Estilos → Variables](./STYLING.md#css-variables)
- **¿Internacionalización?** → [Sistemas Centrales → i18n](./CORE_SYSTEMS.md#i18n-system)

---

## 🏗️ Visión General del Proyecto

```
portfolio_vanilla/
├── docs/                     # 📚 Documentación (este directorio)
│   ├── README.md             # Este índice
│   ├── ARCHITECTURE.md       # Guía completa de arquitectura
│   ├── CORE_SYSTEMS.md       # Terminal, eventos, i18n, viewport
│   ├── UI_COMPONENTS.md      # Arquitectura de componentes y ejemplos
│   ├── STYLING.md           # Arquitectura CSS y sistema de diseño
│   └── NEW_FEATURES.md      # Documentación completa de nuevas implementaciones
├── src/                      # 💻 Código fuente
│   ├── core/                # Lógica de negocio central
│   ├── ui/                  # Componentes de la interfaz de usuario
│   ├── styles/              # CSS y estilos
│   └── main.js              # Punto de entrada de la aplicación
└── index.html               # 🌐 Archivo HTML principal
```

---

## 🔧 Pila Tecnológica

- **🎨 HTML5** - Marcado semántico y estructura
- **⚡ Vanilla CSS3** - Metodología ITCSS con tema cyberpunk
- **🟨 JavaScript ES6+** - Características modernas sin frameworks
- **🧩 Web Components** - Arquitectura de componentes reutilizables
- **🌍 i18n** - Sistema de internacionalización
- **🎯 Sistema de Eventos** - Patrón de comunicación Pub/sub

---

## 🎨 Filosofía de Diseño

### Tema Cyberpunk/Neón
- Fondos de espacio profundo con acentos de neón
- Efectos CRT (scanlines, glitch)
- Elementos de UI inspirados en la terminal
- Legibilidad de alto contraste

### Principios Centrales
- **Vanilla Primero** - Sin frameworks externos
- **Basado en Componentes** - Metodología de diseño atómico
- **Rendimiento Optimizado** - Dependencias mínimas
- **Arquitectura Modular** - Clara separación de responsabilidades

---

## 🚀 Empezando

### Prerrequisitos
- Navegador web moderno con soporte para ES6+
- Conocimientos básicos de HTML/CSS/JavaScript
- Comprensión del flujo de trabajo de Git

### Configuración de Desarrollo
```bash
# Clonar repositorio
git clone <url-del-repositorio>
cd portfolio_vanilla

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

### Análisis Profundo de la Estructura del Proyecto
Para una explicación detallada de cada directorio y archivo, consulta la [Guía Completa de Arquitectura](./ARCHITECTURE.md).

---

## 📖 Guía de Documentación

### Cómo Usar Esta Documentación

1. **[README.md](./README.md)** - Este índice y visión general
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura del sistema y patrones
3. **[CORE_SYSTEMS.md](./CORE_SYSTEMS.md)** - Terminal, eventos y lógica de negocio
4. **[NEW_FEATURES.md](./NEW_FEATURES.md)** - Documentación completa de nuevas implementaciones
5. **[UI_COMPONENTS.md](./UI_COMPONENTS.md)** - Guía de desarrollo de componentes
6. **[STYLING.md](./STYLING.md)** - Arquitectura CSS y tematización

### Consejos de Navegación
- Usa los **Enlaces Rápidos** en cada tabla de guía
- Sigue la sección **¿Necesitas Información Específica?** de arriba
- Revisa las secciones de **Estructura de Archivos** para la ubicación exacta de los archivos
- Busca **Ejemplos de Código** a lo largo de la documentación

---

## 🔄 Información de Versión

- **Versión de la Documentación**: v3.0 (Nuevas Características Añadidas)
- **Estado del Proyecto**: Características Completas
- **Última Actualización**: 1 de enero de 2026 - Documentadas todas las nuevas implementaciones

---

## 🤝 Contribuyendo a la Documentación

Al añadir nuevas características:
1. **Documenta las nuevas implementaciones** en [NEW_FEATURES.md](./NEW_FEATURES.md)
2. Actualiza las secciones de documentación relevantes
3. Añade ejemplos a [UI_COMPONENTS.md](./UI_COMPONENTS.md) if adding components
4. Actualiza [CORE_SYSTEMS.md](./CORE_SYSTEMS.md) para nuevos sistemas
5. Mantén este índice con nuevas referencias

---

**💡 Consejo**: Marca esta página como tu punto de entrada principal a la documentación del proyecto. Usa los enlaces rápidos en la parte superior para una navegación rápida entre secciones.
