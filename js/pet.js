
/* =========================================
   ALEXA 18 - MICHI, MASCOTA VIRTUAL
   Control de interacciones y comportamiento
========================================= */

const michiMessages = {
    inicio: [
        "¡Hola! Soy Michi y te acompaño en este recorrido ♡",
        "¡Bienvenida! Espero que disfrutes este pequeño diario.",
        "¡Miau! Tenemos muchas cositas por descubrir."
    ],

    historia: [
        "¡Qué bonitos recuerdos! ♡",
        "Las pequeñas historias también son especiales.",
        "Cada recuerdo merece un lugarcito."
    ],

    explora: [
        "¡Vamos a descubrir los 18 detalles!",
        "Cada persona tiene algo que la hace especial.",
        "¡Miau! ¿Cuál será tu detalle favorito?"
    ],

    gatitos: [
        "¡Este es mi lugar favorito! 🐾",
        "¡Más gatitos, más felicidad!",
        "Un poquito de ternura nunca está de más."
    ],

    carta: [
        "Las palabras bonitas siempre merecen ser leídas.",
        "Tengo curiosidad por saber qué dice esa carta.",
        "¡Espero que te guste este pequeño mensaje!"
    ],

    cumpleanos: [
        "¡Se acerca un día muy especial! 🎂",
        "¡Miau! Ya casi llega la celebración.",
        "¡Espero que tengas un cumpleaños maravilloso!"
    ]
};

const michiReactions = [
    {
        message: "¡Miauuu! Me alegra que me visites. ♡",
        state: "is-happy"
    },
    {
        message: "¡Hola otra vez! ¿Seguimos explorando?",
        state: "is-happy"
    },
    {
        message: "¡Qué alegría tenerte por aquí! 🐾",
        state: "is-happy"
    },
    {
        message: "¡Miau! Te tengo una pequeña sorpresa.",
        state: "is-surprised"
    }
];

let michiInitialized = false;

/* =========================================
   OBTENER ELEMENTOS
========================================= */

function getMichiElements() {
    return {
        pet: document.getElementById("michi-pet"),
        button: document.getElementById("michi-button"),
        message: document.getElementById("michi-message")
    };
}

/* =========================================
   MOSTRAR MENSAJE
========================================= */

function showMichiMessage(message) {
    const { pet, message: messageElement } = getMichiElements();

    if (!pet || !messageElement) return;

    messageElement.textContent = message;

    pet.classList.add("is-talking");
}

/* =========================================
   OCULTAR MENSAJE
========================================= */

function hideMichiMessage() {
    const { pet } = getMichiElements();

    if (!pet) return;

    pet.classList.remove("is-talking");
}

/* =========================================
   CAMBIAR ESTADO DE MICHI
========================================= */

function setMichiState(state) {
    const { pet } = getMichiElements();

    if (!pet) return;

    pet.classList.remove(
        "is-happy",
        "is-sleeping",
        "is-surprised"
    );

    if (state) {
        pet.classList.add(state);
    }
}

/* =========================================
   ELEGIR MENSAJE ALEATORIO
========================================= */

function getRandomMessage(messages) {
    if (!messages || messages.length === 0) {
        return "¡Miau! ♡";
    }

    const randomIndex = Math.floor(
        Math.random() * messages.length
    );

    return messages[randomIndex];
}

/* =========================================
   DETECTAR SECCIÓN ACTUAL
========================================= */

function getCurrentSection() {
    const sections = document.querySelectorAll(".scene");

    for (const section of sections) {
        if (!section.hidden) {
            return section.id;
        }
    }

    return "inicio";
}

/* =========================================
   ACTUALIZAR POSICIÓN Y MENSAJE
========================================= */

function updateMichiSection(sectionId) {
    const { pet } = getMichiElements();

    if (!pet) return;

    const validSections = [
        "inicio",
        "historia",
        "explora",
        "gatitos",
        "carta",
        "cumpleanos"
    ];

    const currentSection = validSections.includes(sectionId)
        ? sectionId
        : "inicio";

    pet.dataset.section = currentSection;

    const messages = michiMessages[currentSection];

    showMichiMessage(getRandomMessage(messages));

    setMichiState("");

    /*
       Ocultar el mensaje después de unos segundos.
       El mensaje también puede abrirse al tocar a Michi.
    */

    window.clearTimeout(pet.messageTimeout);

    pet.messageTimeout = window.setTimeout(() => {
        hideMichiMessage();
    }, 4500);
}

/* =========================================
   INTERACCIÓN AL TOCAR A MICHI
========================================= */

function handleMichiClick() {
    const { pet } = getMichiElements();

    if (!pet) return;

    const reaction = getRandomMessage(michiReactions);

    const selectedReaction = michiReactions.find(
        item => item.message === reaction
    );

    if (!selectedReaction) return;

    setMichiState(selectedReaction.state);

    showMichiMessage(selectedReaction.message);

    window.clearTimeout(pet.messageTimeout);

    pet.messageTimeout = window.setTimeout(() => {
        hideMichiMessage();
        setMichiState("");
    }, 3500);
}

/* =========================================
   OBSERVAR CAMBIOS DE SECCIÓN
========================================= */

function initMichiNavigation() {
    const sections = document.querySelectorAll(".scene");

    if (!sections.length) return;

    const observer = new MutationObserver(() => {
        const currentSection = getCurrentSection();

        updateMichiSection(currentSection);
    });

    sections.forEach(section => {
        observer.observe(section, {
            attributes: true,
            attributeFilter: ["hidden"]
        });
    });

    /*
       Guardamos el observador para poder desconectarlo
       si en el futuro necesitamos reiniciar la mascota.
    */

    const { pet } = getMichiElements();

    if (pet) {
        pet.sectionObserver = observer;
    }
}

/* =========================================
   INICIALIZAR EVENTOS
========================================= */

function initMichiEvents() {
    const { button } = getMichiElements();

    if (!button) return;

    button.addEventListener("click", handleMichiClick);
}

/* =========================================
   INICIALIZAR MICHI
========================================= */

export function initPet() {
    if (michiInitialized) return;

    const { pet } = getMichiElements();

    if (!pet) {
        console.warn("No se encontró el contenedor de Michi.");
        return;
    }

    michiInitialized = true;

    initMichiEvents();
    initMichiNavigation();

    const initialSection = getCurrentSection();

    updateMichiSection(initialSection);

    console.log("🐾 Michi está listo para acompañar a Alexa.");
}
