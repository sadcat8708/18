
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

    // Zona horaria
    timezone: "America/Bogota",

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
 * Convierte una fecha de Bogotá a su instante UTC.
 */
function createBogotaDate(year, month, day, hour, minute, second) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: CONFIG.timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    });

    // Crear una fecha inicial usando los componentes locales.
    const initialDate = new Date(Date.UTC(
        year,
        month,
        day,
        hour,
        minute,
        second
    ));

    // Obtener la representación de esa fecha en Bogotá.
    const parts = formatter.formatToParts(initialDate);

    const values = {};

    parts.forEach(part => {
        if (part.type !== "literal") {
            values[part.type] = Number(part.value);
        }
    });

    // Diferencia entre la hora de Bogotá y UTC.
    const bogotaAsUTC = Date.UTC(
        values.year,
        values.month - 1,
        values.day,
        values.hour,
        values.minute,
        values.second
    );

    return new Date(
        initialDate.getTime() + (Date.UTC(
            year, month, day, hour, minute, second
        ) - bogotaAsUTC)
    );
}

/**
 * Fecha exacta de desbloqueo:
 * 20 de enero de 2027 a las 00:00 en Bogotá.
 */
export const BIRTHDAY_DATE = createBogotaDate(
    CONFIG.birthday.year,
    CONFIG.birthday.month,
    CONFIG.birthday.day,
    CONFIG.birthday.hour,
    CONFIG.birthday.minute,
    CONFIG.birthday.second
);

/**
 * Comprueba si ya llegó el cumpleaños.
 */
export function isBirthdayUnlocked() {
    return Date.now() >= BIRTHDAY_DATE.getTime();
}
