// EJERCICIO 1
// Enunciado: Explica qué sucede en el Call Stack cuando se ejecutan dos funciones anidadas.
function saludar() {
  console.log("Hola");
}
function iniciar() {
  saludar();
  console.log("Programa iniciado");
}
iniciar();
// Solución: Call Stack -> main() → iniciar() → saludar().
// Primero se imprime "Hola", se saca saludar(), luego "Programa iniciado".

// EJERCICIO 2
// Enunciado: Demuestra cómo el Heap almacena objetos mientras que el Stack guarda referencias.
let persona = { nombre: "Ana", edad: 25 };
let copia = persona;
copia.edad = 30;
console.log(persona.edad);
// Solución: El objeto vive en el Heap.
// Tanto persona como copia apuntan a la misma referencia en el Heap, imprime 30.

// EJERCICIO 3
// Enunciado: Usa setTimeout para mostrar cómo una tarea se mueve a la Callback Queue.
console.log("Inicio");
setTimeout(() => console.log("Tarea asíncrona"), 0);
console.log("Fin");
// Solución: "Inicio" → "Fin" → "Tarea asíncrona".
// El callback espera en la cola hasta que el Stack esté vacío.

// EJERCICIO 4
// Enunciado: Muestra cómo las microtareas (Promise) tienen prioridad sobre macrotareas (setTimeout).
setTimeout(() => console.log("Macrotarea"), 0);
Promise.resolve().then(() => console.log("Microtarea"));
console.log("Principal");
// Solución: Orden → "Principal" → "Microtarea" → "Macrotarea".

// EJERCICIO 5
// Enunciado: Usa queueMicrotask para ejecutar código antes que un setTimeout.
console.log("Inicio");
queueMicrotask(() => console.log("Microtask ejecutada"));
setTimeout(() => console.log("Timeout ejecutado"), 0);
console.log("Fin");
// Solución: "Inicio" → "Fin" → "Microtask ejecutada" → "Timeout ejecutado".

// EJERCICIO 6
// Enunciado: Muestra el orden de ejecución de múltiples promesas encadenadas.
Promise.resolve()
  .then(() => console.log("Promesa 1"))
  .then(() => console.log("Promesa 2"));
console.log("Fin del script");
// Solución: "Fin del script" → "Promesa 1" → "Promesa 2".

// EJERCICIO 7
// Enunciado: Comprueba cómo un bucle bloquea el Event Loop y retrasa un setTimeout.
setTimeout(() => console.log("Timeout después del bucle"), 0);
for (let i = 0; i < 1e9; i++) {} // Bloquea
console.log("Bucle terminado");
// Solución: "Bucle terminado" aparece antes del timeout.
// El Event Loop no puede atender la Callback Queue mientras el Stack está ocupado.

// EJERCICIO 8
// Enunciado: Demuestra el orden de ejecución de process.nextTick y Promises en Node.js.
if (typeof process !== "undefined") {
  process.nextTick(() => console.log("NextTick"));
  Promise.resolve().then(() => console.log("Promise"));
  console.log("Código principal Node.js");
}
// Solución en Node.js: "Código principal Node.js" → "NextTick" → "Promise".

// EJERCICIO 9
// Enunciado: Compara setImmediate y setTimeout en Node.js.
if (typeof setImmediate !== "undefined") {
  setTimeout(() => console.log("Timeout"), 0);
  setImmediate(() => console.log("Immediate"));
}
// Solución: El orden puede variar, pero generalmente → "Immediate" → "Timeout".

// EJERCICIO 10
// Enunciado: Simula cómo el Event Loop gestiona múltiples macrotareas y microtareas.
setTimeout(() => console.log("Macrotarea 1"), 0);
setTimeout(() => console.log("Macrotarea 2"), 0);
Promise.resolve().then(() => console.log("Microtarea 1"));
Promise.resolve().then(() => console.log("Microtarea 2"));
console.log("Principal");
// Solución: "Principal" → "Microtarea 1" → "Microtarea 2" → "Macrotarea 1" → "Macrotarea 2".
