// 1. Manejo de división por cero con try/catch
// Enunciado: Crea un programa que divida dos números ingresados y maneje el error si el divisor es cero, mostrando un mensaje claro en consola.
function dividirSegura(a, b) {
  try {
    if (b === 0) throw new Error("No se puede dividir entre cero");
    console.log("Resultado:", a / b);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
dividirSegura(10, 0);

// 2. Validar nombre con Throw
// Enunciado: Escribe una función que valide si el nombre ingresado no está vacío. Si está vacío, lanza un error personalizado.
function validarNombre(nombre) {
  if (!nombre || nombre.trim() === "") {
    throw new Error("El nombre no puede estar vacío");
  }
  return "Nombre válido: " + nombre;
}
try {
  console.log(validarNombre("Carlos"));
  console.log(validarNombre(""));
} catch (error) {
  console.error("Error:", error.message);
}

// 3. Capturar SyntaxError
// Enunciado: Ejecuta código con `eval` y atrapa un posible `SyntaxError`.
try {
  eval("let x = ;");
} catch (error) {
  console.log("Error capturado:", error instanceof SyntaxError);
}

// 4. Error personalizado de contraseña
// Enunciado: Crea un error personalizado `PasswordError` que se lance si la contraseña tiene menos de 8 caracteres.
class PasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = "PasswordError";
  }
}
function validarPassword(pass) {
  if (pass.length < 8)
    throw new PasswordError("La contraseña es demasiado corta");
  return "Contraseña válida";
}
try {
  console.log(validarPassword("1234"));
} catch (error) {
  console.error(error.name + ":", error.message);
}

// 5. Propagación de errores en funciones anidadas
// Enunciado: Simula 3 funciones anidadas donde una lanza un error y se captura en el último nivel.
function nivelA() {
  throw new Error("Falla en nivel A");
}
function nivelB() {
  nivelA();
}
function nivelC() {
  try {
    nivelB();
  } catch (error) {
    console.log("Error capturado en nivel C:", error.message);
  }
}
nivelC();

// 6. Manejo de errores en Promesas
// Enunciado: Crea una promesa que falla y maneja el error usando `.catch`.
new Promise((_, reject) => reject(new Error("Error en la promesa"))).catch(
  (error) => console.error("Error capturado:", error.message)
);

// 7. Async/Await con manejo de error
// Enunciado: Simula una función asíncrona que intenta obtener datos pero siempre lanza un error, el cual se captura con try/catch.
async function obtenerDatosAPI() {
  try {
    throw new Error("No se pudo conectar al servidor");
  } catch (error) {
    console.error("Error en API:", error.message);
  }
}
obtenerDatosAPI();

// 8. Manejo de múltiples promesas con Promise.allSettled
// Enunciado: Ejecuta 3 promesas, dos resueltas y una rechazada, y muestra el estado de cada una.
async function testPromesas() {
  const resultados = await Promise.allSettled([
    Promise.resolve("Éxito 1"),
    Promise.reject("Fallo"),
    Promise.resolve("Éxito 2"),
  ]);
  resultados.forEach((res, i) => console.log(`Promesa ${i}:`, res));
}
testPromesas();

// 9. Logging de errores con contexto
// Enunciado: Implementa un sistema simple de logging que guarde un error con información adicional como fecha y usuario.
function logError(error, usuario) {
  console.error({
    mensaje: error.message,
    usuario,
    fecha: new Date().toISOString(),
  });
}
try {
  throw new Error("Operación no permitida");
} catch (error) {
  logError(error, "usuario123");
}

// 10. Manejo de errores en validación de edad
// Enunciado: Crea una función que valide si la edad está entre 0 y 120. Si no, lanza un RangeError.
function validarEdadSegura(edad) {
  if (edad < 0 || edad > 120) throw new RangeError("Edad inválida");
  return "Edad válida: " + edad;
}
try {
  console.log(validarEdadSegura(25));
  console.log(validarEdadSegura(150));
} catch (error) {
  console.error(error.name + ":", error.message);
}
