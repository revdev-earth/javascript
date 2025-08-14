# 4. Coerción y Debugging

## Implicit Coerción

JavaScript convierte tipos automáticamente:

```javascript
// Con operadores
"5" + 3 // "53" - número a string
"10" - 2 // 8 - string a número
"5" * "2" // 10 - ambos a números
true + 1 // 2 - boolean a número

// En condiciones
if ("") {
} // false - string vacío
if ("0") {
} // true - string no vacío
if (null) {
} // false
if (undefined) {
} // false
```

## Explicit Conversion

Cuando tú decides convertir:

```javascript
// A número
Number("123") // 123
Number("123abc") // NaN
parseInt("123px") // 123 - ignora el resto
parseFloat("3.14") // 3.14

// A string
String(456)(
  // "456"
  123
).toString() // "123"

// A boolean
Boolean("") // false
Boolean("false") // true (string no vacío)
Boolean(0) // false
Boolean(-1) // true (número no cero)
```

## == vs ===

```javascript
// == permite coerción (confuso)
5 == "5" // true - convierte tipos
0 == false // true
null == undefined // true

// === NO permite coerción (recomendado)
5 === "5" // false - tipos diferentes
0 === false // false
null === undefined // false
```

## Truthy/Falsy Values

```javascript
// Valores FALSY (solo estos 6)
false, 0, "", null, undefined, NaN

// TODO lo demás es TRUTHY
"false"  // true (string no vacío)
[]       // true (array vacío)
{}       // true (objeto vacío)
" "      // true (espacio es un carácter)
```

## Console Methods y Debugging

```javascript
// Métodos básicos de console
console.log("Información general")
console.error("Algo salió mal")
console.warn("Advertencia")
console.info("Información específica")

// Debugging avanzado
console.table([{ nombre: "Ana", edad: 25 }])
console.group("Mi grupo")
console.log("Dentro del grupo")
console.groupEnd()

// Medir tiempo
console.time("operacion")
// ... código a medir
console.timeEnd("operacion")
```

## NaN Handling

```javascript
let resultado = "texto" - 1 // NaN
// Aquí pasa: coerción a number, "texto" no se puede convertir → NaN (Not a Number)

// Mal - NaN no es igual a sí mismo
resultado === NaN // false

// Bien - usar Number.isNaN()
Number.isNaN(resultado) // true
Number.isNaN("texto") // false (no es NaN)

// Diferencia con isNaN global (evítala)
isNaN("texto") // true (convierte primero)
Number.isNaN("texto") // false (más preciso)
```
