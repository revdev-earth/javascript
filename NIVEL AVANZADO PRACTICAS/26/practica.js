/*******************************************************
 * 📌 EJERCICIOS: BigInt y Números Avanzados en JavaScript
 *******************************************************/

/**
 * EJERCICIO 1: Operaciones con BigInt
 * 
 * Enunciado:
 * Declara dos valores BigInt (uno con sufijo `n` y otro con el constructor BigInt()).
 * Realiza operaciones básicas (+, -, *, /, %, **) e imprime los resultados en consola.
 */
console.log("=== EJERCICIO 1: Operaciones con BigInt ===");
const big1 = 123456789012345678901234567890n;
const big2 = BigInt("987654321098765432109876543210");

console.log("Suma:", big1 + big2);
console.log("Resta:", big2 - big1);
console.log("Multiplicación:", big1 * 2n);
console.log("División (parte entera):", big2 / big1);
console.log("Módulo:", big2 % big1);
console.log("Potencia:", 2n ** 10n);


/**
 * EJERCICIO 2: Manejo de precisión
 * 
 * Enunciado:
 * Muestra cómo los números normales (`Number`) pierden precisión al superar
 * el límite de seguridad (2^53 - 1), y cómo `BigInt` lo soluciona.
 */
console.log("\n=== EJERCICIO 2: Manejo de precisión ===");
console.log("Number pierde precisión:");
console.log(9007199254740991 + 1); // ✅ 9007199254740992
console.log(9007199254740991 + 2); // ❌ 9007199254740992 (Error de precisión)

console.log("BigInt mantiene precisión:");
console.log(9007199254740991n + 1n); // ✅ 9007199254740992n
console.log(9007199254740991n + 2n); // ✅ 9007199254740993n


/**
 * EJERCICIO 3: Computaciones matemáticas con BigInt
 * 
 * Enunciado:
 * Calcula la raíz cuadrada de un BigInt convirtiéndolo temporalmente en Number.
 * Nota: La API `Math` no funciona directamente con BigInt.
 */
console.log("\n=== EJERCICIO 3: Computaciones matemáticas con BigInt ===");
const bigSquare = 144n;
const sqrtBig = Math.sqrt(Number(bigSquare));
console.log(`Raíz cuadrada de ${bigSquare} es:`, sqrtBig);


/**
 * EJERCICIO 4: Límites de Number
 * 
 * Enunciado:
 * Imprime en consola los valores máximos y mínimos seguros de Number,
 * y compara con la flexibilidad de BigInt.
 */
console.log("\n=== EJERCICIO 4: Límites de Number ===");
console.log("MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
console.log("MIN_SAFE_INTEGER:", Number.MIN_SAFE_INTEGER);
console.log("MAX_VALUE:", Number.MAX_VALUE);
console.log("MIN_VALUE:", Number.MIN_VALUE);

console.log("BigInt no tiene límite práctico (solo memoria). Ejemplo:");
console.log(99999999999999999999999999999999999999999999999999n);


/**
 * EJERCICIO 5: Notación científica
 * 
 * Enunciado:
 * Usa notación científica con Number e intenta hacerlo con BigInt
 * (debería dar error).
 */
console.log("\n=== EJERCICIO 5: Notación científica ===");
console.log("Number con notación científica:", 1.23e5);  // 123000
console.log("Number con notación científica pequeña:", 5e-3); // 0.005

try {
  // ❌ BigInt no soporta notación científica
  const bigSci = 1e10n;
  console.log(bigSci);
} catch (error) {
  console.log("Error al usar notación científica con BigInt:", error.message);
}


/**
 * EJERCICIO 6: Rendimiento y uso práctico
 * 
 * Enunciado:
 * Compara el tiempo de ejecución al realizar muchas sumas con Number vs BigInt.
 * (Nota: BigInt es más lento en operaciones simples).
 */
console.log("\n=== EJERCICIO 6: Rendimiento ===");

console.time("Suma con Number");
let num = 0;
for (let i = 0; i < 1e6; i++) {
  num += 1;
}
console.timeEnd("Suma con Number");

console.time("Suma con BigInt");
let bigNum = 0n;
for (let i = 0; i < 1e6; i++) {
  bigNum += 1n;
}
console.timeEnd("Suma con BigInt");

console.log("Resultado final con Number:", num);
console.log("Resultado final con BigInt:", bigNum);
