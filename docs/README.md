# Portfolio Vanilla - Documentación

## Arquitectura del Proyecto

```
portfolio_vanilla/
├── docs/                    # Documentación del proyecto
│   ├── core/               # Documentación de módulos core
│   │   ├── I18N.md         # Sistema de internacionalización
│   │   ├── EVENTS.md       # Sistema de eventos
│   │   └── SHELL.md         # Sistema de terminal/comandos
│   ├── README.md           # Esta guía
│   ├── COMPONENT_ARCHITECTURE.md  # Arquitectura de componentes UI
│   ├── STYLES.md           # Sistema de estilos CSS
│   ├── TERMINAL.md         # Componente de terminal UI
│   └── TERMINAL_SYSTEM.md  # Sistema completo de terminal
├── src/                     # Código fuente
│   ├── core/               # Módulos principales
│   │   ├── i18n/           # Sistema i18n
│   │   ├── events/         # Sistema de eventos
│   │   ├── system/         # Sistema de terminal
│   │   └── utils/          # Utilidades DOM
│   ├── ui/                 # Componentes de interfaz
│   │   ├── atoms/          # Componentes básicos
│   │   ├── molecules/      # Combinaciones simples
│   │   └── organisms/      # Secciones complejas
│   ├── styles/             # Hojas de estilos CSS
│   │   ├── reset.css       # Reset y configuraciones base
│   │   ├── vars.css        # Variables CSS (tema, colores, efectos)
│   │   ├── base.css        # Estilos base y componentes principales
│   │   └── layout.css      # Layout y estructura de la página
│   └── main.js             # Lógica JavaScript
├── index.html              # Página principal
├── package.json            # Dependencias y scripts
└── pnpm-lock.yaml          # Lock file de dependencias
```

## Estructura de Documentación

La documentación sigue la misma estructura modular que el código fuente:

- **docs/core/**: Documentación de módulos core del sistema
- **docs/**: Documentación general y de arquitectura

## Arquitectura de Componentes UI

Uso la metodología **Atoms-Molecules-Organisms** para organizar los componentes de interfaz:

- **🧱 Atoms**: Componentes básicos e indivisibles (botones, inputs, iconos)
- **🔬 Molecules**: Combinaciones simples de 2-4 átomos (formularios, campos de búsqueda)
- **🧬 Organisms**: Secciones completas y autónomas (terminal, perfiles de usuario)

> **Ver guía completa**: [COMPONENT_ARCHITECTURE.md](./COMPONENT_ARCHITECTURE.md)

## Filosofía de Arquitectura

- **Vanilla First**: Sin frameworks, solo HTML5, CSS3 y JavaScript puro
- **Modular**: Cada archivo tiene una responsabilidad específica
- **Component-First**: Arquitectura UI basada en átomos, moléculas y organismos
- **Tema Cyberpunk/Neon**: Estética inspirada en interfaces retro-futuristas
- **Performance Optimized**: Mínimo de dependencias, carga rápida
