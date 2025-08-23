// =======================
// 1. Local State
// =======================
/*
Enunciado:
Crea una función "crearListaTareas" que maneje un estado local con un arreglo de tareas.
Debe permitir: agregar tarea, eliminar por índice y listar todas las tareas.
El estado debe ser privado usando closures.
*/
function crearListaTareas() {
  let tareas = [];

  return {
    agregar(tarea) {
      tareas.push(tarea);
      return tareas;
    },
    eliminar(index) {
      tareas.splice(index, 1);
      return tareas;
    },
    listar() {
      return [...tareas];
    },
  };
}

// Solución
const lista = crearListaTareas();
console.log(lista.agregar("Estudiar JavaScript"));
console.log(lista.agregar("Hacer ejercicio"));
console.log(lista.eliminar(0));
console.log(lista.listar());

// =======================
// 2. Shared State (Global Store)
// =======================
/*
Enunciado:
Implementa un objeto "CarritoStore" que permita almacenar productos compartidos entre diferentes módulos.
Debe notificar a todos los observadores cuando se agregue o elimine un producto.
*/
const CarritoStore = {
  productos: [],
  observers: [],

  agregar(producto) {
    this.productos.push(producto);
    this.notificar("agregar", producto);
  },
  eliminar(nombre) {
    this.productos = this.productos.filter((p) => p !== nombre);
    this.notificar("eliminar", nombre);
  },
  suscribir(callback) {
    this.observers.push(callback);
  },
  notificar(tipo, producto) {
    this.observers.forEach((obs) => obs(tipo, producto, this.productos));
  },
};

// Solución
CarritoStore.suscribir((tipo, producto, lista) => {
  console.log(`Acción: ${tipo}, Producto: ${producto}, Carrito:`, lista);
});
CarritoStore.agregar("Laptop");
CarritoStore.agregar("Mouse");
CarritoStore.eliminar("Laptop");

// =======================
// 3. State Machine
// =======================
/*
Enunciado:
Crea una máquina de estados para modelar un ascensor con los estados:
"piso1", "piso2" y "piso3".
Debe tener transiciones con el evento "SUBIR" y "BAJAR".
*/
class Ascensor {
  constructor() {
    this.state = "piso1";
  }
  transition(evento) {
    const transiciones = {
      piso1: { SUBIR: "piso2" },
      piso2: { SUBIR: "piso3", BAJAR: "piso1" },
      piso3: { BAJAR: "piso2" },
    };
    const next = transiciones[this.state][evento];
    if (next) {
      console.log(`Moviendo de ${this.state} a ${next}`);
      this.state = next;
    } else {
      console.log(`No se puede ${evento} desde ${this.state}`);
    }
  }
}

// Solución
const asc = new Ascensor();
asc.transition("SUBIR");
asc.transition("SUBIR");
asc.transition("BAJAR");
asc.transition("BAJAR");

// =======================
// 4. Flux Pattern
// =======================
/*
Enunciado:
Crea un sistema estilo Flux para manejar el estado de autenticación de un usuario.
Debe manejar acciones LOGIN, LOGOUT y mostrar el estado actual.
*/
class Dispatcher {
  constructor() {
    this.stores = [];
  }
  register(store) {
    this.stores.push(store);
  }
  dispatch(action) {
    this.stores.forEach((store) => store.handle(action));
  }
}

class AuthStore {
  constructor() {
    this.state = { autenticado: false, usuario: null };
  }
  handle(action) {
    switch (action.type) {
      case "LOGIN":
        this.state = { autenticado: true, usuario: action.payload };
        break;
      case "LOGOUT":
        this.state = { autenticado: false, usuario: null };
        break;
    }
    console.log("Nuevo estado Auth:", this.state);
  }
}

// Solución
const dispatcher = new Dispatcher();
const authStore = new AuthStore();
dispatcher.register(authStore);
dispatcher.dispatch({ type: "LOGIN", payload: "Carlos" });
dispatcher.dispatch({ type: "LOGOUT" });

// =======================
// 5. Observer Pattern
// =======================
/*
Enunciado:
Crea una clase "Noticias" que permita a varios observadores suscribirse.
Cuando se publique una noticia, todos los observadores deben recibir el título.
*/
class Noticias {
  constructor() {
    this.subs = [];
  }
  suscribir(obs) {
    this.subs.push(obs);
  }
  publicar(titulo) {
    this.subs.forEach((s) => s(titulo));
  }
}

