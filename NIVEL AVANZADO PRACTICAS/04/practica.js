// ========================================================
// Ejercicio 1: Optimizar algoritmo (O(n²) vs O(n log n))
// ========================================================
// Enunciado: Implementa una búsqueda de duplicados en un array
// primero con un algoritmo O(n²) y luego con uno O(n).
// Compara el tiempo de ejecución.

function duplicadosON2(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

function duplicadosON(arr) {
  let set = new Set();
  for (let num of arr) {
    if (set.has(num)) return true;
    set.add(num);
  }
  return false;
}

let arrayGrande = Array.from({ length: 50000 }, (_, i) => i);

// Benchmark
console.time("O(n²)");
console.log("¿Hay duplicados?", duplicadosON2(arrayGrande));
console.timeEnd("O(n²)");

console.time("O(n)");
console.log("¿Hay duplicados?", duplicadosON(arrayGrande));
console.timeEnd("O(n)");

// ===================================
// Ejercicio 2: Evitar trabajo repetido
// ===================================
// Enunciado: Implementa memoization para optimizar
// el cálculo de una función costosa (Fibonacci).

function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

let memo = {};
function fibMemo(n) {
  if (n in memo) return memo[n];
  if (n <= 1) return (memo[n] = n);
  return (memo[n] = fibMemo(n - 1) + fibMemo(n - 2));
}

console.time("Fibonacci normal");
console.log("Fib(35):", fib(35));
console.timeEnd("Fibonacci normal");

console.time("Fibonacci con memoization");
console.log("Fib(35):", fibMemo(35));
console.timeEnd("Fibonacci con memoization");

// ==================================
// Ejercicio 3: Minimizar acceso al DOM
// ==================================
// Enunciado: Inserta 1000 elementos en el DOM de manera
// ineficiente y luego optimizada con DocumentFragment.

function domIneficiente() {
  for (let i = 0; i < 1000; i++) {
    document.body.innerHTML += `<p>${i}</p>`;
  }
}

function domOptimizado() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) {
    const p = document.createElement("p");
    p.textContent = i;
    fragment.appendChild(p);
  }
  document.body.appendChild(fragment);
}

// ⚠️ Ejecutar en navegador, no en Node.js
// domIneficiente();
// domOptimizado();

// ==================================
// Ejercicio 4: Uso de estructuras óptimas
// ==================================
// Enunciado: Usa Map y Set para mejorar búsquedas
// en lugar de arrays.

let lista = ["a", "b", "c", "d", "e"];
let conjunto = new Set(lista);

console.time("Búsqueda en Array");
console.log(lista.includes("d"));
console.timeEnd("Búsqueda en Array");

console.time("Búsqueda en Set");
console.log(conjunto.has("d"));
console.timeEnd("Búsqueda en Set");

// ===============================
// Ejercicio 5: Benchmark de métodos
// ===============================
// Enunciado: Compara el rendimiento de dos formas
// de recorrer un array grande.

let arr = Array.from({ length: 1e6 }, (_, i) => i);

console.time("for clásico");
for (let i = 0; i < arr.length; i++) {}
console.timeEnd("for clásico");

console.time("forEach");
arr.forEach(() => {});
console.timeEnd("forEach");

// ==================================
// Ejercicio 6: Code Splitting dinámico
// ==================================
// Enunciado: Simula carga diferida de un módulo pesado.

function cargarModuloPesado() {
  import("./moduloPesado.js").then((mod) => {
    mod.ejecutar();
  });
}
// ⚠️ Funciona en entorno con bundler (Webpack, Vite, etc)

// ==================================
// Ejercicio 7: Lazy Loading imágenes
// ==================================
// Enunciado: Implementa carga diferida de imágenes
// con el atributo loading="lazy".

/* HTML:
<img src="imagen1.jpg" loading="lazy" alt="Ejemplo 1">
<img src="imagen2.jpg" loading="lazy" alt="Ejemplo 2">
*/

// ==================================
// Ejercicio 8: Bottleneck Simulation
// ==================================
// Enunciado: Simula un cuello de botella en el main thread
// y observa en DevTools el bloqueo de UI.

function cuelloDeBotella() {
  let total = 0;
  for (let i = 0; i < 1e8; i++) {
    total += i;
  }
  console.log("Fin del cálculo pesado:", total);
}
// cuelloDeBotella(); // ⚠️ Bloquea la UI
