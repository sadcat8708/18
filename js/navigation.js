
/* =========================================
   ALEXA 18 — NAVEGACIÓN
   ========================================= */

let currentSection = "inicio";

const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const menuToggle = document.getElementById("menu-toggle");
const sidebarClose = document.getElementById("sidebar-close");
const announcement = document.getElementById("navigation-announcement");

const navigationButtons = document.querySelectorAll("[data-go]");

/**
 * Abre el menú lateral.
 */
export function openSidebar() {
    if (!sidebar) return;

    sidebar.classList.add("open");
    sidebarOverlay?.classList.add("visible");

    document.body.classList.add("menu-open");
}

/**
 * Cierra el menú lateral.
 */
export function closeSidebar() {
    if (!sidebar) return;

    sidebar.classList.remove("open");
    sidebarOverlay?.classList.remove("visible");

    document.body.classList.remove("menu-open");
}

/**
 * Cambia a una sección determinada.
 */
export function navigateTo(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (!targetSection || !targetSection.classList.contains("scene")) {
        console.warn(`No se encontró la sección: ${sectionId}`);
        return;
    }

    // Ocultar todas las secciones
    document.querySelectorAll(".scene").forEach(section => {
        section.hidden = true;
    });

    // Mostrar la sección seleccionada
    targetSection.hidden = false;

    // Guardar sección actual
    currentSection = sectionId;

    // Actualizar botones del menú
    navigationButtons.forEach(button => {
        const isActive = button.dataset.go === sectionId;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-current", isActive ? "page" : "false");
    });

    // Cerrar menú después de navegar
    closeSidebar();

    // Volver al inicio del contenido
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Anunciar cambio de sección
    if (announcement) {
        const activeButton = document.querySelector(
            `[data-go="${sectionId}"]`
        );

        const sectionName = activeButton
            ? activeButton.textContent.trim()
            : sectionId;

        announcement.textContent = `Sección: ${sectionName}`;
    }
}

/**
 * Devuelve la sección actual.
 */
export function getCurrentSection() {
    return currentSection;
}

/**
 * Inicializa todos los eventos de navegación.
 */
export function initNavigation() {
    // Botones de navegación
    navigationButtons.forEach(button => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.go);
        });
    });

    // Abrir menú
    menuToggle?.addEventListener("click", openSidebar);

    // Cerrar menú
    sidebarClose?.addEventListener("click", closeSidebar);

    // Cerrar al tocar el fondo
    sidebarOverlay?.addEventListener("click", closeSidebar);

    // Cerrar con Escape
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });

    // Mostrar sección inicial
    navigateTo("inicio");
}
