// 1. Declaración de variables
// Declara tres variables: una constante llamada PI con el valor 3.14159,
// una variable llamada contador que inicie en 0, y una variable llamada apellido con tu apellido.
// Muestra sus valores en consola.
const PI = 3.14159;
let contador = 0;
var apellido = "Pérez";

console.log(PI);
console.log(contador);
console.log(apellido);

// 2. Uso de typeof
// Declara una variable saludo con el valor "Hola". Usa typeof para imprimir su tipo en consola.
// Repite con un número y un valor booleano.
let saludo = "Hola";
let numero = 42;
let esVerdad = true;

console.log(typeof saludo);
console.log(typeof numero);
console.log(typeof esVerdad);

// 3. Detectando casos especiales
// Escribe código para imprimir en consola el tipo de: null, [] (array) y {} (objeto). ¿Qué observas?
console.log(typeof null);
console.log(typeof []);
console.log(typeof {});

// 4. Uso de instanceof
// Declara un array, un objeto literal y una fecha. Comprueba con instanceof si pertenecen a sus clases
// (Array, Object, Date) y muestra el resultado en consola.
let lista = [1, 2, 3];
let persona = { nombre: "Ana" };
let fecha = new Date();

console.log(lista instanceof Array);
console.log(lista instanceof Object);
console.log(persona instanceof Object);
console.log(fecha instanceof Date);
console.log(fecha instanceof Object);

// 5. Tipos primitivos
// Crea una variable de cada tipo primitivo (string, number, boolean, undefined, null, symbol, bigint).
// Imprime en consola el valor y su tipo.
let texto = "Hola mundo";
let numero2 = 42;
let booleano = true;
let indefinido;
let vacio = null;
let simbolo = Symbol("id");
let numeroGrande = 123n;

console.log(typeof texto);
console.log(typeof numero2);
console.log(typeof booleano);
console.log(typeof indefinido);
console.log(typeof vacio);
console.log(typeof simbolo);
console.log(typeof numeroGrande);

// 6. Copia de primitivos vs referencia
// Declara una variable a con valor 10 y asigna su valor a b. Cambia a a 20.
// Imprime ambas variables y analiza qué pasó.
// Luego haz lo mismo con un objeto literal y observa la diferencia.
let a = 10;
let b = a;
a = 20;
console.log(a);
console.log(b);

let persona1 = { nombre: "Ana" };
let persona2 = persona1;
persona1.nombre = "Luis";
console.log(persona2.nombre);

// 7. undefined vs null
// Declara una variable x sin valor y otra y con valor null.
// Imprime ambas y compara usando == y ===.
let x;
let y = null;

console.log(x);
console.log(y);

console.log(x == y);
console.log(x === y);

// 8. Coerción automática
// Escribe en consola los resultados de estas operaciones y explica qué ocurre en cada caso:
// 5 + "3", "10" - 2, "5" * "2", true + 1
console.log(5 + "3");
console.log("10" - 2);
console.log("5" * "2");
console.log(true + 1);

// 9. Comparaciones estrictas vs no estrictas
// Prueba en consola las siguientes comparaciones y explica la diferencia:
// 5 == "5", 5 === "5"
console.log(5 == "5");
console.log(5 === "5");

// 10. Hoisting en acción
// Escribe el siguiente código y analiza el resultado en consola:
console.log(a);
var a = 10;

console.log(b);
var b = 20;
