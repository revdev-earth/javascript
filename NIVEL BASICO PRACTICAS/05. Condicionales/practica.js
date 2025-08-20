// 1. Determinar si un número es positivo, negativo o cero
let numero1 = -5;

if (numero1 > 0) {
  console.log("El número es positivo");
} else if (numero1 < 0) {
  console.log("El número es negativo");
} else {
  console.log("El número es cero");
}

// 2. Verificar si una persona puede votar según su edad
let edad = 16;

if (edad >= 18) {
  console.log("Puede votar");
} else {
  console.log("No puede votar");
}

// 3. Mostrar el día de la semana según un número (1 a 7) usando switch
let dia = 4;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  case 4:
    console.log("Jueves");
    break;
  case 5:
    console.log("Viernes");
    break;
  case 6:
    console.log("Sábado");
    break;
  case 7:
    console.log("Domingo");
    break;
  default:
    console.log("Número inválido");
}

// 4. Usar operador ternario para verificar si un número es par o impar
let numero2 = 9;
let resultado = numero2 % 2 === 0 ? "Par" : "Impar";
console.log(resultado);

// 5. Validar acceso según rol de usuario
let rol = "editor";

if (rol === "admin") {
  console.log("Acceso total");
} else if (rol === "editor") {
  console.log("Acceso limitado a edición");
} else if (rol === "lector") {
  console.log("Acceso solo lectura");
} else {
  console.log("Rol no reconocido");
}

// 6. Determinar la calificación de un estudiante según su nota
let nota = 85;

if (nota >= 90) {
  console.log("Excelente");
} else if (nota >= 75) {
  console.log("Bueno");
} else if (nota >= 60) {
  console.log("Regular");
} else {
  console.log("Reprobado");
}

// 7. Usar || para asignar un nombre por defecto
let usuario = { nombre: "" };

let nombre = usuario.nombre || "Invitado";
console.log("Bienvenido " + nombre);

// 8. Saludar solo si el usuario está definido (&&)
let persona = { nombre: "Laura" };

persona && console.log("Hola " + persona.nombre);

// 9. Determinar tipo de cliente con operador ternario anidado
let puntos = 120;

let tipoCliente =
  puntos >= 100
    ? "Cliente Premium"
    : puntos >= 50
    ? "Cliente Frecuente"
    : "Cliente Nuevo";

console.log(tipoCliente);

// 10. Validar usuario con early returns
function validarUsuario(usuario) {
  if (!usuario) return "Usuario no existe";
  if (usuario.edad < 18) return "Usuario menor de edad";
  if (!usuario.activo) return "Usuario inactivo";

  return "Usuario válido";
}

console.log(validarUsuario({ nombre: "Ana", edad: 20, activo: true }));
