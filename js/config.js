
/* =========================================
   ALEXA 18 — CONFIGURACIÓN GENERAL
   ========================================= */

export const CONFIG = {
    // Información principal
    name: "Alexa",
    age: 18,
    projectName: "ALEXA 18",

    // Fecha del cumpleaños
    birthday: {
        year: 2027,
        month: 0, // Enero: 0, febrero: 1...
        day: 20,

        // Hora de desbloqueo
        hour: 0,
        minute: 0,
        second: 0
    },

    // Colombia utiliza UTC-5
    timezone: "America/Bogota",
    utcOffset: "-05:00",

    // Configuración de navegación
    defaultSection: "inicio",

    // Mensajes generales
    messages: {
        welcome: "Un pequeño espacio creado especialmente para ti.",
        birthdayLocked: "Todavía falta un poquito para descubrir tu sorpresa.",
        birthdayUnlocked: "¡Llegó tu día especial!",
        letterClosed: "Hay unas palabras esperando por ti."
    }
};

// Fecha exacta de desbloqueo en hora de Bogotá
export const BIRTHDAY_DATE = new Date(
    `${CONFIG.birthday.year}-01-${String(CONFIG.birthday.day).padStart(2, "0")}T00:00:00${CONFIG.utcOffset}`
);

// Comprobar si ya llegó el cumpleaños
export function isBirthdayUnlocked() {
    return Date.now() >= BIRTHDAY_DATE.getTime();
}
