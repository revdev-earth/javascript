# 8. Prototypes Complete

En JavaScript, los prototipos son la base del sistema de herencia.

Cada objeto tiene un enlace interno a otro objeto llamado prototype. Este enlace crea lo que se conoce como prototype chain (cadena de prototipos), que se usa para la búsqueda de propiedades y métodos.

## Prototype Chain

Cuando accedemos a una propiedad o método en un objeto, JavaScript primero busca en el propio objeto. Si no lo encuentra, sube en la cadena de prototipos.

```javascript
const animal = {
  comer() {
    console.log("El animal está comiendo")
  },
}

const perro = Object.create(animal)
perro.ladrar = function () {
  console.log("Guau!")
}

perro.ladrar() // Guau! (definido en perro)
perro.comer() // El animal está comiendo (heredado de animal)
```

### Prototype chain visualmente:

```javascript
perro → animal → Object.prototype → null
```

## Constructor Functions

Antes de ES6 (y las clases), la forma común de crear objetos "tipo clase" era usando funciones constructoras.

```javascript
function Persona(nombre) {
  this.nombre = nombre
}

Persona.prototype.saludar = function () {
  console.log(`Hola, soy ${this.nombre}`)
}

const juan = new Persona("Juan")
juan.saludar()
```

### Claves:

- El `new` crea un nuevo objeto y lo enlaza al `.prototype` de la función.
- Los métodos van en `Constructor.prototype` para que no se dupliquen en cada instancia.

## Object.create

Crea un nuevo objeto con el prototipo que indiquemos.

```javascript
const vehiculo = {
  encender() {
    console.log("Vehículo encendido")
  },
}

const auto = Object.create(vehiculo)
auto.encender() // Vehículo encendido
```

Esto es útil para herencia prototípica sin constructores.

## Inheritance Patterns

### 1. Herencia con funciones constructoras

```javascript
function Animal(nombre) {
  this.nombre = nombre
}

Animal.prototype.hablar = function () {
  console.log(`${this.nombre} hace un ruido`)
}

function Perro(nombre) {
  Animal.call(this, nombre) // Hereda propiedades
}

Perro.prototype = Object.create(Animal.prototype) // Hereda métodos
Perro.prototype.constructor = Perro

Perro.prototype.ladrar = function () {
  console.log("Guau!")
}

const firu = new Perro("Firulais")
firu.hablar()
firu.ladrar()
```

### 2. Herencia directa con Object.create

```javascript
const animalBase = {
  hablar() {
    console.log(`${this.nombre} hace un sonido`)
  },
}

const perro = Object.create(animalBase)
perro.nombre = "Bobby"
perro.ladrar = function () {
  console.log("Guau!")
}

perro.hablar()
perro.ladrar()
```

## Prototype Pollution

El Prototype Pollution es una vulnerabilidad de seguridad en la que se modifican prototipos globales (Object.prototype), afectando a todos los objetos.

```javascript
// Ejemplo peligroso
Object.prototype.hackeado = "¡Ups!"
console.log({}.hackeado) // ¡Ups!
```

### Prevención:

- Evitar asignar o modificar directamente `Object.prototype`.
- Usar `Object.create(null)` para objetos sin prototipo.
- Validar datos antes de fusionarlos.

```javascript
const objSeguro = Object.create(null)
console.log(objSeguro.hackeado) // undefined
```

## Performance Considerations

- Buscar propiedades heredadas es más lento que buscar propiedades propias.
- Cadenas de prototipos muy largas degradan el rendimiento.
- Modificar el prototipo de un objeto ya creado puede invalidar optimizaciones del motor de JavaScript.
- Prefiere definir prototipos una sola vez y no tocarlos después.

### Resumen visual del flujo de búsqueda:

```javascript
objeto.prop
    ↓
¿Está en el objeto? → devolver
    ↓
¿Está en objeto.__proto__? → devolver
    ↓
... seguir subiendo en la cadena ...
    ↓
null → undefined
```
