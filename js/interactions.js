
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

let interactionsInitialized = false;

const discoveredDetails = new Set();
let detailsProgressElement = null;


/**
 * Envía una reacción a Michi.
 */
function notifyMichi(action) {
    document.dispatchEvent(
        new CustomEvent("michi:react", {
            detail: { action }
        })
    );
}


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

        const date = createElement("p", "journal-date", story.date);
        const title = createElement("h3", "journal-title", story.title);
        const text = createElement("p", "journal-text", story.text);

        const number = createElement(
            "span",
            "journal-number",
            String(index + 1).padStart(2, "0")
        );

        card.append(decoration, date, title, text, number);
        container.appendChild(card);
    });
}


/**
 * Crea el contador de detalles descubiertos.
 */
function createDetailsProgress(container) {
    const progress = createElement(
        "div",
        "details-progress"
    );

    progress.id = "details-progress";

    const heading = createElement(
        "p",
        "details-progress__heading",
        "Tu colección de detalles"
    );

    const count = createElement(
        "p",
        "details-progress__count",
        `0 de ${detailsData.length} descubiertos`
    );

    count.id = "details-progress-count";

    const track = createElement(
        "div",
        "details-progress__track"
    );

    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-label", "Detalles descubiertos");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", String(detailsData.length));
    track.setAttribute("aria-valuenow", "0");

    const fill = createElement(
        "div",
        "details-progress__fill"
    );

    fill.id = "details-progress-fill";

    track.appendChild(fill);

    const completion = createElement(
        "p",
        "details-progress__completion",
        ""
    );

    completion.id = "details-progress-completion";
    completion.hidden = true;

    progress.append(
        heading,
        count,
        track,
        completion
    );

    container.parentNode.insertBefore(progress, container);

    detailsProgressElement = progress;
}


/**
 * Actualiza el contador visual.
 */
function updateDetailsProgress() {
    const countElement = document.getElementById(
        "details-progress-count"
    );

    const fillElement = document.getElementById(
        "details-progress-fill"
    );

    const trackElement = detailsProgressElement?.querySelector(
        '[role="progressbar"]'
    );

    const completionElement = document.getElementById(
        "details-progress-completion"
    );

    const total = detailsData.length;
    const discovered = discoveredDetails.size;
    const percentage = total > 0
        ? (discovered / total) * 100
        : 0;

    if (countElement) {
        countElement.textContent =
            `${discovered} de ${total} descubiertos`;
    }

    if (fillElement) {
        fillElement.style.width = `${percentage}%`;
    }

    if (trackElement) {
        trackElement.setAttribute(
            "aria-valuenow",
            String(discovered)
        );
    }

    if (discovered === total && total > 0) {
        if (completionElement && completionElement.hidden) {
            completionElement.hidden = false;

            completionElement.textContent =
                "¡Colección completada! Has descubierto los 18 detalles. ♡";

            detailsProgressElement?.classList.add(
                "details-progress--complete"
            );

            notifyMichi("all-details");
        }
    }
}


/**
 * Registra un detalle como descubierto.
 */
function discoverDetail(card, index) {
    if (discoveredDetails.has(index)) return;

    discoveredDetails.add(index);

    card.classList.add("detail-discovered");
    card.setAttribute("aria-pressed", "true");

    updateDetailsProgress();

    if (discoveredDetails.size < detailsData.length) {
        notifyMichi("detail");
    }
}


/**
 * Muestra los detalles sobre Alexa.
 */
function renderDetails() {
    const container = document.getElementById("details-container");

    if (!container) return;

    container.replaceChildren();

    if (!Array.isArray(detailsData)) return;

    createDetailsProgress(container);

    detailsData.forEach((detail, index) => {
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

        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-pressed", "false");
        card.setAttribute(
            "aria-label",
            `Descubrir detalle: ${detail.title}`
        );

        card.addEventListener("click", () => {
            discoverDetail(card, index);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                discoverDetail(card, index);
            }
        });

        container.appendChild(card);
    });

    updateDetailsProgress();
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

        const name = createElement("h3", "cat-name", cat.name);

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
            notifyMichi("cat");
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

    messageContainer.classList.remove("cat-message-animation");

    void messageContainer.offsetWidth;

    messageContainer.classList.add("cat-message-animation");

    surprise.hidden = false;

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

            notifyMichi("surprise");
            return;
        }

        const randomIndex = Math.floor(
            Math.random() * hiddenMessages.length
        );

        showCatMessage(hiddenMessages[randomIndex]);
        notifyMichi("surprise");
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

        if (isClosed) {
            notifyMichi("letter-open");
        }
    });
}


/**
 * Inicializa todas las interacciones.
 */
export function initInteractions() {
    if (interactionsInitialized) return;

    interactionsInitialized = true;

    renderHistory();
    renderDetails();
    renderCats();
    renderLetter();

    initCatSurprise();
    initLetter();
}
