/* Estado global con Observer */

const Store = {
  estado: {
    carrito: JSON.parse(localStorage.getItem("carrito")) || [],
  },
  observadores: [],
  historial: [],
  futuro: [],

  subscribir(fn) {
    this.observadores.push(fn);
  },
  notificar() {
    this.observadores.forEach((fn) => fn(this.estado));
  },

  /* Gestion estado con undo/redo */
  setCarrito(nuevoCarrito) {
    this.historial.push([...this.estado.carrito]); // guardar estado previo
    this.estado.carrito = nuevoCarrito;
    this.futuro = [];
    this.notificar();
  },

  undo() {
    if (this.historial.length > 0) {
      this.futuro.push([...this.estado.carrito]);
      this.estado.carrito = this.historial.pop();
      this.notificar();
    }
  },
  redo() {
    if (this.futuro.length > 0) {
      this.historial.push([...this.estado.carrito]);
      this.estado.carrito = this.futuro.pop();
      this.notificar();
    }
  },
};

/* Productos */
const productos = [
  { id: 1, nombre: "Laptop", precio: 2500 },
  { id: 2, nombre: "Teléfono", precio: 1500 },
  { id: 3, nombre: "Auriculares", precio: 200 },
];

/* Acciones del carrito */
function agregarProducto(producto) {
  Store.setCarrito([...Store.estado.carrito, producto]);
}

function eliminarProducto(id) {
  Store.setCarrito(Store.estado.carrito.filter((p) => p.id !== id));
}

function pagarCarrito() {
  if (Store.estado.carrito.length === 0) {
    alert("⚠️ No puedes pagar un carrito vacío.");
    return;
  }
  alert("✅ Pago realizado con éxito.");
  Store.setCarrito([]); // vaciar carrito
}

/* Renderizado */
const listaProductos = document.getElementById("listaProductos");
const listadoCarrito = document.getElementById("listaCarrito");
const total = document.getElementById("total");

function renderProductos() {
  listaProductos.innerHTML = "";
  productos.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    const btn = document.createElement("button");
    btn.textContent = "Agregar";
    btn.onclick = () => agregarProducto(p);
    li.appendChild(btn);
    listaProductos.appendChild(li);
  });
}

function renderCarrito(estado) {
  listadoCarrito.innerHTML = "";
  estado.carrito.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => eliminarProducto(p.id);
    li.appendChild(btn);
    listadoCarrito.appendChild(li);
  });
}

/* Inicializacion */
renderProductos();
Store.subscribir(renderCarrito);
Store.notificar(); // para cargar el inicio

/* Botones principales */

document.getElementById("pagar").onclick = pagarCarrito;
document.getElementById("undo").onclick = () => Store.undo();
document.getElementById("redo").onclick = () => Store.redo();
