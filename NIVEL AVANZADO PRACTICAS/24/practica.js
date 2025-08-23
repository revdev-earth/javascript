// ===============================
// Ejercicio 1: CSS Animations from JS
// Enunciado: Crea una animación con @keyframes en CSS que haga aparecer un elemento (fade in)
// y actívala desde JavaScript añadiendo una clase. Además, modifica la duración de la animación desde JS.
// ===============================

const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.fade {
  animation: fadeIn 2s ease-in forwards;
}`;
document.head.appendChild(style);

const divFade = document.createElement("div");
divFade.textContent = "Animación Fade In";
divFade.style.opacity = 0;
document.body.appendChild(divFade);

setTimeout(() => {
  divFade.classList.add("fade");
  document.documentElement.style.setProperty("--anim-duration", "2s");
}, 1000);

// ===============================
// Ejercicio 2: Canvas API
// Enunciado: Dibuja un cuadrado rojo y un círculo azul en un <canvas> usando la API 2D.
// ===============================

const canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 200;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// cuadrado rojo
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 100);

// círculo azul
ctx.beginPath();
ctx.arc(200, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "blue";
ctx.fill();

// ===============================
// Ejercicio 3: WebGL Basics
// Enunciado: Inicializa un contexto WebGL en un canvas y valida si está soportado por el navegador.
// ===============================

const canvasWebGL = document.createElement("canvas");
canvasWebGL.width = 300;
canvasWebGL.height = 200;
document.body.appendChild(canvasWebGL);

const gl = canvasWebGL.getContext("webgl");
if (!gl) {
  console.error("WebGL no soportado en este navegador");
} else {
  console.log("✅ WebGL inicializado correctamente");
}

// ===============================
// Ejercicio 4: requestAnimationFrame
// Enunciado: Crea una animación donde un cuadrado se mueva horizontalmente en un canvas usando requestAnimationFrame.
// ===============================

let posX = 0;
function animarCuadrado() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(posX, 150, 50, 50);
  posX += 2;
  if (posX < canvas.width) {
    requestAnimationFrame(animarCuadrado);
  }
}
animarCuadrado();

// ===============================
// Ejercicio 5: Performance Optimization
// Enunciado: Implementa una animación de un cuadrado que solo usa transform (propiedad GPU-friendly)
// para optimizar el rendimiento.
// ===============================

const box = document.createElement("div");
box.className = "box";
box.style.width = "50px";
box.style.height = "50px";
box.style.background = "purple";
box.style.position = "absolute";
box.style.top = "300px";
document.body.appendChild(box);

let pos = 0;
function moverBox() {
  box.style.transform = `translateX(${pos}px)`;
  pos += 3;
  if (pos < 300) requestAnimationFrame(moverBox);
}
moverBox();

// ===============================
// Ejercicio 6: Graphics Libraries Integration
// Enunciado: Usa la librería GSAP para mover un cuadro naranja 200px a la derecha en 2 segundos.
// ===============================

// Nota: Este ejemplo requiere tener GSAP cargado en el entorno.
const boxGSAP = document.createElement("div");
boxGSAP.className = "box";
boxGSAP.style.width = "50px";
boxGSAP.style.height = "50px";
boxGSAP.style.background = "orange";
boxGSAP.style.position = "absolute";
boxGSAP.style.top = "400px";
document.body.appendChild(boxGSAP);

// Si GSAP está disponible en el entorno:
if (typeof gsap !== "undefined") {
  gsap.to(boxGSAP, {
    x: 200,
    duration: 2,
    ease: "power1.inOut",
  });
} else {
  console.warn(
    "GSAP no está cargado en este entorno. Incluye la librería para ver el efecto."
  );
}
