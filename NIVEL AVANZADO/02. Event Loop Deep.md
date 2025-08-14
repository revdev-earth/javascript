# 2. Event Loop Deep

El Event Loop es el sistema que coordina cómo se ejecuta el código JavaScript, cómo maneja operaciones asíncronas y cómo interactúa con el navegador o con Node.js.

## Call Stack (Pila de Llamadas)

Es una pila donde se apilan y desapilan las funciones en ejecución.

### Ejemplo:

```javascript
function uno() {
  console.log("1");
}
function dos() {
  uno();
  console.log("2");
}

dos();
```

Orden en el Call Stack:

1. main() → función global
2. dos()
3. uno()

Cuando uno() termina, se saca de la pila y se sigue con dos().

## Heap

Es la memoria donde se almacenan los objetos y datos dinámicos.

### Ejemplo:

```javascript
let obj = { nombre: "Nico" }; // Vive en el Heap
```

El Stack guarda una referencia al objeto, pero el objeto en sí vive en el Heap.

## Callback Queue (Macrotask Queue)

Cola donde se guardan las tareas normales (macrotareas) que esperan para ser ejecutadas después de que el Call Stack quede vacío.

Incluye:

- setTimeout
- setInterval
- Eventos de DOM (click, scroll)

### Ejemplo:

```javascript
console.log("Inicio");

setTimeout(() => console.log("Timeout"), 0);

console.log("Fin");
```

Salida:

```nginx

Inicio
Fin
Timeout
```

(Timeout va a la Callback Queue y espera hasta que el Stack esté libre).

Microtask Queue
Cola especial con mayor prioridad que la de macrotareas.

Incluye:

- Promesas (Promise.then)
- queueMicrotask()
- MutationsObserver

### Ejemplo:

```javascript
console.log("Inicio");

Promise.resolve().then(() => console.log("Microtask"));

console.log("Fin");
```

Salida:

```nginx
Inicio
Fin
Microtask
```

(La microtarea se ejecuta antes de la próxima macrotarea).

## Macrotask vs Microtask

### Ejemplo combinado:

```javascript
setTimeout(() => console.log("Macrotarea"), 0);

Promise.resolve().then(() => console.log("Microtarea"));

console.log("Código principal");
```

Salida:

```mathematica

Código principal
Microtarea
Macrotarea
```

🔹 Microtasks → Se ejecutan antes de la siguiente macrotarea.

## Prioridad y Fases en el Navegador

El ciclo del Event Loop en un navegador pasa por fases como:

1. Timers → Ejecuta setTimeout y setInterval.
2. I/O Callbacks → Responde a operaciones de red, archivos, etc.
3. Idle, Prepare
4. Poll → Espera eventos.
5. Check → Ejecuta setImmediate (en Node.js).
6. Close Callbacks → Limpieza de conexiones.

## Diferencias en Node.js

En Node.js, el Event Loop también sigue fases, pero con particularidades:

- Tiene process.nextTick() que es más prioritario que microtasks.
- La fase Check ejecuta setImmediate.
- Orden de ejecución en Node.js:
  1.  Código síncrono.
  2.  process.nextTick() callbacks.
  3.  Promesas resueltas (microtasks).
  4.  Macrotasks (setTimeout, setImmediate).

### Ejemplo:

```javascript
setTimeout(() => console.log("Timeout"), 0);
setImmediate(() => console.log("Immediate"));

process.nextTick(() => console.log("NextTick"));

Promise.resolve().then(() => console.log("Promise"));
```

Posible salida en Node.js:

```javascript
NextTick;
Promise;
Timeout;
Immediate;
```
