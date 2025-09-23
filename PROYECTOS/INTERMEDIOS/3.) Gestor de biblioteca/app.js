class Libro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
    this.disponible = true;
  }

  prestar() {
    if (!this.disponible) throw new Error("El libro esta prestado");
    this.disponible = false;
  }

  devolver() {
    if (this.disponible) throw new Error("Libro ya esta en biblioteca");
    this.disponible = true;
  }
}

class Biblioteca {
  constructor() {
    this.libros = [];
  }

  agregarLibro(libro) {
    const existe = this.libros.some(
      (l) => l.titulo.toLowerCase() === libro.titulo.toLowerCase()
    );
    if (existe) throw new Error("Ya existe un libro con este titulo.");
    this.libros.push(libro);
  }

  buscar(termino) {
    return this.libros.filter(
      (l) =>
        l.titulo.toLowerCase().includes(termino.toLowerCase()) ||
        l.autor.toLowerCase().includes(termino.toLowerCase())
    );
  }
}

const biblioteca = new Biblioteca();

const formLibro = document.getElementById("formLibro");
const listaLibros = document.getElementById("listaLibros");
const mensaje = document.getElementById("mensaje");
const buscarInput = document.getElementById("buscar");
const btnBuscar = document.getElementById("btnBuscar");

function mostrarMensaje(texto, tipo = "success") {
  mensaje.textContent = texto;
  mensaje.className = tipo;
  setTimeout(() => {
    mensaje.textContent = "";
    mensaje.className = "";
  }, 3000);
}

function renderizarLibros(libros = biblioteca.libros) {
  listaLibros.innerHTML = "";
  libros.forEach((libro, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
    <td>${libro.titulo} </td>
    <td>${libro.autor} </td>
    <td>${libro.disponible ? "✅ Sí" : "❌ No"}</td>
    <td>
      <button onclick="prestarLibro('${libro.titulo}')">Prestar</button>
      <button onclick="devolverLibro(${index})">Devolver</button>
    </td>
    `;
    listaLibros.appendChild(fila);
  });
}

// ==== Eventos ===

formLibro.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();

  try {
    const nuevoLibro = new Libro(titulo, autor);
    biblioteca.agregarLibro(nuevoLibro);
    mostrarMensaje("Libro agregado con exito");
    formLibro.reset();
    renderizarLibros();
  } catch (err) {
    mostrarMensaje(err.message, "error");
  }
});

btnBuscar.addEventListener("click", () => {
  const termino = buscarInput.value.trim();
  const resultados = biblioteca.buscar(termino);
  renderizarLibros(resultados);
  if (resultados.length === 0)
    mostrarMensaje("No se encontraron libros", "error");
});

// === Funciones globales para botones =====
window.prestarLibro = function (titulo) {
  const libro = biblioteca.libros.find((l) => l.titulo === titulo);
  if (!libro) return;
  try {
    libro.prestar();
    renderizarLibros();
  } catch (err) {
    mostrarMensaje(err.message, "error");
  }
};

window.devolverLibro = function (index) {
  try {
    biblioteca.libros[index].devolver();
    renderizarLibros();
  } catch (err) {
    mostrarMensaje(err.message, "error");
  }
};
