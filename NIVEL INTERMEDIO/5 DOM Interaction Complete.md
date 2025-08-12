# 5. DOM Interaction Complete

## Element Selection

```javascript
// Métodos básicos de selección
const elemento = document.getElementById("miId")
const clase = document.getElementsByClassName("miClase") // HTMLCollection
const tag = document.getElementsByTagName("div") // HTMLCollection
const nombre = document.getElementsByName("miNombre") // NodeList

// Selectores CSS (más flexibles)
const primer = document.querySelector(".clase #id") // Primer elemento
const todos = document.querySelectorAll(".clase") // NodeList de todos

// Diferencia entre HTMLCollection y NodeList
// HTMLCollection es "live" - se actualiza automáticamente
// NodeList puede ser "live" o "static" dependiendo del método

// Navegación entre elementos
const padre = elemento.parentElement
const hijos = elemento.children // Solo elementos HTML
const hermanos = elemento.nextElementSibling
const anterior = elemento.previousElementSibling

// Selección avanzada
const especifico = document.querySelector("div.activo:not(.oculto)")
const multiple = document.querySelectorAll('p[data-tipo="importante"]')

// Verificar si elemento coincide con selector
if (elemento.matches(".mi-clase")) {
  console.log("El elemento tiene la clase")
}

// Buscar ancestro que coincida
const ancestro = elemento.closest(".contenedor")
```

## DOM Manipulation

```javascript
// Crear elementos
const nuevoDiv = document.createElement("div")
const nuevoTexto = document.createTextNode("Hola mundo")

// Establecer contenido
nuevoDiv.textContent = "Texto plano" // Escapa HTML
nuevoDiv.innerHTML = "<span>HTML</span>" // Interpreta HTML
nuevoDiv.innerText = "Texto visible" // Considera CSS

// Atributos
nuevoDiv.setAttribute("id", "miId")
nuevoDiv.setAttribute("data-valor", "123")
const id = nuevoDiv.getAttribute("id")
nuevoDiv.removeAttribute("class")

// Propiedades vs Atributos
nuevoDiv.id = "propiedadId" // Propiedad
nuevoDiv.className = "mi-clase" // Propiedad
nuevoDiv.dataset.valor = "456" // data-valor

// Clases CSS
nuevoDiv.classList.add("nueva-clase")
nuevoDiv.classList.remove("clase-vieja")
nuevoDiv.classList.toggle("activo")
nuevoDiv.classList.contains("mi-clase") // boolean
nuevoDiv.classList.replace("vieja", "nueva")

// Estilos inline
nuevoDiv.style.color = "red"
nuevoDiv.style.backgroundColor = "blue"
nuevoDiv.style.cssText = "color: red; background: blue;"

// Insertar en el DOM
const contenedor = document.getElementById("contenedor")
contenedor.appendChild(nuevoDiv) // Al final
contenedor.insertBefore(nuevoDiv, contenedor.firstChild) // Al inicio
contenedor.insertAdjacentHTML("beforeend", "<p>Nuevo párrafo</p>")

// Métodos modernos de inserción
contenedor.append(nuevoDiv, "texto", otroElemento) // Múltiples elementos
contenedor.prepend(nuevoDiv) // Al inicio
nuevoDiv.after(elementoSiguiente) // Después del elemento
nuevoDiv.before(elementoAnterior) // Antes del elemento

// Remover elementos
elemento.remove() // Remueve el elemento
contenedor.removeChild(elemento) // Forma antigua
```

## Event Handling

```javascript
// Event listeners básicos
const boton = document.getElementById("miBoton")

// Función separada (recomendado para poder remover)
function manejarClick(event) {
  console.log("Botón clickeado")
  console.log("Target:", event.target)
  console.log("Current target:", event.currentTarget)
}

boton.addEventListener("click", manejarClick)

// Arrow function (no se puede remover fácilmente)
boton.addEventListener("click", (event) => {
  console.log("Click con arrow function")
})

// Opciones del event listener
boton.addEventListener("click", manejarClick, {
  once: true, // Solo se ejecuta una vez
  passive: true, // No puede usar preventDefault
  capture: true, // Se ejecuta en fase de captura
})

// Remover event listener
boton.removeEventListener("click", manejarClick)

// Tipos de eventos comunes
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado")
})

window.addEventListener("load", () => {
  console.log("Todo cargado incluyendo imágenes")
})

// Eventos de teclado
document.addEventListener("keydown", (event) => {
  console.log("Tecla presionada:", event.key)
  console.log("Código:", event.code)

  if (event.ctrlKey && event.key === "s") {
    event.preventDefault() // Prevenir guardar del navegador
    console.log("Ctrl+S interceptado")
  }
})

// Eventos de mouse
elemento.addEventListener("mouseenter", () => console.log("Mouse entró"))
elemento.addEventListener("mouseleave", () => console.log("Mouse salió"))
elemento.addEventListener("mousedown", () => console.log("Mouse presionado"))
elemento.addEventListener("mouseup", () => console.log("Mouse liberado"))
```

