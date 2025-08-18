# 10. Arrays Completos

## Creation Methods

```javascript
// Array literal - lo más común
let frutas = ["manzana", "banana", "naranja"]

// Array constructor
let numeros = new Array(1, 2, 3, 4)
let vacio = new Array(5) // Array con 5 elementos vacíos

// Array.from() - crear desde iterable
let letras = Array.from("hola") // ["h", "o", "l", "a"]
let rango = Array.from({ length: 5 }, (_, i) => i) // [0, 1, 2, 3, 4]

// Array.of() - crear con elementos específicos
let elementos = Array.of(1, 2, 3) // [1, 2, 3]
```

## Indexing y Length

```javascript
let colores = ["rojo", "verde", "azul"]

// Acceso por índice
console.log(colores[0]) // "rojo"
console.log(colores[2]) // "azul"

// Propiedad length
console.log(colores.length) // 3

// Modificar length
colores.length = 2 // Trunca el array
console.log(colores) // ["rojo", "verde"]

// Índices fuera del rango
colores[10] = "negro" // Crea elementos vacíos
console.log(colores.length) // 11
```

## Basic Methods

```javascript
let array = [1, 2, 3]

// Agregar elementos
array.push(4) // Al final - devuelve nueva length
array.unshift(0) // Al inicio - devuelve nueva length

// Quitar elementos
let ultimo = array.pop() // Del final - devuelve el elemento
let primero = array.shift() // Del inicio - devuelve el elemento

// Buscar elementos
array.indexOf(2) // Índice del elemento (o -1)
array.includes(3) // true/false
array.find((x) => x > 2) // Primer elemento que cumple condición

// Modificar array
array.splice(1, 2, "a", "b") // Desde índice 1, quita 2, agrega 'a' y 'b'
let copia = array.slice(1, 3) // Copia desde índice 1 hasta 3 (no incluido)
```

## Iteration Methods

```javascript
let numeros = [1, 2, 3, 4, 5]

// forEach - ejecuta función para cada elemento
numeros.forEach((num, index) => {
  console.log(`${index}: ${num}`)
})

// map - crea nuevo array transformado
let dobles = numeros.map((num) => num * 2) // [2, 4, 6, 8, 10]

// filter - crea array con elementos que cumplen condición
let pares = numeros.filter((num) => num % 2 === 0) // [2, 4]

// reduce - reduce array a un solo valor
let suma = numeros.reduce((total, num) => total + num, 0) // 15

// find/findIndex
let encontrado = numeros.find((num) => num > 3) // 4
let indiceEncontrado = numeros.findIndex((num) => num > 3) // 3

// some/every
let hayPares = numeros.some((num) => num % 2 === 0) // true
let todosPares = numeros.every((num) => num % 2 === 0) // false
```

## Multidimensional Arrays

```javascript
// Array bidimensional (matriz)
let matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

// Acceso a elementos
console.log(matriz[1][2]) // 6

// Iterar matriz
for (let i = 0; i < matriz.length; i++) {
  for (let j = 0; j < matriz[i].length; j++) {
    console.log(matriz[i][j])
  }
}

// Con forEach anidado
matriz.forEach((fila, i) => {
  fila.forEach((elemento, j) => {
    console.log(`[${i}][${j}] = ${elemento}`)
  })
})
```

## Array-like Objects

```javascript
// Arguments object
function miFuncion() {
  console.log(arguments.length)
  // Convertir a array real
  let args = Array.from(arguments)
  // o con spread
  let args2 = [...arguments]
}

// NodeList (DOM)
// let elementos = document.querySelectorAll('p'); // Array-like
// let elementosArray = Array.from(elementos);

// String es array-like
let texto = "hola"
console.log(texto.length) // 4
console.log(texto[0]) // "h"
// let caracteres = [...texto]; // ["h", "o", "l", "a"]
```
