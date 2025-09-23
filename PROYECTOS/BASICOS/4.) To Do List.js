/* 
Diseña un gestor donde el usuario pueda:

- Agregar una tarea.
- Marcarla como completada.
- Listar todas las tareas pendientes y completadas.

### Conceptos involucrados

- Objetos (`{ descripcion, completada }`) para modelar tareas.
- Arrays para guardar la lista de tareas.
- Funciones para agregar, marcar y listar.
- Condicionales (`if/else`, operadores lógicos).
- Métodos de array (`push`, `filter`, `map`). 
*/

let tareas = [];
let tareasCompletadas = [];
let tarea = {
  descripcion: "",
  completada: false,
};
let opc;

do {
  console.log("To Do List");
  console.log("1.) agrear tarea.");
  console.log("2.) marcar tarea completada.");
  console.log("3.) ver tareas por hacer.");
  console.log("4.) ver tareas completadas.");
  console.log("5.) Salir de To Do List.");

  opc = parseInt(prompt("Digite una opcion: "));

  switch (opc) {
    case 1:
      let descripcion = prompt("Digite descripcion de la tarea a agregar: ");
      let nuevaTarea = {
        descripcion: descripcion,
        completada: false,
      };
      tareas.push(nuevaTarea);
      console.log("Se a agregado la tarea correctamente.");
      break;
    case 2:
      let tarea = prompt(
        "Digite la descripcion de la tarea a marcar como completada:"
      );
      //Buscando indice de tarea
      let index = tareas.findIndex((t) => tarea === t.descripcion);
      if (index !== -1) {
        console.log(":: Tarea encontrada ::" + tarea);
        // Segun index, se cambia completada a true
        tareas[index].completada = true;
        // Se agrega la tarea a array completadas desde tareas
        tareasCompletadas.push(tareas[index]);
        // Se elimina la tarea de array tareas
        tareas.splice(index, 1);

        console.log("tarea " + tarea + " marcada como pletada con exito.");
      } else {
        console.log("Tarea no encontrada.");
      }
      break;

    case 3:
      console.table(tareas);
      break;

    case 4:
      console.table(tareasCompletadas);
      break;

    case 5:
      console.log("saliendo de To Do List con exito");
      break;
    default:
      console.log("Opcion no valida, intente de nuevo.");
      break;
  }
} while (opc !== 5);
