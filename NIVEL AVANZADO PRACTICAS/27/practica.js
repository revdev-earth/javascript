/*******************************************************
 * 📌 EJERCICIOS: Streaming y Large Data Processing en JavaScript
 *******************************************************/

/**
 * EJERCICIO 1: Lectura básica con ReadableStream
 *
 * Enunciado:
 * Haz una petición fetch a un archivo grande y léelo con un `ReadableStream`.
 * Imprime el primer chunk recibido en consola.
 */
console.log("=== EJERCICIO 1: ReadableStream ===");

async function ejercicio1() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const reader = response.body.getReader();

  const { value, done } = await reader.read();
  console.log("¿Lectura terminada?:", done);
  console.log("Primer chunk recibido (Uint8Array):", value);
}
ejercicio1();

/**
 * EJERCICIO 2: Escritura con WritableStream
 *
 * Enunciado:
 * Crea un `WritableStream` que reciba chunks de texto y los imprima.
 * Simula enviar tres mensajes como si fueran datos entrantes.
 */
console.log("\n=== EJERCICIO 2: WritableStream ===");

async function ejercicio2() {
  const writable = new WritableStream({
    write(chunk) {
      console.log("Chunk recibido:", chunk);
    },
  });

  const writer = writable.getWriter();
  await writer.write("Hola");
  await writer.write("Mundo");
  await writer.write("Streaming en acción");
  writer.close();
}
ejercicio2();

/**
 * EJERCICIO 3: TransformStream (mayúsculas)
 *
 * Enunciado:
 * Crea un `TransformStream` que convierta los datos entrantes en mayúsculas.
 * Conéctalo a un Readable y un Writable.
 */
console.log("\n=== EJERCICIO 3: TransformStream ===");

async function ejercicio3() {
  const upperCaseTransform = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk.toUpperCase());
    },
  });

  // Readable artificial
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue("hola ");
      controller.enqueue("streaming ");
      controller.enqueue("js");
      controller.close();
    },
  });

  // Writable que imprime
  const writable = new WritableStream({
    write(chunk) {
      console.log("Transformado:", chunk);
    },
  });

  // Encadenamos flujo: Readable -> Transform -> Writable
  await readable.pipeThrough(upperCaseTransform).pipeTo(writable);
}
ejercicio3();

/**
 * EJERCICIO 4: Backpressure (control de flujo)
 *
 * Enunciado:
 * Simula un productor que genera datos rápidamente y un consumidor lento.
 * Usa `setTimeout` para mostrar cómo el stream aplica backpressure
 * (no satura la memoria y espera a que el consumidor procese).
 */
console.log("\n=== EJERCICIO 4: Backpressure ===");

async function ejercicio4() {
  const readable = new ReadableStream({
    async start(controller) {
      for (let i = 1; i <= 5; i++) {
        controller.enqueue(`Dato ${i}`);
        console.log("📤 Productor envió:", `Dato ${i}`);
        await new Promise((res) => setTimeout(res, 100)); // simula productor rápido
      }
      controller.close();
    },
  });

  const writable = new WritableStream({
    async write(chunk) {
      console.log("📥 Consumidor procesando:", chunk);
      await new Promise((res) => setTimeout(res, 500)); // consumidor lento
    },
  });

  await readable.pipeTo(writable);
}
ejercicio4();

/**
 * EJERCICIO 5: Procesamiento por chunks (Chunked Processing)
 *
 * Enunciado:
 * Descarga un archivo de texto grande y procésalo línea por línea en chunks.
 * Usa `TextDecoderStream` para decodificar los bytes a texto.
 */
console.log("\n=== EJERCICIO 5: Chunked Processing ===");

async function ejercicio5() {
  const res = await fetch("https://www.w3.org/TR/PNG/iso_8859-1.txt");

  const stream = res.body
    .pipeThrough(new TextDecoderStream()) // convierte bytes a texto
    .pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          const lines = chunk.split("\n");
          lines.forEach((line) => controller.enqueue(line));
        },
      })
    );

  const reader = stream.getReader();
  let count = 0;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    console.log("Línea:", value);
    count++;
    if (count > 5) break; // solo mostrar 5 líneas
  }
}
ejercicio5();
