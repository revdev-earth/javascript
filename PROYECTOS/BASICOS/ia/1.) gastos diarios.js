// === CALCULADORA DE GASTOS PERSONALES ===

// Array para almacenar los gastos
let gastos = [];

// Función para calcular el total de gastos
function calcularTotal(gastos) {
  let total = 0;
  for (let g of gastos) {
    total += g;
  }
  return total;
}

// Función para calcular el promedio de gastos
function calcularPromedio(gastos) {
  if (gastos.length === 0) return 0;
  return calcularTotal(gastos) / gastos.length;
}

// Función para obtener el gasto máximo
function gastoMaximo(gastos) {
  let max = gastos[0];
  for (let g of gastos) {
    if (g > max) {
      max = g;
    }
  }
  return max;
}

// Función para obtener el gasto mínimo
function gastoMinimo(gastos) {
  let min = gastos[0];
  for (let g of gastos) {
    if (g < min) {
      min = g;
    }
  }
  return min;
}

// === PROGRAMA PRINCIPAL ===
let opc;

do {
  console.log("\n=== Calculadora de Gastos Personales ===");
  console.log("1) Agregar gasto");
  console.log("2) Ver total gastado");
  console.log("3) Ver promedio de gastos");
  console.log("4) Ver gasto más alto y más bajo");
  console.log("5) Salir");

  opc = parseInt(prompt("Elige una opción: "));

  switch (opc) {
    case 1: {
      let gasto = parseFloat(prompt("Ingrese el valor del gasto: "));
      if (gasto > 0) {
        gastos.push(gasto);
        console.log("✅ Gasto agregado con éxito.");
      } else {
        console.log("❌ Gasto inválido. Debe ser un número mayor que 0.");
      }
      break;
    }
    case 2: {
      let total = calcularTotal(gastos);
      console.log("💰 Total gastado: " + total);
      break;
    }
    case 3: {
      let promedio = calcularPromedio(gastos);
      console.log("📊 Promedio de gastos: " + promedio);
      break;
    }
    case 4: {
      if (gastos.length > 0) {
        console.log("⬆️ Gasto más alto: " + gastoMaximo(gastos));
        console.log("⬇️ Gasto más bajo: " + gastoMinimo(gastos));
      } else {
        console.log("⚠️ No hay gastos registrados.");
      }
      break;
    }
    case 5:
      console.log("👋 Saliendo de la calculadora...");
      break;
    default:
      console.log("❌ Opción no válida. Intente de nuevo.");
  }
} while (opc !== 5);
