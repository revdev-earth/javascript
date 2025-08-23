// Ejercicio 1: ARIA Attributes
// Enunciado: Crea un botón con un atributo ARIA que indique claramente su propósito para los lectores de pantalla, y un div con role="alert" que muestre un mensaje importante.
const botonCerrar = `<button aria-label="Cerrar ventana">✖</button>`;
const mensajeError = `<div role="alert" aria-live="assertive">Error al guardar</div>`;
console.log(botonCerrar);
console.log(mensajeError);

// Ejercicio 2: Semantic HTML
// Enunciado: Construye una estructura básica de página web utilizando HTML semántico (header, nav, main, article).
const estructuraSemantica = `
<header>Encabezado de la página</header>
<nav>Menú de navegación</nav>
<main>
  <article>Contenido principal en un artículo</article>
</main>`;
console.log(estructuraSemantica);

// Ejercicio 3: Keyboard Navigation
// Enunciado: Implementa un enlace de "Saltar al contenido" que permita a los usuarios de teclado ir directamente a la sección principal.
const skipLink = `<a href="#contenido" class="skip-link">Saltar al contenido</a>
<main id="contenido">Aquí está el contenido principal</main>`;
console.log(skipLink);

// Ejercicio 4: Screen Readers
// Enunciado: Crea una imagen con un texto alternativo significativo y un campo de formulario con su etiqueta asociada.
const accesibilidadVisual = `
<img src="logo.png" alt="Logotipo de la empresa" />
<label for="nombre">Nombre:</label>
<input type="text" id="nombre" aria-describedby="nombreAyuda" />
<span id="nombreAyuda">Por favor, introduce tu nombre completo.</span>`;
console.log(accesibilidadVisual);

// Ejercicio 5: Color Contrast
// Enunciado: Escribe un ejemplo de texto accesible con buen contraste de color y otro que no lo sea.
const contrastes = `
<p style="color: #ff9999; background-color: #fff;">❌ Texto difícil de leer (malo)</p>
<p style="color: #b30000; background-color: #fff; font-weight: bold;">✅ Texto accesible (bueno)</p>`;
console.log(contrastes);

// Ejercicio 6: Focus Management
// Enunciado: Haz que un modal reciba automáticamente el foco cuando se abre.
document.body.innerHTML += `<div id="modal" tabindex="-1">Este es un modal</div>`;
const modal = document.querySelector("#modal");
modal.focus();
console.log("El foco ha sido movido al modal.");

// Ejercicio 7: Accessibility Testing
// Enunciado: Simula una prueba de accesibilidad revisando si los elementos de la página son accesibles con el teclado (usando tabindex).
document.body.innerHTML += `<button tabindex="0">Botón accesible</button>`;
const boton = document.querySelector("button");
console.log(
  "¿Botón tiene tabindex accesible?:",
  boton.getAttribute("tabindex") === "0"
);

// Ejercicio 8: Inclusive Design
// Enunciado: Crea un ejemplo de multimedia accesible con subtítulos y texto alternativo.
const multimediaAccesible = `
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track src="subtitulos.vtt" kind="subtitles" srclang="es" label="Español" default />
  Tu navegador no soporta la etiqueta de video.
</video>
<p>Transcripción: Este video muestra cómo utilizar la aplicación paso a paso.</p>`;
console.log(multimediaAccesible);
