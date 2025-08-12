# JavaScript Variables y Tipos

## 1. Variables

### Las tres formas de crear variables:

```javascript
let nombre = "Juan" // Puedes cambiar su valor después
const edad = 25 // NO puedes cambiar su valor
var apellido = "Pérez" // Forma antigua, evítala
```

### ¿Cuál usar?

- **const** por defecto - para valores que no van a cambiar
- **let** cuando necesites cambiar el valor después
- **var** prácticamente nunca en código moderno

```javascript
const PI = 3.14159 // Nunca va a cambiar
let contador = 0 // Lo vamos a incrementar
contador = contador + 1 // ✅ Funciona con let
// PI = 3.14;            // ❌ Error! const no se puede cambiar
```

## 2. Tipos Primitivos

### Los 7 tipos primitivos:

```javascript
let texto = "Hola mundo" // string (texto)
let numero = 42 // number (número)
let esVerdad = true // boolean (verdadero/falso)
let sinValor = undefined // undefined (sin asignar)
let vacio = null // null (vacío intencional)
let simbolo = Symbol("id") // symbol (identificador único)
let numeroGrande = 123n // bigint (números muy grandes)
```

### Cómo funcionan los primitivos:

```javascript
// Los primitivos se COPIAN por valor
let a = 5
let b = a // b recibe una COPIA de 5
a = 10 // a cambia, pero b sigue siendo 5
console.log(b) // 5
```

## 3. Objetos

### Algo para considerar en JavaScript:

Cuando no es un primitivo, entonces es un tipo de objeto. Aunque con `typeof` sea considerado como un objeto, cuando nos referimos a ellos los distinguimos con nombres específicos:

```javascript
// Objeto literal (el más común)
let persona = { nombre: "Ana", edad: 25 }

// Array (lista ordenada, pero sigue siendo un objeto internamente)
let lista = [1, 2, 3]

// Función (también es un objeto en JavaScript)
function saludar() {
  return "Hola"
}

// Date (para fechas)
let fecha = new Date()
```

### Cómo funcionan los objetos:

```javascript
// Los objetos comparten la misma ubicación en memoria
let persona1 = { nombre: "Ana" }
let persona2 = persona1 // persona2 apunta al MISMO objeto
persona1.nombre = "Luis"
console.log(persona2.nombre) // "Luis" - ¡cambió también!
```

### Para hacer una copia real de un objeto:

```javascript
let persona1 = { nombre: "Ana" }
let persona2 = { ...persona1 } // Copia real (spread operator)
persona1.nombre = "Luis"
console.log(persona2.nombre) // "Ana" - no cambió
```

## 4. Detectando tipos

### typeof - Para saber qué tipo es algo:

```javascript
console.log(typeof "hola") // "string"
console.log(typeof 42) // "number"
console.log(typeof true) // "boolean"
console.log(typeof undefined) // "undefined"
```

### Casos especiales (que confunden):

```javascript
console.log(typeof null) // "object" ← ¡Bug histórico!
console.log(typeof []) // "object" ← Arrays son objetos
console.log(typeof {}) // "object"
```

### instanceof - Para objetos específicos:

```javascript
let lista = []
let persona = {}
let fecha = new Date()

console.log(lista instanceof Array) // true
console.log(lista instanceof Object) // true (todos los arrays son objetos)
console.log(persona instanceof Object) // true
console.log(fecha instanceof Date) // true
console.log(fecha instanceof Object) // true
```

## 5. undefined vs null

```javascript
let x // undefined (declarada pero sin valor)
let y = null // null (intencionalmente vacío)

console.log(x) // undefined - "No se asignó nada"
console.log(y) // null - "Está vacío a propósito"
```

### En la práctica:

```javascript
// JavaScript asigna undefined automáticamente
let nombre
console.log(nombre) // undefined

// Tú asignas null cuando quieres "vacío"
let usuario = null // "No hay usuario logueado"

// Comparando
console.log(undefined == null) // true (son "equivalentes")
console.log(undefined === null) // false (son tipos diferentes)
```

## 6. Coerción

### ¿Qué es la coerción?

JavaScript a veces convierte automáticamente un tipo a otro para hacer que algo funcione.

### Casos simples (que te van a pasar):

```javascript
// Con números y texto
console.log(5 + "3") // "53" - convierte 5 a texto
console.log("10" - 2) // 8 - convierte "10" a número
console.log("5" * "2") // 10 - convierte ambos a números
```

### ¿Por qué pasa esto?

```javascript
// El operador + prefiere texto (concatenación)
5 + "años" // "5años"

// Los otros operadores (-, *, /) solo funcionan con números
"10" - 2 // 8
"10" * 2 // 20
"10" / 2 // 5
```

### Con booleanos:

```javascript
console.log(true + 1) // 2 (true = 1)
console.log(false + 1) // 1 (false = 0)
```

### Conversión manual (cuando tú decides):

```javascript
// Convertir a número
Number("123") // 123
parseInt("42px") // 42 (ignora el texto)
parseFloat("3.14") // 3.14

// Convertir a texto
String(456) // "456"

// Convertir a boolean
Boolean("hola") // true
Boolean("") // false
Boolean(0) // false
```

## 7. Comparaciones

### La regla de oro: Usa siempre ===

```javascript
// === compara sin cambiar tipos
5 === 5 // true
5 === "5" // false (número vs texto)

// == puede cambiar tipos (confuso)
5 == "5" // true (convierte "5" a número)
```

### Valores que se consideran "falsy" (falsos):

```javascript
if (!false) console.log("false es falsy") // ✓
if (!0) console.log("0 es falsy") // ✓
if (!"") console.log("string vacío es falsy") // ✓
if (!null) console.log("null es falsy") // ✓
if (!undefined) console.log("undefined es falsy") // ✓
if (!NaN) console.log("NaN es falsy") // ✓
```

### Todo lo demás es "truthy" (verdadero):

```javascript
if ("false") console.log("String 'false' es truthy") // ✓
if ([]) console.log("Array vacío es truthy") // ✓
if ({}) console.log("Objeto vacío es truthy") // ✓
```

### NaN - Not a Number:

```javascript
console.log("hola" - 1) // NaN (Not a Number)
console.log(NaN === NaN) // false ← ¡NaN no es igual a sí mismo!

// Para verificar si algo es NaN
console.log(Number.isNaN(NaN)) // true
console.log(Number.isNaN("hola")) // false
```

### Hoisting - Las variables "suben":

```javascript
// Esto funciona (pero es confuso)
console.log(x) // undefined (no error!)
var x = 5

// Esto NO funciona
console.log(y) // ReferenceError
let y = 10
```

### JavaScript internamente hace esto:

```javascript
var x // Se "eleva" la declaración
console.log(x) // undefined
x = 5 // La asignación queda aquí
```
