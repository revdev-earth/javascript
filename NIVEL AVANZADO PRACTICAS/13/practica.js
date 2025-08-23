/* ============================================================
13. Browser APIs Complete - Ejercicios con enunciados y soluciones
============================================================ */

/* 
Ejercicio 1: Usando Fetch API, realiza una solicitud a la API pública 
de JSONPlaceholder para obtener el listado de posts y muestra en consola 
los títulos de los primeros 5.
*/
async function fetchPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    data
      .slice(0, 5)
      .forEach((post, i) => console.log(`Post ${i + 1}: ${post.title}`));
  } catch (error) {
    console.error("Error al obtener posts:", error);
  }
}
fetchPosts();

/* 
Ejercicio 2: Crea un Intersection Observer que detecte cuando un elemento con id "banner" 
entra en el viewport y muestre un mensaje en consola indicando "Banner visible".
*/
const observerBanner = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("Banner visible");
    }
  });
});
const banner = document.querySelector("#banner");
if (banner) observerBanner.observe(banner);

/* 
Ejercicio 3: Implementa un Mutation Observer que detecte cuando se agrega un nuevo 
elemento hijo dentro de un div con id "lista" y muestre en consola 
"Nuevo elemento agregado".
*/
const lista = document.querySelector("#lista");
if (lista) {
  const observerLista = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.addedNodes.length > 0) {
        console.log("Nuevo elemento agregado");
      }
    });
  });
  observerLista.observe(lista, { childList: true });
}

/* 
Ejercicio 4: Utiliza Resize Observer para observar un div con id "panel". 
Cuando cambie su tamaño, muestra en consola su nuevo ancho y alto.
*/
const panel = document.querySelector("#panel");
if (panel) {
  const resizeObs = new ResizeObserver((entries) => {
    for (let entry of entries) {
      console.log(
        `Panel nuevo tamaño → Ancho: ${entry.contentRect.width}, Alto: ${entry.contentRect.height}`
      );
    }
  });
  resizeObs.observe(panel);
}

/* 
Ejercicio 5: Con Geolocation API, obtén la ubicación actual del usuario 
y muestra las coordenadas en consola.
*/
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log(
      `Latitud: ${pos.coords.latitude}, Longitud: ${pos.coords.longitude}`
    );
  });
}

/* 
Ejercicio 6: Guarda el nombre de usuario "Carlos" en localStorage bajo la clave "usuario"
y luego recupéralo para mostrarlo en consola.
*/
localStorage.setItem("usuario", "Carlos");
console.log("Usuario almacenado:", localStorage.getItem("usuario"));

/* 
Ejercicio 7: Usa la Clipboard API para copiar el texto "Aprendiendo Browser APIs" 
y luego muestra en consola "Texto copiado correctamente".
*/
navigator.clipboard
  .writeText("Aprendiendo Browser APIs")
  .then(() => console.log("Texto copiado correctamente"))
  .catch((err) => console.error("Error al copiar:", err));

/* 
Ejercicio 8: Implementa un botón que, al hacer clic, active el modo pantalla completa 
para el documento. 
*/
const botonPantalla = document.querySelector("#btnFullscreen");
if (botonPantalla) {
  botonPantalla.addEventListener("click", () => {
    document.documentElement.requestFullscreen();
  });
}

/* 
Ejercicio 9: Usa la Notification API para mostrar una notificación con el texto 
"Curso de Browser APIs iniciado" si el usuario da permisos.
*/
if (Notification.permission === "granted") {
  new Notification("Curso de Browser APIs iniciado");
} else {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      new Notification("Curso de Browser APIs iniciado");
    }
  });
}

/* 
Ejercicio 10: Utiliza la Web Speech API para que el navegador lea en voz alta 
la frase "Bienvenido al curso de JavaScript avanzado".
*/
const frase = new SpeechSynthesisUtterance(
  "Bienvenido al curso de JavaScript avanzado"
);
speechSynthesis.speak(frase);
