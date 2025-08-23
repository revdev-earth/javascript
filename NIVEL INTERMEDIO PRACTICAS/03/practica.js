// Ejercicio 1
// Enunciado: Crea una función que reciba un mensaje y devuelva otra función que, al ejecutarse, imprima ese mensaje con un contador de cuántas veces se ha mostrado.
function crearImpresor(mensaje) {
  let contador = 0;
  return function () {
    contador++;
    console.log(`${mensaje} (mostrado ${contador} veces)`);
  };
}

const impresor1 = crearImpresor("Hola Mundo");
impresor1();
impresor1();
impresor1();

// Ejercicio 2
// Enunciado: Implementa un closure que permita guardar nombres en una lista privada y obtenerlos cuando se solicite.
function crearListaNombres() {
  let lista = [];
  return {
    agregar(nombre) {
      lista.push(nombre);
    },
    obtener() {
      return [...lista];
    },
  };
}

const lista = crearListaNombres();
lista.agregar("Ana");
lista.agregar("Luis");
console.log(lista.obtener());

// Ejercicio 3
// Enunciado: Crea una función que genere multiplicadores. Cada función retornada debe multiplicar el valor recibido por el número base con el que fue creada.
function crearMultiplicador(base) {
  return function (numero) {
    return numero * base;
  };
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);
console.log(duplicar(5));
console.log(triplicar(5));

// Ejercicio 4
// Enunciado: Implementa un contador regresivo que, dado un número inicial, reste 1 en cada ejecución hasta llegar a 0, sin permitir valores negativos.
function crearContadorRegresivo(inicial) {
  let numero = inicial;
  return function () {
    if (numero > 0) {
      return numero--;
    }
    return 0;
  };
}

const cuentaAtras = crearContadorRegresivo(3);
console.log(cuentaAtras());
console.log(cuentaAtras());
console.log(cuentaAtras());
console.log(cuentaAtras());

// Ejercicio 5
// Enunciado: Diseña una función que permita crear un "banco de puntos". Debe tener métodos para sumar puntos, restar y consultar el total acumulado.
function crearBancoPuntos() {
  let puntos = 0;
  return {
    ganar(cantidad) {
      puntos += cantidad;
    },
    perder(cantidad) {
      puntos -= cantidad;
    },
    total() {
      return puntos;
    },
  };
}

const banco = crearBancoPuntos();
banco.ganar(10);
banco.perder(3);
console.log(banco.total());

// Ejercicio 6
// Enunciado: Implementa una función que permita registrar acciones en un historial privado y consultar todas las acciones realizadas.
function crearHistorial() {
  let acciones = [];
  return {
    registrar(accion) {
      acciones.push(accion);
    },
    mostrar() {
      return acciones.join(" -> ");
    },
  };
}

const historial = crearHistorial();
historial.registrar("Inicio sesión");
historial.registrar("Abrió configuración");
historial.registrar("Cerró sesión");
console.log(historial.mostrar());

// Ejercicio 7
// Enunciado: Crea un closure que simule un dado de N caras y devuelva un número aleatorio entre 1 y N en cada lanzamiento.
function crearDado(carass) {
  return function () {
    return Math.floor(Math.random() * carass) + 1;
  };
}

const dado6 = crearDado(6);
console.log(dado6());
console.log(dado6());
console.log(dado6());

// Ejercicio 8
// Enunciado: Crea un generador de identificadores únicos que empiece desde 1 y aumente en cada llamada.
function crearGeneradorIDs() {
  let id = 0;
  return function () {
    id++;
    return `ID-${id}`;
  };
}

const generarID = crearGeneradorIDs();
console.log(generarID());
console.log(generarID());
console.log(generarID());

// Ejercicio 9
// Enunciado: Diseña un closure que permita gestionar una lista de tareas. Cada tarea debe tener un nombre y un estado (pendiente o completada).
function crearGestorTareas() {
  let tareas = [];
  return {
    agregar(tarea) {
      tareas.push({ nombre: tarea, completada: false });
    },
    completar(nombre) {
      const tarea = tareas.find((t) => t.nombre === nombre);
      if (tarea) tarea.completada = true;
    },
    listar() {
      return tareas;
    },
  };
}

const gestor = crearGestorTareas();
gestor.agregar("Estudiar closures");
gestor.agregar("Hacer ejercicios");
gestor.completar("Estudiar closures");
console.log(gestor.listar());

// Ejercicio 10
// Enunciado: Implementa un sistema de "caja fuerte" que tenga un valor privado y solo pueda abrirse si se proporciona la clave correcta.
function crearCajaFuerte(clave, valorGuardado) {
  let valor = valorGuardado;
  return {
    abrir(claveIngresada) {
      if (claveIngresada === clave) {
        return valor;
      }
      return "Clave incorrecta";
    },
  };
}

const caja = crearCajaFuerte("1234", "Documento secreto");
console.log(caja.abrir("0000"));
console.log(caja.abrir("1234"));
