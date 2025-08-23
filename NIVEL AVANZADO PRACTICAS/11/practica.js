/***************************************
 * 11. Design Patterns - Ejercicios
 ***************************************/

/* ==============================
   CREATIONAL PATTERNS
   ============================== */

/* 
Ejercicio 1: Factory Pattern
Crea una fábrica que produzca distintos tipos de usuarios 
("Admin", "Cliente", "Invitado"). 
Cada tipo debe tener un método presentar() que devuelva un mensaje distinto.
Usa una clase Factory para gestionar la creación.
*/
class Usuario {
  constructor(nombre, rol) {
    this.nombre = nombre;
    this.rol = rol;
  }
  presentar() {
    return `Soy ${this.nombre} y soy ${this.rol}`;
  }
}

class UsuarioFactory {
  crearUsuario(tipo, nombre) {
    switch (tipo) {
      case "Admin":
        return new Usuario(nombre, "Administrador");
      case "Cliente":
        return new Usuario(nombre, "Cliente");
      case "Invitado":
        return new Usuario(nombre, "Invitado");
      default:
        throw new Error("Tipo de usuario desconocido");
    }
  }
}

const f = new UsuarioFactory();
console.log(f.crearUsuario("Admin", "Nico").presentar());
console.log(f.crearUsuario("Cliente", "Ana").presentar());

/* 
Ejercicio 2: Singleton Pattern
Implementa un Logger en el que siempre se use la misma instancia.
El logger debe guardar un historial de mensajes y poder mostrarlos.
*/
class Logger {
  constructor() {
    if (Logger.instance) return Logger.instance;
    this.logs = [];
    Logger.instance = this;
  }
  log(mensaje) {
    this.logs.push(mensaje);
    console.log("LOG:", mensaje);
  }
  mostrarHistorial() {
    return this.logs;
  }
}

const logger1 = new Logger();
const logger2 = new Logger();
logger1.log("Primer mensaje");
logger2.log("Segundo mensaje");
console.log("Son la misma instancia?", logger1 === logger2);
console.log("Historial:", logger1.mostrarHistorial());

/* ==============================
   STRUCTURAL PATTERNS
   ============================== */

/* 
Ejercicio 3: Module Pattern
Crea un módulo de carrito de compras que permita:
- agregar productos,
- quitar productos,
- ver el total de productos.
El estado del carrito debe estar encapsulado.
*/
const carrito = (function () {
  let productos = [];
  return {
    agregar: (producto) => productos.push(producto),
    quitar: (producto) => (productos = productos.filter((p) => p !== producto)),
    ver: () => [...productos],
  };
})();

carrito.agregar("Laptop");
carrito.agregar("Mouse");
console.log("Carrito:", carrito.ver());
carrito.quitar("Mouse");
console.log("Carrito:", carrito.ver());

/* 
Ejercicio 4: Decorator Pattern
Crea una función decoradora que mida el tiempo de ejecución 
de cualquier función que se le pase y lo muestre en consola.
*/
function medirTiempo(fn) {
  return function (...args) {
    const inicio = performance.now();
    const resultado = fn(...args);
    const fin = performance.now();
    console.log(`Tiempo de ejecución: ${fin - inicio}ms`);
    return resultado;
  };
}

const multiplicar = (a, b) => a * b;
const multiplicarRapido = medirTiempo(multiplicar);
console.log("Resultado:", multiplicarRapido(50, 80));

/* ==============================
   BEHAVIORAL PATTERNS
   ============================== */

/* 
Ejercicio 5: Observer Pattern
Implementa un sistema de noticias donde varios suscriptores
reciben notificaciones cada vez que se publica una noticia nueva.
*/
class Noticiero {
  constructor() {
    this.suscriptores = [];
  }
  suscribir(fn) {
    this.suscriptores.push(fn);
  }
  publicar(noticia) {
    this.suscriptores.forEach((fn) => fn(noticia));
  }
}

const canal = new Noticiero();
canal.suscribir((n) => console.log("Suscriptor A recibió:", n));
canal.suscribir((n) => console.log("Suscriptor B recibió:", n));

canal.publicar("🚨 Última hora: Nuevo patrón de diseño explicado!");
canal.publicar("⚡ JavaScript cada vez más funcional.");

/* 
Ejercicio 6: MVC Pattern
Implementa un sistema simple de tareas usando el patrón MVC:
- Model: debe almacenar tareas.
- View: debe mostrar las tareas en consola.
- Controller: debe añadir y mostrar tareas usando el modelo y la vista.
*/
class TaskModel {
  constructor() {
    this.tareas = [];
  }
  agregar(tarea) {
    this.tareas.push(tarea);
  }
  obtener() {
    return this.tareas;
  }
}

class TaskView {
  render(tareas) {
    console.log("📋 Lista de Tareas:");
    tareas.forEach((t, i) => console.log(`${i + 1}. ${t}`));
  }
}

class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  agregarTarea(tarea) {
    this.model.agregar(tarea);
  }
  mostrarTareas() {
    this.view.render(this.model.obtener());
  }
}

const model = new TaskModel();
const view = new TaskView();
const controller = new TaskController(model, view);

controller.agregarTarea("Aprender Factory Pattern");
controller.agregarTarea("Practicar Observer Pattern");
controller.mostrarTareas();
