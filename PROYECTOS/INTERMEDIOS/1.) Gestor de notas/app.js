// Clase nota
class Nota {
  constructor(id, texto) {
    this.id = id;
    this.texto = texto;
  }
}

// Clase GestorNotas

class GestorNotas {
  constructor(storageKey = "notas") {
    this.storageKey = storageKey;
    this.notas = this.cargarNotas();
  }

  cargarNotas() {
    try {
      const datos = localStorage.getItem(this.storageKey);
      return datos ? JSON.parse(datos) : [];
    } catch (e) {
      console.log("Error cargando notas: ".e);
      return [];
    }
  }

  guardarNotas() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.notas));
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        alert("⚠️ Almacenamiento local lleno. Elimine algunas notas.");
      } else {
        console.error("Error guardando notas. ", e);
      }
    }
  }

  agregarNota(texto) {
    const nueva = new Nota(Date.now(), texto);
    this.notas.push(nueva);
    this.guardarNotas();
    return nueva;
  }

  eliminarNota(id) {
    this.notas = this.notas.filter((n) => n.id !== id);
    this.guardarNotas();
  }

  editarNota(id, nuevoTexto) {
    const nota = this.notas.find((n) => n.id === id);
    if (nota) {
      nota.texto = nuevoTexto;
      this.guardarNotas();
    }
  }
}

// ============= Interaccion con DOM ============

const gestor = new GestorNotas();
const notasDiv = document.getElementById("notas");
const input = document.getElementById("notaTexto");
const btnAgregar = document.getElementById("agregarBtn");

function renderNotas() {
  notasDiv.innerHTML = "";
  gestor.notas.forEach((nota) => {
    const div = document.createElement("div");
    div.className = "nota";
    div.innerHTML = `
      <p>${nota.texto}</p>
      <button onclick="editar(${nota.id})">Editar</button>
      <button onclick="eliminar(${nota.id})">Eliminar</button>
    `;
    notasDiv.appendChild(div);
  });
}

function agregar() {
  if (input.value.trim() === "") return;
  gestor.agregarNota(input.value.trim());
  input.value = "";
  renderNotas();
}

window.eliminar = function (id) {
  gestor.eliminarNota(id);
  renderNotas();
};

window.editar = function (id) {
  const nuevoTexto = prompt("Editar nota: ");
  if (nuevoTexto && nuevoTexto.trim() !== "") {
    console.log(":: Editando nota ::");
    gestor.editarNota(id, nuevoTexto.trim());
  }
};

btnAgregar.addEventListener("click", agregar);

renderNotas();
