// Ejercicio 1: Crea un módulo llamado "operaciones.js" que exporte dos funciones: sumar y multiplicar. Luego impórtalo en otro archivo y prueba ambas funciones.
// operaciones.js
export function sumar(a, b) {
  return a + b;
}
export function multiplicar(a, b) {
  return a * b;
}
// main.js
import { sumar, multiplicar } from "./operaciones.js";
console.log(sumar(3, 4)); // 7
console.log(multiplicar(2, 5)); // 10

// Ejercicio 2: Crea un módulo llamado "mensaje.js" que exporte por defecto una función que reciba un nombre y muestre un saludo personalizado. Luego impórtalo y ejecútalo.
// mensaje.js
export default function saludar(nombre) {
  console.log(`Hola ${nombre}, bienvenido al sistema.`);
}
// app.js
import saludar from "./mensaje.js";
saludar("Lucía");

// Ejercicio 3: Implementa un módulo CommonJS en Node.js llamado "math.cjs" que tenga una función resta. Luego impórtala y pruébala en otro archivo.
// math.cjs
module.exports = {
  resta(a, b) {
    return a - b;
  },
};
// app.cjs
const { resta } = require("./math.cjs");
console.log(resta(10, 4)); // 6

// Ejercicio 4: Define una clase "Estudiante" con un constructor que reciba nombre y curso. Agrega un método presentar que muestre un mensaje. Luego crea una instancia y pruébala.
class Estudiante {
  constructor(nombre, curso) {
    this.nombre = nombre;
    this.curso = curso;
  }
  presentar() {
    console.log(`Soy ${this.nombre} y estudio en el curso ${this.curso}.`);
  }
}
const estudiante1 = new Estudiante("María", "JavaScript");
estudiante1.presentar(); // Soy María y estudio en el curso JavaScript.

// Ejercicio 5: Crea una clase "Empleado" con nombre y salario. Luego crea una clase "Gerente" que herede de Empleado y tenga un método adicional para mostrar su rol.
class Empleado {
  constructor(nombre, salario) {
    this.nombre = nombre;
    this.salario = salario;
  }
  mostrarInfo() {
    console.log(`${this.nombre} gana $${this.salario}.`);
  }
}
class Gerente extends Empleado {
  mostrarRol() {
    console.log(`${this.nombre} es gerente.`);
  }
}
const jefe = new Gerente("Carlos", 5000);
jefe.mostrarInfo(); // Carlos gana $5000.
jefe.mostrarRol(); // Carlos es gerente.

// Ejercicio 6: Crea una clase "Vehiculo" con una marca, y una clase "Moto" que herede de Vehiculo y use super para inicializar. Sobrescribe el método arrancar.
class Vehiculo {
  constructor(marca) {
    this.marca = marca;
  }
  arrancar() {
    console.log(`${this.marca} está arrancando...`);
  }
}
class Moto extends Vehiculo {
  constructor(marca, cilindrada) {
    super(marca);
    this.cilindrada = cilindrada;
  }
  arrancar() {
    super.arrancar();
    console.log(`Cilindrada de ${this.cilindrada}cc lista.`);
  }
}
const moto1 = new Moto("Yamaha", 250);
moto1.arrancar();

// Ejercicio 7: Define una clase "Matematica" con un método estático "cuadrado" que devuelva el cuadrado de un número. Llama al método sin crear instancias.
class Matematica {
  static cuadrado(n) {
    return n * n;
  }
}
console.log(Matematica.cuadrado(6)); // 36

// Ejercicio 8: Crea una clase "Cuenta" con un campo privado #balance. Agrega métodos depositar y obtenerBalance. Prueba la privacidad del campo.
class Cuenta {
  #balance = 0;
  depositar(monto) {
    this.#balance += monto;
  }
  obtenerBalance() {
    return this.#balance;
  }
}
const cuenta1 = new Cuenta();
cuenta1.depositar(200);
console.log(cuenta1.obtenerBalance()); // 200
// console.log(cuenta1.#balance); // Error

// Ejercicio 9: Implementa un mixin "Cantante" con un método cantar. Aplica este mixin a una clase "Persona" y pruébalo con un objeto.
const Cantante = {
  cantar() {
    console.log(`${this.nombre} está cantando una canción.`);
  },
};
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
}
Object.assign(Persona.prototype, Cantante);
const p1 = new Persona("Ana");
p1.cantar(); // Ana está cantando una canción.
