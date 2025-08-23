// ==========================
// Ejercicio 1: Stack vs Heap
// ==========================
// Enunciado: Explica mediante un ejemplo cómo se almacenan variables primitivas en el Stack
// y objetos en el Heap. Muestra en consola sus diferencias.

function stackVsHeap() {
  let numero = 100; // valor primitivo -> Stack
  let persona = { nombre: "Nico" }; // objeto -> referencia en Stack, contenido en Heap

  console.log("Número (Stack):", numero);
  console.log("Objeto (Heap):", persona);
}
stackVsHeap();

// =======================================
// Ejercicio 2: Garbage Collector en acción
// =======================================
// Enunciado: Simula cómo el Garbage Collector libera memoria
// al perderse las referencias a un objeto.

function garbageCollectorEjemplo() {
  let datos = { mensaje: "Se usará temporalmente" };
  console.log("Antes de liberar:", datos);

  datos = null; // se pierde referencia, el GC puede liberarlo
  console.log("Después de liberar (referencia perdida):", datos);
}
garbageCollectorEjemplo();

// ==================================
// Ejercicio 3: Fuga de memoria simple
// ==================================
// Enunciado: Crea un ejemplo de fuga de memoria usando variables globales
// y muestra cómo solucionarlo.

let fuga = []; // variable global (se acumula en Heap)

function fugaMemoria() {
  for (let i = 0; i < 1000; i++) {
    fuga.push(new Array(1000).fill("dato"));
  }
  console.log("Fuga de memoria, tamaño:", fuga.length);
}
fugaMemoria();

// Solución: limpiar la referencia
fuga = null;
console.log("Fuga eliminada, ahora GC puede liberar");

// =============================================
// Ejercicio 4: WeakMap para evitar fugas de memoria
// =============================================
// Enunciado: Usa un WeakMap para asociar datos a un objeto sin evitar
// que el Garbage Collector lo libere.

function weakMapEjemplo() {
  let wm = new WeakMap();
  let obj = { id: 1 };

  wm.set(obj, "valor secreto");
  console.log("Valor asociado en WeakMap:", wm.get(obj));

  obj = null; // GC puede liberar el objeto
  console.log("Objeto liberado, WeakMap no impide el GC");
}
weakMapEjemplo();

// ====================================
// Ejercicio 5: Cache sin límite (fuga)
// ====================================
// Enunciado: Simula una cache que nunca libera datos
// y luego corrige el problema con un límite.

let cache = {};
function cacheInfinita(key, valor) {
  cache[key] = valor; // crece indefinidamente
}

for (let i = 0; i < 5; i++) {
  cacheInfinita("k" + i, new Array(1000).fill("dato"));
}
console.log("Cache infinita, tamaño:", Object.keys(cache).length);

// Solución: implementar límite
let cacheLimitada = {};
let limite = 3;

function guardarEnCache(key, valor) {
  if (Object.keys(cacheLimitada).length >= limite) {
    let primerKey = Object.keys(cacheLimitada)[0];
    delete cacheLimitada[primerKey]; // eliminar el más viejo
  }
  cacheLimitada[key] = valor;
}

for (let i = 0; i < 5; i++) {
  guardarEnCache("k" + i, new Array(1000).fill("dato"));
}
console.log("Cache limitada, tamaño:", Object.keys(cacheLimitada).length);

// =========================================
// Ejercicio 6: Liberar referencias manualmente
// =========================================
// Enunciado: Crea una función que use objetos temporalmente
// y luego los libere manualmente para ayudar al Garbage Collector.

function liberarReferencias() {
  let temp = { datos: new Array(1000).fill("dato") };
  console.log("Objeto temporal creado");

  // liberar referencia explícitamente
  temp = null;
  console.log("Objeto liberado, GC puede limpiarlo");
}
liberarReferencias();

// ====================================================
// Ejercicio 7: Detectar uso excesivo de memoria (simulado)
// ====================================================
// Enunciado: Simula la acumulación de memoria
// y muestra cómo detectarla con un contador.

function consumoMemoria() {
  let acumulador = [];
  for (let i = 0; i < 10; i++) {
    acumulador.push(new Array(10000).fill(i));
    console.log(`Iteración ${i}, tamaño acumulador: ${acumulador.length}`);
  }
}
consumoMemoria();
