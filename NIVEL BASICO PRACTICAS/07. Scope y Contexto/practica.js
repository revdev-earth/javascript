// Crea una función donde se declaren variables con var, let y const dentro de un bloque if, e imprime cuáles pueden usarse fuera del bloque.
function testScope() {
  if (true) {
    var conVar = "var funciona fuera del bloque";
    let conLet = "let no funciona fuera";
    const conConst = "const tampoco funciona fuera";
  }
  console.log(conVar);
  // console.log(conLet) // Error
  // console.log(conConst) // Error
}
testScope();

// Declara una variable global de forma correcta y otra de manera implícita sin let/const. Muestra ambas en consola.
let globalCorrecta = "Soy global con let";
function crearGlobal() {
  globalMala = "Soy global implícita";
}
crearGlobal();
console.log(globalCorrecta);
console.log(globalMala);

// Define una función con variables locales y comprueba si se pueden acceder fuera de la función.
function ejemploFuncion() {
  let dentro = "Variable local";
  console.log(dentro);
}
ejemploFuncion();
// console.log(dentro) // Error

// Usa un bucle for con var y demuestra cómo se comporta dentro de un setTimeout.
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("Con var:", i), 100);
}

// Usa un bucle for con let y demuestra cómo se comporta dentro de un setTimeout.
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("Con let:", j), 100);
}

// Crea una función externa que defina una variable y otra función interna que acceda a ella. Luego ejecuta la interna desde afuera.
function externa() {
  let mensaje = "Acceso desde función interna";
  function interna() {
    console.log(mensaje);
  }
  return interna;
}
let fn = externa();
fn();

// Declara variables en tres niveles de funciones anidadas y muestra cómo la cadena de scopes las resuelve.
let nivel1 = "global";
function A() {
  let nivel2 = "función A";
  function B() {
    let nivel3 = "función B";
    console.log(nivel3, nivel2, nivel1);
  }
  B();
}
A();

// Declara una variable global y otra local con el mismo nombre dentro de una función, imprime ambas para ver el shadowing.
let color = "Azul";
function mostrarColor() {
  let color = "Rojo";
  console.log("Dentro:", color);
}
mostrarColor();
console.log("Fuera:", color);

// Declara un objeto con un método normal y una arrow function. Comprueba el valor de this en cada caso.
let persona = {
  nombre: "Carlos",
  metodoNormal() {
    console.log("Normal:", this.nombre);
  },
  metodoArrow: () => {
    console.log("Arrow:", this.nombre);
  },
};
persona.metodoNormal();
persona.metodoArrow();

// Declara una función normal y ejecútala en modo estricto para ver cómo cambia el valor de this.
("use strict");
function strictExample() {
  console.log(this);
}
strictExample();
