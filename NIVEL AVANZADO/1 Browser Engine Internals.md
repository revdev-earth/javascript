# 1. Browser Engine Internals

## V8 Architecture

El motor V8 está compuesto por varios módulos que trabajan en cadena para procesar y ejecutar JavaScript:

- Parser → Convierte el texto en un AST (Abstract Syntax Tree).
- Ignition → Interpreta el bytecode.
- TurboFan → Compila y optimiza el código “caliente” a código máquina.
- Garbage Collector → Administra la memoria.

### Ejemplo simple de entrada a V8:

```javascript
function saludar(nombre) {
  return "Hola " + nombre;
}
console.log(saludar("Nico"));
```

En V8, este código pasará por parsing, compilación, posible optimización y recolección de memoria cuando las variables dejen de usarse.

## Parsing

El proceso de parsing tiene dos pasos:

1. Tokenización → Rompe el código en unidades (tokens).
   Ejemplo para:

```javascript
let x = 5;
```

Tokens: let | x | = | 5 | ;

2. AST (Abstract Syntax Tree) → Organiza los tokens en un árbol jerárquico.
   Ejemplo visual simplificado:

```yaml
VariableDeclaration
  ├─ Identifier: x
  └─ Literal: 5
```

## Compilation

Después del parsing, el AST se convierte en bytecode que ejecuta Ignition.

Ejemplo:
Código original:

```javascript
let x = 10;
let y = x * 2;
```

V8 lo traduce a instrucciones bytecode internas (no visibles directamente), que son más rápidas de ejecutar que el texto original.

## Optimization (TurboFan)

Cuando un código se ejecuta muchas veces, V8 lo optimiza:

Ejemplo:

```javascript
function suma(a, b) {
  return a + b;
}

for (let i = 0; i < 1_000_000; i++) {
  suma(2, 3);
}
```

Aquí, TurboFan detecta que suma siempre recibe números y genera código máquina especializado para esa operación, eliminando comprobaciones innecesarias.

## Deoptimization

Si las suposiciones cambian, V8 revierte a una versión menos optimizada.

Ejemplo:

```javascript
function suma(a, b) {
  return a + b;
}

suma(2, 3); // Optimizado
suma("2", 3); // Causa deoptimización
```

El segundo caso cambia el tipo de a y V8 debe añadir de nuevo comprobaciones de tipo, perdiendo rendimiento.

## Garbage Collection (GC)

V8 usa un recolector generacional:

- New space → Objetos recién creados (recolección frecuente).
- Old space → Objetos de larga vida (recolección más espaciada).

Ejemplo:

```javascript
function crearArray() {
  return new Array(1000).fill("dato");
}

let datos = crearArray(); // Vive en Old space si se mantiene
```

Cuando datos deja de usarse, el GC lo limpia automáticamente.

## Memory Layout

En V8, la memoria se organiza así:

- Stack → Variables locales y control de funciones.
- Heap → Objetos, arrays y funciones.
- Code space → Código máquina generado por el JIT.

Ejemplo visual:

| Región     | Contenido                      |
| ---------- | ------------------------------ |
| Stack      | Variables primitivas, punteros |
| Heap       | Objetos {}, arrays []          |
| Code space | Código optimizado              |

## JIT Compilation

Just-In-Time significa que el código se compila a máquina justo antes de ejecutarse, y puede reoptimizarse en tiempo real.

Ejemplo:

```javascript
function multiplicar(a, b) {
  return a * b;
}

for (let i = 0; i < 1_000_000; i++) {
  multiplicar(5, 10);
}
```

Primera ejecución → Interpretado por Ignition.

Después de miles de ejecuciones → TurboFan genera código máquina optimizado.
