// Ejercicio 1: Seleccionar un párrafo por su ID y cambiar su texto
const parrafo = document.getElementById("parrafo1");
parrafo.textContent = "Texto cambiado con JavaScript";

// Ejercicio 2: Seleccionar todos los elementos con clase "item" y agregarles una clase extra
const items = document.querySelectorAll(".item");
items.forEach((el) => el.classList.add("resaltado"));

// Ejercicio 3: Crear un nuevo elemento <li> y añadirlo a una lista
const lista = document.getElementById("miLista");
const nuevoItem = document.createElement("li");
nuevoItem.textContent = "Elemento nuevo";
lista.appendChild(nuevoItem);

// Ejercicio 4: Cambiar el color de fondo de un div usando style
const caja = document.getElementById("caja");
caja.style.backgroundColor = "lightblue";

// Ejercicio 5: Crear un botón dinámicamente y añadirle un event listener
const boton = document.createElement("button");
boton.textContent = "Click aquí";
boton.addEventListener("click", () => {
  alert("¡Botón clickeado!");
});
document.body.appendChild(boton);

// Ejercicio 6: Delegación de eventos en una lista de botones
const contenedorBotones = document.getElementById("contenedor-botones");
contenedorBotones.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    console.log("Se clickeó:", event.target.textContent);
  }
});

// Ejercicio 7: Validar un campo de email en un formulario
const form = document.getElementById("formulario");
const campoEmail = document.getElementById("email");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campoEmail.value);
  if (emailValido) {
    alert("Email válido");
  } else {
    alert("Email no válido");
  }
});

// Ejercicio 8: Crear un custom element con Shadow DOM
class MiTarjeta extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div { border: 1px solid #000; padding: 10px; }
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
}
customElements.define("mi-tarjeta", MiTarjeta);

// Ejercicio 9: Usar closest para encontrar un contenedor al hacer click
document.body.addEventListener("click", (event) => {
  const contenedor = event.target.closest(".contenedor");
  if (contenedor) {
    console.log("Click dentro de un contenedor:", contenedor.id);
  }
});

// Ejercicio 10: Crear un custom event y escucharlo en un elemento
const divEvento = document.getElementById("div-evento");
divEvento.addEventListener("mensaje", (e) => {
  console.log("Evento recibido:", e.detail);
});
const evento = new CustomEvent("mensaje", {
  detail: "Hola desde custom event",
});
divEvento.dispatchEvent(evento);
