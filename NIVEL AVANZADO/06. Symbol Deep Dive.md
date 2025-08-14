# 6. Symbol Deep Dive

Symbol es un tipo de dato primitivo en JavaScript introducido en ES6.
Se usa para crear identificadores únicos que no colisionan con otros nombres de propiedad, incluso si tienen el mismo valor.

## Symbol Creation

- Se crean con el constructor Symbol().
- Cada Symbol() es único, aunque tengan la misma descripción.

```javascript
const sym1 = Symbol("id");
const sym2 = Symbol("id");

console.log(sym1 === sym2); // false
```

# Global Registry

Symbol.for(key) busca o crea un símbolo global con esa clave.

Symbol.keyFor(sym) devuelve la clave asociada.

```javascript
const globalSym1 = Symbol.for("app.version");
const globalSym2 = Symbol.for("app.version");

console.log(globalSym1 === globalSym2); // true
console.log(Symbol.keyFor(globalSym1)); // "app.version"
```

## Well-Known Symbols

JavaScript define símbolos predefinidos que cambian el comportamiento de objetos.

#### Ejemplos:

- Symbol.iterator → Iteración personalizada.
- Symbol.toStringTag → Etiqueta de tipo en Object.prototype.toString.
- Symbol.hasInstance → Controla instanceof.

```javascript
class MiColeccion {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}

for (let val of new MiColeccion()) {
  console.log(val); // 1, 2, 3
}
```

## Private Properties

Los símbolos permiten crear propiedades "ocultas" que no aparecen en for...in o Object.keys.

```javascript
const _id = Symbol("id");

class Usuario {
  constructor(nombre) {
    this.nombre = nombre;
    this[_id] = Math.random();
  }
}

const u = new Usuario("Ana");
console.log(Object.keys(u)); // ["nombre"]
console.log(u[_id]); // acceso directo solo si tienes el símbolo
```

## Symbol-Keyed Properties

- Las propiedades con símbolos como clave no interfieren con otras propiedades de objeto.
- Se acceden con Object.getOwnPropertySymbols(obj).

```javascript
const secret = Symbol("secret");
let obj = {
  [secret]: "clave oculta",
  visible: "clave pública",
};

console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(secret) ]
```

## Metaprogramming Applications

- Personalizar comportamiento interno de objetos y clases.
- #### Ejemplos:
  - Symbol.iterator → iteradores.
  - Symbol.asyncIterator → iteradores asíncronos.
  - Symbol.toPrimitive → conversión personalizada a primitivo.

```javascript
let cuenta = {
  saldo: 1000,
  [Symbol.toPrimitive](hint) {
    return hint === "string" ? `Saldo: ${this.saldo}` : this.saldo;
  },
};

console.log(`${cuenta}`); // "Saldo: 1000"
console.log(+cuenta); // 1000
```
