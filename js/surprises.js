
/* =========================================
   ALEXA 18 — DETALLES Y SECRETOS
   ========================================= */

import { hiddenMessages } from "./data.js";

let messageTimeout = null;

/**
 * Crea el espacio donde aparecerán los mensajes.
 */
function createMessageContainer() {
    let container = document.getElementById("secret-message");

    if (container) return container;

    container = document.createElement("div");
    container.id = "secret-message";
    container.className = "secret-message";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");

    document.body.appendChild(container);

    return container;
}

/**
 * Selecciona un mensaje aleatorio.
 */
function getRandomMessage() {
    if (!Array.isArray(hiddenMessages) || hiddenMessages.length === 0) {
        return "¡Has descubierto un pequeño secreto de ALEXA 18! ♡";
    }

    const index = Math.floor(
        Math.random() * hiddenMessages.length
    );

    return hiddenMessages[index];
}

/**
 * Muestra un mensaje sorpresa.
 */
export function showSecretMessage(message = getRandomMessage()) {
    const container = createMessageContainer();

    container.textContent = message || getRandomMessage();
    container.classList.add("visible");

    if (messageTimeout !== null) {
        clearTimeout(messageTimeout);
    }

    messageTimeout = setTimeout(() => {
        container.classList.remove("visible");
        messageTimeout = null;
    }, 3500);
}

/**
 * Activa los secretos de las decoraciones.
 */
function initDecorationSecrets() {
    const decorations = document.querySelectorAll(
        ".heart-decoration, .flower-decoration, .star-decoration"
    );

    decorations.forEach(decoration => {
        if (decoration.dataset.secretInitialized === "true") {
            return;
        }

        decoration.dataset.secretInitialized = "true";

        decoration.addEventListener("click", () => {
            showSecretMessage();
        });

        decoration.setAttribute("tabindex", "0");
        decoration.setAttribute("role", "button");
        decoration.setAttribute(
            "aria-label",
            "Descubrir un mensaje sorpresa"
        );

        decoration.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                showSecretMessage();
            }
        });
    });
}

/**
 * Activa los secretos personalizados.
 */
function initCustomSecrets() {
    const secretElements = document.querySelectorAll("[data-secret]");

    secretElements.forEach(element => {
        if (element.dataset.secretInitialized === "true") {
            return;
        }

        element.dataset.secretInitialized = "true";

        const isInteractive = element.matches(
            "button, a, input, select, textarea"
        );

        if (!isInteractive) {
            element.setAttribute("tabindex", "0");
            element.setAttribute("role", "button");
        }

        element.addEventListener("click", () => {
            const customMessage = element.dataset.secret;

            showSecretMessage(
                customMessage || getRandomMessage()
            );
        });

        if (!isInteractive) {
            element.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();

                    const customMessage = element.dataset.secret;

                    showSecretMessage(
                        customMessage || getRandomMessage()
                    );
                }
            });
        }
    });
}

/**
 * Inicializa todos los detalles secretos.
 */
export function initSurprises() {
    createMessageContainer();
    initDecorationSecrets();
    initCustomSecrets();
}
