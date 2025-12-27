import es from "../../locales/es.js";
import en from "../../locales/en.js";

// Configuracion de diccionarios
const DICTIONARIES = {
  es,
  en,
};
const STORAGE_KEY = "jojo_os_language";
const DEFAULT_LANGUAGE = "en";

// estados privados del modulo
let currentLanguage = DEFAULT_LANGUAGE;
const listeners = []; // Guardado de listeners para saber cuando cambia el idioma en la aplicacion

// Detección inicial del idioma
function detectLanguage() {
  /* 
    Orden ed ejecución
    1. Revisa primero si hay un idioma guardado en el localstorage
    2. En caso de que no, revisa el idioma del navegador
    3. Si no se soporta ninguno, por default usamos ingles (Por ser el idioma basico en desarrollo y de mayor alcance)
    */

  // 1.
  const storedLanguage = localStorage.getItem(STORAGE_KEY);
  if (storedLanguage && DICTIONARIES[storedLanguage]) {
    return storedLanguage;
  }

  // 2.
  const navigatorLanguage = navigator.language.split("-")[0]; // es-MX -> es; en-US -> en
  if (DICTIONARIES[navigatorLanguage]) {
    return navigatorLanguage;
  }

  // 3.
  return DEFAULT_LANGUAGE;
}

// Inicializacion del idioma actual
currentLanguage = detectLanguage();

/** 
Traduce utilizando una clave dada
    * @param {string} key - La clave de traducción en formato 'section.item' (e.g., 'system.boot')
    * ejemplo: translate('system.boot') -> "SYSTEM STARTING..."
**/
export function t(key) {
  const keys = key.split(".");
  let translation = DICTIONARIES[currentLanguage];

  for (const k of keys) {
    if (translation[k] === undefined) return key;
    translation = translation[k];
  }
  return translation;
}

/**
Cambia el idioma actual
    * @param {string} langCode - El código del idioma a cambiar (e.g., 'es', 'en')
    * @returns {boolean} true si se cambió, false si el código no existe
**/

export function setLanguage(langCode) {
  if (!DICTIONARIES[langCode]) return false;

  currentLanguage = langCode;
  localStorage.setItem(STORAGE_KEY, langCode); // Persistencia -> guardado local del idioma

  // Notificacion a los listeners del cambio de idioma
  listeners.forEach((cb) => cb(currentLanguage));

  // mensaje para debugging y comprobar cambios y que coincida idioma actual con idioma mostrado
  console.log(`[SYSTEM] language changed to: ${langCode}`);

  return true;
}

/**
Devuelve el idioma actual actualizando la interfaz
**/

export function getLanguage() {
  return currentLanguage;
}

/** 
Permite que los componentes se suscriban a cambios de idioma
    * @param {function} callback - La función a llamar cuando el idioma cambie
**/

export function onLanguageChange(callback) {
  listeners.push(callback);
  // Devolver una función de unsubscribe para que los consumidores puedan quitar el listener
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}
