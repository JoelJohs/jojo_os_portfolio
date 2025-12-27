/**
 * Comunicación de eventos globales
 * utiliza pub/sub (publicar/suscribir) para manejar eventos
 */

/**
 * Diccionario de suscriptores para cada evento
 * {'EVENT_NAME': [callback1, callback2, ...] }
 */
const subscribers = {};

/**
 * Suscribirse a un evento -> Escucha y ejecuta callback cuando se emite el evento
 * @param {string} eventName - Nombre del evento (ej: 'sys:boot')
 * @param {Function} callback - Función a ejecutar
 * @returns {Function} - Función para des-suscribirse (cleanup)
 */

export function on(eventName, callback) {
  if (!subscribers[eventName]) {
    subscribers[eventName] = [];
  }

  subscribers[eventName].push(callback);
  // Retornamos una función para des-suscribirse -> cleanup, util para evitar memory leaks
  return () => off(eventName, callback);
}

/**
 * Emitir un evento -> Notifica a todos los suscriptores del evento
 * @param {string} eventName - Nombre del evento (ej: 'sys:boot')
 * @param {any} payload - Datos opcionales a pasar a los callbacks
 */

export function emit(eventName, payload) {
  if (!subscribers[eventName]) return;

  // Ejecutamos cada uno de los callbacks suscritos al evento hasta el momento
  subscribers[eventName].forEach((callback) => {
    try {
      callback(payload);
    } catch (error) {
      console.error(`[EventBus] Error in listener for "${eventName}":`, error);
    }
  });
}

/**
 * Des-suscribirse de un evento -> Deja de escuchar el evento
 * @param {string} eventName - Nombre del evento (ej: 'sys:boot')
 * @param {Function} callback - Función previamente suscrita
 */
function off(eventName, callback) {
  if (!subscribers[eventName]) return;
  subscribers[eventName] = subscribers[eventName].filter(
    (cb) => cb !== callback
  );
}

// Debug en desarrollo para ver los eventos emitidos
window.SystemBus = { emit, subscribers };
