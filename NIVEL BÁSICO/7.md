# 7. Scope y Contexto

## Variables modernas: let y const vs var

```javascript
// RECOMENDACIÓN: Usar let/const en lugar de var
// - let/const tienen block scope (más predecible)
// - var tiene function scope (puede causar confusión)

function ejemplo() {
  if (true) {
    let blockScoped = "Solo en este bloque"
    const tambienBlock = "const también es block scoped"
    var funcionScoped = "var ignora el bloque - scope de función"
  }

  // console.log(blockScoped);    // Error - no existe fuera del bloque
  // console.log(tambienBlock);   // Error - no existe fuera del bloque
  console.log(funcionScoped) // "var ignora el bloque" - ¡Funciona!
}
```

## Global Scope

```javascript
// Variables globales - accesibles desde cualquier lugar
let global1 = "Soy global con let"
const global2 = "Soy global con const"

// Sin declaración = global implícito (malo)
function crearGlobal() {
  implicitoGlobal = "Peligroso" // Sin let/const
}

crearGlobal()
console.log(implicitoGlobal) // "Peligroso"
```

## Function Scope

```javascript
function miFuncion() {
  let funcionScoped = "Solo dentro de la función"

  if (true) {
    let blockScoped = "let respeta los bloques"
    const tambienBlock = "const también"
  }

  console.log(funcionScoped) // Funciona - está en el scope de función
  // console.log(blockScoped); // Error - no existe fuera del bloque
}

// console.log(funcionScoped); // Error - no existe fuera de la función
```

## Block Scope

```javascript
{
  let blockScoped = "Solo en este bloque"
  const tambienBlock = "const también es block scoped"
}

// console.log(blockScoped); // Error - no existe fuera del bloque
// console.log(tambienBlock); // Error - no existe fuera del bloque

// Ejemplo práctico con bucles
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100) // 0, 1, 2 - cada i es independiente
}

// Si usáramos var (no recomendado):
// for (var j = 0; j < 3; j++) {
//     setTimeout(() => console.log(j), 100); // 3, 3, 3 - j se comparte
// }
```

## Lexical Scoping

```javascript
function exterior() {
  let variableExterior = "Desde exterior"

  function interior() {
    console.log(variableExterior) // Acceso lexical
  }

  return interior
}

let funcionInterior = exterior()
funcionInterior() // "Desde exterior" - mantiene acceso
```

## Scope Chain

```javascript
let nivel1 = "global"

function nivelA() {
  let nivel2 = "función A"

  function nivelB() {
    let nivel3 = "función B"

    // Busca en este orden: nivel3 → nivel2 → nivel1
    console.log(nivel3) // "función B"
    console.log(nivel2) // "función A"
    console.log(nivel1) // "global"
  }

  return nivelB
}
```

## Variable Shadowing

```javascript
let nombre = "Global"

function mostrarNombre() {
  let nombre = "Local" // "Sombrea" la variable global
  console.log(nombre) // "Local" - usa la más cercana
}

mostrarNombre() // "Local"
console.log(nombre) // "Global" - no se afectó

// Con parámetros también
function saludar(nombre) {
  // El parámetro sombrea el global
  console.log(`Hola ${nombre}`)
}
```

## Contexto: This Binding

```javascript
// En el contexto global
console.log(this) // Window (navegador) / global (Node.js)

// En funciones normales
function funcionNormal() {
  console.log(this) // Window/global (modo no estricto)
}

// En métodos de objeto
let usuario = {
  nombre: "Ana",
  saludar() {
    console.log(this.nombre) // "Ana" - this es el objeto usuario
  },
}

// Arrow functions NO tienen su propio this
let objeto = {
  nombre: "Luis",
  metodoNormal() {
    console.log(this.nombre) // "Luis"
  },
  metodoArrow: () => {
    console.log(this.nombre) // undefined - this del contexto padre
  },
}

// This en eventos (ejemplo)
// button.addEventListener('click', function() {
//     console.log(this); // El elemento button
// });
```
