
/* =========================================
   ALEXA 18 — NAVEGACIÓN
========================================= */

import { animateSection } from "./animations.js";

let currentSection = "inicio";
let navigationInitialized = false;

let sidebar = null;
let sidebarOverlay = null;
let menuToggle = null;
let sidebarClose = null;
let announcement = null;
let navigationButtons = [];

/**
 * Comprueba si el usuario prefiere
 * movimiento reducido.
 */
function prefersReducedMotion() {
    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
}

/**
 * Actualiza el estado accesible del botón del menú.
 */
function updateMenuState(isOpen) {
    if (menuToggle) {
        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    }
}

/**
 * Abre el menú lateral.
 */
export function openSidebar() {
    if (!sidebar) return;

    sidebar.classList.add("open");
    sidebarOverlay?.classList.add("visible");

    document.body.classList.add("menu-open");

    updateMenuState(true);
}

/**
 * Cierra el menú lateral.
 */
export function closeSidebar() {
    if (!sidebar) return;

    sidebar.classList.remove("open");
    sidebarOverlay?.classList.remove("visible");

    document.body.classList.remove("menu-open");

    updateMenuState(false);
}

/**
 * Cambia a una sección determinada.
 */
export function navigateTo(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (
        !targetSection ||
        !targetSection.classList.contains("scene")
    ) {
        console.warn(`No se encontró la sección: ${sectionId}`);
        return;
    }

    // Cerrar el menú si ya estamos en esa sección.
    if (currentSection === sectionId && !targetSection.hidden) {
        closeSidebar();
        return;
    }

    // Ocultar todas las secciones.
    document.querySelectorAll(".scene").forEach(section => {
        section.hidden = true;
    });

    // Mostrar la sección seleccionada.
    targetSection.hidden = false;

    // Guardar la sección actual.
    currentSection = sectionId;

    // Actualizar los botones del menú.
    navigationButtons.forEach(button => {
        const isActive = button.dataset.go === sectionId;

        button.classList.toggle("active", isActive);

        if (isActive) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }
    });

    // Activar la animación de entrada.
    animateSection(targetSection);

    // Cerrar el menú después de navegar.
    closeSidebar();

    // Volver al inicio del contenido.
    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth"
    });

    // Anunciar el cambio de sección.
    if (announcement) {
        const activeButton = navigationButtons.find(
            button => button.dataset.go === sectionId
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
 * Inicializa los eventos de navegación.
 */
export function initNavigation() {
    // Evitar inicializaciones duplicadas.
    if (navigationInitialized) return;

    navigationInitialized = true;

    // Obtener elementos del menú.
    sidebar = document.getElementById("sidebar");
    sidebarOverlay = document.getElementById("sidebar-overlay");
    menuToggle = document.getElementById("menu-toggle");
    sidebarClose = document.getElementById("sidebar-close");
    announcement = document.getElementById("navigation-announcement");

    navigationButtons = Array.from(
        document.querySelectorAll("[data-go]")
    );

    // Botones de navegación.
    navigationButtons.forEach(button => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.go);
        });
    });

    // Abrir menú.
    menuToggle?.addEventListener("click", openSidebar);

    // Cerrar menú.
    sidebarClose?.addEventListener("click", closeSidebar);

    // Cerrar al tocar el fondo.
    sidebarOverlay?.addEventListener("click", closeSidebar);

    // Cerrar con Escape.
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });

    // Estado inicial del menú.
    updateMenuState(false);

    // Mostrar sección inicial.
    navigateTo("inicio");
}
