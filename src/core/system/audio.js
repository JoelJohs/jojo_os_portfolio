import { on } from "../events/bus.js";
import { EVENTS } from "../events/types.js";

const SOUNDS = {
  TYPE: new Audio("assets/sounds/key-press.mp3"),
  BOOT: new Audio("assets/sounds/boot-sequence.mp3"),
  ERROR: new Audio("assets/sounds/error_buzzer.mp3"),
  SUCCESS: new Audio("assets/sounds/success_chime.mp3"),
};

// Ajustar volumen para que el sonido no sea invasivo
Object.values(SOUNDS).forEach((s) => (s.volume = 0.2));

export function initAudio() {
  let userInteracted = false;

  // Los navegadores bloquean el audio de forma automatica, hasta que el usuario interactue
  const armAudio = () => {
    userInteracted = true;
  };
  document.addEventListener("click", armAudio, { once: true });
  document.addEventListener("keydown", armAudio, { once: true });

  const play = (key) => {
    if (!userInteracted) return;
    const soundTemplate = SOUNDS[key];
    if (!soundTemplate) return;

    // Se clona el nodo para permitir sonidos en multi-click
    const sound = soundTemplate.cloneNode();
    sound.volume = soundTemplate.volume;
    sound.play().catch((e) => console.warn("Audio blocked:", e));
  };

  // Conexion de los eventos al sistema de sonidos
  on(EVENTS.SYS_BOOT, () => play("BOOT"));

  // Cada vez que la terminal recibe input (Enter)
  on(EVENTS.CLI_INPUT, () => play("SUCCESS"));

  // Errores
  on(EVENTS.CMD_NOT_FOUND, () => play("ERROR"));

  // (Opcional) Escuchar cada tecla física para sonido de teclado mecánico
  document.addEventListener("keydown", () => {
    play("TYPE");
  });

  console.log("[Audio] System armed.");
}