## Event Delegation

```javascript
// Problema: agregar listeners a muchos elementos
const botones = document.querySelectorAll(".boton")
botones.forEach((boton) => {
  boton.addEventListener("click", manejarClick) // Muchos listeners
})

// Solución: event delegation - un listener en el contenedor
const contenedor = document.getElementById("contenedor-botones")
contenedor.addEventListener("click", (event) => {
  // Verificar si el elemento clickeado es un botón
  if (event.target.classList.contains("boton")) {
    console.log("Botón clickeado:", event.target.textContent)

    // Obtener datos específicos
    const id = event.target.dataset.id
    const tipo = event.target.dataset.tipo

    // Manejar según el tipo
    switch (tipo) {
      case "eliminar":
        eliminarElemento(id)
        break
      case "editar":
        editarElemento(id)
        break
      default:
        console.log("Acción desconocida")
    }
  }
})

// Ventajas del event delegation:
// 1. Funciona con elementos agregados dinámicamente
// 2. Mejor rendimiento (menos listeners)
// 3. Automático cleanup cuando se remueven elementos

// Delegation más específica
contenedor.addEventListener("click", (event) => {
  const botonEliminar = event.target.closest(".btn-eliminar")
  if (botonEliminar) {
    const item = botonEliminar.closest(".item")
    const id = item.dataset.id
    confirmarEliminacion(id)
  }
})

// Custom events
const miEvento = new CustomEvent("miEventoPersonalizado", {
  detail: { mensaje: "Datos del evento" },
  bubbles: true,
  cancelable: true,
})

elemento.dispatchEvent(miEvento)

// Listener para custom event
elemento.addEventListener("miEventoPersonalizado", (event) => {
  console.log("Evento personalizado:", event.detail.mensaje)
})
```

## Forms y Validation

```javascript
// Seleccionar formulario y elementos
const formulario = document.getElementById("miFormulario")
const campoNombre = document.getElementById("nombre")
const campoEmail = document.getElementById("email")
const campoPassword = document.getElementById("password")

// Validación en tiempo real
campoEmail.addEventListener("input", (event) => {
  const email = event.target.value
  const esValido = validarEmail(email)

  if (esValido) {
    event.target.classList.remove("invalido")
    event.target.classList.add("valido")
  } else {
    event.target.classList.remove("valido")
    event.target.classList.add("invalido")
  }
})

// Función de validación
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Manejo de envío de formulario
formulario.addEventListener("submit", (event) => {
  event.preventDefault() // Prevenir envío por defecto

  // Obtener datos del formulario
  const formData = new FormData(formulario)

  // Convertir a objeto
  const datos = {}
  for (let [clave, valor] of formData.entries()) {
    datos[clave] = valor
  }

  // O usar Object.fromEntries (más moderno)
  const datos2 = Object.fromEntries(formData)

  // Validar todos los campos
  const errores = validarFormulario(datos)

  if (errores.length === 0) {
    enviarDatos(datos)
  } else {
    mostrarErrores(errores)
  }
})

// Validación completa del formulario
function validarFormulario(datos) {
  const errores = []

  if (!datos.nombre || datos.nombre.trim().length < 2) {
    errores.push({
      campo: "nombre",
      mensaje: "Nombre debe tener al menos 2 caracteres",
    })
  }

  if (!validarEmail(datos.email)) {
    errores.push({ campo: "email", mensaje: "Email no válido" })
  }

  if (!datos.password || datos.password.length < 8) {
    errores.push({
      campo: "password",
      mensaje: "Password debe tener al menos 8 caracteres",
    })
  }

  return errores
}

// Mostrar errores en la interfaz
function mostrarErrores(errores) {
  // Limpiar errores anteriores
  document.querySelectorAll(".error").forEach((el) => el.remove())

  errores.forEach((error) => {
    const campo = document.getElementById(error.campo)
    const mensajeError = document.createElement("div")
    mensajeError.className = "error"
    mensajeError.textContent = error.mensaje
    campo.parentNode.insertBefore(mensajeError, campo.nextSibling)
  })
}

// Envío asíncrono
async function enviarDatos(datos) {
  try {
    const response = await fetch("/api/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })

    if (response.ok) {
      mostrarMensajeExito("¡Registro exitoso!")
      formulario.reset()
    } else {
      const error = await response.json()
      mostrarError(error.mensaje)
    }
  } catch (error) {
    mostrarError("Error de conexión")
  }
}
```

