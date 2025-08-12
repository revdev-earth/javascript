# 6. Bucles y Control de Flujo

## For Loops

```javascript
// For clásico
for (let i = 0; i < 5; i++) {
  console.log(i) // 0, 1, 2, 3, 4
}

// For con múltiples variables
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j) // 0,10 - 1,9 - 2,8 - 3,7 - 4,6
}
```

## While/Do-While

```javascript
// While - puede no ejecutarse nunca
let i = 0
while (i < 3) {
  console.log(i)
  i++
}

// Do-While - se ejecuta al menos una vez
let j = 0
do {
  console.log(j)
  j++
} while (j < 3)
```

## For...in/For...of

```javascript
let objeto = { a: 1, b: 2, c: 3 }
let array = ["x", "y", "z"]

// for...in - para objetos (índices/claves)
for (let clave in objeto) {
  console.log(clave, objeto[clave]) // a 1, b 2, c 3
}

for (let indice in array) {
  console.log(indice, array[indice]) // 0 x, 1 y, 2 z
}

// for...of - para arrays (valores)
for (let valor of array) {
  console.log(valor) // x, y, z
}

// for...of NO funciona con objetos planos
// for (let valor of objeto) { } // Error
```

## Break/Continue/Return

```javascript
// break - sale del bucle completamente
for (let i = 0; i < 10; i++) {
  if (i === 5) break
  console.log(i) // 0, 1, 2, 3, 4
}

// continue - salta a la siguiente iteración
for (let i = 0; i < 5; i++) {
  if (i === 2) continue
  console.log(i) // 0, 1, 3, 4
}

// return - sale de la función (no solo del bucle)
function buscarNumero(array, objetivo) {
  for (let num of array) {
    if (num === objetivo) {
      return num // Sale de toda la función
    }
  }
  return null
}
```

## Nested Loops y Performance

```javascript
// Bucles anidados
let matriz = [
  [1, 2],
  [3, 4],
  [5, 6],
]

for (let i = 0; i < matriz.length; i++) {
  for (let j = 0; j < matriz[i].length; j++) {
    console.log(matriz[i][j])
  }
}

// Break con etiquetas (avanzado)
exterior: for (let i = 0; i < 3; i++) {
  interior: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break exterior // Sale de ambos bucles
    }
    console.log(i, j)
  }
}

// Performance - cachear la longitud
let array = [1, 2, 3, 4, 5]

// Malo - evalúa length cada vez
for (let i = 0; i < array.length; i++) {}

// Mejor - cachea la longitud
for (let i = 0, len = array.length; i < len; i++) {}
```
