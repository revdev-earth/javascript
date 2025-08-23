/************************************
 * 10. Functional Programming Complete
 * Ejercicios con enunciados y soluciones
 ************************************/

/**
 * 1. Pure Functions
 * Enunciado:
 * Crea dos funciones:
 *  - Una pura que calcule el área de un rectángulo (base * altura).
 *  - Una impura que aumente un contador global cada vez que se llame.
 */

// Función pura
function areaRectangulo(base, altura) {
  return base * altura;
}
console.log("Área rectángulo (5x3):", areaRectangulo(5, 3));

// Función impura
let contador = 0;
function aumentarContador() {
  contador++;
  return contador;
}
console.log("Contador:", aumentarContador());
console.log("Contador:", aumentarContador());

/**
 * 2. Immutability
 * Enunciado:
 * Dado un objeto usuario = { nombre: "Ana", edad: 25 },
 * crea una nueva versión del objeto incrementando la edad en 1,
 * SIN modificar el original.
 */
const usuario = { nombre: "Ana", edad: 25 };
const usuarioNuevo = { ...usuario, edad: usuario.edad + 1 };

console.log("Usuario original:", usuario);
console.log("Usuario nuevo:", usuarioNuevo);

/**
 * 3. Higher-Order Functions
 * Enunciado:
 * Implementa una función "operar" que reciba otra función matemática
 * (suma, resta, multiplicación, división) y dos números.
 * Devuelve el resultado de aplicar esa función.
 */
function operar(fn, x, y) {
  return fn(x, y);
}

const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
console.log("Suma:", operar(sumar, 10, 5));
console.log("Resta:", operar(restar, 10, 5));

/**
 * 4. Composition
 * Enunciado:
 * Crea dos funciones:
 *  - sumarDos(x): suma 2 al número.
 *  - multiplicarTres(x): multiplica el número por 3.
 * Luego compón ambas funciones para aplicar primero sumarDos y después multiplicarTres.
 */
const sumarDos = (x) => x + 2;
const multiplicarTres = (x) => x * 3;

const combinado = (x) => multiplicarTres(sumarDos(x));
console.log("Composición manual:", combinado(5));

// Composición genérica
const compose = (f, g) => (x) => f(g(x));
const combinado2 = compose(multiplicarTres, sumarDos);
console.log("Composición genérica:", combinado2(5));

/**
 * 5. Currying
 * Enunciado:
 * Convierte la función suma(a, b) en una versión "curried"
 * que permita llamarla así: sumaCurried(2)(3).
 */
function sumaCurried(a) {
  return function (b) {
    return a + b;
  };
}
console.log("Currying:", sumaCurried(2)(3));

/**
 * 6. Partial Application
 * Enunciado:
 * Implementa una función multiplicar(a, b).
 * Usa "bind" para crear una función duplicar que siempre multiplique por 2.
 */
function multiplicar(a, b) {
  return a * b;
}
const duplicar = multiplicar.bind(null, 2);

console.log("Duplicar 5:", duplicar(5));

/**
 * 7. Functors
 * Enunciado:
 * Usando arrays como functors, multiplica cada número de [1, 2, 3, 4]
 * por 10 usando map.
 */
const numeros = [1, 2, 3, 4];
const porDiez = numeros.map((x) => x * 10);

console.log("Functor (map):", porDiez);

/**
 * 8. Monads (Maybe Monad)
 * Enunciado:
 * Implementa una Maybe Monad que:
 *  - Reciba un valor.
 *  - Tenga un método map(fn) que aplique la función solo si el valor no es null.
 *  - Tenga un método get() que devuelva el valor final.
 */
const Maybe = (value) => ({
  map: (fn) => (value != null ? Maybe(fn(value)) : Maybe(null)),
  get: () => value,
});

const resultado = Maybe(5)
  .map((x) => x + 2)
  .map((x) => x * 3)
  .get();

console.log("Monad (Maybe):", resultado);
