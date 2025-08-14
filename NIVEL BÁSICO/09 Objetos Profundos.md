# 9. Objetos Profundos

## Object Creation

```javascript
// Literal object - la forma más común
let persona = {
  nombre: "Ana",
  edad: 25,
}

// Constructor Object
let persona2 = new Object()
persona2.nombre = "Luis"
persona2.edad = 30

// Object.create()
let personaProto = {
  saludar() {
    return `Hola, soy ${this.nombre}`
  },
}
let persona3 = Object.create(personaProto)
persona3.nombre = "María"
```

## Properties/Methods

```javascript
let coche = {
  marca: "Toyota",
  modelo: "Camry",
  año: 2020,

  // Método
  arrancar() {
    return `${this.marca} ${this.modelo} arrancando...`
  },

  // Método con function keyword
  detener: function () {
    return "Coche detenido"
  },
}
```

## Dot/Bracket Notation

```javascript
let usuario = {
  nombre: "Pedro",
  "apellido completo": "García López", // Necesita comillas
  edad: 28,
}

// Dot notation - más limpio
console.log(usuario.nombre) // "Pedro"
usuario.email = "pedro@email.com"

// Bracket notation - más flexible
console.log(usuario["apellido completo"]) // "García López"
let propiedad = "edad"
console.log(usuario[propiedad]) // 28

// Propiedades dinámicas
let clave = "profesion"
usuario[clave] = "Ingeniero"
```

## Destructuring

```javascript
let persona = {
  nombre: "Ana",
  edad: 25,
  direccion: {
    ciudad: "Madrid",
    pais: "España",
  },
}

// Destructuring básico
let { nombre, edad } = persona

// Con nombres diferentes
let { nombre: nombrePersona, edad: edadPersona } = persona

// Con valores por defecto
let { nombre, profesion = "No especificada" } = persona

// Destructuring anidado
let {
  direccion: { ciudad },
} = persona

// En parámetros de función
function saludar({ nombre, edad }) {
  return `Hola ${nombre}, tienes ${edad} años`
}
```

## Spread/Rest

```javascript
let objeto1 = { a: 1, b: 2 }
let objeto2 = { c: 3, d: 4 }

// Spread operator - copia propiedades
let combinado = { ...objeto1, ...objeto2 } // {a: 1, b: 2, c: 3, d: 4}

// Sobrescribir propiedades
let modificado = { ...objeto1, b: 20 } // {a: 1, b: 20}

// Rest en destructuring
let { a, ...resto } = combinado // a = 1, resto = {b: 2, c: 3, d: 4}

// Clonar objeto (shallow copy)
let copia = { ...objeto1 }
```

## Object Methods

```javascript
let persona = {
  nombre: "Luis",
  edad: 30,
  activo: true,
}

// Object.keys() - obtener claves
console.log(Object.keys(persona)) // ["nombre", "edad", "activo"]

// Object.values() - obtener valores
console.log(Object.values(persona)) // ["Luis", 30, true]

// Object.entries() - obtener pares clave-valor
console.log(Object.entries(persona)) // [["nombre", "Luis"], ["edad", 30], ["activo", true]]

// Object.assign() - combinar objetos
let extra = { profesion: "Doctor" }
let completo = Object.assign({}, persona, extra)

// Object.hasOwnProperty()
console.log(persona.hasOwnProperty("nombre")) // true
```

## Property Descriptors

```javascript
let objeto = {}

// Definir propiedad con descriptor
Object.defineProperty(objeto, "nombre", {
  value: "Ana",
  writable: false, // No se puede modificar
  enumerable: true, // Aparece en for...in
  configurable: false, // No se puede eliminar
})

// Obtener descriptor
console.log(Object.getOwnPropertyDescriptor(objeto, "nombre"))

// Hacer objeto inmutable
Object.freeze(objeto) // No se puede modificar
Object.seal(objeto) // No se pueden agregar/eliminar propiedades
Object.preventExtensions(objeto) // No se pueden agregar propiedades
```
