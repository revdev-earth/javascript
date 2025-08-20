// 1. Demuestra que una variable declarada con var existe antes de inicializarse.
console.log(nombre); // undefined
var nombre = "Carlos";

// 2. Muestra que una función declarada se puede usar antes de su definición.
saludo(); // "Buenos días"
function saludo() {
  console.log("Buenos días");
}

// 3. Explica que una función guardada en una variable no puede usarse antes de la asignación.
try {
  despedida();
} catch (e) {
  console.log(e.name); // TypeError
}
var despedida = function () {
  console.log("Chao");
};

// 4. Ejemplo de TDZ con let.
try {
  console.log(edad);
} catch (e) {
  console.log(e.name); // ReferenceError
}
let edad = 25;

// 5. Ejemplo de TDZ con const.
try {
  console.log(ciudad);
} catch (e) {
  console.log(e.name); // ReferenceError
}
const ciudad = "Bogotá";

// 6. Diferencia de alcance con var dentro de una función.
function pruebaVar() {
  console.log(valor); // undefined
  var valor = 10;
  console.log(valor); // 10
}
pruebaVar();

// 7. let en bloque mantiene separado el scope.
{
  let animal = "perro";
  console.log(animal); // "perro"
}
// console.log(animal) // ReferenceError

// 8. Hoisting de función dentro de otra función.
function externa() {
  interna(); // "Función interna"
  function interna() {
    console.log("Función interna");
  }
}
externa();

// 9. Uso de typeof con var antes de inicializar.
console.log(typeof x); // "undefined"
var x = 7;

// 10. Uso de typeof con let antes de inicializar.
try {
  console.log(typeof y);
} catch (e) {
  console.log(e.name); // ReferenceError
}
let y = 15;

// 11. Problema típico con var en un bucle.
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}
// var: 3, var: 3, var: 3

// 12. Solución con let en el bucle.
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 100);
}
// let: 0, let: 1, let: 2

// 13. Evita confusión inicializando variables inmediatamente.
let contador = 0;
console.log(contador); // 0

// 14. Ejemplo de inicialización condicional.
let acceso;
if (true) {
  acceso = "Permitido";
} else {
  acceso = "Denegado";
}
console.log(acceso); // "Permitido"

// 15. Lazy initialization dentro de una función.
function cargarDatos(necesario) {
  if (!necesario) return "Nada que cargar";
  const datos = () => "Información cargada";
  return datos();
}
console.log(cargarDatos(false)); // "Nada que cargar"
console.log(cargarDatos(true)); // "Información cargada"
