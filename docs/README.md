# Portfolio Vanilla - Documentación

## Arquitectura del Proyecto

```
portfolio_vanilla/
├── docs/                    # Documentación del proyecto
├── src/                     # Código fuente
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

## Filosofía de Arquitectura

- **Vanilla First**: Sin frameworks, solo HTML5, CSS3 y JavaScript puro
- **Modular**: Cada archivo tiene una responsabilidad específica
- **Tema Cyberpunk/Neon**: Estética inspirada en interfaces retro-futuristas
- **Performance Optimized**: Mínimo de dependencias, carga rápida