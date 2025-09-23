/*  clase cancion */
class Cancion {
  constructor(titulo, artista, archivo) {
    this.titulo = titulo;
    this.artista = artista;
    this.archivo = archivo; //simulacion de path
  }
}

/* clase reproductor */
class Reproductor {
  constructor(listadoCanciones = []) {
    this.lista = listadoCanciones;
    this.indiceActual = 0;
    this.reproduciendo = false;
  }

  get cancionActual() {
    return this.lista[this.indiceActual];
  }

  async cargarCancion(cancion) {
    // Simula carga con promesa y timeout
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!cancion || !cancion.archivo) {
          reject(new Error("⚠️ Archivo no encontrado"));
        } else {
          resolve(`✅ Canción cargada: ${cancion.titulo}`);
        }
      }, 1000);
    });
  }

  async reproducir() {
    if (!this.cancionActual) {
      throw new Error("⚠️ No hay canciones en la lista");
    }
    try {
      const mensaje = await this.cargarCancion(this.cancionActual);
      console.log(mensaje);
      this.reproduciendo = true;
      return `▶ Reproduciendo: ${this.cancionActual.titulo} - ${this.cancionActual.artista}`;
    } catch (err) {
      throw err;
    }
  }

  pausar() {
    if (!this.reproduciendo) {
      return "⏸️ No hay canción en reproducción";
    }
    this.reproduciendo = false;
    return "⏸️ Canción pausada";
  }

  siguiente() {
    if (this.lista.length === 0) {
      throw new Error("⚠️ Lista de reproducción vacía");
    }
    this.indiceActual = (this.indiceActual + 1) % this.lista.length;
    this.reproduciendo = false;
    return ` Cambiaste a: ${this.cancionActual.titulo}`;
  }
}

// === Datos iniciales (mock) ===
const canciones = [
  new Cancion("Shape of You", "Ed Sheeran", "shapeofyou.mp3"),
  new Cancion("Blinding Lights", "The Weeknd", "blindinglights.mp3"),
  new Cancion("Mock Song", "Anon", null), // simulación de error

  new Cancion("Someone Like You", "Adele", "someonelikeyou.mp3"),
  new Cancion("Rolling in the Deep", "Adele", "rollinginthedeep.mp3"),
  new Cancion("Perfect", "Ed Sheeran", "perfect.mp3"),
  new Cancion("Thinking Out Loud", "Ed Sheeran", "thinkingoutloud.mp3"),
  new Cancion("Levitating", "Dua Lipa", "levitating.mp3"),
  new Cancion("Don’t Start Now", "Dua Lipa", "dontstartnow.mp3"),
  new Cancion("Happier Than Ever", "Billie Eilish", "happierthanever.mp3"),

  new Cancion("Bad Guy", "Billie Eilish", "badguy.mp3"),
  new Cancion("Stay", "The Kid LAROI & Justin Bieber", "stay.mp3"),
  new Cancion("Peaches", "Justin Bieber", "peaches.mp3"),
  new Cancion("Save Your Tears", "The Weeknd", "saveyourtears.mp3"),
  new Cancion("Starboy", "The Weeknd", "starboy.mp3"),
  new Cancion("Senorita", "Shawn Mendes & Camila Cabello", "senorita.mp3"),
  new Cancion("Havana", "Camila Cabello", "havana.mp3"),
  new Cancion("Viva La Vida", "Coldplay", "vivalavida.mp3"),
  new Cancion("Fix You", "Coldplay", "fixyou.mp3"),
  new Cancion("Mock Error 2", "Unknown", null), // otro error de carga
];

const reproductor = new Reproductor(canciones);

/* DOM */
const btnPlay = document.getElementById("play");
const btnPause = document.getElementById("pause");
const btnNext = document.getElementById("next");
const pCancion = document.getElementById("cancionActual");
const pEstado = document.getElementById("estado");

function actualizarUI(mensaje = "") {
  pCancion.textContent = reproductor.cancionActual
    ? `cancion actual: ${reproductor.cancionActual.titulo}`
    : "Cancion actual: ninguna";
  pEstado.textContent = `Estado: ${mensaje}`;
}

btnPlay.onclick = async () => {
  try {
    const msg = await reproductor.reproducir();
    actualizarUI(msg);
  } catch (err) {
    actualizarUI(err.message);
  }
};

btnPause.onclick = () => {
  const msg = reproductor.pausar();
  actualizarUI(msg);
};

btnNext.onclick = () => {
  try {
    const msg = reproductor.siguiente();
    actualizarUI(msg);
  } catch (err) {
    actualizarUI(err.message);
  }
};

// Inicializar UI
actualizarUI("detenido");

// === Testing básico ===
console.log("=== TESTING ===");
console.log(reproductor.pausar()); // no hay canción
console.log(reproductor.siguiente()); // cambia a la siguiente
