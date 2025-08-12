# 2. This Binding y Context Complete

## Implicit Binding

```javascript
// This se refiere al objeto que llama al método
const persona = {
  nombre: "Ana",
  saludar() {
    console.log(`Hola, soy ${this.nombre}`) // this = persona
  },
  info: {
    edad: 25,
    mostrarInfo() {
      console.log(`Edad: ${this.edad}`) // this = info, no persona
    },
  },
}

persona.saludar() // "Hola, soy Ana"
persona.info.mostrarInfo() // "Edad: 25"

// Pérdida de contexto al asignar método
const funcionSaludar = persona.saludar
funcionSaludar() // "Hola, soy undefined" - this = window/global
```

## Explicit Binding

```javascript
const persona1 = { nombre: "Ana" }
const persona2 = { nombre: "Luis" }

function presentarse(saludo, despedida) {
  console.log(`${saludo}, soy ${this.nombre}. ${despedida}`)
}

// call - ejecuta inmediatamente con this específico
presentarse.call(persona1, "Hola", "Nos vemos") // "Hola, soy Ana. Nos vemos"
presentarse.call(persona2, "Hi", "Bye") // "Hi, soy Luis. Bye"

// apply - como call pero argumentos en array
presentarse.apply(persona1, ["Buenos días", "Hasta luego"])

// bind - crea nueva función con this fijo
const saludarAna = presentarse.bind(persona1)
saludarAna("¡Hola!", "¡Adiós!") // "¡Hola!, soy Ana. ¡Adiós!"

// Bind parcial (currying)
const saludarAnaCortes = presentarse.bind(persona1, "Buenos días")
saludarAnaCortes("Que tengas buen día") // "Buenos días, soy Ana. Que tengas buen día"
```

## New Binding

```javascript
// Constructor function
function Persona(nombre, edad) {
  this.nombre = nombre
  this.edad = edad
  this.saludar = function () {
    console.log(`Hola, soy ${this.nombre}`)
  }
}

// new crea nuevo objeto y asigna this a él
const ana = new Persona("Ana", 25) // this = nuevo objeto vacío
ana.saludar() // "Hola, soy Ana"

// Sin new, this = window/global (problema común)
const luis = Persona("Luis", 30) // ¡this = window!
console.log(window.nombre) // "Luis" (en navegador)

// Verificar si se llamó con new
function PersonaSegura(nombre, edad) {
  if (!(this instanceof PersonaSegura)) {
    return new PersonaSegura(nombre, edad)
  }
  this.nombre = nombre
  this.edad = edad
}
```

## Arrow Functions y This

```javascript
// Arrow functions NO tienen su propio this
const objeto = {
  nombre: "Ana",
  metodoNormal() {
    console.log(`Normal: ${this.nombre}`) // this = objeto

    const arrowInterna = () => {
      console.log(`Arrow: ${this.nombre}`) // this = objeto (heredado)
    }
    arrowInterna()

    function funcionInterna() {
      console.log(`Función: ${this.nombre}`) // this = undefined/window
    }
    funcionInterna()
  },

  // Arrow como método - NO recomendado
  metodoArrow: () => {
    console.log(`Arrow método: ${this.nombre}`) // this = window/global
  },
}

// Uso práctico con eventos
class Contador {
  constructor() {
    this.valor = 0
    this.button = document.createElement("button")
    this.button.textContent = "Incrementar"

    // Arrow function mantiene this de la clase
    this.button.addEventListener("click", () => {
      this.valor++
      console.log(this.valor) // this = instancia de Contador
    })
  }
}
```

## Context Loss y Soluciones

```javascript
class EventHandler {
    constructor() {
        this.count = 0;
        this.message = 'Handler message';
    }

    // Problema: pérdida de contexto
    handleClick() {
        this.count++;
        console.log(`${this.message}: ${this.count}`);
    }

    // Solución 1: Arrow function
    handleClickArrow = () => {
        this.count++;
        console.log(`${this.message}: ${this.count}`);
    }

    // Solución 2: bind en constructor
    constructor() {
        this.count = 0;
        this.message = 'Handler message';
        this.handleClick = this.handleClick.bind(this);
    }
}

const handler = new EventHandler();

// Problema
setTimeout(handler.handleClick, 1000); // this = window

// Soluciones
setTimeout(handler.handleClickArrow, 1000);              // this = handler
setTimeout(() => handler.handleClick(), 1000);           // this = handler
setTimeout(handler.handleClick.bind(handler), 1000);     // this = handler
```

## Method Borrowing

```javascript
// Borrowing de Array methods
const objetoArrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
}

// Usar métodos de Array
const resultado = Array.prototype.map.call(objetoArrayLike, (item) =>
  item.toUpperCase()
)
console.log(resultado) // ['A', 'B', 'C']

// Slice para convertir NodeList
const elementos = document.querySelectorAll("div")
const arrayElementos = Array.prototype.slice.call(elementos)

// Math.max con array
const numeros = [1, 5, 3, 9, 2]
const maximo = Math.max.apply(null, numeros)
// o con spread (moderno)
const maximo2 = Math.max(...numeros)

// Borrowing entre objetos
const persona1 = {
  nombre: "Ana",
  presentarse() {
    return `Soy ${this.nombre}`
  },
}

const persona2 = { nombre: "Luis" }

// Luis "toma prestado" el método de Ana
const presentacion = persona1.presentarse.call(persona2)
console.log(presentacion) // "Soy Luis"
```
