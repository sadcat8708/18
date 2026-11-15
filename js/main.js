
/* =========================================
   ALEXA 18 — ARCHIVO PRINCIPAL
   ========================================= */

import { initNavigation } from "./navigation.js";

import {
    initAnimations
} from "./animations.js";

import {
    initInteractions
} from "./interactions.js";

import {
    initCounter
} from "./counter.js";

import {
    initBirthday
} from "./birthday.js";

import {
    initSurprises
} from "./surprises.js";

/**
 * Inicializa todos los sistemas de la página.
 */
function initApp() {
    console.log("ALEXA 18: iniciando página...");

    // 1. Crear el contenido dinámico
    initInteractions();

    // 2. Activar las animaciones
    initAnimations();

    // 3. Activar la navegación
    initNavigation();

    // 4. Iniciar la cuenta regresiva
    initCounter();

    // 5. Comprobar el cumpleaños
    initBirthday();

    // 6. Activar los mensajes secretos
    initSurprises();

    console.log("ALEXA 18: página iniciada correctamente ♡");
}

/**
 * Espera a que el documento esté preparado.
 */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, {
        once: true
    });
} else {
    initApp();
}
