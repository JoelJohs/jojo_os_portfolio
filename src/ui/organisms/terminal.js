import { on, emit } from "../../core/events/bus.js";
import { EVENTS } from "../../core/events/types.js";

export class Terminal extends HTMLElement {
  constructor() {
    super();
    this.history = [];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.setupSystemListeners();
  }

  render() {
    this.innerHTML = `
            <div class="terminal-output" id="output"></div>
            <div class="command-line">
                <span class="prompt">visitor@jojo-os:~$</span>
                <input type="text" class="cmd-input" autocomplete="off" spellcheck="false" autofocus>
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
  }

  setupSystemListeners() {
    // Recibe la respuest que el sistema da
    on(EVENTS.CLI_OUTPUT, (text) => {
      this.printLine(text);
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
  printLine(text, type = "") {
    const output = this.querySelector("#output");
    const line = document.createElement("div");
    line.className = `terminal-line ${type}`;
    line.textContent = text; // textContent para poder evitar inyeccion de html no deseada
    output.appendChild(line);

    // Auto-scroll al final del terminal
    this.scrollTop = this.scrollHeight;
  }
}

customElements.define("x-terminal", Terminal);
