# 5. Data Structures y Algorithms

Entender las estructuras de datos y los algoritmos es fundamental para escribir código eficiente, escalable y fácil de mantener. Cada estructura tiene casos donde brilla y casos donde es ineficiente.

## Arrays

- Definición: Lista ordenada de elementos indexados.
- Complejidad común:
  - Acceso por índice: O(1)
  - Búsqueda: O(n)
  - Inserción al final: O(1) (amortizado)
  - Inserción al inicio: O(n)

#### Ejemplo:

```javascript
let arr = [1, 2, 3];
arr.push(4); // Añadir al final
arr.unshift(0); // Añadir al inicio
```

# Linked Lists

- Definición: Conjunto de nodos donde cada nodo apunta al siguiente (o anterior si es doblemente enlazada).
- Ventajas: Inserción/eliminación en medio de la lista en O(1) (si ya tienes referencia al nodo).
- Desventajas: Acceso secuencial (O(n)).

#### Ejemplo (simplificado):

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

# Stacks (Pilas)

- LIFO: Last In, First Out.
- Operaciones:
  - push → añadir al tope.
  - pop → quitar del tope.
- Complejidad: O(1) para push/pop.

#### Ejemplo:

```javascript
let stack = [];
stack.push(1);
stack.push(2);
stack.pop(); // 2
```

## Queues (Colas)

- FIFO: First In, First Out.
- Operaciones:
  - enqueue → añadir al final.
  - dequeue → quitar del frente.
- Complejidad: O(1) para operaciones si está bien implementada.

#### Ejemplo:

```javascript
let queue = [];
queue.push(1);
queue.push(2);
queue.shift(); // 1
```

## Trees

- Definición: Estructura jerárquica con nodos (raíz, hijos, hojas).
- Usos: DOM, bases de datos, compresores.

## Binary Trees

- Cada nodo tiene máximo dos hijos.
- Binary Search Tree (BST) permite búsquedas rápidas (O(log n)) si está balanceado.

#### Ejemplo:

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
```

## Graphs

- Conjunto de nodos (vértices) conectados por aristas.
- Pueden ser dirigidos/no dirigidos, ponderados/no ponderados.
- Algoritmos comunes: BFS, DFS, Dijkstra.
- Hash Tables
  Asocia clave → valor usando funciones hash.
- Operaciones típicas: O(1) promedio.
- En JS, Map y Object funcionan como hash tables.

#### Ejemplo:

```javascript
let map = new Map();
map.set("nombre", "Ana");
map.get("nombre"); // "Ana"
```

## Sorting

- Bubble Sort: O(n²), simple pero lento.
- Merge Sort: O(n log n), estable.
- Quick Sort: O(n log n) promedio.

## Searching

- Linear Search: O(n).
- Binary Search: O(log n) en arrays ordenados.

## Heap

- Árbol binario especializado para obtener el mínimo o máximo rápidamente.
- Usos: colas de prioridad.

## Trie

- Árbol especializado en almacenar cadenas, útil para autocompletado.
- Búsqueda y almacenamiento: O(L) donde L = longitud de la palabra.

## Dynamic Programming (DP)

- Resolver problemas dividiéndolos en subproblemas y guardando resultados intermedios (memoization o tabulation).
- Ejemplo clásico: Fibonacci.

#### Ejemplo con memoization:

```javascript
let memo = {};
function fib(n) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return (memo[n] = fib(n - 1) + fib(n - 2));
}
```

## Recursion Patterns

- Función que se llama a sí misma.
- Patrones comunes:
  - Divide and Conquer (ej. Merge Sort).
  - Backtracking (ej. laberintos).
  - DFS en árboles y grafos.
