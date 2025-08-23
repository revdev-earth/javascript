/* 
Ejercicio 1: XMLHttpRequest
Enunciado: Crea una función que consulte datos desde un endpoint usando XMLHttpRequest y los imprima en consola. 
Si ocurre un error en la solicitud, muestra un mensaje adecuado.
*/
function getDataXHR(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => console.log("Respuesta:", xhr.responseText);
  xhr.onerror = () => console.error("Error en la solicitud");
  xhr.send();
}
// Uso
getDataXHR("https://jsonplaceholder.typicode.com/posts/1");

/* 
Ejercicio 2: Fetch API con async/await
Enunciado: Realiza una petición a un endpoint usando Fetch con async/await para obtener un objeto JSON y mostrarlo en consola.
*/
async function getDataFetch(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Datos:", data);
  } catch (e) {
    console.error("Error:", e);
  }
}
// Uso
getDataFetch("https://jsonplaceholder.typicode.com/users/1");

/* 
Ejercicio 3: WebSockets
Enunciado: Implementa una conexión WebSocket que envíe un mensaje al servidor y muestre en consola las respuestas recibidas.
*/
const socket = new WebSocket("wss://echo.websocket.events");
socket.onopen = () => {
  console.log("Conectado al servidor WebSocket");
  socket.send("Hola servidor desde el cliente");
};
socket.onmessage = (event) => console.log("Mensaje recibido:", event.data);

/* 
Ejercicio 4: Server-Sent Events (SSE)
Enunciado: Conéctate a un servidor de eventos SSE y muestra en consola cada mensaje recibido.
*/
function listenSSE() {
  const evtSource = new EventSource(
    "https://stream.wikimedia.org/v2/stream/recentchange"
  );
  evtSource.onmessage = (e) => console.log("Evento recibido:", e.data);
}
// Uso (se ejecuta en navegador con soporte SSE):
// listenSSE();

/* 
Ejercicio 5: WebRTC
Enunciado: Crea una conexión WebRTC que capture el video de la cámara y lo muestre en un elemento <video>.
*/
async function startWebRTC() {
  const pc = new RTCPeerConnection();
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  stream.getTracks().forEach((track) => pc.addTrack(track, stream));
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  document.body.appendChild(videoElement);
  videoElement.srcObject = stream;
}
// Uso (solo en navegador con cámara):
// startWebRTC();

/* 
Ejercicio 6: Streaming con Fetch
Enunciado: Realiza una petición fetch que lea un recurso en streaming y vaya mostrando el contenido recibido por fragmentos en consola.
*/
async function streamData(url) {
  const res = await fetch(url);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let result;
  while (!(result = await reader.read()).done) {
    console.log("Fragmento recibido:", decoder.decode(result.value));
  }
}
// Uso (ejemplo con texto grande):
// streamData("https://jsonplaceholder.typicode.com/posts");

/* 
Ejercicio 7: Manejo de errores en Fetch
Enunciado: Implementa una función que haga una solicitud con Fetch y maneje correctamente tanto errores de red como respuestas HTTP no exitosas.
*/
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    const data = await res.json();
    console.log("Datos recibidos:", data);
  } catch (err) {
    console.error("Error de red:", err);
  }
}
// Uso
safeFetch("https://jsonplaceholder.typicode.com/invalid-endpoint");
