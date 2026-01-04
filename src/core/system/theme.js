// src/core/system/theme.js
import { emit } from '../events/bus.js';
import { EVENTS } from '../events/types.js';

const THEMES = {
    'default': {
        '--bg-deep-space': '#02020a',
        '--primary-violet': '#9d00ff',
        '--primary-neon': '#bc13fe',
        '--accent-cyan': '#00f3ff',
        '--text-main': '#e0e0e0'
    },
    'matrix': {
        '--bg-deep-space': '#000000',
        '--primary-violet': '#008F11',
        '--primary-neon': '#00FF41', // Matrix Green
        '--accent-cyan': '#D3FBD8',
        '--text-main': '#00FF41'
    },
    'cyberpunk': {
        '--bg-deep-space': '#0b0014',
        '--primary-violet': '#ff0055', // Neon Pink
        '--primary-neon': '#fcee0a',   // Cyber Yellow
        '--accent-cyan': '#00e5ff',
        '--text-main': '#ffffff'
    }
};

export function setTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) return false;

    const root = document.documentElement;
    Object.entries(theme).forEach(([key, val]) => {
        root.style.setProperty(key, val);
    });

    // Set data-theme attribute for CSS targeting
    root.setAttribute('data-theme', themeName);

    localStorage.setItem('jojo-theme', themeName);
    emit(EVENTS.UI_THEME_CHANGED, themeName);
    return true;
}

export function initTheme() {
    const saved = localStorage.getItem('jojo-theme') || 'default';
    setTheme(saved);
}