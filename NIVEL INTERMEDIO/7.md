# 7. Modules y Classes Complete

En JavaScript moderno, los módulos y las clases son herramientas clave para organizar el código y trabajar de forma estructurada.

Los módulos permiten dividir el código en archivos independientes, y las clases facilitan la creación de objetos y la reutilización de lógica.

## Import / Export

En ES6+, podemos exportar funciones, objetos o valores desde un archivo y importarlos en otro.

### Exportación nombrada:

```javascript
// math.js
export const PI = 3.1416

export function suma(a, b) {
  return a + b
}
```

### Importación nombrada:

```javascript
// main.js
import { PI, suma } from "./math.js"

console.log(PI) // 3.1416
console.log(suma(2, 3)) // 5
```

### Exportación por defecto (solo una por archivo):

```javascript
// saludo.js
export default function saludar(nombre) {
  console.log(`Hola, ${nombre}`)
}
```

### Importación por defecto:

```javascript
// app.js
import saludar from "./saludo.js"

saludar("Lucía")
```

## Module Systems

Existen varios sistemas de módulos en JavaScript:

- **ESM** (ECMAScript Modules) → estándar actual (import/export).
- **CommonJS** → usado en Node.js (require / module.exports).
- **AMD / UMD** → más antiguos, usados en navegadores antes de ESM.

### CommonJS ejemplo:

```javascript
// math.cjs
module.exports = {
  suma(a, b) {
    return a + b
  },
}

// app.cjs
const { suma } = require("./math.cjs")
console.log(suma(2, 3)) // 5
```

## Class Syntax

ES6 introdujo la palabra clave `class`, que es una forma más limpia de manejar prototipos.

```javascript
class Persona {
  constructor(nombre) {
    this.nombre = nombre
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre}`)
  }
}

const juan = new Persona("Juan")
juan.saludar()
```

## Inheritance

Permite que una clase herede de otra usando `extends`.

```javascript
class Animal {
  constructor(nombre) {
    this.nombre = nombre
  }

  hablar() {
    console.log(`${this.nombre} hace un sonido`)
  }
}

class Perro extends Animal {
  ladrar() {
    console.log(`${this.nombre} dice: ¡Guau!`)
  }
}

const dog = new Perro("Firulais")
dog.hablar() // Firulais hace un sonido
dog.ladrar() // Firulais dice: ¡Guau!
```

## Super

`super` se usa para:

1. Llamar al constructor de la clase padre.
2. Acceder a métodos de la clase padre.

```javascript
class Vehiculo {
  constructor(marca) {
    this.marca = marca
  }

  encender() {
    console.log(`${this.marca} encendido`)
  }
}

class Auto extends Vehiculo {
  constructor(marca, modelo) {
    super(marca) // Llama al constructor de Vehiculo
    this.modelo = modelo
  }

  encender() {
    super.encender() // Llama al método padre
    console.log(`Modelo ${this.modelo} listo para arrancar`)
  }
}

const coche = new Auto("Toyota", "Corolla")
coche.encender()
```

## Static Methods

Métodos que pertenecen a la clase en sí y no a las instancias.

```javascript
class Matematica {
  static sumar(a, b) {
    return a + b
  }
}

console.log(Matematica.sumar(3, 4)) // 7
```

## Private Fields

ES2022 introdujo campos privados usando `#`.
Solo son accesibles desde dentro de la clase.

```javascript
class CuentaBancaria {
  #saldo = 0

  depositar(monto) {
    this.#saldo += monto
    console.log(`Depósito de $${monto}. Saldo actual: $${this.#saldo}`)
  }
}

const cuenta = new CuentaBancaria()
cuenta.depositar(100)
// console.log(cuenta.#saldo); // Error: campo privado
```

## Mixins

Patrón que permite añadir funcionalidades a una clase sin heredar directamente.

```javascript
const Volador = {
  volar() {
    console.log(`${this.nombre} está volando`)
  },
}

const Nadador = {
  nadar() {
    console.log(`${this.nombre} está nadando`)
  },
}

class Animal {
  constructor(nombre) {
    this.nombre = nombre
  }
}

// Asignamos los métodos de los mixins al prototipo
Object.assign(Animal.prototype, Volador, Nadador)

const pato = new Animal("Pato Lucas")
pato.volar() // Pato Lucas está volando
pato.nadar() // Pato Lucas está nadando
```
