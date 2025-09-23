/* 
Construye una agenda que guarde contactos (nombre, teléfono, email). Permite:

  - Agregar un contacto.
  - Buscar un contacto por nombre.
  - Listar todos los contactos.

### Conceptos involucrados

  - Objetos para representar un contacto (`{ nombre, telefono, email }`).
  - Arrays para almacenar múltiples contactos.
  - Funciones para agregar, buscar y listar contactos.
  - Condicionales para validar que no se repitan nombres.
  - Uso de `console.table` para debuggear la lista. 
*/

let agenda = [];
let contacto = {
  nombre: "",
  telefono: 0,
  email: "",
};
let opc;

do {
  console.log("Menu de agenda:");
  console.log("1.) Agregar contacto.");
  console.log("2.) Buscar contacto por nombre.");
  console.log("3.) Ver contactos completos.");
  console.log("4.) Salir de agenda.");

  let opc = parseInt(prompt("Seleccione una opcion: "));

  switch (opc) {
    case 1:
      let nombre = prompt("Digite nombre de contacto a agregar: ");
      let telefono = parseInt(
        prompt("Digite telefono de contacto a agregar: ")
      );
      let email = prompt("Digite correo de contacto a agregar: ");
      let contacto = {
        nombre: nombre,
        telefono: telefono,
        email: email,
      };
      agenda.push(contacto);
      console.log("Se agrego a " + nombre + " a la agenda");
      break;
    case 2:
      let nombreBuscado = prompt("Ingrese nombre de contacto a buscar: ");
      let contactoEncontrado = agenda.find(
        (contacto) =>
          contacto.nombre.toLowerCase() === nombreBuscado.toLowerCase()
      );
      if (contactoEncontrado) {
        console.table("Contacto encontrado:", contactoEncontrado);
      } else {
        console.log("No se encontró un contacto con ese nombre.");
      }
      break;

    case 3:
      console.log("sus contactos son: ");
      console.table(agenda);

    case 4:
      console.log("Saliendo de la agenda.");

      break;

    default:
      throw new Error("Opcion no valida");
      break;
  }
} while (opc !== 4);
