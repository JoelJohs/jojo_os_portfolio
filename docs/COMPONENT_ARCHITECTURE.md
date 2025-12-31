# Arquitectura de Componentes

## Metodología Atoms-Molecules-Organisms

Uso la metodología Atoms-Molecules-Organisms para estructurar los componentes de UI. Es una jerarquía de composición que va de lo más simple a lo más complejo.

---

## Definición de Niveles

### 🧱 Atoms

Son los componentes más pequeños e indivisibles de la interfaz. No se pueden dividir en partes más pequeñas sin perder su funcionalidad.

**Características:**

- Mínimos: una sola responsabilidad
- Reutilizables: se usan en múltiples contextos
- Independientes: no dependen de otros componentes
- Sin lógica compleja: generalmente solo presentación

**Ejemplos en el proyecto:**

```javascript
// src/ui/atoms/LanguageSwitcher.js
export class LanguageSwitcher extends HTMLElement {
  // Componente autónomo, no se puede dividir más
}
```

**Ejemplos en el proyecto:**

```javascript
// src/ui/atoms/LanguageSwitcher.js
export class LanguageSwitcher extends HTMLElement {
  // Componente autónomo, no se puede dividir más
}
```

**Estructura:**

```text
src/ui/atoms/
├── LanguageSwitcher.js
├── Button.js
├── Input.js
└── Icon.js
```

### 🔬 Molecules

Combinaciones de 2-4 átomos que trabajan juntos para formar una unidad con funcionalidad específica.

**Características:**

- Combinan átomos
- Cooperación entre componentes
- Funcionalidad simple
- Lógica básica de estado

**Ejemplos:**

```javascript
// Tarjeta de perfil (título + datos + estadísticas)
<ProfileCard>
  <h2>Joel Johs</h2> // Texto básico
  <p>SysAdmin</p>    // Texto básico
  <div class="stats"> // Contenedor de estadísticas
    <span>STR: MAX</span>
    <span>INT: MAX</span>
  </div>
</ProfileCard>
```

**Estructura:**

```text
src/ui/molecules/
├── ProfileCard.js
├── SearchField.js
├── LoginForm.js
└── NavigationItem.js
```

### 🧬 Organisms

Secciones completas de la interfaz que combinan múltiples átomos y moléculas para formar sistemas complejos y autónomos.

**Características:**

- Complejos: unen muchos componentes
- Autónomos: funcionan como sistemas independientes
- Lógica compleja: manejan estado y datos
- Específicos: resuelven problemas de negocio

**Ejemplos:**

```javascript
// Terminal completa
<Terminal>
  <Header /> // Molecule
  <CommandLine /> // Molecule
  <OutputArea /> // Molecule
  <LanguageSwitcher /> // Atom
</Terminal>
```

**Estructura:**

```text
src/ui/organisms/
├── Terminal.js
├── Header.js
└── UserProfile.js
```

---

## Criterios de Clasificación

### Árbol de Decisión

```text
¿Es el componente más pequeño posible?
  ├── Sí → 🧱 ATOM
  └── No → ¿Combina 2-4 componentes simples?
          ├── Sí → 🔬 MOLECULE
          └── No → ¿Es una sección completa y autónoma?
                  ├── Sí → 🧬 ORGANISM
                  └── No → Revisar diseño
```

### Reglas Prácticas

1. **Divisibilidad**: Si se puede dividir en partes más pequeñas, no es un Atom
2. **Combinación**: Si combina 2-4 componentes simples, es un Molecule
3. **Autonomía**: Si es una sección completa con su propia lógica, es un Organism

---

## Estructura del Proyecto

```text
src/ui/
├── atoms/           # Componentes básicos
│   └── LanguageSwitcher.js
├── molecules/       # Combinaciones simples
│   └── ProfileCard.js
└── organisms/       # Secciones complejas
    └── terminal.js
```

### Importaciones

```javascript
// Importar molécula
import { ProfileCard } from "../ui/molecules/ProfileCard.js";

// Importar organismo
import { Terminal } from "../ui/organisms/terminal.js";
```

---

## Beneficios

### Claridad

- Saber exactamente dónde buscar cada tipo de componente
- Organización predecible del código

### Reutilización

- Los átomos se pueden usar en cualquier contexto
- Composición flexible de componentes

### Mantenimiento

- Cambios localizados según el nivel del componente
- Dependencias claras entre componentes

### Testing

- Tests unitarios para átomos
- Tests de integración para moléculas
- Tests de sistema para organismos

---

## Ejemplos Reales

### LanguageSwitcher (🧱 Atom)

```javascript
// src/ui/atoms/LanguageSwitcher.js
export class LanguageSwitcher extends HTMLElement {
  // Clasificación: 🧱 ATOM
  // - Componente autónomo
  // - No se puede dividir más
  // - Reutilizable en cualquier lugar
}
```

### ProfileCard (🔬 Molecule)

```javascript
// src/ui/molecules/ProfileCard.js
class ProfileCard extends HTMLElement {
  set data(value) {
    this.render(value);
  }

  render(data) {
    const name = data?.name || "Unknown";
    const role = data?.role || "";
    const stats = data?.stats || {};
    this.innerHTML = `
      <div class="profile-card">
        <h2>${name}</h2>
        <p>${role}</p>
        <div class="stats">
          <span>STR: ${stats.str ?? "-"}</span>
          <span>INT: ${stats.int ?? "-"}</span>
        </div>
      </div>
    `;
  }
}

// Clasificación: 🔬 MOLECULE
// - Combina múltiples elementos HTML
// - Lógica simple de renderizado
// - Reutilizable en diferentes contextos
```

---

## Convenciones

### Nomenclatura

- **Atoms**: Nombres del componente (Button, Input, Icon)
- **Molecules**: Combinación descriptiva (SearchField, LoginForm)
- **Organisms**: Sección completa (Terminal, UserProfile)

### Responsabilidad

- Un componente, una responsabilidad
- Sin mezclar niveles en el mismo archivo
- Nombres que indican función claramente

---

## Resumen

| Nivel            | Tamaño  | Complejidad | Uso              |
| ---------------- | ------- | ----------- | ---------------- |
| **🧱 Atoms**     | Mínimo  | Baja        | Indivisible      |
| **🔬 Molecules** | Pequeño | Media       | 2-4 átomos       |
| **🧬 Organisms** | Grande  | Alta        | Sección completa |

**Regla final:** Empezar por el nivel más simple y subir según necesidad. Es más fácil combinar componentes simples que dividir componentes complejos.
