
/* =========================================
   ALEXA 18 — DESBLOQUEO DEL CUMPLEAÑOS
   ========================================= */

import { isBirthdayUnlocked } from "./config.js";
import { birthdayData, surprisesData } from "./data.js";

let birthdayCheckInterval = null;

/**
 * Busca los elementos principales del cumpleaños.
 */
function getBirthdayElements() {
    return {
        locked: document.getElementById("birthday-locked"),
        unlocked: document.getElementById("birthday-unlocked"),
        title: document.getElementById("birthday-title"),
        subtitle: document.getElementById("birthday-subtitle"),
        message: document.getElementById("birthday-message"),
        closing: document.getElementById("birthday-closing")
    };
}

/**
 * Carga los mensajes especiales.
 */
function renderBirthdayContent() {
    const elements = getBirthdayElements();

    if (elements.title) {
        elements.title.textContent = birthdayData.title;
    }

    if (elements.subtitle) {
        elements.subtitle.textContent = birthdayData.subtitle;
    }

    if (elements.message) {
        elements.message.textContent = birthdayData.message;
    }

    if (elements.closing) {
        elements.closing.textContent = birthdayData.closing;
    }

    renderBirthdaySurprises();
}

/**
 * Genera las tarjetas de sorpresa.
 */
function renderBirthdaySurprises() {
    const container = document.querySelector(".surprises-container");

    if (!container) return;

    container.replaceChildren();

    surprisesData.forEach(surprise => {
        const card = document.createElement("article");
        card.className = "surprise-card";

        const icon = document.createElement("span");
        icon.className = "surprise-icon";
        icon.textContent = surprise.icon;

        const title = document.createElement("h3");
        title.className = "surprise-title";
        title.textContent = surprise.title;

        const text = document.createElement("p");
        text.className = "surprise-text";
        text.textContent = surprise.text;

        card.append(icon, title, text);
        container.appendChild(card);
    });
}

/**
 * Muestra la pantalla de espera.
 */
function showLockedBirthday() {
    const elements = getBirthdayElements();

    if (elements.locked) {
        elements.locked.hidden = false;
    }

    if (elements.unlocked) {
        elements.unlocked.hidden = true;
    }
}

/**
 * Muestra la sorpresa de cumpleaños.
 */
function showUnlockedBirthday() {
    const elements = getBirthdayElements();

    if (elements.locked) {
        elements.locked.hidden = true;
    }

    if (elements.unlocked) {
        elements.unlocked.hidden = false;
    }

    renderBirthdayContent();
    stopBirthdayCheck();
}

/**
 * Comprueba si ya llegó el cumpleaños.
 */
export function checkBirthday() {
    if (isBirthdayUnlocked()) {
        showUnlockedBirthday();
    } else {
        showLockedBirthday();
    }
}

/**
 * Detiene la comprobación periódica.
 */
export function stopBirthdayCheck() {
    if (birthdayCheckInterval !== null) {
        clearInterval(birthdayCheckInterval);
        birthdayCheckInterval = null;
    }
}

/**
 * Inicializa el sistema de cumpleaños.
 */
export function initBirthday() {
    stopBirthdayCheck();

    checkBirthday();

    if (!isBirthdayUnlocked()) {
        birthdayCheckInterval = setInterval(checkBirthday, 1000);
    }
}
