# 2. Call Stack y Execution Context

## Execution Stack

El motor de JavaScript usa una pila para manejar la ejecución de funciones:

```javascript
function primera() {
  console.log("Función primera")
  segunda()
}

function segunda() {
  console.log("Función segunda")
  tercera()
}

function tercera() {
  console.log("Función tercera")
}

primera()
// Stack: tercera() → segunda() → primera() → global()
```

## Global/Function Contexts

Cada función crea su propio contexto de ejecución:

```javascript
var globalVar = "Soy global"

function miFuncion() {
  var localVar = "Soy local"
  console.log(globalVar) // Acceso al contexto global
  console.log(localVar) // Acceso al contexto local
}

// console.log(localVar); // Error - no existe en global
```

## Variable Environment y Scope Chain

JavaScript busca variables subiendo por la cadena de scope:

```javascript
var a = "global"

function externa() {
  var b = "externa"

  function interna() {
    var c = "interna"
    console.log(a) // "global" - sube hasta encontrarla
    console.log(b) // "externa" - la encuentra en el padre
    console.log(c) // "interna" - la encuentra localmente
  }

  interna()
}
```

## This Binding Básico

El valor de this depende de cómo se llama la función:

```javascript
// En el contexto global
console.log(this) // Window (en navegador)

// En funciones normales
function funcionNormal() {
  console.log(this) // Window en modo no estricto
}

// En métodos de objeto
let objeto = {
  nombre: "Mi objeto",
  saludar() {
    console.log(this.nombre) // "Mi objeto"
  },
}
```

## Creation Phase vs Execution Phase

JavaScript ejecuta código en dos fases:

```javascript
// FASE DE CREACIÓN: se reserva memoria
console.log(x) // undefined (no error)
var x = 5

// FASE DE EJECUCIÓN: se asignan valores
// x ahora vale 5
```

## Stack Overflow

Cuando la pila se llena demasiado:

```javascript
function recursionInfinita() {
  recursionInfinita() // Eventualmente: "Maximum call stack size exceeded"
}

// Recursión con base case (correcta)
function factorial(n) {
  if (n <= 1) return 1 // Base case - detiene la recursión
  return n * factorial(n - 1)
}
```
