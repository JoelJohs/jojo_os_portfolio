import { emit } from "../../core/events/bus.js";
import { EVENTS } from "../../core/events/types.js";
import { t, onLanguageChange } from "../../core/i18n/i18n.js";

export class BootScreen extends HTMLElement {
  constructor() {
    super();
    this._unsubscribe = null;
    this.updateLogs();
  }

  connectedCallback() {
    this.render();
    this.runSequence();
    // Subscribe to language changes (in case boot stays visible long)
    this._unsubscribe = onLanguageChange(() => this.updateLogs());
  }

  disconnectedCallback() {
    if (typeof this._unsubscribe === "function") {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  updateLogs() {
    this.logs = [
      t("boot.kernel") || "INITIALIZING KERNEL...",
      t("boot.memory") || "CHECKING MEMORY INTEGRITY... OK",
      t("boot.filesystem") || "MOUNTING VIRTUAL FILESYSTEM... OK",
      t("boot.drivers") || "LOADING DRIVERS: [VIDEO] [AUDIO] [INPUT]",
      t("boot.profile") || "DECRYPTING USER PROFILE...",
      t("boot.connection") || "ESTABLISHING SECURE CONNECTION...",
      t("boot.ready") || "SYSTEM READY.",
    ];
  }

  render() {
    this.innerHTML = `
            <div class="boot-container">
                <div class="boot-logo glitch" data-text="JOJO-OS">JOJO-OS</div>
                <div class="boot-version">v1.0.4 [STABLE]</div>
                
                <div class="log-container" id="boot-logs"></div>
                
                <div class="progress-bar-container">
                    <div class="progress-bar" id="boot-progress"></div>
                </div>
            </div>
        `;
  }

  async runSequence() {
    const logContainer = this.querySelector("#boot-logs");
    const progressBar = this.querySelector("#boot-progress");

    // Empieza con la secuencia de los logs
    for (let i = 0; i < this.logs.length; i++) {
      await this.wait(Math.random() * 100 + 300); // Espera entre 300ms y 400ms

      const p = document.createElement("div");
      p.className = "log-line";
      p.innerText = `> ${this.logs[i]}`;
      logContainer.appendChild(p);

      // Actualiza la barra de progreso segun el log actual
      const percent = ((i + 1) / this.logs.length) * 100;
      progressBar.style.width = `${percent}%`;

      // Autoscroll al final
      logContainer.scrollTop = logContainer.scrollHeight;
    }

    // finalización de la secuencia
    await this.wait(500);
    this.classList.add("fade-out");

    // El sistema puede empezar después de la animación
    setTimeout(() => {
      emit(EVENTS.SYS_BOOT);
      this.remove();
    }, 1000);
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

customElements.define("x-boot-screen", BootScreen);