// Solución
const canal = new Noticias();
canal.suscribir((t) => console.log("Lector A recibe:", t));
canal.suscribir((t) => console.log("Lector B recibe:", t));
canal.publicar("Se lanza nueva versión de JavaScript");

// =======================
// 6. State Synchronization
// =======================
/*
Enunciado:
Simula la sincronización de un contador entre dos módulos compartiendo un objeto global.
Cada vez que un módulo actualice el contador, ambos deben ver el cambio.
*/
const SyncState = {
  contador: 0,
  observers: [],
  set(n) {
    this.contador = n;
    this.observers.forEach((f) => f(this.contador));
  },
  subscribe(fn) {
    this.observers.push(fn);
  },
};

// Solución
SyncState.subscribe((n) => console.log("Módulo A contador:", n));
SyncState.subscribe((n) => console.log("Módulo B contador:", n));
SyncState.set(1);
SyncState.set(2);

// =======================
// 7. Immutable Updates
// =======================
/*
Enunciado:
Implementa una función que reciba un estado con un array de números
y retorne un nuevo estado con un número agregado, sin mutar el original.
*/
function agregarNumero(state, num) {
  return { ...state, numeros: [...state.numeros, num] };
}

// Solución
let estado = { numeros: [1, 2, 3] };
let nuevo = agregarNumero(estado, 4);
console.log("Original:", estado);
console.log("Nuevo:", nuevo);

// =======================
// 8. Redux Style
// =======================
/*
Enunciado:
Crea un mini store estilo Redux para manejar una lista de tareas con acciones:
AGREGAR_TAREA y TOGGLE_TAREA.
*/
function tareasReducer(state = [], action) {
  switch (action.type) {
    case "AGREGAR_TAREA":
      return [...state, { texto: action.payload, completada: false }];
    case "TOGGLE_TAREA":
      return state.map((t, i) =>
        i === action.payload ? { ...t, completada: !t.completada } : t
      );
    default:
      return state;
  }
}

class Store {
  constructor(reducer) {
    this.reducer = reducer;
    this.state = reducer(undefined, {});
  }
  dispatch(action) {
    this.state = this.reducer(this.state, action);
    console.log("Nuevo estado:", this.state);
  }
}

// Solución
const storeTareas = new Store(tareasReducer);
storeTareas.dispatch({ type: "AGREGAR_TAREA", payload: "Estudiar" });
storeTareas.dispatch({ type: "TOGGLE_TAREA", payload: 0 });

// =======================
// 9. Context Pattern
// =======================
/*
Enunciado:
Crea un sistema de "ThemeContext" que comparta el tema actual ("light" o "dark") entre dos componentes simulados.
*/
class Context {
  constructor(value) {
    this.value = value;
    this.subs = [];
  }
  provide(v) {
    this.value = v;
    this.subs.forEach((s) => s(v));
  }
  consume(cb) {
    cb(this.value);
    this.subs.push(cb);
  }
}

// Solución
const ThemeContext = new Context("light");
ThemeContext.consume((v) => console.log("Header usa tema:", v));
ThemeContext.consume((v) => console.log("Sidebar usa tema:", v));
ThemeContext.provide("dark");

// =======================
// 10. Undo/Redo
// =======================
/*
Enunciado:
Crea un sistema simple con historial para deshacer y rehacer cambios en el título de un documento.
*/
class Editor {
  constructor() {
    this.historial = [""];
    this.index = 0;
  }
  set(titulo) {
    this.historial = this.historial.slice(0, this.index + 1);
    this.historial.push(titulo);
    this.index++;
    console.log("Título actual:", this.historial[this.index]);
  }
  undo() {
    if (this.index > 0) this.index--;
    console.log("Undo ->", this.historial[this.index]);
  }
  redo() {
    if (this.index < this.historial.length - 1) this.index++;
    console.log("Redo ->", this.historial[this.index]);
  }
}

// Solución
const doc = new Editor();
doc.set("Capítulo 1");
doc.set("Capítulo 2");
doc.undo();
doc.redo();
