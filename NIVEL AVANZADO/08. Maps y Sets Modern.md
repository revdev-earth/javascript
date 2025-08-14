# 8. Maps y Sets Modern

En JavaScript, Map, Set, WeakMap y WeakSet son estructuras de datos modernas que ofrecen mayor flexibilidad que Object y Array en ciertos casos.

## Map vs Object

| Característica  | Map                                                             | Object                                  |
| --------------- | --------------------------------------------------------------- | --------------------------------------- |
| Claves          | Cualquier tipo (objeto, número, string, etc.)                   | Solo strings y símbolos                 |
| Orden de claves | Mantiene el orden de inserción                                  | No garantiza orden                      |
| Tamaño          | map.size directo                                                | Object.keys(obj).length                 |
| Iteración       | Fácil (for...of)                                                | Necesita Object.keys() o similar        |
| Performance     | Más rápido para operaciones frecuentes de inserción/eliminación | Mejor para acceso estático y datos JSON |

### Ejemplo:

```javascript
const mapa = new Map();
mapa.set("nombre", "Ana");
mapa.set({ id: 1 }, "Objeto como clave");

console.log(mapa.get("nombre")); // Ana
```

### Set Operations

Set es una colección de valores únicos.

```javascript
const conjunto = new Set([1, 2, 2, 3]);
console.log(conjunto); // Set { 1, 2, 3 }

// Operaciones comunes
conjunto.add(4);
conjunto.delete(2);
console.log(conjunto.has(3)); // true
```

Operaciones de conjunto:

```javascript
const a = new Set([1, 2, 3]);
const b = new Set([3, 4]);

// Unión
const union = new Set([...a, ...b]); // {1, 2, 3, 4}

// Intersección
const inter = new Set([...a].filter((x) => b.has(x))); // {3}

// Diferencia
const diff = new Set([...a].filter((x) => !b.has(x))); // {1, 2}
```

## WeakMap

- Solo acepta objetos como claves.
- No previene que los objetos clave sean recolectados por el garbage collector si no hay más referencias.
- No se puede iterar directamente.

```javascript
let obj = { nombre: "Pedro" };
const wm = new WeakMap();
wm.set(obj, "Valor secreto");

console.log(wm.get(obj)); // Valor secreto

obj = null; // El objeto puede ser recolectado automáticamente
```

# WeakSet

- Solo almacena objetos.
- No almacena duplicados.
- También permite recolección automática de memoria.

```javascript
let user = { id: 1 };
const ws = new WeakSet();
ws.add(user);

console.log(ws.has(user)); // true

user = null; // Puede ser recolectado por GC
```

# Memory Management

- WeakMap y WeakSet son ideales para asociar datos temporales a objetos sin riesgo de fugas de memoria.
- Map y Set mantienen referencias fuertes, por lo que los datos permanecen hasta que se eliminen manualmente.

# Performance Comparisons

- Map: Más rápido que Object para inserciones y eliminaciones repetidas.
- Set: Más eficiente que Array para búsquedas de existencia (.has() es O(1)).

- WeakMap/WeakSet: No tienen métodos de iteración, pero son más seguros para casos donde el ciclo de vida del dato depende del objeto.

# Use Cases

✅ Map

- Cache de datos con claves complejas.
- Conteo de ocurrencias.
- Tablas de configuración.

✅ Set

- Eliminar duplicados de un array.
- Operaciones matemáticas de conjuntos.
- Control rápido de existencia de elementos.

✅ WeakMap

- Almacenar información privada asociada a un objeto.
- Metadata temporal que no debe bloquear el garbage collector.

✅ WeakSet

- Registrar objetos procesados.
- Evitar duplicación de instancias.
