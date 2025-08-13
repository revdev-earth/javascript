# 4. Performance Complete

Optimizar rendimiento no significa escribir código “mágicamente más rápido” desde el inicio, sino medir, detectar cuellos de botella y aplicar estrategias específicas.

## Optimization Strategies

1. Optimizar el algoritmo antes que el código
   - Un algoritmo O(n log n) casi siempre superará a uno O(n²), sin importar microoptimizaciones.
2. Evitar trabajo innecesario
   - #### Ejemplo: no recalcular resultados si no han cambiado (memoization).
3. Minimizar el acceso al DOM

```javascript
// ❌ Ineficiente: múltiples reflows
for (let i = 0; i < 1000; i++) {
  document.body.innerHTML += `<p>${i}</p>`;
}

// ✅ Mejor: usar fragmentos
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(document.createElement("p")).textContent = i;
}
document.body.appendChild(fragment);
```

4. Uso eficiente de estructuras de datos

- Map/Set para búsquedas rápidas.
- TypedArrays para datos numéricos masivos.

## Measurement Tools

- Chrome DevTools → pestaña Performance.
- Lighthouse → auditoría de rendimiento en web.
- WebPageTest → análisis de velocidad de carga.
- Node.js: --prof, clinic.js.

## Profiling

El profiling consiste en analizar cómo se distribuye el tiempo de ejecución en diferentes partes del código.

En Chrome DevTools:

1. Abrir Performance.
2. Iniciar grabación.
3. Interactuar con la app.
4. Parar grabación y revisar:
   - Llamadas costosas.
   - Tiempo de renderizado.
   - Bloqueos de UI.

## Benchmarking

Proceso para comparar rendimiento de diferentes implementaciones.

#### Ejemplo:

```javascript
console.time("Método 1");
for (let i = 0; i < 1e6; i++) {}
console.timeEnd("Método 1");

console.time("Método 2");
Array.from({ length: 1e6 }).forEach(() => {});
console.timeEnd("Método 2");
```

## Bottleneck Identification

- Buscar funciones “hot”: ejecutadas miles de veces.
- Identificar operaciones sin valor agregado.
- Revisar el Main Thread en DevTools para encontrar bloqueos.

## Code Splitting

Dividir el código en chunks para que el navegador cargue solo lo necesario.

Ejemplo con Webpack:

```javascript
// Carga diferida de un módulo
import("./moduloPesado.js").then((module) => {
  module.ejecutar();
});
```

Lazy Loading
Carga recursos solo cuando son necesarios:

Imágenes fuera de pantalla → loading="lazy".

Componentes bajo demanda → dynamic import.

Ejemplo de imagen:

html

```
<img src="imagen.jpg" loading="lazy" alt="Ejemplo">
```

📌 Checklist rápido de optimización web:

- Algoritmos eficientes.
- Menos reflows/repaints.
- Uso de cache y memoization.
- Carga diferida de módulos e imágenes.
- Medición constante con DevTools/Lighthouse.
