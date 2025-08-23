// =========================================
// 📘 Ejercicios de WebAssembly Integration
// =========================================

// 📝 Ejercicio 1: Cargar un módulo WASM sencillo
async function ejercicio1() {
  const wasmModule = await WebAssembly.instantiateStreaming(fetch("suma.wasm"));
  console.log(
    "Ejercicio 1 → Resultado de 5 + 7:",
    wasmModule.instance.exports.add(5, 7)
  );
}

// 📝 Ejercicio 2: Importar una función de JS a WASM
async function ejercicio2() {
  const imports = {
    env: {
      log_from_js: () =>
        console.log("Ejercicio 2 → 👋 Hola desde WASM usando JS!"),
    },
  };

  const wasmModule = await WebAssembly.instantiateStreaming(
    fetch("hello.wasm"),
    imports
  );
  wasmModule.instance.exports.call_js();
}

// 📝 Ejercicio 3: Compartir memoria entre WASM y JS
async function ejercicio3() {
  const memory = new WebAssembly.Memory({ initial: 1 }); // 64 KB
  const view = new Uint8Array(memory.buffer);

  view[0] = 42;
  view[1] = 99;

  console.log("Ejercicio 3 → Memoria compartida:", view[0], view[1]);
}

// 📝 Ejercicio 4: Comparar rendimiento JS vs WASM
async function ejercicio4() {
  // Factorial en JS
  function factorialJS(n) {
    return n <= 1 ? 1 : n * factorialJS(n - 1);
  }

  console.time("JS Factorial");
  console.log("Ejercicio 4 → Factorial JS(10):", factorialJS(10));
  console.timeEnd("JS Factorial");

  // Factorial en WASM
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("factorial.wasm")
  );
  console.time("WASM Factorial");
  console.log(
    "Ejercicio 4 → Factorial WASM(10):",
    instance.exports.factorial(10)
  );
  console.timeEnd("WASM Factorial");
}

// 📝 Ejercicio 5: Usar AssemblyScript
async function ejercicio5() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("mult.wasm")
  );
  console.log(
    "Ejercicio 5 → Multiplicación WASM (6 * 7):",
    instance.exports.multiply(6, 7)
  );
}

// 📝 Ejercicio 6: Caso real (procesamiento de imágenes)
async function ejercicio6() {
  const memory = new WebAssembly.Memory({ initial: 1 });
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("invert.wasm"),
    {
      env: { memory },
    }
  );

  const view = new Uint8Array(memory.buffer, 0, 4);
  view.set([0, 100, 200, 255]); // Simulación de 4 píxeles en escala de grises

  instance.exports.invert(view.byteOffset, view.length);

  console.log("Ejercicio 6 → Imagen invertida:", view); // [255, 155, 55, 0]
}

// =========================================
// 📌 Ejecutar todos los ejercicios
// =========================================
async function runAll() {
  console.log("🚀 Iniciando ejercicios de WebAssembly...\n");
  await ejercicio1();
  await ejercicio2();
  await ejercicio3();
  await ejercicio4();
  await ejercicio5();
  await ejercicio6();
  console.log("\n✅ Todos los ejercicios ejecutados.");
}

runAll();
