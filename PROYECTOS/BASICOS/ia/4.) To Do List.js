// === GESTOR DE TAREAS EN CONSOLA ===

// Array donde se almacenan todas las tareas
let tareas = [];

// === Funciones ===

// Agregar tarea
function agregarTarea(descripcion) {
  if (!descripcion || descripcion.trim() === "") {
    console.log("⚠️ La descripción no puede estar vacía.");
    return;
  }
  // Creamos objeto tarea
  const nuevaTarea = {
    descripcion: descripcion,
    completada: false,
  };
  tareas.push(nuevaTarea);
  console.log("✅ Tarea agregada con éxito.");
}

// Marcar tarea como completada
function completarTarea(descripcion) {
  let tarea = tareas.find(
    (t) => t.descripcion.toLowerCase() === descripcion.toLowerCase()
  );
  if (tarea) {
    if (tarea.completada) {
      console.log("⚠️ Esta tarea ya estaba marcada como completada.");
    } else {
      tarea.completada = true;
      console.log("✅ Tarea marcada como completada.");
    }
  } else {
    console.log("❌ No se encontró la tarea.");
  }
}

// Listar tareas pendientes
function listarPendientes() {
  let pendientes = tareas.filter((t) => !t.completada);
  if (pendientes.length === 0) {
    console.log("🎉 No tienes tareas pendientes.");
  } else {
    console.log("📋 Tareas Pendientes:");
    console.table(pendientes);
  }
}

// Listar tareas completadas
function listarCompletadas() {
  let completadas = tareas.filter((t) => t.completada);
  if (completadas.length === 0) {
    console.log("📭 No tienes tareas completadas.");
  } else {
    console.log("✅ Tareas Completadas:");
    console.table(completadas);
  }
}

// === PROGRAMA PRINCIPAL ===
let opc;
do {
  console.log("\n==== GESTOR DE TAREAS ====");
  console.log("1.) Agregar tarea");
  console.log("2.) Marcar tarea como completada");
  console.log("3.) Ver tareas pendientes");
  console.log("4.) Ver tareas completadas");
  console.log("5.) Salir");

  opc = parseInt(prompt("👉 Digite una opción: "));

  switch (opc) {
    case 1:
      let desc = prompt("✍️ Digite la descripción de la tarea: ");
      agregarTarea(desc);
      break;
    case 2:
      let comp = prompt("✔️ Digite la descripción de la tarea a completar: ");
      completarTarea(comp);
      break;
    case 3:
      listarPendientes();
      break;
    case 4:
      listarCompletadas();
      break;
    case 5:
      console.log("👋 Saliendo del gestor de tareas...");
      break;
    default:
      console.log("⚠️ Opción no válida.");
  }
} while (opc !== 5);
