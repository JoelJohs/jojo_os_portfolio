import { on, emit } from "../../core/events/bus.js";
import { EVENTS } from "../../core/events/types.js";
import { t, onLanguageChange } from "../../core/i18n/i18n.js";

export class Terminal extends HTMLElement {
  constructor() {
    super();
    this.history = [];
    this.systemListenersBound = false;
  }

  render() {
    this.innerHTML = `
            <div class="terminal-content">
                <div class="terminal-output" id="output"></div>
                <div class="command-line">
            <span class="prompt">visitor@jojo-os:~$</span>
            <input type="text" class="cmd-input" placeholder="${t(
              "terminal.placeholder"
            )}" autocomplete="off" spellcheck="false" autofocus>
                </div>
            </div>
        `;
  }

  setupEventListeners() {
    const input = this.querySelector(".cmd-input");
    const output = this.querySelector("#output");

    // 1. Detecta cuando se da enter
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = input.value;

        // A. Escribe el comando que el usuario ha escrito
        this.printLine(`visitor@jojo-os:~$ ${command}`, "muted");

        // B. Envia el comando al sistema
        emit(EVENTS.CLI_INPUT, command);

        // C. Limpia el input
        input.value = "";
      }
    });

    // 2. Si se hace click en cualquier parte del terminal, enfocar el input
    this.addEventListener("click", () => {
      input.focus();
    });

    // 3. Enfocar input automáticamente cuando la terminal se renderiza
    setTimeout(() => {
      input.focus();
    }, 100);
  }

  setupSystemListeners() {
    if (this.systemListenersBound) return;
    this.systemListenersBound = true;
    // Recibe la respuest que el sistema da
    on(EVENTS.CLI_OUTPUT, (payload) => {
      const isHtml = payload?.type === "html";
      const text = typeof payload === "string" ? payload : payload?.value ?? "";
      this.printLine(text, "", isHtml);
    });

    // Orden para limpiar la terminal
    on(EVENTS.CLI_CLEAR, () => {
      this.querySelector("#output").innerHTML = "";
    });
  }

  /**
   * Método auxiliar, agrega al DOM una nueva línea al terminal
   * @param {string} text Texto a agregar
   * @param {string} type Tipo de línea (clase CSS adicional)
   */
  printLine(text, type = "", isHtml = false) {
    const output = this.querySelector("#output");
    const line = document.createElement("div");
    line.className = `terminal-line ${type}`;
    if (isHtml) {
      line.innerHTML = text;
    } else {
      line.textContent = text; // textContent para poder evitar inyeccion de html no deseada
    }
    output.appendChild(line);

    // Auto-scroll al final del terminal output
    output.scrollTop = output.scrollHeight;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.setupSystemListeners();
    this._unsubscribe = onLanguageChange(() => {
      const value = this.querySelector(".cmd-input")?.value || "";
      this.render();
      this.setupEventListeners();
      this.setupSystemListeners();
      const input = this.querySelector(".cmd-input");
      if (input) input.value = value;
    });
  }

  disconnectedCallback() {
    if (typeof this._unsubscribe === "function") this._unsubscribe();
  }
}

customElements.define("x-terminal", Terminal);
