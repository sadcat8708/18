
/* =========================================
   ALEXA 18 — ANIMACIONES JAVASCRIPT
   ========================================= */

/**
 * Observa los elementos y activa su animación
 * cuando aparecen en pantalla.
 */
let observer = null;

function createObserver() {
    if (!("IntersectionObserver" in window)) {
        return null;
    }

    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });
}

/**
 * Prepara los elementos que tendrán animación.
 */
export function prepareAnimations() {
    observer?.disconnect();
    observer = createObserver();

    const animatedElements = document.querySelectorAll(
        ".detail-card, .cat-card, .surprise-card, .journal-page"
    );

    animatedElements.forEach(element => {
        if (observer) {
            element.classList.add("will-animate");
            observer.observe(element);
        } else {
            element.classList.add("is-visible");
        }
    });
}

/**
 * Activa una pequeña animación al cambiar de sección.
 */
export function animateSection(section) {
    if (!section) return;

    section.classList.remove("section-enter");

    // Reiniciar la animación
    void section.offsetWidth;

    section.classList.add("section-enter");
}

/**
 * Efecto de movimiento suave en elementos decorativos.
 */
export function initDecorations() {
    const decorations = document.querySelectorAll(
        ".background-decoration, .flower-decoration, .heart-decoration"
    );

    decorations.forEach((decoration, index) => {
        decoration.style.animationDelay = `${index * 0.25}s`;
    });
}

/**
 * Inicializa las animaciones.
 */
export function initAnimations() {
    prepareAnimations();
    initDecorations();
}
