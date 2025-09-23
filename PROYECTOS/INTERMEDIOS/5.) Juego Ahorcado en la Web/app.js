class JuegoAhorcado {
  constructor(palabraSecreta, intentos = 6) {
    this._palabraSecreta = palabraSecreta.toUpperCase();
    this._intentosRestantes = intentos;
    this._letrasAdivinadas = new Set();
  }

  get palabraVisible() {
    return this._palabraSecreta
      .split("")
      .map((l) => (this._letrasAdivinadas.has(l) ? l : "_"))
      .join(" ");
  }

  get intentos() {
    return this._intentosRestantes;
  }

  get terminado() {
    return this.ganado || this.perdido;
  }

  get ganado() {
    return !this.palabraVisible.includes("_");
  }

  get perdido() {
    return this._intentosRestantes <= 0;
  }

  intentar(letra) {
    letra = letra.toUpperCase();
    if (!/^[A-ZÑ]$/.test(letra)) {
      throw Error("⚠️ Caracter inválido: " + letra);
    }
    if (this._palabraSecreta.includes(letra)) {
      this._letrasAdivinadas.add(letra);
      return true;
    } else {
      this._intentosRestantes--;
      return false;
    }
  }
}

/* inicializacion del juego */
const palabras = ["JAVASCRIPT", "PROGRAMACION", "CLOSURE", "AHORCADO"];
const palabrasRandom = palabras[Math.floor(Math.random() * palabras.length)];
const juego = new JuegoAhorcado(palabrasRandom);

const divPalabra = document.getElementById("palabra");
const divEstado = document.getElementById("estado");
const divLetras = document.getElementById("letras");

/* Renderizar estado inicial */

function render() {
  divPalabra.textContent = juego.palabraVisible;
  divEstado.textContent = `Intentos restantes: ${juego.intentos}`;

  if (juego.ganado) {
    divEstado.textContent = "🎉 ¡Ganaste! La palabra era: " + palabrasRandom;
    deshabilitarBotones();
  } else if (juego.perdido) {
    divEstado.textContent = "💀 Perdiste. La palabra era: " + palabrasRandom;
    deshabilitarBotones();
  }
}

function crearBotones() {
  const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

  letras.forEach((l) => {
    const btn = document.createElement("button");
    btn.textContent = l;
    btn.addEventListener("click", () => {
      try {
        const acierto = juego.intentar(l);
        btn.disabled = true;
        btn.className = acierto ? "correcta" : "incorrecta";
        render();
      } catch (err) {
        alert(err.message);
      }
    });
    divLetras.appendChild(btn);
  });
}

function deshabilitarBotones() {
  document
    .querySelectorAll("#letras button")
    .forEach((btn) => (btn.disabled = true));
}

/* Iniciar UI */
crearBotones();
render();

console.assert(
  new JuegoAhorcado("TEST").palabraVisible === "_ _ _ _",
  "Test inicial falló"
);
