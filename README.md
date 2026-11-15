# 💗 ALEXA 18

Proyecto web interactivo creado como regalo digital para celebrar los 18 años de Alexa.

## 1. Descripción del proyecto

ALEXA 18 es una experiencia web personalizada, diseñada para transmitir aprecio, admiración y buenos deseos mediante una página interactiva.

La experiencia estará dividida en diferentes secciones que Alexa podrá explorar libremente.

El regalo se entregará el **19 de enero de 2027** y tendrá una sorpresa especial que se desbloqueará automáticamente el **20 de enero de 2027**, día de su cumpleaños.

## 2. Objetivos

- Crear una experiencia web personalizada e interactiva.
- Presentar 18 detalles y cualidades especiales de Alexa.
- Incluir una sección temática inspirada en los gatos.
- Crear una carta personal.
- Implementar un contador de cumpleaños.
- Desbloquear automáticamente una sorpresa el día de su cumpleaños.
- Diseñar una interfaz adaptable a computadores, tabletas y celulares.

## 3. Tecnologías

| Tecnología      | Función                        |
| --------------- | ------------------------------ |
| HTML5           | Estructura de la página        |
| CSS3            | Diseño, estilos y animaciones  |
| JavaScript ES6+ | Lógica e interactividad        |
| Git             | Control de versiones           |
| GitHub          | Almacenamiento del repositorio |
| GitHub Pages    | Publicación del sitio web      |

**Características técnicas:**

- Sin base de datos.
- Sin backend.
- Sin sistema de autenticación.
- Arquitectura modular.
- Navegación híbrida: guiada y libre.
- Diseño responsive.
- Código organizado y reutilizable.

## 4. Arquitectura de carpetas

```text
18/
│
├── index.html
├── README.md
├── .gitignore
│
├── css/
│   ├── variables.css
│   ├── main.css
│   ├── components.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── config.js
│   ├── data.js
│   ├── navigation.js
│   ├── animations.js
│   ├── interactions.js
│   ├── counter.js
│   ├── birthday.js
│   └── surprises.js
│
└── assets/
    │
    ├── images/
    ├── illustrations/
    ├── icons/
    ├── audio/
    └── fonts/
```

## 5. Descripción de los archivos

### HTML

| Archivo      | Responsabilidad                                |
| ------------ | ---------------------------------------------- |
| `index.html` | Estructura principal y secciones de la página. |

### CSS

| Archivo          | Responsabilidad                                       |
| ---------------- | ----------------------------------------------------- |
| `variables.css`  | Variables globales, colores, fuentes y medidas.       |
| `main.css`       | Estilos generales de la aplicación.                   |
| `components.css` | Botones, tarjetas, menús y componentes reutilizables. |
| `animations.css` | Animaciones y transiciones.                           |
| `responsive.css` | Adaptación a diferentes tamaños de pantalla.          |

### JavaScript

| Archivo           | Responsabilidad                                     |
| ----------------- | --------------------------------------------------- |
| `main.js`         | Punto de entrada e inicialización de la aplicación. |
| `config.js`       | Configuración general y fechas importantes.         |
| `data.js`         | Información, textos y contenido personalizado.      |
| `navigation.js`   | Navegación entre las diferentes secciones.          |
| `animations.js`   | Control de animaciones y efectos visuales.          |
| `interactions.js` | Eventos, botones e interacciones del usuario.       |
| `counter.js`      | Contador regresivo para el cumpleaños.              |
| `birthday.js`     | Comprobación de fechas y desbloqueo de contenido.   |
| `surprises.js`    | Sorpresas, mensajes y elementos especiales.         |

## 6. Secciones de la página

### 01. Inicio

- Presentación ALEXA 18.
- Mensaje de bienvenida.
- Introducción a la experiencia.
- Acceso a la navegación.

### 02. Una pequeña historia

- Presentación de la intención del regalo.
- Mensajes sobre lo especial que ha sido conocerla.
- Narración visual.

### 03. Explora

- Menú interactivo.
- Acceso libre a las secciones.
- Elementos visuales interactivos.

### 04. 18 detalles

- Dieciocho cualidades y características.
- Tarjetas interactivas.
- Animaciones al descubrir cada detalle.

### 05. Universo de gatitos

- Ilustraciones de gatos.
- Elementos interactivos.
- Sorpresas temáticas.

### 06. Una carta para Alexa

- Carta personalizada.
- Diseño inspirado en una carta física.
- Animación de apertura.

### 07. Sorpresa de cumpleaños

- Mensaje especial de cumpleaños.
- Celebración de sus 18 años.
- Animación especial.
- Contenido disponible desde el 20 de enero de 2027.

## 7. Sistema de fechas

| Fecha                 | Funcionamiento                                |
| --------------------- | --------------------------------------------- |
| Antes del 19 de enero | Desarrollo y pruebas del proyecto.            |
| 19 de enero de 2027   | Entrega del enlace y acceso a la experiencia. |
| 20 de enero de 2027   | Desbloqueo automático de la sorpresa.         |

### Configuración inicial

- Fecha de entrega: `2027-01-19`.
- Fecha de cumpleaños: `2027-01-20`.
- Edad que celebra: `18 años`.
- Zona horaria: `America/Bogota`.

El sistema utilizará JavaScript para comprobar la fecha y mostrar el contenido correspondiente.

## 8. Flujo general de funcionamiento

```text
              INICIO
                 |
                 v
          Inicializar página
                 |
                 v
          Comprobar fecha
                 |
          +------+------+
          |             |
          v             v
     Antes del 20    Desde el 20
          |             |
          v             v
     Experiencia     Experiencia
      principal      principal
          |             |
          v             v
     Sin sorpresa    Desbloquear
      especial       cumpleaños
          |             |
          +------+------+
                 |
                 v
          Navegación libre
                 |
                 v
                FIN
```

## 9. Orden de desarrollo

- [ ] Crear la estructura de carpetas.
- [ ] Crear los archivos HTML, CSS y JavaScript.
- [ ] Construir la estructura principal.
- [ ] Diseñar la interfaz visual.
- [ ] Implementar la navegación.
- [ ] Desarrollar las seis secciones principales.
- [ ] Agregar el contador.
- [ ] Implementar el desbloqueo de cumpleaños.
- [ ] Crear las animaciones.
- [ ] Incorporar imágenes e ilustraciones.
- [ ] Realizar pruebas en computador.
- [ ] Realizar pruebas en dispositivos móviles.
- [ ] Subir el proyecto a GitHub.
- [ ] Publicar mediante GitHub Pages.
- [ ] Entregar el regalo el 19 de enero de 2027.

## 10. Control de versiones

Se utilizará Git y GitHub para mantener un historial de los cambios.

Ejemplos de commits:

```bash
git add .
git commit -m "Inicializar estructura del proyecto"

git add .
git commit -m "Crear diseño principal"

git add .
git commit -m "Implementar navegación"

git add .
git commit -m "Agregar sistema de cumpleaños"
```

## 11. Publicación

El proyecto se publicará mediante GitHub Pages.

No requiere servidor propio, base de datos ni backend.

**Repositorio:** ALEXA-18

**Plataforma:** GitHub Pages

**Estado:** En desarrollo

---

*Un pequeño universo digital creado para celebrar los 18 años de Alexa.* 💗
