import { on } from "../events/bus.js";
import { EVENTS } from "../events/types.js";

const ROUTES = {
  home: "<h1>HOME SECURE SERVER</h1><p>Welcome back, User.</p>",
  about: "<x-profile-card></x-profile-card>", // Tu web component
  projects: "<h1>PROJECTS GRID</h1><p>Loading modules...</p>", // Aquí iría tu futuro componente grid
  contact: "<h1>ENCRYPTED CHANNEL</h1><p>Send a message...</p>",
};

export function initViewport() {
  const stage = document.getElementById("content-stage");
  if (!stage) return;

  // Vista inicial
  stage.innerHTML = ROUTES.home;

  // Escuchar el cambio de rutas para la nevegacion
  on(EVENTS.NAV_NAVIGATE, (route) => {
    const content =
      ROUTES[route] || "<h1>404 NOT FOUND</h1><p>Route does not exist.</p>"; // Entra a la ruta o manda a un 404

    if (content) {
      // Genera un efecto de transicion simple
      stage.innerHTML = content;

      // Cuando el se requiere inyectar datos se busca el elemento recien creado
      if (route === "about") {
        const card = stage.querySelector("x-profile-card");
        if (card) {
          // De momento los datos son hardcodeados
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
