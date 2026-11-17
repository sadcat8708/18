
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

    // Zona horaria de Colombia
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

/**
 * Construye la fecha exacta de desbloqueo.
 * El mes de JavaScript comienza en 0, por eso sumamos 1.
 */
const birthdayYear = CONFIG.birthday.year;

const birthdayMonth = String(
    CONFIG.birthday.month + 1
).padStart(2, "0");

const birthdayDay = String(
    CONFIG.birthday.day
).padStart(2, "0");

const birthdayHour = String(
    CONFIG.birthday.hour
).padStart(2, "0");

const birthdayMinute = String(
    CONFIG.birthday.minute
).padStart(2, "0");

const birthdaySecond = String(
    CONFIG.birthday.second
).padStart(2, "0");

// Fecha exacta en hora de Bogotá
export const BIRTHDAY_DATE = new Date(
    `${birthdayYear}-${birthdayMonth}-${birthdayDay}T${birthdayHour}:${birthdayMinute}:${birthdaySecond}${CONFIG.utcOffset}`
);

/**
 * Comprueba si ya llegó el cumpleaños.
 */
export function isBirthdayUnlocked() {
    return Date.now() >= BIRTHDAY_DATE.getTime();
}
