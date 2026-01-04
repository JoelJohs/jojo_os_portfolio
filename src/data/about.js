import { getPlayerStats } from '../core/utils/profile.js';

export const PROFESSIONAL_DATA = {
    header: {
        name: "Joel Josafat Hernández Saucedo",
        title: "Fullstack Developer",
        location: "Morelia, Michoacán, México",
        email: "jojohersa21@gmail.com",
        phone: "438 100 4177",
        summary: "Desarrollador Fullstack mayormente enfocado en el backend, con más de 3 años de experiencia en aplicaciones web y APIs escalables. Priorizo el código limpio, la mejora continua y la comprensión profunda de los sistemas."
    },
    experience: [
        {
            role: "Asistente de TI / Desarrollador",
            company: "ABV Electric Supply",
            period: "Feb 2025 - Presente",
            desc: "Desarrollo y optimización de APIs con Django y PostgreSQL. Integración backend-frontend y colaboración técnica."
        },
        {
            role: "Desarrollador Fullstack",
            company: "Freelance",
            period: "Ene 2023 - Ene 2025",
            desc: "Sistemas de gestión personalizados y puntos de venta usando React y Express. Bases de datos SQL."
        },
        {
            role: "Soporte IT y Desarrollo Interno",
            company: "Power Energy",
            period: "Feb 2020 - Ene 2025",
            desc: "Automatización de procesos administrativos y mantenimiento de infraestructura TI."
        }
    ],
    education: [
        {
            degree: "Ingeniería en Sistemas Computacionales",
            school: "Instituto Tecnológico de Morelia",
            period: "2020 - 2025"
        },
        {
            degree: "Técnico en Soporte y Mantenimiento",
            school: "CECyTEM Puruándiro",
            period: "2013 - 2016"
        }
    ],
    skills: ["Python (Django/FastAPI)", "JS/TS (React/NestJS)", "SQL (Postgres/MySQL)", "Docker", "Git"]
};

export const SECRET_DATA = {
    intro: "No sé muy bien cómo hablar de mí mismo, solo sé que me gusta programar y sentir la dopamina de arreglar un bug. Soy alguien simple que disfruta ver el resultado de su esfuerzo.",
    memeUrl: "assets/img/se-adapta.jpg",
    jsonBlock: {
        pronouns: "he/him",
        nickname: "Jojo",
        stand: "Mahoraga (Adaptability)",
        traits: ["Slightly sarcastic", "Coffee Powered", "Bug Fixer"],
        hobbies: [
            "Vivir para mi hija", 
            "Videojuegos (desde la SNES)", 
            "Gimnasio (fuerza)", 
            "Intentar cansar a mi perro"
        ],
        philosophy: "Today I have more questions than answers... My story is but one of thousands."
    }
};