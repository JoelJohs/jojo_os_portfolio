// src/core/system/achievements.js
import { on, emit } from '../events/bus.js';
import { EVENTS } from '../events/types.js';

const ACHIEVEMENTS = [
    { id: 'cli_user', title: 'Hackerman', desc: 'Used the CLI for the first time', xp: 50 },
    { id: 'explorer', title: 'Cartographer', desc: 'Visited all sections', xp: 100 },
    { id: 'easter_egg_1', title: 'The Chosen One', desc: 'Found the Matrix theme', xp: 200 },
    { id: 'spam', title: 'Clear History', desc: 'Used clear command', xp: 10 },
    { id: 'sudo', title: 'Nice Try', desc: 'Tried to use sudo privileges', xp: 500 },
    { id: 'coffee_break', title: 'Caffeinated', desc: 'Took a coffee break', xp: 25 },
    { id: 'theme_switcher', title: 'Chameleon', desc: 'Changed themes', xp: 75 }
];

let unlocked = JSON.parse(localStorage.getItem('jojo-achievements')) || [];
let visitedSections = new Set();

export function initAchievements() {
    
    // Helper para desbloquear
    const unlock = (id) => {
        if (unlocked.includes(id)) return;
        
        const achievement = ACHIEVEMENTS.find(a => a.id === id);
        if (achievement) {
            unlocked.push(id);
            localStorage.setItem('jojo-achievements', JSON.stringify(unlocked));
            
            // Emitir evento para mostrar Toast
            emit('sys:achievement', achievement);
            
            // Sonido de éxito extra
            const audio = new Audio('assets/sounds/success_chime.mp3'); 
            audio.volume = 0.3;
            audio.play().catch(()=>{});
        }
    };

    // --- ESCUCHAS (LISTENERS) ---

    // 1. Usar CLI (Evento OUTPUT significa que usó la terminal)
    on(EVENTS.CLI_INPUT, (cmd) => {
        unlock('cli_user');
        if (cmd === 'clear' || cmd === 'cls') unlock('spam');
        if (cmd.includes('sudo')) unlock('sudo');
        if (cmd.includes('coffee')) unlock('coffee_break');
    });

    // 2. Temas
    on(EVENTS.UI_THEME_CHANGED, (theme) => {
        unlock('theme_switcher');
        if (theme === 'matrix') unlock('easter_egg_1');
    });

    // 3. Navegación - track visited sections
    on(EVENTS.NAV_NAVIGATE, (view) => {
        if (typeof view === 'string') {
            visitedSections.add(view);
            // Check if all sections visited
            if (visitedSections.has('home') && visitedSections.has('projects') && 
                visitedSections.has('about') && visitedSections.has('contact')) {
                unlock('explorer');
            }
        }
    });

    // 4. Konami Code (Listener global de teclado)
    let konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let kPos = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === konami[kPos]) {
            kPos++;
            if (kPos === konami.length) {
                // Add konami achievement if you want
                emit(EVENTS.CLI_OUTPUT, { type: 'text', value: 'ALL CHEATS ENABLED... JUST KIDDING.' });
                kPos = 0;
            }
        } else {
            kPos = 0;
        }
    });

    console.log(`[Achievements] Loaded: ${unlocked.length}/${ACHIEVEMENTS.length}`);
}

// Para mostrar el progreso en el Dashboard
export function getAchievementStats() {
    return {
        unlocked: unlocked.length,
        total: ACHIEVEMENTS.length
    };
}

export function getUnlockedAchievements() {
    return unlocked.map(id => ACHIEVEMENTS.find(a => a.id === id)).filter(Boolean);
}