/*
=====================================================
31. Web Standards y Specifications
La web está gobernada por estándares y especificaciones creadas por organizaciones y comunidades que definen cómo deben comportarse los navegadores y las tecnologías web.
=====================================================
*/

/*
-----------------------------------------------------
1. W3C Standards
World Wide Web Consortium (W3C): organización que define muchos de los estándares de la web.
Áreas clave:
- HTML, CSS, SVG.
- Accesibilidad (WCAG).
- APIs como DOM, WebAuthn.
Documentos importantes:
- Recommendation (REC) → estándar final.
- Candidate Recommendation (CR) → casi listo para producción.
- Working Draft (WD) → en desarrollo.
Ejemplo: HTML Standard W3C
-----------------------------------------------------
*/

// ✅ Ejercicio: Crear un ejemplo básico de documento siguiendo estándares W3C.
function createBasicW3CHTML() {
  const htmlDoc = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Ejemplo W3C</title>
      </head>
      <body>
        <h1>Hola, Web Estándares W3C</h1>
        <p>Este documento sigue la especificación de HTML estándar.</p>
      </body>
    </html>
  `;
  console.log(htmlDoc);
}
createBasicW3CHTML();

/*
-----------------------------------------------------
2. WHATWG Specs
Web Hypertext Application Technology Working Group: comunidad que mantiene la versión viva (Living Standard) de HTML.
Diferencia clave:
- W3C publica versiones estáticas.
- WHATWG mantiene actualizaciones continuas.
Ejemplo: HTML Living Standard
-----------------------------------------------------
*/

// ✅ Ejercicio: Mostrar cómo detectar soporte de una etiqueta moderna definida por WHATWG (ejemplo: <dialog>).
function checkWHATWGDialogSupport() {
  if (typeof HTMLDialogElement !== "undefined") {
    console.log("El navegador soporta <dialog> según el estándar WHATWG.");
  } else {
    console.log("El navegador NO soporta <dialog>, usar fallback.");
  }
}
checkWHATWGDialogSupport();

/*
-----------------------------------------------------
3. TC39 Proposals
Comité Técnico 39 (de ECMA) que desarrolla JavaScript (ECMAScript).
Fases:
- Stage 0: Idea.
- Stage 1: Propuesta inicial.
- Stage 2: Borrador.
- Stage 3: Lista para implementación.
- Stage 4: Aprobada (entra en el estándar ES20XX).
Ejemplo: Array.prototype.at() pasó por estas fases antes de llegar a ES2022.
-----------------------------------------------------
*/

// ✅ Ejercicio: Usar un método moderno aprobado por TC39 (Array.prototype.at()).
function exampleTC39Proposal() {
  const numbers = [10, 20, 30, 40, 50];
  console.log("El tercer elemento con at():", numbers.at(2)); // 30
}
exampleTC39Proposal();

/*
-----------------------------------------------------
4. Browser Compatibility
No todos los navegadores soportan las mismas APIs.
Herramientas:
- MDN Compatibility Data
- Can I use
Ejemplo: Geolocation API
-----------------------------------------------------
*/

// ✅ Ejercicio: Detectar si el navegador soporta Geolocalización y usarla.
function checkBrowserCompatibility() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => console.log("Posición actual:", pos.coords),
      (err) => console.error("Error obteniendo posición:", err)
    );
  } else {
    console.log("Geolocalización no soportada en este navegador.");
  }
}
// checkBrowserCompatibility(); // Se ejecuta en navegador real

/*
-----------------------------------------------------
5. Progressive Enhancement
Construir apps que funcionen en todos los navegadores, y que mejoren si hay más capacidades.
Principios:
- HTML como base.
- CSS para estilos mejorados.
- JS para interactividad avanzada.
Beneficios: accesibilidad, compatibilidad, rendimiento.
-----------------------------------------------------
*/

// ✅ Ejercicio: Ejemplo simple de Progressive Enhancement.
function progressiveEnhancement() {
  document.body.innerHTML += "<p>Contenido básico en HTML</p>";
  if (window.localStorage) {
    document.body.innerHTML += "<p>LocalStorage soportado ✅</p>";
  }
}
progressiveEnhancement();

/*
-----------------------------------------------------
6. Feature Detection
Comprobar si una API existe antes de usarla.
Ejemplo: IntersectionObserver
-----------------------------------------------------
*/

// ✅ Ejercicio: Detectar soporte de IntersectionObserver y usar fallback si no está.
function featureDetectionExample() {
  if ("IntersectionObserver" in window) {
    console.log("IntersectionObserver soportado.");
  } else {
    console.log("IntersectionObserver NO soportado, usar fallback.");
  }
}
featureDetectionExample();

/*
-----------------------------------------------------
7. Polyfill Strategies
Código que implementa funciones modernas en navegadores antiguos.
Herramientas:
- core-js
- polyfill.io
Ejemplo: Array.prototype.includes
-----------------------------------------------------
*/

// ✅ Ejercicio: Crear polyfill para Array.prototype.includes.
if (!Array.prototype.includes) {
  Array.prototype.includes = function (value) {
    return this.indexOf(value) !== -1;
  };
}
function testPolyfillIncludes() {
  const arr = [1, 2, 3];
  console.log("¿Incluye 2?", arr.includes(2)); // true
  console.log("¿Incluye 5?", arr.includes(5)); // false
}
testPolyfillIncludes();
