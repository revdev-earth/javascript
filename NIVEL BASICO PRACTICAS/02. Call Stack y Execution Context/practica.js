// 1. Crea un programa que muestre cómo funciona la pila de ejecución con tres funciones llamadas uno, dos y tres.
function uno() {
  console.log("Entrando uno");
  dos();
  console.log("Saliendo uno");
}
function dos() {
  console.log("Entrando dos");
  tres();
  console.log("Saliendo dos");
}
function tres() {
  console.log("Entrando tres");
}
uno();

// 2. Declara una variable con var, otra con let y otra con const. Luego imprime el objeto this en el contexto global.
var x = 10;
let y = 20;
const z = 30;
console.log(this);

// 3. Crea un ejemplo de scope anidado con tres niveles de funciones e imprime variables de todos los niveles.
let global = "Global";
function externa() {
  let fuera = "Externa";
  function interna() {
    let dentro = "Interna";
    console.log(global, fuera, dentro);
  }
  interna();
}
externa();

// 4. Declara una variable let y una const dentro de un bloque if y verifica que no existan fuera de ese bloque.
if (true) {
  let a = "Hola";
  const b = "Mundo";
  console.log(a, b);
}
// console.log(a, b) // Error si se descomenta

// 5. Escribe una función que intente acceder a this.nombre desde el contexto global y observa el resultado.
function saludar() {
  console.log(this.nombre);
}
var nombre = "Global";
saludar();

// 6. Crea un objeto con una propiedad nombre y un método que imprima this.nombre.
const obj = {
  nombre: "Lucía",
  mostrar: function () {
    console.log(this.nombre);
  },
};
obj.mostrar();

// 7. Usa call, apply y bind para ejecutar una misma función en el contexto de un objeto diferente.
function mostrarNombre() {
  console.log(this.nombre);
}
const persona = { nombre: "Carlos" };
mostrarNombre.call(persona);
mostrarNombre.apply(persona);
mostrarNombre.bind(persona)();

// 8. Implementa una función constructora que cree objetos Animal con una propiedad tipo. Crea dos instancias y muéstralas.
function Animal(tipo) {
  this.tipo = tipo;
}
const perro = new Animal("Perro");
const gato = new Animal("Gato");
console.log(perro.tipo, gato.tipo);

// 9. Crea un método dentro de un objeto que use una función flecha interna y verifica cómo this se mantiene.
const obj2 = {
  nombre: "Diana",
  metodo: function () {
    console.log(this.nombre);
    const arrow = () => console.log(this.nombre);
    arrow();
  },
};
obj2.metodo();

// 10. Implementa una función recursiva que calcule la suma de los primeros n números naturales.
function suma(n) {
  if (n === 0) return 0;
  return n + suma(n - 1);
}
console.log(suma(5));
