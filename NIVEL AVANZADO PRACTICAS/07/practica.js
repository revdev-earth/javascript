/* 
Ejercicio 1:
Crea un iterador personalizado que devuelva los caracteres de una cadena uno por uno.
*/
function stringIterator(cadena) {
  let i = 0;
  return {
    next() {
      return i < cadena.length
        ? { value: cadena[i++], done: false }
        : { value: undefined, done: true };
    },
  };
}
const it1 = stringIterator("Hola");
console.log(it1.next()); // { value: "H", done: false }
console.log(it1.next()); // { value: "o", done: false }
console.log(it1.next()); // { value: "l", done: false }
console.log(it1.next()); // { value: "a", done: false }
console.log(it1.next()); // { value: undefined, done: true }

/* 
Ejercicio 2:
Convierte un objeto "contador" en iterable para que se pueda usar en un for...of, 
mostrando los números del 10 al 15.
*/
const contador = {
  inicio: 10,
  fin: 15,
  [Symbol.iterator]() {
    let actual = this.inicio;
    let fin = this.fin;
    return {
      next() {
        return actual <= fin
          ? { value: actual++, done: false }
          : { done: true };
      },
    };
  },
};
for (let n of contador) {
  console.log(n); // 10, 11, 12, 13, 14, 15
}

/* 
Ejercicio 3:
Crea un generador que produzca los primeros 5 múltiplos de un número dado.
*/
function* multiplos(num) {
  for (let i = 1; i <= 5; i++) {
    yield num * i;
  }
}
for (let m of multiplos(3)) {
  console.log(m); // 3, 6, 9, 12, 15
}

/* 
Ejercicio 4:
Crea un generador que reciba un array y devuelva sus elementos en orden inverso.
*/
function* inverso(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    yield arr[i];
  }
}
for (let v of inverso(["A", "B", "C"])) {
  console.log(v); // C, B, A
}

/* 
Ejercicio 5:
Implementa un generador infinito que produzca números pares empezando desde 0.
*/
function* pares() {
  let n = 0;
  while (true) {
    yield n;
    n += 2;
  }
}
const it2 = pares();
console.log(it2.next().value); // 0
console.log(it2.next().value); // 2
console.log(it2.next().value); // 4
console.log(it2.next().value); // 6

/* 
Ejercicio 6:
Crea un async generator que simule traer mensajes desde un servidor con un retraso.
*/
async function* mensajes() {
  const datos = ["Mensaje 1", "Mensaje 2", "Mensaje 3"];
  for (let msg of datos) {
    await new Promise((r) => setTimeout(r, 500));
    yield msg;
  }
}
(async () => {
  for await (let m of mensajes()) {
    console.log(m); // Mensaje 1, Mensaje 2, Mensaje 3 (con delay)
  }
})();

/* 
Ejercicio 7:
Usa yield para crear un generador que pueda "pausar" la suma acumulada hasta que 
se le pase un valor externo que reinicie el acumulador.
*/
function* acumulador() {
  let suma = 0;
  while (true) {
    const reset = yield suma;
    if (reset) suma = 0;
    else suma++;
  }
}
const ac = acumulador();
console.log(ac.next().value); // 0
console.log(ac.next().value); // 1
console.log(ac.next().value); // 2
console.log(ac.next(true).value); // 0 (reseteado)
console.log(ac.next().value); // 1
