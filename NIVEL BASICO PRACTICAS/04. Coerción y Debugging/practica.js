// 1. Muestra un ejemplo donde la suma de un número y un string genere concatenación automática.
console.log("El resultado es: " + 7); // "El resultado es: 7"

// 2. Demuestra cómo la resta fuerza a los strings numéricos a convertirse en números.
console.log("20" - "5"); // 15

// 3. Usa un booleano en una operación matemática y explica el resultado.
console.log(true * 4); // 4 (true se convierte en 1)

// 4. Comprueba el valor de verdad de un arreglo vacío en una condición if.
if ([]) {
  console.log("El array vacío es truthy");
}

// 5. Convierte un string con decimales en número usando parseFloat.
console.log(parseFloat("12.75px")); // 12.75

// 6. Transforma un número en string utilizando toString().
let num = 99;
console.log(num.toString()); // "99"

// 7. Evalúa el resultado de comparar con == y con === entre un número y un string.
console.log(8 == "8"); // true
console.log(8 === "8"); // false

// 8. Identifica si una variable que contiene NaN realmente es NaN.
let invalido = Number("abc");
console.log(Number.isNaN(invalido)); // true

// 9. Muestra cómo se usa console.table para visualizar un arreglo de objetos.
console.table([
  { producto: "Libro", precio: 25 },
  { producto: "Lápiz", precio: 2 },
]);

// 10. Mide el tiempo de ejecución de un bucle con console.time y console.timeEnd.
console.time("bucle");
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("bucle");
