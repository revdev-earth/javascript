/*****************************************************
 * 6. Emerging Technologies Integration
 * Integrar tecnologías emergentes en JavaScript requiere
 * entender las APIs disponibles, los frameworks adecuados
 * y cómo optimizar su uso en producción.
 *****************************************************/

/* 
=====================================================
1. AI/ML en JavaScript
Con librerías como TensorFlow.js o Brain.js, puedes ejecutar 
modelos de machine learning directamente en el navegador o 
en Node.js.

Ejemplo – Clasificación de imágenes con TensorFlow.js
=====================================================
*/

// import * as tf from "@tensorflow/tfjs";
// import * as mobilenet from "@tensorflow-models/mobilenet";

// async function clasificarImagen(imgElement) {
//   const modelo = await mobilenet.load();
//   const predicciones = await modelo.classify(imgElement);
//   console.log(predicciones);
// }

// Uso en navegador:
// clasificarImagen(document.getElementById("miImagen"));

/* 
=====================================================
2. Blockchain Development
JavaScript es clave en blockchain gracias a librerías como 
web3.js o ethers.js para interactuar con smart contracts en 
Ethereum u otras redes.

Ejemplo – Consultar saldo de una wallet
=====================================================
*/

// import { ethers } from "ethers";

// const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/TU_API_KEY");
// const address = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

// async function obtenerSaldo() {
//   const balance = await provider.getBalance(address);
//   console.log(ethers.formatEther(balance) + " ETH");
// }

// obtenerSaldo();

/* 
=====================================================
3. IoT Applications
Con Johnny-Five (Node.js + Arduino) o Node-RED, 
JavaScript se conecta al mundo físico.

Ejemplo – Encender un LED con Johnny-Five
=====================================================
*/

// const { Board, Led } = require("johnny-five");
// const board = new Board();

// board.on("ready", () => {
//   const led = new Led(13);
//   led.blink(500); // parpadea cada 500ms
// });

/* 
=====================================================
4. AR/VR Web Development
Gracias a WebXR API y librerías como three.js, 
puedes crear experiencias inmersivas sin plugins.

Ejemplo – Escena 3D con Three.js
=====================================================
*/

// import * as THREE from "three";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;
// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
// animate();

/* 
=====================================================
5. Edge Computing
JavaScript en el borde de la red (edge) con plataformas 
como Cloudflare Workers o Vercel Edge Functions 
permite baja latencia.

Ejemplo – Cloudflare Worker
=====================================================
*/

// export default {
//   async fetch(request) {
//     return new Response("Hola desde el edge", { status: 200 });
//   },
// };

/* 
=====================================================
6. Serverless Functions
Ejecución bajo demanda con AWS Lambda, Netlify Functions 
o Vercel Functions.

Ejemplo – API serverless en Vercel (api/saludo.js)
=====================================================
*/

// export default function handler(req, res) {
//   res.status(200).json({ mensaje: "Hola desde serverless" });
// }

/*****************************************************
 * Conclusión:
 * JavaScript no es solo web:
 * - Puede entrenar e inferir IA en el navegador.
 * - Controlar dispositivos físicos (IoT).
 * - Interactuar con blockchains de forma segura.
 * - Crear experiencias inmersivas con AR/VR.
 * - Ejecutarse en el edge o bajo demanda sin servidores tradicionales.
 *****************************************************/
