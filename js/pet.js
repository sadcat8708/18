
/* =========================================
   ALEXA 18 — MICHI, GATITO ACOMPAÑANTE
   ========================================= */

const michiReactions = {
    inicio: {
        mood: "is-happy",
        messages: [
            "¡Hola! Soy Michi. ¡Bienvenida! ♡",
            "¡Miau! Qué alegría tenerte aquí.",
            "¡Vamos a descubrir este pequeño universo!"
        ]
    },

    historia: {
        mood: "is-curious",
        messages: [
            "¡Qué bonitos recuerdos! ♡",
            "Me pregunto qué historia viene ahora...",
            "Las pequeñas historias también son especiales."
        ]
    },

    explora: {
        mood: "is-happy",
        messages: [
            "¡Vamos a descubrir los 18 detalles!",
            "¡Cada detalle es una pequeña sorpresa!",
            "¿Cuál será tu favorito?"
        ]
    },

    gatitos: {
        mood: "is-happy",
        messages: [
            "¡Este es mi lugar favorito! 🐾",
            "¡Más gatitos, más felicidad!",
            "¡Miau! ¡Qué bonito es este rincón!"
        ]
    },

    carta: {
        mood: "is-shy",
        messages: [
            "Creo que aquí hay palabras muy bonitas...",
            "¡Me da curiosidad saber qué dice!",
            "Las palabras bonitas siempre son especiales. ♡"
        ]
    },

    cumpleanos: {
        mood: "is-celebrating",
        messages: [
            "¡Feliz cumpleaños, Alexa! 🎂",
            "¡Hoy es un día para celebrar!",
            "¡Miauuu! ¡Que tengas un día maravilloso!"
        ]
    }
};

const michiClickMessages = [
    "¡Miauuu! Me alegra que me visites. ♡",
    "¡Hola otra vez! ¿Seguimos explorando?",
    "¡Qué alegría tenerte por aquí! 🐾",
    "¡Te mando un poquito de ternura!"
];

let michiInitialized = false;
let michiMessageTimeout = null;
let currentMichiSection = "inicio";

function getMichiElements() {
    return {
        pet: document.getElementById("michi-pet"),
        button: document.getElementById("michi-button"),
        message: document.getElementById("michi-message")
    };
}

function getRandomMessage(messages) {
    if (!messages || messages.length === 0) {
        return "¡Miau! ♡";
    }

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

function showMichiMessage(message) {
    const { pet, message: messageElement } = getMichiElements();

    if (!pet || !messageElement) return;

    messageElement.textContent = message;
    pet.classList.add("is-talking");
}

function hideMichiMessage() {
    const { pet } = getMichiElements();

    if (!pet) return;

    pet.classList.remove("is-talking");
}

function setMichiState(state) {
    const { pet } = getMichiElements();

    if (!pet) return;

    pet.classList.remove(
        "is-happy",
        "is-sleeping",
        "is-surprised",
        "is-curious",
        "is-shy",
        "is-celebrating"
    );

    if (state) {
        pet.classList.add(state);
    }
}

function scheduleMichiMessage(duration = 4500) {
    window.clearTimeout(michiMessageTimeout);

    michiMessageTimeout = window.setTimeout(() => {
        hideMichiMessage();
    }, duration);
}

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

    const section = validSections.includes(sectionId)
        ? sectionId
        : "inicio";

    if (section === currentMichiSection && pet.dataset.section === section) {
        return;
    }

    currentMichiSection = section;
    pet.dataset.section = section;

    const reaction = michiReactions[section];

    setMichiState(reaction.mood);
    showMichiMessage(getRandomMessage(reaction.messages));
    scheduleMichiMessage();
}

function getCurrentSection() {
    const sections = document.querySelectorAll(".scene");

    for (const section of sections) {
        if (!section.hidden) {
            return section.id;
        }
    }

    return "inicio";
}

function handleMichiClick() {
    const { pet } = getMichiElements();

    if (!pet) return;

    const message = getRandomMessage(michiClickMessages);

    setMichiState("is-happy");
    showMichiMessage(message);
    scheduleMichiMessage(3500);
}

function initMichiNavigation() {
    const sections = document.querySelectorAll(".scene");

    if (!sections.length) return;

    const observer = new MutationObserver(() => {
        updateMichiSection(getCurrentSection());
    });

    sections.forEach(section => {
        observer.observe(section, {
            attributes: true,
            attributeFilter: ["hidden"]
        });
    });
}

function initMichiEvents() {
    const { button } = getMichiElements();

    if (!button) return;

    button.addEventListener("click", handleMichiClick);
}

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

    currentMichiSection = "";

    updateMichiSection(getCurrentSection());

    console.log("🐾 Michi está listo para acompañar a Alexa.");
}
