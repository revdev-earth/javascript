// 1. Crea un objeto literal llamado `libro` con propiedades título y autor.
// Agrega un método que retorne "El libro [título] fue escrito por [autor]".
let libro = {
  titulo: "Cien Años de Soledad",
  autor: "Gabriel García Márquez",
  descripcion() {
    return `El libro ${this.titulo} fue escrito por ${this.autor}`;
  },
};
console.log(libro.descripcion());

// 2. Usa el constructor Object para crear un objeto vacío llamado `pelicula`
// y asigna propiedades título y año de estreno.
let pelicula = new Object();
pelicula.titulo = "Inception";
pelicula.anio = 2010;
console.log(pelicula);

// 3. Usa Object.create() para crear un objeto con un prototipo que tenga un método `presentar`.
// Luego crea un objeto `estudiante` con nombre y llama su método.
let prototipoPersona = {
  presentar() {
    return `Soy ${this.nombre}`;
  },
};
let estudiante = Object.create(prototipoPersona);
estudiante.nombre = "Laura";
console.log(estudiante.presentar());

// 4. Crea un objeto `animal` con propiedades nombre y tipo.
// Usa dot notation para acceder al nombre y bracket notation para acceder al tipo.
let animal = {
  nombre: "Firulais",
  tipo: "Perro",
};
console.log(animal.nombre);
console.log(animal["tipo"]);

// 5. Crea un objeto `empleado` con nombre, cargo y edad.
// Usa destructuring para extraer el cargo y la edad en nuevas variables.
let empleado = {
  nombre: "Carlos",
  cargo: "Ingeniero",
  edad: 35,
};
let { cargo, edad } = empleado;
console.log(cargo, edad);

// 6. Combina dos objetos `infoPersonal` y `infoTrabajo` usando el spread operator
// en un nuevo objeto `perfil`.
let infoPersonal = { nombre: "Ana", ciudad: "Bogotá" };
let infoTrabajo = { empresa: "TechCorp", puesto: "Desarrolladora" };
let perfil = { ...infoPersonal, ...infoTrabajo };
console.log(perfil);

// 7. Usa rest en destructuring para separar una propiedad de un objeto `vehiculo`.
// Extrae la marca y guarda el resto en otro objeto.
let vehiculo = { marca: "Ford", modelo: "Focus", anio: 2018, color: "Azul" };
let { marca, ...otros } = vehiculo;
console.log(marca);
console.log(otros);

// 8. Crea un objeto `curso` con varias propiedades.
// Usa Object.keys(), Object.values() y Object.entries() para mostrar su información.
let curso = {
  nombre: "JavaScript Avanzado",
  duracion: "40h",
  activo: true,
};
console.log(Object.keys(curso));
console.log(Object.values(curso));
console.log(Object.entries(curso));

// 9. Usa Object.defineProperty() para crear un objeto `config` con una propiedad `version`
// que no pueda ser modificada ni eliminada.
let config = {};
Object.defineProperty(config, "version", {
  value: "1.0.0",
  writable: false,
  enumerable: true,
  configurable: false,
});
console.log(config.version);

// 10. Crea un objeto `cuenta` y usa Object.freeze() para hacerlo inmutable.
// Intenta cambiar una propiedad y verifica que no se modifica.
let cuenta = { saldo: 5000, moneda: "USD" };
Object.freeze(cuenta);
cuenta.saldo = 10000;
console.log(cuenta);
