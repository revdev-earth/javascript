/* =====================================================
   EJERCICIO 1 — ENUNCIADO
   Crea un objeto "biblioteca" con una propiedad "nombre" y un objeto hijo "sala"
   con propiedad "id". Implementa dos métodos:
   - biblioteca.mostrar() debe imprimir: "Biblioteca: <nombre>"
   - biblioteca.sala.mostrar() debe imprimir: "Sala: <id>"
   Ambos métodos deben usar `this` correctamente (implicit binding).
   SOLUCIÓN:
===================================================== */
console.log("== EJERCICIO 1 ==");
const biblioteca = {
  nombre: "Central",
  mostrar() {
    console.log(`Biblioteca: ${this.nombre}`);
  },
  sala: {
    id: "A-101",
    mostrar() {
      console.log(`Sala: ${this.id}`);
    },
  },
};
biblioteca.mostrar();
biblioteca.sala.mostrar();

/* =====================================================
   EJERCICIO 2 — ENUNCIADO
   Crea una función genérica "imprimirResumen" que reciba dos etiquetas (por ejemplo
   "Tipo" y "Estado") y muestre un resumen usando `this`:
   "Tipo: <this.tipo> | Estado: <this.estado>".
   Úsala con `call` y `apply` para dos objetos distintos (pedido y ticket).
   SOLUCIÓN:
===================================================== */
console.log("\n== EJERCICIO 2 ==");
function imprimirResumen(etqTipo, etqEstado) {
  console.log(`${etqTipo}: ${this.tipo} | ${etqEstado}: ${this.estado}`);
}
const pedido = { tipo: "Compra", estado: "Confirmado" };
const ticket = { tipo: "Soporte", estado: "Abierto" };
imprimirResumen.call(pedido, "Tipo", "Estado");
imprimirResumen.apply(ticket, ["Tipo", "Estado"]);

/* =====================================================
   EJERCICIO 3 — ENUNCIADO
   Declara un objeto "producto" con propiedades "precio" e "iva" y un método
   "precioFinal()" que retorne `this.precio * (1 + this.iva)`.
   Asigna el método a una variable independiente y ejecútalo (debe fallar al perder
   el contexto). Luego corrígelo usando `bind` para conservar `this`.
   SOLUCIÓN:
===================================================== */
console.log("\n== EJERCICIO 3 ==");
const producto = {
  precio: 100,
  iva: 0.21,
  precioFinal() {
    return this.precio * (1 + this.iva);
  },
};
const sinContexto = producto.precioFinal;
// Puede dar NaN por pérdida de this.
console.log("Sin bind (pérdida de this):", sinContexto()); // NaN esperado
const conContexto = producto.precioFinal.bind(producto);
console.log("Con bind (this correcto):", conContexto()); // 121

/* =====================================================
   EJERCICIO 4 — ENUNCIADO
   Define una función "anunciar" que reciba (saludo, despedida) y use `this.titulo`
   para imprimir: "<saludo> del curso <titulo>. <despedida>".
   Usa `bind` para crear una nueva función "anuncioDeJS" con `this` fijado a un
   objeto { titulo: "JavaScript Avanzado" } y además precarga el saludo.
   Ejecuta la función resultante pasando solo la despedida.
   SOLUCIÓN:
===================================================== */
console.log("\n== EJERCICIO 4 ==");
function anunciar(saludo, despedida) {
  console.log(`${saludo} del curso ${this.titulo}. ${despedida}`);
}
const curso = { titulo: "JavaScript Avanzado" };
const anuncioDeJS = anunciar.bind(curso, "Bienvenidos");
anuncioDeJS("¡Gracias por asistir!");

/* =====================================================
   EJERCICIO 5 — ENUNCIADO
   Implementa un "constructor" Cuenta con propiedades: titular (string) y saldo (número),
   y métodos: depositar(monto) y retirar(monto) que actualicen saldo usando `this`.
   - Crea dos instancias con `new` y prueba operaciones.
   - Asegura que si se invoca sin `new`, la función retorne una nueva instancia válida.
   SOLUCIÓN:
===================================================== */
console.log("\n== EJERCICIO 5 ==");
function Cuenta(titular, saldoInicial = 0) {
  if (!(this instanceof Cuenta)) {
    return new Cuenta(titular, saldoInicial);
  }
  this.titular = titular;
  this.saldo = saldoInicial;
}
Cuenta.prototype.depositar = function (monto) {
  this.saldo += monto;
  return this.saldo;
};
Cuenta.prototype.retirar = function (monto) {
  this.saldo -= monto;
  return this.saldo;
};
const c1 = new Cuenta("Ana", 100);
c1.depositar(50);
c1.retirar(20);
console.log("Cuenta 1:", c1.titular, c1.saldo); // 130
const c2 = Cuenta("Luis", 200); // sin new, debe funcionar
c2.depositar(25);
console.log("Cuenta 2:", c2.titular, c2.saldo); // 225

