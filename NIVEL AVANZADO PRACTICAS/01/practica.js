/***************************************************
 * EJERCICIOS: Browser Engine Internals (V8)
 ***************************************************/

/* 
Ejercicio 1: Parsing y Tokens
Enunciado:
Escribe un código simple y explica qué tokens se generan 
y cómo se verían en un árbol de sintaxis abstracta (AST).

Solución:
*/
let x = 5;
let y = x + 10;
// Tokens: let | x | = | 5 | ; | let | y | = | x | + | 10 | ;
// AST simplificado:
// VariableDeclaration
//   ├─ Identifier: x
//   └─ Literal: 5
// VariableDeclaration
//   ├─ Identifier: y
//   └─ BinaryExpression (+)
//       ├─ Identifier: x
//       └─ Literal: 10

console.log("Ejercicio 1:", x, y);

/* 
Ejercicio 2: Ignition (Bytecode)
Enunciado:
Crea un código simple que V8 traducirá a bytecode para ser interpretado.
Aunque no vemos el bytecode directamente, podemos simularlo 
con operaciones básicas.

Solución:
*/
function sumar(a, b) {
  return a + b;
}

let resultado = sumar(3, 7);
console.log("Ejercicio 2:", resultado); // 10
// V8 internamente traduce esto a instrucciones bytecode.

/* 
Ejercicio 3: Optimización (TurboFan)
Enunciado:
Crea una función que se ejecute muchas veces para que V8 la optimice.
Comprueba que funciona rápido al repetirse 1 millón de veces.

Solución:
*/
function multiplicar(a, b) {
  return a * b;
}

let total = 0;
for (let i = 0; i < 1_000_000; i++) {
  total += multiplicar(2, 3);
}
console.log("Ejercicio 3:", total);

/* 
Ejercicio 4: Deoptimización
Enunciado:
Muestra cómo V8 puede optimizar una función, 
pero luego de-optimizarla cuando cambian los tipos de los argumentos.

Solución:
*/
function suma(a, b) {
  return a + b;
}

console.log("Ejercicio 4.1:", suma(2, 3)); // Optimizado (números)
console.log("Ejercicio 4.2:", suma("2", 3)); // Deoptimización (string + número)

/* 
Ejercicio 5: Garbage Collection (GC)
Enunciado:
Crea un array grande que sea usado temporalmente 
y observa cómo el GC lo elimina cuando ya no lo necesitamos.

Solución:
*/
function crearArray() {
  return new Array(1000).fill("dato");
}

let datos = crearArray();
console.log("Ejercicio 5: Array creado con", datos.length, "elementos");
datos = null; // Ahora GC puede liberarlo cuando lo considere

/* 
Ejercicio 6: Memory Layout
Enunciado:
Simula cómo V8 organiza la memoria en stack y heap 
con variables primitivas y objetos.

Solución:
*/
let numero = 42; // Stack
let persona = { nombre: "Nico", edad: 28 }; // Heap
console.log("Ejercicio 6 (Stack vs Heap):", numero, persona);

/* 
Ejercicio 7: JIT Compilation
Enunciado:
Escribe una función que se repita muchas veces 
para que V8 use JIT (Ignition primero, luego TurboFan).

Solución:
*/
function potencia(base, exponente) {
  return base ** exponente;
}

let resultadoPotencia = 0;
for (let i = 0; i < 1_000_000; i++) {
  resultadoPotencia += potencia(2, 10);
}
console.log("Ejercicio 7 (JIT):", resultadoPotencia);
