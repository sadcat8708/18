
/* =========================================
   ALEXA 18 — ANIMACIONES JAVASCRIPT
========================================= */

let observer = null;

/**
 * Comprueba si el navegador admite animaciones reducidas.
 */
function prefersReducedMotion() {
    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
}

/**
 * Crea el observador de elementos.
 */
function createObserver() {
    if (!("IntersectionObserver" in window)) {
        return null;
    }

    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer?.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });
}

/**
 * Prepara las tarjetas y elementos animados.
 */
export function prepareAnimations() {
    if (prefersReducedMotion()) {
        document.querySelectorAll(
            ".detail-card, .cat-card, .surprise-card, .journal-page"
        ).forEach(element => {
            element.classList.add("is-visible");
            element.classList.remove("will-animate");
        });

        observer?.disconnect();
        observer = null;
        return;
    }

    observer?.disconnect();
    observer = createObserver();

    const animatedElements = document.querySelectorAll(
        ".detail-card, .cat-card, .surprise-card, .journal-page"
    );

    animatedElements.forEach(element => {
        if (element.classList.contains("is-visible")) {
            return;
        }

        if (observer) {
            element.classList.add("will-animate");
            observer.observe(element);
        } else {
            element.classList.add("is-visible");
        }
    });
}

/**
 * Activa las animaciones de elementos nuevos.
 * Útil cuando JavaScript genera tarjetas dinámicamente.
 */
export function refreshAnimations() {
    prepareAnimations();
}

/**
 * Anima una sección al cambiar de pantalla.
 */
export function animateSection(section) {
    if (!section || prefersReducedMotion()) {
        return;
    }

    section.classList.remove("section-enter");

    // Reiniciar la animación.
    void section.offsetWidth;

    section.classList.add("section-enter");
}

/**
 * Prepara las decoraciones de la portada.
 */
export function initDecorations() {
    const decorations = document.querySelectorAll(
        ".background-decoration, .flower-decoration, .heart-decoration, .star-decoration"
    );

    decorations.forEach((decoration, index) => {
        decoration.style.animationDelay = `${index * 0.25}s`;
    });
}

/**
 * Inicializa todas las animaciones.
 */
export function initAnimations() {
    prepareAnimations();
    initDecorations();
}
