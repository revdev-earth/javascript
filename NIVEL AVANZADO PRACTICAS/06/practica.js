// Ejercicio 1: Symbol Creation
// Enunciado: Crea dos símbolos con la misma descripción y demuestra que no son iguales.
const s1 = Symbol("usuario");
const s2 = Symbol("usuario");
console.log("Ejercicio 1:", s1 === s2); // false

// Ejercicio 2: Global Registry
// Enunciado: Usa Symbol.for para registrar un símbolo global y comprueba que dos referencias con la misma clave son iguales.
const globalA = Symbol.for("config.api");
const globalB = Symbol.for("config.api");
console.log("Ejercicio 2:", globalA === globalB); // true

// Ejercicio 3: Symbol.keyFor
// Enunciado: Obtén la clave asociada a un símbolo del registro global.
const globalVersion = Symbol.for("app.version");
console.log("Ejercicio 3:", Symbol.keyFor(globalVersion)); // "app.version"

// Ejercicio 4: Well-Known Symbols - Symbol.toStringTag
// Enunciado: Personaliza la etiqueta de un objeto para que al usar Object.prototype.toString muestre un tipo distinto.
const motor = {
  nombre: "V8",
  get [Symbol.toStringTag]() {
    return "MotorPersonalizado";
  },
};
console.log("Ejercicio 4:", Object.prototype.toString.call(motor)); // [object MotorPersonalizado]

// Ejercicio 5: Well-Known Symbols - Symbol.hasInstance
// Enunciado: Define una clase que controle el comportamiento de instanceof usando Symbol.hasInstance.
class Rango {
  static [Symbol.hasInstance](valor) {
    return typeof valor === "number" && valor >= 1 && valor <= 10;
  }
}
console.log("Ejercicio 5:", 5 instanceof Rango); // true
console.log("Ejercicio 5:", 20 instanceof Rango); // false

// Ejercicio 6: Private Properties
// Enunciado: Usa un símbolo como propiedad privada de una clase y accede a ella solo con el símbolo original.
const clavePrivada = Symbol("clave");
class Cuenta {
  constructor(saldo) {
    this[clavePrivada] = saldo;
  }
}
const cuenta1 = new Cuenta(500);
console.log("Ejercicio 6:", Object.keys(cuenta1)); // []
console.log("Ejercicio 6:", cuenta1[clavePrivada]); // 500

// Ejercicio 7: Symbol-Keyed Properties
// Enunciado: Define un objeto con propiedades normales y con símbolos. Lista las claves de símbolo.
const secreto = Symbol("secreto");
const datos = {
  nombre: "Nico",
  [secreto]: "clave oculta",
};
console.log("Ejercicio 7:", Object.keys(datos)); // ["nombre"]
console.log("Ejercicio 7:", Object.getOwnPropertySymbols(datos)); // [ Symbol(secreto) ]

// Ejercicio 8: Symbol.iterator
// Enunciado: Implementa un objeto iterable con Symbol.iterator para generar números pares.
const pares = {
  *[Symbol.iterator]() {
    for (let i = 0; i <= 10; i += 2) {
      yield i;
    }
  },
};
console.log("Ejercicio 8:", [...pares]); // [0, 2, 4, 6, 8, 10]

// Ejercicio 9: Symbol.toPrimitive
// Enunciado: Crea un objeto con conversión personalizada usando Symbol.toPrimitive para que al sumarlo con un número, se use su valor interno.
const temperatura = {
  valor: 25,
  [Symbol.toPrimitive](hint) {
    return hint === "number" ? this.valor : `${this.valor}°C`;
  },
};
console.log("Ejercicio 9:", temperatura + 5); // 30
console.log("Ejercicio 9:", `${temperatura}`); // "25°C"

// Ejercicio 10: Symbol.asyncIterator
// Enunciado: Implementa un objeto con iterador asíncrono que devuelva valores con retardo.
const asyncContador = {
  actual: 1,
  final: 3,
  async *[Symbol.asyncIterator]() {
    while (this.actual <= this.final) {
      await new Promise((res) => setTimeout(res, 500));
      yield this.actual++;
    }
  },
};
(async () => {
  for await (let num of asyncContador) {
    console.log("Ejercicio 10:", num); // 1, 2, 3
  }
})();
