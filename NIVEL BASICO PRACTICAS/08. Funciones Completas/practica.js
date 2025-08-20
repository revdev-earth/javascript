// 1. Crea una función declarada llamada `bienvenida` que muestre
// "Hola, este es un ejemplo de hoisting".
// Llama la función antes de su declaración para comprobar que funciona gracias al hoisting.
bienvenida();
function bienvenida() {
  console.log("Hola, este es un ejemplo de hoisting");
}

// 2. Declara una función de expresión llamada `restar` que reciba dos números
// y devuelva su resta. Comprueba que no puede ejecutarse antes de declararla.
let restar = function (a, b) {
  return a - b;
};
console.log(restar(10, 4)); // 6

// 3. Crea una arrow function llamada `elevarAlCuadrado` que reciba un número
// y retorne su cuadrado.
let elevarAlCuadrado = (n) => n * n;
console.log(elevarAlCuadrado(7)); // 49

// 4. Define una función con parámetro por defecto llamada `presentar` que reciba un nombre
// y muestre "Bienvenido, [nombre]".
// Si no se pasa argumento, debe usar "Invitado".
function presentar(nombre = "Invitado") {
  console.log(`Bienvenido, ${nombre}`);
}
presentar(); // Bienvenido, Invitado
presentar("Carlos"); // Bienvenido, Carlos

// 5. Implementa una función llamada `sumarTodo` usando rest parameters que reciba
// una cantidad indefinida de números y devuelva la suma total.
function sumarTodo(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
console.log(sumarTodo(3, 6, 9, 12)); // 30

// 6. Usa destructuring en los parámetros para crear una función `mostrarProducto`
// que reciba un objeto con `nombre` y `precio` y devuelva un string con el formato:
// "El producto [nombre] cuesta [precio]".
function mostrarProducto({ nombre, precio }) {
  return `El producto ${nombre} cuesta ${precio}`;
}
console.log(mostrarProducto({ nombre: "Laptop", precio: 2500 }));

// 7. Escribe una función `maximo` que retorne el número mayor entre dos valores
// y otra función `obtenerPares` que retorne los números pares de un arreglo usando return con destructuring.
function maximo(a, b) {
  return a > b ? a : b;
}
console.log(maximo(8, 3)); // 8

function obtenerPares() {
  return [2, 4, 6, 8];
}
let [x, y] = obtenerPares();
console.log(x, y); // 2 4

// 8. Diseña una función recursiva `contarRegresivo` que muestre los números
// desde un valor dado hasta llegar a 0.
function contarRegresivo(n) {
  if (n < 0) return;
  console.log(n);
  contarRegresivo(n - 1);
}
contarRegresivo(5);

// 9. Escribe una función recursiva llamada `fibonacci` que retorne
// el número de Fibonacci correspondiente a una posición dada.
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(6)); // 8

// 10. Crea una IIFE (Immediately Invoked Function Expression) que reciba un nombre
// y muestre en consola "Ejecutando inmediatamente para [nombre]".
(function (nombre) {
  console.log(`Ejecutando inmediatamente para ${nombre}`);
})("María");
