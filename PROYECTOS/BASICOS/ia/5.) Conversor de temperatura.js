// === CONVERSOR DE TEMPERATURAS ===

// Funciones de conversión
function celsiusToFahrenheit(c) {
  return (c * 9) / 5 + 32;
}
function celsiusToKelvin(c) {
  return c + 273.15;
}

function fahrenheitToCelsius(f) {
  return ((f - 32) * 5) / 9;
}
function fahrenheitToKelvin(f) {
  return ((f - 32) * 5) / 9 + 273.15;
}

function kelvinToCelsius(k) {
  return k - 273.15;
}
function kelvinToFahrenheit(k) {
  return ((k - 273.15) * 9) / 5 + 32;
}

// Programa principal
let opc;
do {
  console.log("\n=== CONVERSOR DE TEMPERATURAS ===");
  console.log("1.) Convertir desde Celsius");
  console.log("2.) Convertir desde Fahrenheit");
  console.log("3.) Convertir desde Kelvin");
  console.log("4.) Salir");

  opc = parseInt(prompt("👉 Elige una opción: "));

  switch (opc) {
    case 1: {
      let valor = parseFloat(prompt("Digite el valor en Celsius: "));
      if (isNaN(valor)) {
        console.error("❌ Entrada inválida, debe ser un número.");
        break;
      }
      console.log(`${valor}°C = ${celsiusToFahrenheit(valor)}°F`);
      console.log(`${valor}°C = ${celsiusToKelvin(valor)}K`);
      break;
    }
    case 2: {
      let valor = parseFloat(prompt("Digite el valor en Fahrenheit: "));
      if (isNaN(valor)) {
        console.error("❌ Entrada inválida, debe ser un número.");
        break;
      }
      console.log(`${valor}°F = ${fahrenheitToCelsius(valor)}°C`);
      console.log(`${valor}°F = ${fahrenheitToKelvin(valor)}K`);
      break;
    }
    case 3: {
      let valor = parseFloat(prompt("Digite el valor en Kelvin: "));
      if (isNaN(valor)) {
        console.error("❌ Entrada inválida, debe ser un número.");
        break;
      }
      if (valor < 0) {
        console.warn("⚠️ Temperatura en Kelvin no puede ser menor a 0.");
      }
      console.log(`${valor}K = ${kelvinToCelsius(valor)}°C`);
      console.log(`${valor}K = ${kelvinToFahrenheit(valor)}°F`);
      break;
    }
    case 4:
      console.log("👋 Saliendo del conversor de temperaturas...");
      break;
    default:
      console.warn("⚠️ Opción no válida, intente de nuevo.");
  }
} while (opc !== 4);
