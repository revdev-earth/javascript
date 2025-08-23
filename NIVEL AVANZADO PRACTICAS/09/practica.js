/**************************************************************
 * 🧩 EJERCICIOS — Proxy y Metaprogramming en JavaScript
 **************************************************************/

/**
 * Ejercicio 1: Proxy básico con `get`
 *
 * Crea un objeto `persona` con propiedades `nombre` y `edad`.
 * Usa un Proxy para que, si intentas acceder a una propiedad
 * que no existe, devuelva:
 * 👉 "La propiedad [propiedad] no existe".
 */
const persona = { nombre: "Ana", edad: 25 };

const proxyPersona = new Proxy(persona, {
  get(obj, prop) {
    return prop in obj ? obj[prop] : `La propiedad ${prop} no existe`;
  },
});

console.log(proxyPersona.nombre); // Ana
console.log(proxyPersona.edad); // 25
console.log(proxyPersona.altura); // La propiedad altura no existe

/**
 * Ejercicio 2: Validación de propiedades con `set`
 *
 * Crea un objeto `usuario` vacío.
 * Valida con Proxy:
 * - `edad` debe ser un número mayor a 0
 * - `email` debe contener "@"
 */
const usuario = {};

const proxyUsuario = new Proxy(usuario, {
  set(obj, prop, valor) {
    if (prop === "edad" && (typeof valor !== "number" || valor <= 0)) {
      throw new TypeError("Edad debe ser un número mayor a 0");
    }
    if (prop === "email" && !valor.includes("@")) {
      throw new TypeError("Email inválido");
    }
    return Reflect.set(obj, prop, valor);
  },
});

proxyUsuario.edad = 30; // OK
proxyUsuario.email = "ana@mail.com"; // OK
// proxyUsuario.edad = "treinta"; // ❌ Error

/**
 * Ejercicio 3: Registro de accesos
 *
 * Crea una función `crearLogger(obj)` que devuelva un Proxy.
 * Cada vez que se acceda a una propiedad debe mostrar:
 * 👉 "Accediendo a [propiedad]"
 */
function crearLogger(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      console.log(`Accediendo a ${prop}`);
      return Reflect.get(target, prop);
    },
  });
}

const datos = crearLogger({ x: 10, y: 20 });
console.log(datos.x); // Accediendo a x → 10

/**
 * Ejercicio 4: Propiedades virtuales
 *
 * Crea un Proxy `virtualArray` que simule un array infinito.
 * Al acceder a cualquier índice, devuelve:
 * 👉 "Valor virtual en índice [n]"
 */
const virtualArray = new Proxy(
  {},
  {
    get(obj, prop) {
      return `Valor virtual en índice ${prop}`;
    },
  }
);

console.log(virtualArray[5]); // Valor virtual en índice 5
console.log(virtualArray[100]); // Valor virtual en índice 100

/**
 * Ejercicio 5: Uso de Reflect en `set`
 *
 * Crea un objeto `config` y un Proxy que:
 * - Intercepte `set`
 * - Muestre en consola el cambio
 * - Use Reflect.set para asignar
 */
const config = {};

const proxyConfig = new Proxy(config, {
  set(obj, prop, valor) {
    console.log(`Asignando ${valor} a ${prop}`);
    return Reflect.set(obj, prop, valor);
  },
});

proxyConfig.modo = "oscuro"; // Asignando oscuro a modo

/**
 * Ejercicio 6: Interceptar borrados
 *
 * Crea un objeto con `secreto` y `publico`.
 * Haz un Proxy que no permita borrar `secreto`.
 */
const datos2 = { secreto: 42, publico: "ok" };

const proxyDatos = new Proxy(datos2, {
  deleteProperty(obj, prop) {
    if (prop === "secreto") {
      console.log("No puedes borrar secreto");
      return false;
    }
    return Reflect.deleteProperty(obj, prop);
  },
});

delete proxyDatos.publico; // OK
delete proxyDatos.secreto; // ❌ No puedes borrar secreto
console.log(proxyDatos);

/**
 * Ejercicio 7: Iteración con `ownKeys`
 *
 * Oculta propiedades que comiencen con `_`
 * al usar Object.keys(proxy).
 */
const objeto = { _id: 123, nombre: "Ana", edad: 20 };

const proxyObjeto = new Proxy(objeto, {
  ownKeys(obj) {
    return Reflect.ownKeys(obj).filter((k) => !k.startsWith("_"));
  },
});

console.log(Object.keys(proxyObjeto)); // ["nombre", "edad"]

/**
 * Ejercicio 8: Proxy para funciones (trap `apply`)
 *
 * Intercepta llamadas a una función `suma(a, b)`.
 */
function suma(a, b) {
  return a + b;
}

const proxySuma = new Proxy(suma, {
  apply(target, thisArg, args) {
    console.log(`Ejecutando suma con ${args[0]} y ${args[1]}`);
    return Reflect.apply(target, thisArg, args);
  },
});

console.log(proxySuma(2, 3)); // Ejecutando suma... → 5

/**
 * Ejercicio 9: Proxy constructor (`construct`)
 *
 * Intercepta la creación de una clase Persona.
 */
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

const ProxyPersona = new Proxy(Persona, {
  construct(target, args) {
    console.log(`Creando una nueva persona con nombre ${args[0]}`);
    return Reflect.construct(target, args);
  },
});

const ana = new ProxyPersona("Ana"); // Creando una nueva persona...

/**
 * Ejercicio 10: Revocable Proxy
 *
 * Crea un Proxy revocable sobre un objeto secreto.
 */
const { proxy: proxySecreto, revoke } = Proxy.revocable(
  { secreto: "clave123" },
  {}
);

console.log(proxySecreto.secreto); // clave123
revoke();
// console.log(proxySecreto.secreto); // ❌ Error: Proxy revoked
