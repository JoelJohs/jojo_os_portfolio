// src/ui/molecules/Toast.js
import { on } from '../../core/events/bus.js';

export class ToastManager extends HTMLElement {
    connectedCallback() {
        this.render();
        // Escuchar nuestro evento personalizado
        on('sys:achievement', (achievement) => {
            this.show(achievement);
        });
    }

    render() {
        // Contenedor invisible por defecto
        this.style.position = 'fixed';
        this.style.bottom = '20px';
        this.style.right = '20px';
        this.style.zIndex = '10000';
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
        this.style.gap = '10px';
    }

    show(data) {
        const toast = document.createElement('div');
        toast.className = 'cyber-toast';
        toast.innerHTML = `
            <div class="toast-icon">🏆</div>
            <div class="toast-content">
                <div class="toast-title">ACHIEVEMENT UNLOCKED</div>
                <div class="toast-desc">${data.title}</div>
                <div class="toast-xp">+${data.xp} XP</div>
            </div>
        `;

        this.appendChild(toast);

        // Animación de entrada
        requestAnimationFrame(() => toast.classList.add('show'));

        // Desaparecer a los 4 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500); // Esperar a fade out
        }, 4000);
    }
}

customElements.define('x-toast-manager', ToastManager);