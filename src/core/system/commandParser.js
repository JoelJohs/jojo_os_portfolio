/**
 * Parsea el string enviado por "la terminal" del portfolio y lo convierte en una instrucción ejecutable.
 * @param {string} inputString - Ej: "  open   about-me  "
 * @returns {Object} - Ej: { command: 'open', args: ['about-me'] }
 */
export function parseInput(inputString) {
  if (!inputString) return { command: "", args: [] };

  // Quitamos espacios al inicio/final y separamos por espacios usando regex en caso haya múltiples espacios
  const tokens = inputString.trim().split(/\s+/);

  // El primer token es el comando, el resto son argumentos
  const command = tokens[0].toLowerCase(); // Siempre minúsculas
  const args = tokens.slice(1);

  return { command, args };
}
