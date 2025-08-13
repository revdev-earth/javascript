# 7. Iterators y Generators

En JavaScript, iteradores y generadores permiten recorrer colecciones de datos de forma controlada y personalizada.

## Iterable Protocol

Un objeto es iterable si implementa el método especial Symbol.iterator que devuelve un iterador.

#### Ejemplo con un array (iterable por defecto):

```javascript
const arr = [10, 20, 30];
const iterador = arr[Symbol.iterator]();

console.log(iterador.next()); // { value: 10, done: false }
console.log(iterador.next()); // { value: 20, done: false }
console.log(iterador.next()); // { value: 30, done: false }
console.log(iterador.next()); // { value: undefined, done: true }
```

## Iterator Protocol

Un iterador es un objeto con un método next() que devuelve:

- value: el valor actual.
- done: booleano que indica si la iteración terminó.

#### Ejemplo de iterador personalizado:

```javascript
function crearIterador(valores) {
  let index = 0;
  return {
    next() {
      return index < valores.length
        ? { value: valores[index++], done: false }
        : { value: undefined, done: true };
    },
  };
}

const it = crearIterador(["A", "B"]);
console.log(it.next()); // { value: "A", done: false }
```

## Custom Iterators

Podemos hacer que cualquier objeto sea iterable:

```javascript
const rango = {
  inicio: 1,
  fin: 5,
  [Symbol.iterator]() {
    let actual = this.inicio;
    const fin = this.fin;
    return {
      next() {
        return actual <= fin
          ? { value: actual++, done: false }
          : { done: true };
      },
    };
  },
};

for (let num of rango) {
  console.log(num); // 1 2 3 4 5
}
```

## Generator Functions

- Se definen con function\*.
- Usan yield para producir valores de uno en uno.
- Son iteradores automáticos.

```javascript
function* numeros() {
  yield 1;
  yield 2;
  yield 3;
}

for (let n of numeros()) {
  console.log(n); // 1 2 3
}
```

## Yield Expressions

yield pausa la ejecución y devuelve un valor al consumidor del iterador.

```javascript
function* contador() {
  let i = 0;
  while (true) {
    const reset = yield i++;
    if (reset) i = 0;
  }
}

const c = contador();
console.log(c.next().value); // 0
console.log(c.next().value); // 1
console.log(c.next(true).value); // 0 (reseteado)
```

## Async Generators

Permiten usar await dentro de un generador para manejar datos asincrónicos.

```javascript
async function* fetchDatos() {
  yield await Promise.resolve("Dato 1");
  yield await Promise.resolve("Dato 2");
}

(async () => {
  for await (let d of fetchDatos()) {
    console.log(d); // Dato 1, Dato 2
  }
})();
```

## for-await-of

Itera sobre iterables asíncronos:

```javascript
async function* generadorAsync() {
  yield "Uno";
  yield "Dos";
}

(async () => {
  for await (let valor of generadorAsync()) {
    console.log(valor);
  }
})();
```
