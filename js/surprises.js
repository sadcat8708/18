
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

    container.textContent = message;
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
        ".heart-decoration, .flower-decoration, .background-decoration"
    );

    decorations.forEach(decoration => {
        decoration.addEventListener("click", () => {
            showSecretMessage();
        });

        // Permitir interacción mediante teclado
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
 * Activa los secretos de elementos marcados
 * con el atributo data-secret.
 */
function initCustomSecrets() {
    const secretElements = document.querySelectorAll("[data-secret]");

    secretElements.forEach(element => {
        element.addEventListener("click", () => {
            const customMessage = element.dataset.secret;

            showSecretMessage(
                customMessage || getRandomMessage()
            );
        });
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