## Web Components

```javascript
// Definir un custom element
class MiBoton extends HTMLElement {
  constructor() {
    super()
    // Crear shadow DOM para encapsulación
    this.attachShadow({ mode: "open" })

    // Template del componente
    this.shadowRoot.innerHTML = `
            <style>
                button {
                    background: var(--color, blue);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    opacity: 0.8;
                }
            </style>
            <button>
                <slot></slot>
            </button>
        `

    // Obtener referencia al botón
    this.button = this.shadowRoot.querySelector("button")

    // Vincular eventos
    this.button.addEventListener("click", this.handleClick.bind(this))
  }

  // Lifecycle callbacks
  connectedCallback() {
    console.log("Componente agregado al DOM")
  }

  disconnectedCallback() {
    console.log("Componente removido del DOM")
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this.button.disabled = newValue !== null
    }
  }

  // Atributos observados
  static get observedAttributes() {
    return ["disabled"]
  }

  // Manejar click
  handleClick() {
    this.dispatchEvent(
      new CustomEvent("mi-click", {
        detail: { mensaje: "Botón personalizado clickeado" },
      })
    )
  }
}

// Registrar el custom element
customElements.define("mi-boton", MiBoton)

// Uso en HTML: <mi-boton disabled>Texto del botón</mi-boton>

// Componente más complejo con propiedades
class ListaElementos extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this._items = []
    this.render()
  }

  get items() {
    return this._items
  }

  set items(value) {
    this._items = value
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                ul { list-style: none; padding: 0; }
                li { padding: 8px; border-bottom: 1px solid #ccc; }
                li:hover { background: #f5f5f5; }
            </style>
            <ul>
                ${this._items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        `
  }
}

customElements.define("lista-elementos", ListaElementos)
```

## Shadow DOM

```javascript
// Crear shadow DOM manualmente
const contenedor = document.getElementById("contenedor")
const shadowRoot = contenedor.attachShadow({ mode: "open" })

// Shadow DOM cerrado (no accesible desde fuera)
const shadowCerrado = elemento.attachShadow({ mode: "closed" })

// Agregar contenido al shadow DOM
shadowRoot.innerHTML = `
    <style>
        /* Estilos encapsulados - no afectan el documento principal */
        p {
            color: red;
            font-size: 20px;
        }
    </style>
    <p>Texto en Shadow DOM</p>
`

// CSS Host - estilar el elemento host
shadowRoot.innerHTML = `
    <style>
        :host {
            display: block;
            border: 1px solid #ccc;
            padding: 10px;
        }
        :host(.activo) {
            background: yellow;
        }
        :host-context(.dark-theme) {
            background: black;
            color: white;
        }
    </style>
    <div>Contenido del componente</div>
`

// Slots para contenido distribuido
class ComponenteConSlots extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `
            <style>
                .header { font-weight: bold; }
                .content { padding: 10px; }
            </style>
            <div class="header">
                <slot name="titulo">Título por defecto</slot>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        `
  }
}

customElements.define("componente-slots", ComponenteConSlots)

// Uso:
// <componente-slots>
//     <h2 slot="titulo">Mi Título</h2>
//     <p>Contenido principal</p>
// </componente-slots>

// Event handling en Shadow DOM
class ComponenteConEventos extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `
            <button id="boton-interno">Click me</button>
        `

    // Eventos dentro del shadow DOM
    this.shadowRoot
      .getElementById("boton-interno")
      .addEventListener("click", this.handleClick.bind(this))
  }

  handleClick(event) {
    // Dispatchar evento que atraviese el shadow boundary
    this.dispatchEvent(
      new CustomEvent("componente-click", {
        detail: { source: "shadow-button" },
        bubbles: true,
        composed: true, // Permite que el evento traverse shadow DOM
      })
    )
  }
}
```
