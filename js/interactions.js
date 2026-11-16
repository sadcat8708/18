
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

/**
 * Crea un elemento HTML de forma segura.
 */
function createElement(tag, className, text = "") {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    element.textContent = text;

    return element;
}

/**
 * Muestra las historias en formato de diario.
 */
function renderHistory() {
    const container = document.getElementById("story-container");

    if (!container) return;

    container.replaceChildren();

    historyData.forEach((story, index) => {
        const card = createElement("article", "journal-page");

        const decoration = createElement(
            "span",
            "journal-decoration",
            story.decoration
        );

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
            `0${index + 1}`
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

    detailsData.forEach(detail => {
        const card = createElement("article", "detail-card");

        const icon = createElement(
            "span",
            "detail-icon",
            detail.icon
        );

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
 * Muestra las tarjetas de gatitos con sus ilustraciones.
 */
function renderCats() {
    const container = document.getElementById("cats-container");

    if (!container) return;

    container.replaceChildren();

    catsData.forEach(cat => {
        const card = createElement("article", "cat-card");

        // Contenedor de la ilustración
        const imageContainer = createElement(
            "div",
            "cat-image-container"
        );

        // Imagen individual del gatito
        const image = document.createElement("img");

        image.className = "cat-image";
        image.src = cat.image;
        image.alt = cat.name;
        image.loading = "lazy";

        // Evita mostrar una imagen rota si falta el archivo
        image.addEventListener("error", () => {
            image.alt = `No se pudo cargar la ilustración de ${cat.name}`;
            image.classList.add("cat-image-error");
        });

        imageContainer.appendChild(image);

        // Nombre del gatito
        const name = createElement(
            "h3",
            "cat-name",
            cat.name
        );

        // Descripción
        const description = createElement(
            "p",
            "cat-description",
            cat.description
        );

        // Botón para leer el mensaje
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
 * Muestra un mensaje de gatito.
 */
function showCatMessage(message) {
    const surprise = document.getElementById("cat-surprise");

    const messageContainer = document.getElementById(
        "cat-surprise-message"
    );

    if (!surprise || !messageContainer) return;

    messageContainer.textContent = message;
    surprise.hidden = false;

    surprise.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

/**
 * Prepara el botón de sorpresa de los gatitos.
 */
function initCatSurprise() {
    const button = document.querySelector("[data-surprise]");

    if (!button) return;

    button.addEventListener("click", () => {
        const randomIndex = Math.floor(
            Math.random() * hiddenMessages.length
        );

        const surprise = document.getElementById("cat-surprise");

        const messageContainer = document.getElementById(
            "cat-surprise-message"
        );

        if (!surprise || !messageContainer) return;

        messageContainer.textContent = hiddenMessages[randomIndex];
        surprise.hidden = false;
    });
}

/**
 * Muestra el contenido de la carta.
 */
function renderLetter() {
    const container = document.getElementById("letter-content");

    if (!container) return;

    container.replaceChildren();

    const title = createElement(
        "h3",
        "letter-title",
        letterData.title
    );

    container.appendChild(title);

    letterData.paragraphs.forEach(paragraph => {
        const text = createElement(
            "p",
            "letter-paragraph",
            paragraph
        );

        container.appendChild(text);
    });

    const closing = createElement(
        "p",
        "letter-closing",
        letterData.closing
    );

    container.appendChild(closing);
}

/**
 * Controla la apertura de la carta.
 */
function initLetter() {
    const button = document.getElementById("open-letter");
    const paper = document.getElementById("letter-paper");

    if (!button || !paper) return;

    paper.hidden = true;

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
    renderHistory();
    renderDetails();
    renderCats();
    renderLetter();

    initCatSurprise();
    initLetter();
}
