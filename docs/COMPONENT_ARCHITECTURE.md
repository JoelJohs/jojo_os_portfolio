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

**Estructura:**

```texts
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
// Campo de búsqueda (input + botón)
<SearchField>
  <Input /> // Atom
  <Button /> // Atom
</SearchField>
```

**Estructura:**

```text
src/ui/molecules/
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
└── organisms/       # Secciones complejas
```

### Importaciones

```javascript
// Importar átomo
import { LanguageSwitcher } from "../ui/atoms/LanguageSwitcher.js";

// Importar molécula
import { SearchField } from "../ui/molecules/SearchField.js";

// Importar organismo
import { Terminal } from "../ui/organisms/Terminal.js";
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

## Ejemplo Real: LanguageSwitcher

```javascript
// src/ui/atoms/LanguageSwitcher.js
export class LanguageSwitcher extends HTMLElement {
  // Clasificación: 🧱 ATOM
  // - Componente autónomo
  // - No se puede dividir más
  // - Reutilizable en cualquier lugar
}
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
