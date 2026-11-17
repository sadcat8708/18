
/* =========================================
   ALEXA 18 — CUENTA REGRESIVA
========================================= */

import {
    BIRTHDAY_DATE,
    isBirthdayUnlocked
} from "./config.js";

let counterInterval = null;

/**
 * Convierte un número en dos dígitos.
 */
function formatNumber(number) {
    return String(number).padStart(2, "0");
}

/**
 * Actualiza un valor del contador.
 */
function updateValue(elementId, value) {
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = formatNumber(value);
    }
}

/**
 * Actualiza la cuenta regresiva.
 */
export function updateCounter() {
    const countdown = document.getElementById("countdown");

    if (!countdown) return;

    // Comprobar que la fecha sea válida.
    if (Number.isNaN(BIRTHDAY_DATE.getTime())) {
        console.error("La fecha del cumpleaños no es válida.");
        stopCounter();
        return;
    }

    const difference = BIRTHDAY_DATE.getTime() - Date.now();

    // Si ya llegó el cumpleaños.
    if (isBirthdayUnlocked() || difference <= 0) {
        updateValue("days", 0);
        updateValue("hours", 0);
        updateValue("minutes", 0);
        updateValue("seconds", 0);

        countdown.dataset.finished = "true";

        stopCounter();

        return;
    }

    // Convertir milisegundos a tiempo.
    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Actualizar los valores.
    updateValue("days", days);
    updateValue("hours", hours);
    updateValue("minutes", minutes);
    updateValue("seconds", seconds);

    countdown.dataset.finished = "false";
}

/**
 * Comprueba el contador al volver a la pestaña.
 */
function handleCounterVisibility() {
    if (!document.hidden) {
        updateCounter();

        if (isBirthdayUnlocked()) {
            stopCounter();
        }
    }
}

/**
 * Detiene el contador.
 */
export function stopCounter() {
    if (counterInterval !== null) {
        clearInterval(counterInterval);
        counterInterval = null;
    }
}

/**
 * Inicia la cuenta regresiva.
 */
export function initCounter() {
    // Evitar intervalos duplicados.
    stopCounter();

    // Actualizar inmediatamente.
    updateCounter();

    // Reiniciar el evento de visibilidad.
    document.removeEventListener(
        "visibilitychange",
        handleCounterVisibility
    );

    document.addEventListener(
        "visibilitychange",
        handleCounterVisibility
    );

    // Iniciar el intervalo si todavía falta para el cumpleaños.
    if (
        !isBirthdayUnlocked() &&
        !Number.isNaN(BIRTHDAY_DATE.getTime()) &&
        document.getElementById("countdown")
    ) {
        counterInterval = setInterval(
            updateCounter,
            1000
        );
    }
}
