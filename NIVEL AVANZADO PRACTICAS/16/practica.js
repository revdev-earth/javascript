// Ejercicio 1: Web Worker
// Enunciado: Crea un Web Worker que reciba un número, lo multiplique por 2 y devuelva el resultado al hilo principal.
// worker.js
self.onmessage = (e) => {
  const result = e.data * 2;
  self.postMessage(result);
};
// main.js
const worker = new Worker("worker.js");
worker.onmessage = (e) => console.log("Resultado del worker:", e.data);
worker.postMessage(10);

// Ejercicio 2: Service Worker
// Enunciado: Registra un Service Worker que guarde en caché el archivo "index.html" y "style.css" durante la instalación para que la aplicación funcione sin conexión.
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("v1")
      .then((cache) => cache.addAll(["/index.html", "/style.css"]))
  );
});

// Ejercicio 3: Shared Worker
// Enunciado: Crea un Shared Worker que permita a varias pestañas enviar mensajes y recibir una respuesta compartida.
self.onconnect = (e) => {
  const port = e.ports[0];
  port.onmessage = (msg) =>
    port.postMessage(`Mensaje recibido en Shared Worker: ${msg.data}`);
};

// Ejercicio 4: Worker Threads en Node.js
// Enunciado: Implementa un Worker Thread en Node.js que reciba un número y lo multiplique por 3.
// worker.js
const { parentPort } = require("worker_threads");
parentPort.on("message", (num) => {
  parentPort.postMessage(num * 3);
});
// main.js
const { Worker } = require("worker_threads");
const workerNode = new Worker("./worker.js");
workerNode.on("message", (result) =>
  console.log("Resultado en Node.js:", result)
);
workerNode.postMessage(7);

// Ejercicio 5: Message Passing
// Enunciado: Envía un objeto JSON desde el hilo principal a un worker y recibe la confirmación de que el mensaje fue procesado.
// worker.js
self.onmessage = (e) => {
  const data = e.data;
  self.postMessage({ status: "ok", recibido: data });
};
// main.js
const workerMsg = new Worker("worker.js");
workerMsg.onmessage = (e) => console.log("Respuesta del worker:", e.data);
workerMsg.postMessage({ tarea: "procesar", valor: 42 });

// Ejercicio 6: Transferable Objects
// Enunciado: Envía un ArrayBuffer a un Web Worker utilizando objetos transferibles para evitar duplicación de memoria.
// worker.js
self.onmessage = (e) => {
  const buffer = e.data;
  self.postMessage(`Buffer recibido con tamaño: ${buffer.byteLength}`);
};
// main.js
const workerBuffer = new Worker("worker.js");
workerBuffer.onmessage = (e) => console.log(e.data);
const buffer = new ArrayBuffer(2048);
workerBuffer.postMessage(buffer, [buffer]);

// Ejercicio 7: Performance Considerations
// Enunciado: Crea un pool de workers que ejecute cálculos paralelos en base al número de núcleos de CPU disponibles.
const numCPUs = navigator.hardwareConcurrency || 4;
const workers = [];
for (let i = 0; i < numCPUs; i++) {
  const w = new Worker("worker.js");
  workers.push(w);
  w.onmessage = (e) => console.log(`Worker ${i} resultado:`, e.data);
  w.postMessage(i + 1);
}
