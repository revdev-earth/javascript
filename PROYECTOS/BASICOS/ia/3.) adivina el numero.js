// === JUEGO DE ADIVINANZA DE NÚMEROS ===

// Función para generar un número aleatorio entre 1 y 50
function generarNumeroSecreto() {
  return Math.floor(Math.random() * 50) + 1;
}

// Función para jugar
function jugarAdivinanza() {
  const numeroSecreto = generarNumeroSecreto();
  let intentos = 0;
  const maxIntentos = 5;

  console.log("🤖 He pensado un número entre 1 y 50.");
  console.log("🎯 Tienes " + maxIntentos + " intentos para adivinarlo.");
  console.log("(DEBUG: número secreto es " + numeroSecreto + ")"); // Solo para pruebas

  while (intentos < maxIntentos) {
    let intento = parseInt(
      prompt("👉 Ingresa tu número (intento " + (intentos + 1) + "): ")
    );
    intentos++;

    if (isNaN(intento) || intento < 1 || intento > 50) {
      console.log("⚠️ Ingresa un número válido entre 1 y 50.");
      continue;
    }

    if (intento === numeroSecreto) {
      console.log(
        "🎉 ¡Felicidades! Adivinaste el número en " + intentos + " intentos."
      );
      return; // Termina el juego
    } else if (intento > numeroSecreto) {
      console.log("📉 El número secreto es MENOR que " + intento);
    } else {
      console.log("📈 El número secreto es MAYOR que " + intento);
    }
  }

  console.log(
    "❌ Se acabaron tus intentos. El número secreto era: " + numeroSecreto
  );
}

// === PROGRAMA PRINCIPAL ===
jugarAdivinanza();
