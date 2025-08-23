// Ejercicio 1: Uso básico de Map
// Enunciado: Crea un Map que almacene nombres de estudiantes como claves y sus calificaciones como valores.
// Agrega tres estudiantes, luego muestra la calificación de uno de ellos y finalmente imprime todas las entradas.

const estudiantes = new Map();
estudiantes.set("Ana", 95);
estudiantes.set("Luis", 87);
estudiantes.set("Marta", 78);

console.log("Nota de Luis:", estudiantes.get("Luis"));

for (let [nombre, nota] of estudiantes) {
  console.log(`${nombre}: ${nota}`);
}

// Ejercicio 2: Comparación Map vs Object
// Enunciado: Crea un objeto y un Map con las mismas claves numéricas. Comprueba si ambos mantienen el mismo orden de inserción al iterar.

const obj = {};
obj[1] = "uno";
obj[2] = "dos";
obj[3] = "tres";

console.log("Iterando objeto:");
for (let clave in obj) {
  console.log(clave, obj[clave]);
}

const mapa = new Map();
mapa.set(1, "uno");
mapa.set(2, "dos");
mapa.set(3, "tres");

console.log("Iterando map:");
for (let [clave, valor] of mapa) {
  console.log(clave, valor);
}

// Ejercicio 3: Operaciones con Set
// Enunciado: Crea un Set con números duplicados. Elimina los duplicados y añade un nuevo número. Verifica si un número está presente.

const numeros = new Set([1, 2, 2, 3, 4, 4]);
numeros.add(5);

console.log("Set resultante:", numeros);
console.log("¿El set contiene 3?", numeros.has(3));
console.log("¿El set contiene 10?", numeros.has(10));

// Ejercicio 4: Unión, intersección y diferencia de Sets
// Enunciado: Crea dos conjuntos A y B. Calcula su unión, intersección y diferencia.

const A = new Set([1, 2, 3, 4]);
const B = new Set([3, 4, 5, 6]);

const union = new Set([...A, ...B]);
const interseccion = new Set([...A].filter((x) => B.has(x)));
const diferencia = new Set([...A].filter((x) => !B.has(x)));

console.log("Unión:", union);
console.log("Intersección:", interseccion);
console.log("Diferencia:", diferencia);

// Ejercicio 5: Uso de WeakMap
// Enunciado: Crea un WeakMap que asocie un objeto usuario con un token secreto. Luego elimina la referencia al objeto y verifica que se libera.

let usuario = { nombre: "Carlos" };
const tokens = new WeakMap();

tokens.set(usuario, "token_secreto_123");

console.log("Token de usuario:", tokens.get(usuario));

usuario = null; // El objeto puede ser recolectado por el garbage collector

// Ejercicio 6: Uso de WeakSet
// Enunciado: Usa un WeakSet para registrar qué objetos ya fueron procesados en un sistema. Añade un objeto y verifica si existe.

let archivo = { id: 1, nombre: "informe.pdf" };
const procesados = new WeakSet();

procesados.add(archivo);
console.log("¿Archivo procesado?", procesados.has(archivo));

archivo = null; // El objeto queda disponible para GC

// Ejercicio 7: Eliminación de duplicados usando Set
// Enunciado: Dado un array con elementos repetidos, usa Set para eliminar duplicados y devuelve un array limpio.

const lista = [1, 2, 2, 3, 4, 4, 5, 1];
const listaSinDuplicados = [...new Set(lista)];
console.log("Array sin duplicados:", listaSinDuplicados);

// Ejercicio 8: Contador de ocurrencias con Map
// Enunciado: Dado un array de palabras, usa Map para contar cuántas veces aparece cada palabra.

const palabras = ["sol", "luna", "sol", "estrella", "luna", "sol"];
const contador = new Map();

for (let palabra of palabras) {
  contador.set(palabra, (contador.get(palabra) || 0) + 1);
}

console.log("Conteo de palabras:", contador);

// Ejercicio 9: Uso práctico de Map con claves objeto
// Enunciado: Crea un Map donde la clave sea un objeto que representa un producto y el valor sea su precio.

const prod1 = { nombre: "Laptop" };
const prod2 = { nombre: "Teléfono" };

const precios = new Map();
precios.set(prod1, 1200);
precios.set(prod2, 800);

console.log("Precio Laptop:", precios.get(prod1));
console.log("Precio Teléfono:", precios.get(prod2));

// Ejercicio 10: Uso de Set para control de acceso
// Enunciado: Simula un sistema de acceso donde un Set almacene los IDs de usuarios autorizados. Verifica si un usuario tiene acceso.

const usuariosAutorizados = new Set([101, 102, 103]);

function verificarAcceso(id) {
  return usuariosAutorizados.has(id) ? "Acceso permitido" : "Acceso denegado";
}

console.log(verificarAcceso(101));
console.log(verificarAcceso(200));
