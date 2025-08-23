/* 
Ejercicio 1: Performance Profiling
Mide cuánto tarda tu aplicación en cargar, renderizar y ejecutar código.
Usa console.time y console.timeEnd para calcular la duración de un proceso.
*/
console.time("carga-pagina");
// Simulación de trabajo pesado
for (let i = 0; i < 1e7; i++) {}
console.timeEnd("carga-pagina");
// 📌 Abre Performance en DevTools, graba la ejecución y analiza el timeline.

/* 
Ejercicio 2: Memory Analysis
Encuentra fugas de memoria (memory leaks) creando objetos que nunca se liberan.
Usa el panel Memory en DevTools para tomar Heap Snapshots y comparar.
*/
let fuga = [];
function crearFuga() {
  fuga.push(new Array(1_000_000).fill("💾"));
}
setInterval(crearFuga, 1000);
// 📌 En DevTools: Memory → "Take Heap Snapshot" antes y después.

/* 
Ejercicio 3: Network Debugging
Depura solicitudes y analiza tiempos de carga con fetch.
Inspecciona en el panel Network los headers y la respuesta.
*/
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((r) => r.json())
  .then(console.log);
// 📌 En DevTools → Network → Filtra por XHR → Revisa Headers y Response.

/* 
Ejercicio 4: Source Maps
Permiten depurar código TypeScript o minificado viendo el archivo original.
*/
const config = {
  devtool: "source-map", // configuración típica en Webpack
};
console.log("Ejemplo de source map activo");
// 📌 En DevTools, verás el archivo minificado enlazado al original.

/* 
Ejercicio 5: Breakpoint Strategies
Usa breakpoints condicionales en DevTools para detener ejecución solo bajo condiciones.
*/
function calcular(x) {
  return x > 5 ? "grande" : "pequeño";
}
calcular(6);
// 📌 En DevTools, pon un breakpoint condicional en return con "x > 5".

/* 
Ejercicio 6: Custom DevTools Extensions
Crea paneles personalizados en DevTools usando un manifest.json.
*/
const extensionManifest = {
  name: "MiPanel",
  version: "1.0",
  manifest_version: 3,
  devtools_page: "panel.html",
};
console.log("Ejemplo de manifest para DevTools Extension:", extensionManifest);
// 📌 Esto agrega un nuevo panel en DevTools con lógica personalizada.

/* 
Ejercicio 7: Lighthouse Auditing
Audita el rendimiento, accesibilidad y SEO de tu app desde DevTools con Lighthouse.
*/
function cargarImagenPesada() {
  const img = document.createElement("img");
  img.src = "https://via.placeholder.com/3000"; // Imagen grande
  document.body.appendChild(img);
}
cargarImagenPesada();
// 📌 En DevTools: Lighthouse → Selecciona "Performance + Mobile" → Ejecuta auditoría.

/* 
Ejercicio 8: Coverage Analysis
Mide cuánto CSS y JS realmente está en uso en tu página.
*/
document.body.innerHTML = `
  <button class="button">Click</button>
  <div class="hidden">No visible</div>
`;
// 📌 En DevTools: Ctrl+Shift+P → "Show Coverage" → Verás qué CSS y JS se usan o no.

/* 
Ejercicio 9: Heap Snapshots
Compara el estado de memoria antes y después de una acción.
*/
let cache = [];
document.body.innerHTML += `<button id="boton">Agregar al cache</button>`;
document.querySelector("#boton").addEventListener("click", () => {
  cache.push(new Array(1_000_000).fill("🔍"));
  console.log("Cache size:", cache.length);
});
// 📌 En DevTools: toma un Heap Snapshot antes y después de hacer clic.
