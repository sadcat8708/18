
/* =========================================
   ALEXA 18 — INTERACCIONES
========================================= */

import {
    historyData,
    detailsData,
    catsData,
    letterData,
    hiddenMessages
} from "./data.js";

/* Evitar inicializaciones duplicadas */

let interactionsInitialized = false;


/**
 * Crea un elemento HTML de forma segura.
 */
function createElement(tag, className, text = "") {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    element.textContent = text ?? "";

    return element;
}


/**
 * Muestra las historias en formato de diario.
 */
function renderHistory() {
    const container = document.getElementById("story-container");

    if (!container) return;

    container.replaceChildren();

    if (!Array.isArray(historyData)) return;

    historyData.forEach((story, index) => {
        const card = createElement("article", "journal-page");

        const decoration = createElement(
            "span",
            "journal-decoration",
            story.decoration || "♡"
        );

        decoration.setAttribute("aria-hidden", "true");

        const date = createElement(
            "p",
            "journal-date",
            story.date
        );

        const title = createElement(
            "h3",
            "journal-title",
            story.title
        );

        const text = createElement(
            "p",
            "journal-text",
            story.text
        );

        const number = createElement(
            "span",
            "journal-number",
            String(index + 1).padStart(2, "0")
        );

        card.append(
            decoration,
            date,
            title,
            text,
            number
        );

        container.appendChild(card);
    });
}


/**
 * Muestra los detalles sobre Alexa.
 */
function renderDetails() {
    const container = document.getElementById("details-container");

    if (!container) return;

    container.replaceChildren();

    if (!Array.isArray(detailsData)) return;

    detailsData.forEach(detail => {
        const card = createElement("article", "detail-card");

        const icon = createElement(
            "span",
            "detail-icon",
            detail.icon || "♡"
        );

        icon.setAttribute("aria-hidden", "true");

        const title = createElement(
            "h3",
            "detail-title",
            detail.title
        );

        const text = createElement(
            "p",
            "detail-text",
            detail.text
        );

        card.append(icon, title, text);

        container.appendChild(card);
    });
}


/**
 * Muestra las tarjetas de gatitos.
 */
function renderCats() {
    const container = document.getElementById("cats-container");

    if (!container) return;

    container.replaceChildren();

    if (!Array.isArray(catsData)) return;

    catsData.forEach(cat => {
        const card = createElement("article", "cat-card");

        const imageContainer = createElement(
            "div",
            "cat-image-container"
        );

        const image = document.createElement("img");

        image.className = "cat-image";
        image.src = cat.image;
        image.alt = cat.name || "Ilustración de un gatito";
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.classList.add("cat-image-error");
            image.alt = "Ilustración de gatito no disponible";
        });

        imageContainer.appendChild(image);

        const name = createElement(
            "h3",
            "cat-name",
            cat.name
        );

        const description = createElement(
            "p",
            "cat-description",
            cat.description
        );

        const messageButton = createElement(
            "button",
            "secondary-button cat-message-button",
            "Leer mensaje"
        );

        messageButton.type = "button";

        messageButton.addEventListener("click", () => {
            showCatMessage(cat.message);
        });

        card.append(
            imageContainer,
            name,
            description,
            messageButton
        );

        container.appendChild(card);
    });
}


/**
 * Construye y muestra el mensaje animado de un gatito.
 */
function showCatMessage(message) {
    const surprise = document.getElementById("cat-surprise");

    const messageContainer = document.getElementById(
        "cat-surprise-message"
    );

    if (!surprise || !messageContainer) return;

    const hearts = createElement(
        "span",
        "cat-message-hearts",
        "♡  ♥  ♡"
    );

    hearts.setAttribute("aria-hidden", "true");

    const messageText = createElement(
        "p",
        "cat-message-text",
        message || "¡Un saludo especial para ti! ♡"
    );

    const sparkles = createElement(
        "span",
        "cat-message-sparkles",
        "✧  ✦  ✧"
    );

    sparkles.setAttribute("aria-hidden", "true");

    messageContainer.replaceChildren(
        hearts,
        messageText,
        sparkles
    );

    /* Reiniciar animación */

    messageContainer.classList.remove("cat-message-animation");

    void messageContainer.offsetWidth;

    messageContainer.classList.add("cat-message-animation");

    /* Mostrar mensaje */

    surprise.hidden = false;

    /* Desplazarse hasta la sorpresa */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    surprise.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest"
    });
}


/**
 * Prepara el botón de sorpresa aleatoria.
 */
function initCatSurprise() {
    const button = document.querySelector("[data-surprise]");

    if (!button) return;

    button.addEventListener("click", () => {
        if (
            !Array.isArray(hiddenMessages) ||
            hiddenMessages.length === 0
        ) {
            showCatMessage(
                "¡Has descubierto un pequeño secreto de ALEXA 18! ♡"
            );

            return;
        }

        const randomIndex = Math.floor(
            Math.random() * hiddenMessages.length
        );

        showCatMessage(hiddenMessages[randomIndex]);
    });
}


/**
 * Muestra el contenido de la carta.
 */
function renderLetter() {
    const container = document.getElementById("letter-content");

    if (!container) return;

    container.replaceChildren();

    if (!letterData) return;

    const title = createElement(
        "h3",
        "letter-title",
        letterData.title
    );

    container.appendChild(title);

    if (Array.isArray(letterData.paragraphs)) {
        letterData.paragraphs.forEach(paragraph => {
            const text = createElement(
                "p",
                "letter-paragraph",
                paragraph
            );

            container.appendChild(text);
        });
    }

    const closing = createElement(
        "p",
        "letter-closing",
        letterData.closing
    );

    container.appendChild(closing);
}


/**
 * Controla la apertura y cierre de la carta.
 */
function initLetter() {
    const button = document.getElementById("open-letter");
    const paper = document.getElementById("letter-paper");

    if (!button || !paper) return;

    paper.hidden = true;

    button.textContent = "Abrir carta";

    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "letter-paper");

    button.addEventListener("click", () => {
        const isClosed = paper.hidden;

        paper.hidden = !isClosed;

        button.textContent = isClosed
            ? "Cerrar carta"
            : "Abrir carta";

        button.setAttribute(
            "aria-expanded",
            String(isClosed)
        );
    });
}


/**
 * Inicializa todas las interacciones.
 */
export function initInteractions() {

    /* Evitar eventos duplicados */

    if (interactionsInitialized) return;

    interactionsInitialized = true;

    renderHistory();
    renderDetails();
    renderCats();
    renderLetter();

    initCatSurprise();
    initLetter();
}
