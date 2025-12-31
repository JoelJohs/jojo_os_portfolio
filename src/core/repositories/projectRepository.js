import { PROJECTS_DB } from "../../data/db.js";

/**
 * Simula un repositorio de proyectos y el "fetch" de datos, simplemente para hacer ilusion de que hay una base de datos.
 * Simulara una latencia de red con un timeout antes de resolver la promesa.
 */

export function fetchProjects() {
  return new Promise((resolve) => {
    // Aqui simulariamos latencia de red, se resuelve la promesa en un tiempo aleatorio entre 500ms y 800ms
    const delay = Math.random() * 300 + 500;

    setTimeout(() => {
      const activeProjects = PROJECTS_DB.filter(
        (p) => p.status !== "archived"
      ).sort((a, b) => a.order - b.order);

      resolve(activeProjects);
    }, delay);
  });
}
