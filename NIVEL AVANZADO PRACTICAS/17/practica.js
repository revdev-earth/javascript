/*******************************************************
 * 17. Binary Data Handling - Ejercicios en JavaScript
 *******************************************************/

/**
 * Ejercicio 1: ArrayBuffer
 * Crea un ArrayBuffer de 16 bytes, guárdalo en una variable
 * y muestra su tamaño en consola.
 */
console.log("=== Ejercicio 1: ArrayBuffer ===");
const buffer1 = new ArrayBuffer(16);
console.log("Tamaño del buffer:", buffer1.byteLength); // 16

/**
 * Ejercicio 2: TypedArrays
 * Crea un ArrayBuffer de 8 bytes.
 * Usa un Int16Array para escribir 2 valores y muéstralos.
 */
console.log("\n=== Ejercicio 2: TypedArrays ===");
const buffer2 = new ArrayBuffer(8);
const view2 = new Int16Array(buffer2);
view2[0] = 12345;
view2[1] = -12345;
console.log("Contenido del Int16Array:", view2);

/**
 * Ejercicio 3: DataView
 * Escribe el número 500 en formato little-endian dentro de un buffer.
 * Luego recupéralo con DataView.
 */
console.log("\n=== Ejercicio 3: DataView ===");
const buffer3 = new ArrayBuffer(4);
const view3 = new DataView(buffer3);
view3.setUint16(0, 500, true); // Little-endian
console.log("Valor leído con DataView:", view3.getUint16(0, true)); // 500

/**
 * Ejercicio 4: Blob
 * Crea un Blob con el texto "Hola JS Binario" y muestra su tamaño.
 */
console.log("\n=== Ejercicio 4: Blob ===");
const blob = new Blob(["Hola JS Binario"], { type: "text/plain" });
console.log("Blob size:", blob.size, "bytes");
console.log("Blob type:", blob.type);

/**
 * Ejercicio 5: File API
 * Simula un archivo a partir de un Blob y muestra su nombre y tamaño.
 * (En navegador real se usaría <input type="file">).
 */
console.log("\n=== Ejercicio 5: File API ===");
const file = new File(["Contenido del archivo"], "demo.txt", {
  type: "text/plain",
});
console.log("Nombre:", file.name, "| Tamaño:", file.size, "bytes");

/**
 * Ejercicio 6: FileReader
 * Lee el contenido de un Blob como texto usando FileReader.
 */
console.log("\n=== Ejercicio 6: FileReader ===");
const reader = new FileReader();
reader.onload = (e) => console.log("Contenido leído:", e.target.result);
reader.readAsText(new Blob(["Esto es un test"]));

/**
 * Ejercicio 7: Streams
 * Usa fetch con Streams para leer parcialmente un recurso binario.
 * (En entorno navegador con servidor, aquí solo ejemplo).
 */
console.log("\n=== Ejercicio 7: Streams ===");
async function leerStream() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const reader = response.body.getReader();
  const { value, done } = await reader.read();
  if (!done) {
    console.log("Chunk recibido (bytes):", value.length);
  }
}
// Nota: ejecutar en navegador, aquí solo demostración
// leerStream();

/**
 * Ejercicio 8: Binary Operations
 * Usa operaciones a nivel de bit para combinar dos valores.
 */
console.log("\n=== Ejercicio 8: Binary Operations ===");
let a = 5; // 0101
let b = 3; // 0011
console.log("a & b:", a & b); // 1 (0001)
console.log("a | b:", a | b); // 7 (0111)
console.log("a ^ b:", a ^ b); // 6 (0110)
console.log("~a:", ~a); // -6 (complemento a 1)
console.log("a << 1:", a << 1); // 10 (1010)
console.log("a >> 1:", a >> 1); // 2 (0010)
