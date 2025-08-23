// Ejercicio 1
// Crea un objeto base "instrumento" con un método tocar().
// Luego, crea un objeto "guitarra" usando Object.create que herede de instrumento,
// y agrega un método afinar(). Demuestra que puede usar ambos métodos.

const instrumento = {
  tocar() {
    console.log("El instrumento está sonando");
  },
};

const guitarra = Object.create(instrumento);
guitarra.afinar = function () {
  console.log("La guitarra está afinada");
};

guitarra.tocar(); // El instrumento está sonando
guitarra.afinar(); // La guitarra está afinada

// Ejercicio 2
// Implementa una función constructora "Libro" que reciba título y autor.
// Añade un método en su prototipo llamado describir() que muestre la información del libro.

function Libro(titulo, autor) {
  this.titulo = titulo;
  this.autor = autor;
}

Libro.prototype.describir = function () {
  console.log(`"${this.titulo}" escrito por ${this.autor}`);
};

const libro1 = new Libro("Cien Años de Soledad", "Gabriel García Márquez");
libro1.describir(); // "Cien Años de Soledad" escrito por Gabriel García Márquez

// Ejercicio 3
// Crea un objeto base "figura" con un método area() que solo imprima "Área genérica".
// Luego, crea "circulo" y "cuadrado" con Object.create(figura) y redefine el método area() en cada uno.

const figura = {
  area() {
    console.log("Área genérica");
  },
};

const circulo = Object.create(figura);
circulo.radio = 5;
circulo.area = function () {
  console.log(`Área del círculo: ${Math.PI * this.radio ** 2}`);
};

const cuadrado = Object.create(figura);
cuadrado.lado = 4;
cuadrado.area = function () {
  console.log(`Área del cuadrado: ${this.lado * this.lado}`);
};

circulo.area(); // Área del círculo: 78.5398...
cuadrado.area(); // Área del cuadrado: 16

// Ejercicio 4
// Usa funciones constructoras para modelar una jerarquía.
// Crea una función constructora "Vehiculo" con propiedad marca y método mover().
// Crea una función constructora "Moto" que herede de Vehiculo y tenga método acelerar().

function Vehiculo(marca) {
  this.marca = marca;
}

Vehiculo.prototype.mover = function () {
  console.log(`${this.marca} se está moviendo`);
};

function Moto(marca, modelo) {
  Vehiculo.call(this, marca);
  this.modelo = modelo;
}

Moto.prototype = Object.create(Vehiculo.prototype);
Moto.prototype.constructor = Moto;

Moto.prototype.acelerar = function () {
  console.log(`${this.marca} ${this.modelo} está acelerando`);
};

const moto1 = new Moto("Yamaha", "R15");
moto1.mover(); // Yamaha se está moviendo
moto1.acelerar(); // Yamaha R15 está acelerando

// Ejercicio 5
// Demuestra un caso de "prototype pollution" creando una propiedad en Object.prototype.
// Luego crea un objeto seguro usando Object.create(null) que no herede dicha propiedad.

Object.prototype.inseguro = "¡Hackeado!";
const objetoNormal = {};
console.log(objetoNormal.inseguro); // ¡Hackeado!

const objetoSeguro = Object.create(null);
console.log(objetoSeguro.inseguro); // undefined
