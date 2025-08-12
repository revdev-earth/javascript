# 3. Hoisting y Temporal Dead Zone

## Var Hoisting

var se "eleva" al inicio de su contexto:

```javascript
console.log(miVar) // undefined (no error)
var miVar = "Hola"

// JavaScript internamente hace esto:
// var miVar;
// console.log(miVar); // undefined
// miVar = "Hola";
```

## Function Hoisting

Las declaraciones de función también se elevan:

```javascript
saludar() // "Hola" - funciona antes de declararla

function saludar() {
  console.log("Hola")
}

// Pero las expresiones de función NO:
// despedir(); // TypeError
var despedir = function () {
  console.log("Adiós")
}
```

## Let/Const TDZ (Temporal Dead Zone)

let y const tienen una zona temporal muerta:

```javascript
console.log(x) // ReferenceError: Cannot access before initialization
let x = 5

console.log(y) // ReferenceError: Cannot access before initialization
const y = 10
```

## Best Practices y Initialization

```javascript
// Malo - usar antes de declarar
function malaFuncion() {
  edad = 25 // Variable implícita global
  var edad
}

// Bueno - declarar al inicio
function buenaFuncion() {
  let edad = 25
  const nombre = "Juan"
  console.log(edad, nombre)
}

// Mejor - inicializar const siempre
const PI = 3.14159 // ✅
// const RADIO; // Error - const debe inicializarse

// Recomendación: Usar let/const en lugar de var
// - Evita problemas de Temporal Dead Zone
// - Scope más predecible (block scope)
// - Menos errores de hoisting confuso
```
