# 6. ES6+ Features Complete

Las versiones de ECMAScript 2015 (ES6) en adelante introdujeron cambios importantes en JavaScript, mejorando su legibilidad, modularidad y capacidad para escribir código moderno.

A continuación, repasaremos las más relevantes en el orden indicado.

## Destructuring

Permite extraer valores de arrays o propiedades de objetos y asignarlos a variables de forma concisa.

### Ejemplo con arrays:

```javascript
const numeros = [1, 2, 3]
const [a, b, c] = numeros
console.log(a) // 1
console.log(b) // 2
console.log(c) // 3
```

### Ejemplo con objetos:

```javascript
const persona = { nombre: "Ana", edad: 28 }
const { nombre, edad } = persona
console.log(nombre) // "Ana"
console.log(edad) // 28
```

### Destructuring con valores por defecto:

```javascript
const [x = 10, y = 20] = [5]
console.log(x, y) // 5, 20
```

## Template Literals

Permiten interpolación de variables y escribir cadenas multilínea usando las comillas invertidas `` ` ``.

```javascript
const nombre = "Carlos"
const edad = 30

console.log(`Hola, mi nombre es ${nombre} y tengo ${edad} años.`)

const multilinea = `
    Línea 1
    Línea 2
    Línea 3
`
console.log(multilinea)
```

## Spread y Rest

### Spread (...) expande elementos de un iterable.

```javascript
const arr1 = [1, 2]
const arr2 = [3, 4]
const combinado = [...arr1, ...arr2]
console.log(combinado) // [1, 2, 3, 4]
```

### Rest (...) agrupa múltiples elementos en un array.

```javascript
function suma(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0)
}
console.log(suma(1, 2, 3, 4)) // 10
```

## Default Parameters

Permiten asignar valores por defecto a los parámetros de una función si no se proporcionan.

```javascript
function saludar(nombre = "Invitado") {
  console.log(`Hola, ${nombre}`)
}

saludar() // "Hola, Invitado"
saludar("Lucía") // "Hola, Lucía"
```

## Modules

Antes, en JavaScript del lado del navegador, todo estaba en el mismo ámbito global. Con ES6, podemos exportar e importar funcionalidades entre archivos.

### Exportar:

```javascript
// archivo.js
export const PI = 3.1416

export function suma(a, b) {
  return a + b
}
```

### Importar:

```javascript
// main.js
import { PI, suma } from "./archivo.js"

console.log(PI) // 3.1416
console.log(suma(2, 3)) // 5
```

## Classes

Syntactic sugar para trabajar con prototipos de forma más intuitiva.

```javascript
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre}`)
  }
}

const juan = new Persona("Juan", 25)
juan.saludar()
```

## Symbols

Tipo de dato primitivo único, ideal para crear propiedades privadas o evitar colisiones de nombres.

```javascript
const id = Symbol("id")
const user = {
  nombre: "Ana",
  [id]: 123,
}

console.log(user[id]) // 123
```

## Iterators

Protocolo que permite recorrer estructuras personalizadas con for...of.

```javascript
const iterable = {
  valores: [1, 2, 3],
  [Symbol.iterator]() {
    let i = 0
    return {
      next: () => ({
        value: this.valores[i++],
        done: i > this.valores.length,
      }),
    }
  },
}

for (let valor of iterable) {
  console.log(valor) // 1, 2, 3
}
```

## Nuevos Built-ins

ES6+ agregó objetos y métodos nativos como:

- **Map y Set** (colecciones únicas y mapeos más eficientes).
- **WeakMap y WeakSet** (versiones que no evitan la recolección de basura).
- **Promise** para asincronía.
- **String.includes()** y **startsWith()**.
- **Array.from()**, **find()**, **findIndex()**.
- **Object.assign()**, **Object.entries()**, **Object.values()**.

### Ejemplo con Map:

```javascript
const mapa = new Map()
mapa.set("clave", "valor")
console.log(mapa.get("clave")) // "valor"
```
