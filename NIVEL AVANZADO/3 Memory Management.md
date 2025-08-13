# 3. Memory Management

En JavaScript, la gestión de memoria es automática gracias al garbage collector (GC), pero entender cómo funciona ayuda a optimizar rendimiento y evitar fugas de memoria.

## Heap vs Stack Memory

- Stack → Memoria para variables de tamaño fijo y control de llamadas de funciones.
- Heap → Memoria para objetos, arrays y datos dinámicos.

### Ejemplo:

```javascript
function ejemplo() {
  let x = 42; // Stack
  let obj = { nombre: "Nico" }; // Referencia en Stack, objeto en Heap
}
```

## Garbage Collection Algorithms

El garbage collector libera memoria eliminando objetos que ya no son accesibles.

### Algoritmos comunes en V8:

1. Mark-and-Sweep
   - Marca objetos alcanzables.
   - Elimina los no marcados.
2. Generational GC
   - New space: objetos jóvenes, recolección frecuente.
   - Old space: objetos viejos, recolección menos frecuente.
3. Incremental y Concurrent GC

Divide el trabajo para evitar pausas largas en la ejecución.

## Memory Leaks (Fugas de Memoria)

Suceden cuando se mantiene una referencia a un objeto que ya no necesitamos.

### Ejemplos comunes:

1. Variables globales no liberadas:

```javascript
window.miArray = []; // Nunca se libera
```

2. Listeners no removidos:

```javascript
element.addEventListener("click", handler);
// Si no haces element.removeEventListener, puede quedarse en memoria
```

3. Caches infinitas:

```javascript
let cache = {};
function guardar(key, valor) {
  cache[key] = valor; // Crece indefinidamente
}
```

## Weak References

Permiten referenciar un objeto sin evitar que el GC lo elimine.

### Ejemplo con WeakMap:

```javascript
let wm = new WeakMap();
let obj = { nombre: "dato" };

wm.set(obj, "valor");

obj = null; // Ahora el GC puede liberar la memoria
```

Ventaja: no previenen la recolección de basura.

## Profiling Tools

Para analizar y depurar el uso de memoria:

- Chrome DevTools → pestaña Memory.
- Node.js → --inspect + Chrome DevTools.
- heapdump (Node.js) para capturar y analizar el heap.

## Optimization Techniques

Liberar referencias:

```javascript
obj = null; // Permite que GC lo elimine
```

1. Evitar variables globales.
2. Reutilizar estructuras cuando sea posible.
3. Usar WeakMap / WeakSet para datos temporales.
4. Perfilar antes de optimizar (no optimizar a ciegas).

📌 Resumen visual:

Stack → datos simples y control de ejecución.

Heap → datos complejos y dinámicos.

GC → automático, pero sensible a patrones de código.

Leaks → causan crecimiento de memoria no deseado.

Herramientas → DevTools, heapdump.

Optimización → liberar, evitar globales, usar referencias débiles.
