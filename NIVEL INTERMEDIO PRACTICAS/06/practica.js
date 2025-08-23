// Ejercicio 1: Destructuring con arrays y objetos
const coordenadas = [10, 20, 30];
const [lat, lon, alt] = coordenadas;
console.log(lat, lon, alt); // 10 20 30

const coche = { marca: "Toyota", modelo: "Corolla", año: 2022 };
const { marca, modelo } = coche;
console.log(marca, modelo); // "Toyota" "Corolla"

// Ejercicio 2: Template literals para concatenar y multilinea
const producto = "Laptop";
const precio = 2500;
console.log(`El producto ${producto} cuesta $${precio}.`);

const mensaje = `
Este es un texto
escrito en varias
líneas con template literals
`;
console.log(mensaje);

// Ejercicio 3: Spread y Rest
const frutas1 = ["manzana", "pera"];
const frutas2 = ["uva", "naranja"];
const todas = [...frutas1, ...frutas2];
console.log(todas); // ["manzana","pera","uva","naranja"]

function multiplicar(...nums) {
  return nums.reduce((acc, n) => acc * n, 1);
}
console.log(multiplicar(2, 3, 4)); // 24

// Ejercicio 4: Default Parameters
function crearUsuario(nombre = "Desconocido", rol = "Invitado") {
  return `${nombre} con rol ${rol}`;
}
console.log(crearUsuario()); // "Desconocido con rol Invitado"
console.log(crearUsuario("María", "Admin")); // "María con rol Admin"

// Ejercicio 5: Modules (ejemplo exportar/importar)
// archivo utilidades.js
// export function cuadrado(n) { return n * n }
// export const VERSION = "1.0"

// archivo main.js
// import { cuadrado, VERSION } from "./utilidades.js"
// console.log(cuadrado(5)) // 25
// console.log(VERSION) // "1.0"

// Ejercicio 6: Classes
class Animal {
  constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
  }
  describir() {
    console.log(`${this.nombre} es un ${this.tipo}`);
  }
}
const perro = new Animal("Fido", "perro");
perro.describir(); // "Fido es un perro"

// Ejercicio 7: Symbols
const clavePrivada = Symbol("clave");
const cuenta = {
  usuario: "Pedro",
  [clavePrivada]: "abc123",
};
console.log(cuenta[clavePrivada]); // "abc123"

// Ejercicio 8: Iterators
const rango = {
  inicio: 1,
  fin: 5,
  [Symbol.iterator]() {
    let actual = this.inicio;
    return {
      next: () => {
        if (actual <= this.fin) {
          return { value: actual++, done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};
for (let numero of rango) {
  console.log(numero); // 1, 2, 3, 4, 5
}

// Ejercicio 9: Nuevos built-ins (Map, Set, includes, etc.)
const usuarios = new Map();
usuarios.set("id1", "Ana");
usuarios.set("id2", "Luis");
console.log(usuarios.get("id1")); // "Ana"

const conjunto = new Set([1, 2, 2, 3]);
console.log([...conjunto]); // [1,2,3]

const texto = "JavaScript moderno";
console.log(texto.includes("moderno")); // true
console.log(texto.startsWith("Java")); // true

// Ejercicio 10: Promises
function tareaAsincrona() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Completada"), 1000);
  });
}
tareaAsincrona().then((resultado) => console.log(resultado)); // "Completada"
