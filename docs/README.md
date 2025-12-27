# Portfolio Vanilla - Documentación

## Arquitectura del Proyecto

```
portfolio_vanilla/
├── docs/                    # Documentación del proyecto
│   ├── core/               # Documentación de módulos core
│   │   └── I18N.md         # Sistema de internacionalización
│   ├── README.md           # Esta guía
│   └── STYLES.md           # Sistema de estilos CSS
├── src/                     # Código fuente
│   ├── core/               # Módulos principales
│   │   ├── i18n/           # Sistema i18n
│   │   └── utils/          # Utilidades DOM
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

## Filosofía de Arquitectura

- **Vanilla First**: Sin frameworks, solo HTML5, CSS3 y JavaScript puro
- **Modular**: Cada archivo tiene una responsabilidad específica
- **Tema Cyberpunk/Neon**: Estética inspirada en interfaces retro-futuristas
- **Performance Optimized**: Mínimo de dependencias, carga rápida