/* =====================================================
   EJERCICIO 6 — ENUNCIADO
   Crea una clase "Contador" con propiedad interna `valor`.
   - Método `sumarConFuncion(cb)` debe usar setTimeout con una función normal (function)
     que intente incrementar `this.valor` (mostrará el problema de `this`).
   - Método `sumarConArrow()` debe usar setTimeout con una arrow function que sí
     incremente `this.valor` correctamente.
   Muestra en consola el comportamiento de ambos.
   SOLUCIÓN:
===================================================== */
console.log("\n== EJERCICIO 6 ==");
class Contador {
  constructor() {
    this.valor = 0;
  }
  sumarConFuncion() {
    setTimeout(function () {
      // this aquí no es la instancia (pérdida de contexto)
      // Esto típicamente imprimirá NaN o no cambiará la instancia real.
      this.valor++;
      console.log("sumarConFuncion -> this.valor (mal this):", this.valor);
    }, 0);
  }
  sumarConArrow() {
    setTimeout(() => {
      // `this` apunta a la instancia gracias a la arrow function
      this.valor++;
      console.log("sumarConArrow  -> this.valor (bien):", this.valor);
    }, 0);
  }
}
const ctr = new Contador();
ctr.sumarConFuncion();
ctr.sumarConArrow();

/* =====================================================
   EJERCICIO 7 — ENUNCIADO
   Simula una cola de eventos usando setTimeout. Crea una clase "Descargador" con
   propiedades `nombre` y un método `reportar()` que imprima "Descargador: <nombre>".
   - Pasa `desc.reportar` directamente a setTimeout y observa la pérdida de contexto.
   - Arréglalo pasando `desc.reportar.bind(desc)` a setTimeout.
   SOLUCIÓN:
===================================================== */
console.log("\n== EJERCICIO 7 ==");
class Descargador {
  constructor(nombre) {
    this.nombre = nombre;
  }
  reportar() {
    console.log(`Descargador: ${this.nombre}`);
  }
}
const desc = new Descargador("Archivo_01");
setTimeout(desc.reportar, 0); // this perdido -> "Descargador: undefined"
setTimeout(desc.reportar.bind(desc), 0); // this correcto -> "Descargador: Archivo_01"

/* =====================================================
   EJERCICIO 8 — ENUNCIADO
   Tienes un objeto "inventarioLike" que simula un array con claves numéricas y `length`.
   Usa "borrowing" de métodos de Array para:
   - Convertirlo a array real (con slice).
   - Filtrar los elementos que empiecen con "A".
   - Mapear a minúsculas.
   Muestra el resultado final.
   SOLUCIÓN:
===================================================== */
console.log("\n== EJERCICIO 8 ==");
const inventarioLike = {
  0: "Arroz",
  1: "Pan",
  2: "Avena",
  3: "Leche",
  length: 4,
};
const inventarioArray = Array.prototype.slice.call(inventarioLike);
const soloA = Array.prototype.filter.call(inventarioArray, (item) =>
  item.startsWith("A")
);
const enMinusculas = Array.prototype.map.call(soloA, (item) =>
  item.toLowerCase()
);
console.log("Resultado:", enMinusculas); // ['arroz', 'avena']

/* =====================================================
   EJERCICIO 9 — ENUNCIADO
   Crea una función normal (NO arrow) "duplicarArgs" que use el objeto `arguments`.
   - Convierte `arguments` a array usando "borrowing" de Array.prototype.slice.
   - Devuelve un nuevo array con cada valor duplicado (usando "borrowing" de map).
   Prueba con distintos argumentos.
   SOLUCIÓN:
===================================================== */
console.log("\n== EJERCICIO 9 ==");
function duplicarArgs() {
  const argsArr = Array.prototype.slice.call(arguments);
  const duplicados = Array.prototype.map.call(argsArr, (x) => x * 2);
  return duplicados;
}
console.log(duplicarArgs(1, 2, 3)); // [2, 4, 6]
console.log(duplicarArgs(5, 10, -1)); // [10, 20, -2]

/* =====================================================
   EJERCICIO 10 — ENUNCIADO
   Crea una función "checkout(descuento, impuestos, ...precios)" que use `this.usuario`
   para imprimir el usuario y calcule el total:
     total = (suma(precios) - descuento) * (1 + impuestos)
   - Usa `call` para ejecutar con `this = { usuario: "María" }`.
   - Crea una versión parcial con `bind` que fije descuento=10 e impuestos=0.21 para
     `this = { usuario: "Pepe" }` y ejecútala con una lista de precios.
   SOLUCIÓN:
===================================================== */
console.log("\n== EJERCICIO 10 ==");
function checkout(descuento, impuestos, ...precios) {
  const suma = precios.reduce((acc, n) => acc + n, 0);
  const total = (suma - descuento) * (1 + impuestos);
  console.log(`Usuario: ${this.usuario} | Total: ${total.toFixed(2)}`);
  return total;
}
checkout.call({ usuario: "María" }, 5, 0.18, 100, 50, 25);
const checkoutPepe = checkout.bind({ usuario: "Pepe" }, 10, 0.21);
checkoutPepe(40, 40, 20); // precios variaditos
