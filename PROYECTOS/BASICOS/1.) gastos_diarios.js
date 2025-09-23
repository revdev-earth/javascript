/* 
Crea un programa que permita al usuario ingresar una lista de gastos diarios y al final muestre:

  - El total gastado.
  - El gasto promedio.
  - El gasto más alto y el más bajo.

### Conceptos involucrados

  - Variables (`let`, `const`) para guardar montos.
  - Arrays para almacenar los gastos.
  - Funciones para calcular total, promedio y máximo/mínimo.
  - Bucles (`for`, `for...of`) para recorrer los gastos.
  - Condicionales para validar si el gasto es válido (número > 0). 
*/

let gastos = [];
let gastoTotal = 0;
let opc;

do {
  console.log("Digite una opción:");
  console.log("1.) Agregar gasto de hoy.");
  console.log("2.) Ver total gastado.");
  console.log("3.) Ver promedio de gastos.");
  console.log("4.) Ver gasto más alto y gasto más bajo.");
  console.log("5.) Salir.");

  opc = parseInt(prompt("Seleccione una opción:"));

  switch (opc) {
    case 1:
      let gasto = parseFloat(prompt("Digite cantidad del gasto a agregar:"));
      if (gasto > 0) {
        gastos.push(gasto);
        gastoTotal += gasto;
        console.log("Se ha agregado " + gasto + " a los gastos.");
      } else {
        console.log("No es un número válido.");
      }
      break;

    case 2:
      console.log("El total gastado hasta el momento es de: " + gastoTotal);
      break;

    case 3:
      if (gastos.length > 0) {
        let suma = gastos.reduce((acum, actual) => acum + actual, 0);
        let promedio = suma / gastos.length;
        console.log(
          "El valor promedio de los gastos de hoy es: " + promedio.toFixed(2)
        );
      } else {
        console.log("No hay gastos registrados.");
      }
      break;

    case 4:
      if (gastos.length > 0) {
        let maximo = Math.max(...gastos);
        let minimo = Math.min(...gastos);
        console.log("El gasto más alto es: " + maximo);
        console.log("El gasto más bajo es: " + minimo);
      } else {
        console.log("No hay gastos registrados.");
      }
      break;

    case 5:
      console.log("Saliendo del programa...");
      break;

    default:
      throw new Error("Opción no válida.");
  }
} while (opc !== 5);
