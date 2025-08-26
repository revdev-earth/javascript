/******************************************************
 * 5. Advanced TypeScript Integration
 * Ejercicios con enunciados y soluciones
 ******************************************************/

/**
 * 1. Type System Mastery
 * Enunciado:
 * En TypeScript, los tipos permiten definir estructuras
 * complejas y seguras. Demuestra el uso de inferencia,
 * anotaciones, tipos compuestos (union e intersection).
 */

// JS (comentarios simulan TS)
let mensaje = "Hola"; // inferido como string en TS
let edad = 25; // en TS sería: let edad: number = 25;

// Tipos compuestos simulados en JS:
const Usuario = { nombre: "Nico" };
const Admin = { nombre: "Ana", permisos: ["crear", "editar"] };

// Union (Usuario | Admin) → en JS se representa validando:
function mostrarUsuario(u) {
  if (u.permisos) {
    console.log("Admin:", u.nombre, "Permisos:", u.permisos);
  } else {
    console.log("Usuario:", u.nombre);
  }
}
mostrarUsuario(Usuario);
mostrarUsuario(Admin);

/**
 * 2. Generics
 * Enunciado:
 * Los genéricos permiten funciones y clases reutilizables.
 * Implementa una función genérica y una clase genérica.
 */

// En JS no hay genéricos, pero simulamos:
function envolver(valor) {
  return [valor]; // En TS sería: function envolver<T>(valor: T): T[]
}
console.log(envolver(42)); // [42]
console.log(envolver("Hola")); // ["Hola"]

// Clase genérica en JS (simulada):
class Caja {
  constructor(contenido) {
    this.contenido = contenido;
  }
}
const cajaString = new Caja("Mensaje");
console.log(cajaString.contenido);

/**
 * 3. Utility Types
 * Enunciado:
 * TS provee utilitarios como Partial, Readonly, Pick, Omit.
 * Simula su comportamiento en JS.
 */

const UsuarioBase = { id: 1, nombre: "Nico", email: "nico@mail.com" };

// Partial<Usuario>
const UsuarioEditable = { nombre: "Nicolas" };

// Readonly<Usuario>
Object.freeze(UsuarioBase); // Simula inmutabilidad
// UsuarioBase.id = 2; // Esto fallaría en TS

// Pick<Usuario, "nombre">
const UsuarioPick = { nombre: UsuarioBase.nombre };

// Omit<Usuario, "email">
const UsuarioOmit = { id: UsuarioBase.id, nombre: UsuarioBase.nombre };

console.log(UsuarioEditable, UsuarioPick, UsuarioOmit);

/**
 * 4. Declaration Files (.d.ts)
 * Enunciado:
 * TS usa archivos de declaración para tipar librerías JS.
 * Simula cómo se usaría una librería ficticia.
 */

// Supongamos que tenemos una librería JS:
function saludar(nombre) {
  return `Hola, ${nombre}`;
}
console.log(saludar("Nico")); // En TS estaría tipada con .d.ts

/**
 * 5. Module Augmentation
 * Enunciado:
 * Extiende funcionalidades de un módulo existente.
 * En TS se modifica la interfaz, en JS se hace monkey patching.
 */

// Simulación Express Request
const req = { url: "/home", method: "GET" };
// Extender Request (en TS sería augment.d.ts)
req.usuarioId = 123;
console.log("Request extendido:", req);

/**
 * 6. Compiler API
 * Enunciado:
 * TS tiene API para analizar código. Simula un parser
 * simple en JS para extraer nombres de variables.
 */

const codigo = "let a = 1; let b = 2;";
const variables = codigo.match(/let (\w+)/g).map((v) => v.replace("let ", ""));
console.log("Variables encontradas:", variables);

/**
 * 7. Migration Strategies
 * Enunciado:
 * Explica cómo migrar un proyecto JS a TS.
 * Simúlalo con comentarios y pasos en código.
 */

// Paso 1: Inicializar proyecto → tsc --init
// Paso 2: Renombrar archivos .js → .ts
// Paso 3: Usar allowJs y checkJs en tsconfig.json
// Paso 4: Tipar primero APIs y modelos de datos
// Paso 5: Usar "any" temporalmente y refinar

console.log(
  "Migración JS → TS: comenzar con puntos críticos, usar any solo de forma temporal."
);
