// === AGENDA DE CONTACTOS SIMPLE ===

// Array para almacenar contactos
let contactos = [];

// Función para agregar un contacto
function agregarContacto(nombre, telefono, email) {
  // Verificar si ya existe un contacto con ese nombre
  let existe = contactos.find(
    (c) => c.nombre.toLowerCase() === nombre.toLowerCase()
  );
  if (existe) {
    console.log("❌ Ya existe un contacto con el nombre: " + nombre);
    return;
  }

  let nuevoContacto = {
    nombre: nombre,
    telefono: telefono,
    email: email,
  };

  contactos.push(nuevoContacto);
  console.log("✅ Contacto agregado correctamente.");
}

// Función para buscar un contacto por nombre
function buscarContacto(nombre) {
  let encontrado = contactos.find(
    (c) => c.nombre.toLowerCase() === nombre.toLowerCase()
  );
  if (encontrado) {
    console.log("📇 Contacto encontrado:");
    console.table([encontrado]);
  } else {
    console.log("⚠️ No se encontró un contacto con el nombre: " + nombre);
  }
}

// Función para listar todos los contactos
function listarContactos() {
  if (contactos.length === 0) {
    console.log("⚠️ No hay contactos en la agenda.");
  } else {
    console.log("📒 Lista de contactos:");
    console.table(contactos);
  }
}

// === PROGRAMA PRINCIPAL ===
let opc;

do {
  console.log("\n=== Agenda de Contactos ===");
  console.log("1) Agregar contacto");
  console.log("2) Buscar contacto por nombre");
  console.log("3) Listar todos los contactos");
  console.log("4) Salir");

  opc = parseInt(prompt("Elige una opción: "));

  switch (opc) {
    case 1: {
      let nombre = prompt("Ingrese el nombre del contacto:");
      let telefono = prompt("Ingrese el teléfono del contacto:");
      let email = prompt("Ingrese el email del contacto:");
      agregarContacto(nombre, telefono, email);
      break;
    }
    case 2: {
      let nombre = prompt("Ingrese el nombre del contacto a buscar:");
      buscarContacto(nombre);
      break;
    }
    case 3: {
      listarContactos();
      break;
    }
    case 4:
      console.log("👋 Saliendo de la agenda...");
      break;
    default:
      console.log("❌ Opción no válida. Intente de nuevo.");
  }
} while (opc !== 4);
