// 1. TC39 PROPOSALS
// Enunciado: Muestra un ejemplo de una propuesta de TC39 que ya fue aceptada en el estándar.
// Ejemplo: Array.prototype.at() permite acceder con índices negativos.
const numeros = [10, 20, 30];
console.log("Último elemento con .at():", numeros.at(-1)); // 30

// 2. STAGE PROCESS
// Enunciado: Explica el proceso de etapas que sigue una propuesta en TC39.
// Stage 0 – Idea inicial
// Stage 1 – Proposal (se documenta el problema)
// Stage 2 – Draft (borrador técnico)
// Stage 3 – Candidate (lista para implementación)
// Stage 4 – Finished (ya estándar)

// Ejemplo ficticio: Pattern Matching (en Stage 1 actualmente).
// Nota: Esto aún NO funciona en JS real, solo ejemplo conceptual.
/*
match (valor) {
  when { x: 1 } -> console.log("Uno");
  when { x: 2 } -> console.log("Dos");
}
*/
console.log("Pattern Matching está en Stage 1 (ejemplo conceptual).");

// 3. EXPERIMENTAL FEATURES
// Enunciado: Muestra cómo probar características experimentales.
// Esto se hace con Babel y plugins.
// Ejemplo (en terminal, no ejecutable en JS):
// npm install @babel/plugin-proposal-pipeline-operator
console.log(
  "Instala '@babel/plugin-proposal-pipeline-operator' para probar el operador de tuberías."
);

// 4. BACKWARDS COMPATIBILITY
// Enunciado: Demuestra cómo el código antiguo (ES5) sigue funcionando en navegadores modernos.
// Ejemplo:
var nombre = "Juan";
function saludar() {
  console.log("Hola " + nombre);
}
saludar(); // "Hola Juan"

// 5. FEATURE DETECTION
// Enunciado: Antes de usar una nueva API, verifica si está soportada.
// Ejemplo con Array.prototype.at()
if ("at" in Array.prototype) {
  console.log("Soportado:", [1, 2, 3].at(-1)); // 3
} else {
  console.log("Método .at() no soportado en este entorno.");
}

// 6. PROGRESSIVE ENHANCEMENT
// Enunciado: Usa nuevas características con fallback para no romper compatibilidad.
// Ejemplo: Nullish Coalescing Operator (??)
const miConfig = { opcion: null }; // simulamos un objeto config
// ✅ Si el operador ?? está soportado:
const valorSeguro = miConfig?.opcion ?? "valor por defecto";
console.log("Valor con progressive enhancement:", valorSeguro);

// Fallback (simulación de entorno sin ??)
const valorFallback =
  miConfig && miConfig.opcion !== undefined && miConfig.opcion !== null
    ? miConfig.opcion
    : "valor por defecto";
console.log("Valor con fallback manual:", valorFallback);
