// 1. Imprimir los números del 1 al 10 con un bucle for
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// 2. Sumar los primeros 5 números naturales usando while
let suma = 0;
let n = 1;
while (n <= 5) {
  suma += n;
  n++;
}
console.log("La suma es:", suma);

// 3. Mostrar un menú que se repite hasta que el usuario seleccione salir (simulado con contador y do...while)
let opcion = 0;
do {
  console.log("Menú: 1. Opción A  2. Opción B  3. Salir");
  opcion++;
} while (opcion < 3);
console.log("Fin del menú");

// 4. Recorrer un objeto con for...in para mostrar sus claves y valores
let persona = { nombre: "Ana", edad: 25, ciudad: "Bogotá" };

for (let clave in persona) {
  console.log(clave + ":", persona[clave]);
}

// 5. Recorrer un arreglo con for...of para mostrar solo los valores
let frutas = ["manzana", "pera", "uva"];

for (let fruta of frutas) {
  console.log(fruta);
}

// 6. Buscar un número en un arreglo y detener el bucle con break
let numeros = [3, 7, 12, 9, 20];

for (let num of numeros) {
  if (num === 12) {
    console.log("Número encontrado:", num);
    break;
  }
}

// 7. Imprimir los números del 0 al 5, pero saltar el 3 con continue
for (let i = 0; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);
}

// 8. Usar una función con return dentro de un bucle para encontrar una palabra en un arreglo
function buscarPalabra(palabras, objetivo) {
  for (let palabra of palabras) {
    if (palabra === objetivo) {
      return "Palabra encontrada: " + palabra;
    }
  }
  return "No encontrada";
}

console.log(buscarPalabra(["sol", "luna", "estrella"], "luna"));

// 9. Recorrer una matriz con bucles anidados
let matriz = [
  [10, 20],
  [30, 40],
  [50, 60],
];

for (let i = 0; i < matriz.length; i++) {
  for (let j = 0; j < matriz[i].length; j++) {
    console.log(matriz[i][j]);
  }
}

// 10. Usar break con etiqueta para salir de dos bucles a la vez
exterior: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break exterior;
    }
    console.log(i, j);
  }
}
