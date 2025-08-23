// 1. SOLID PRINCIPLES - Single Responsibility
// Enunciado: Crea un sistema donde separes responsabilidades entre guardar usuarios y enviar correos.
// ❌ Mal diseño: una sola clase con múltiples responsabilidades.
class UserManager {
  saveUser(user) {
    console.log(`Guardando usuario: ${user}`);
  }
  sendEmail(user) {
    console.log(`Enviando correo a: ${user}`);
  }
}

// ✅ Buen diseño: separar responsabilidades
class UserRepository {
  save(user) {
    console.log(`Usuario ${user} guardado en BD.`);
  }
}
class EmailService {
  send(user) {
    console.log(`Correo enviado a ${user}`);
  }
}
const repo = new UserRepository();
const mail = new EmailService();
repo.save("Carlos");
mail.send("Carlos");

// 2. CLEAN CODE
// Enunciado: Refactoriza una función que calcula precio con IVA para que sea clara y legible.
// ❌ Mal
function c(u) {
  return u * 1.19;
}
console.log(c(100));

// ✅ Bien
function calcularPrecioConIVA(precio) {
  return precio * 1.19;
}
console.log(calcularPrecioConIVA(100));

// 3. REFACTORING TECHNIQUES
// Enunciado: Refactoriza un método que hace varias tareas en funciones separadas para mejorar la legibilidad.
// ❌ Antes
function procesarPedidoAntiguo(pedido) {
  console.log("Validando pedido...");
  // lógica de validación
  console.log("Calculando envío...");
  // lógica de envío
}
procesarPedidoAntiguo("pedido1");

// ✅ Después
function validarPedido(pedido) {
  console.log(`Pedido ${pedido} validado`);
}
function calcularEnvio(pedido) {
  console.log(`Envío calculado para ${pedido}`);
}
function procesarPedido(pedido) {
  validarPedido(pedido);
  calcularEnvio(pedido);
}
procesarPedido("pedido1");

// 4. CODE SMELLS
// Enunciado: Evita duplicar código al calcular áreas de figuras geométricas.
// ❌ Código duplicado
function calcularAreaRect(a, b) {
  return a * b;
}
function calcularAreaCuadro(l) {
  return l * l;
}
console.log(calcularAreaRect(2, 3), calcularAreaCuadro(4));

// ✅ Refactorizado
function calcularArea(base, altura = base) {
  return base * altura;
}
console.log(calcularArea(2, 3), calcularArea(4));

// 5. TECHNICAL DEBT
// Enunciado: Muestra un ejemplo de deuda técnica con roles de usuario.
// ❌ Solución rápida (difícil de mantener)
function accesoRapido(userRole) {
  if (userRole == "admin" || userRole == "super" || userRole == "godmode") {
    return "Acceso permitido";
  }
  return "Acceso denegado";
}
console.log(accesoRapido("admin"));

// ✅ Mejor solución con mantenibilidad
const rolesPermitidos = ["admin", "super", "godmode"];
function acceso(userRole) {
  return rolesPermitidos.includes(userRole)
    ? "Acceso permitido"
    : "Acceso denegado";
}
console.log(acceso("super"));

// 6. DEPENDENCY MANAGEMENT
// Enunciado: Explica cómo gestionar dependencias en un proyecto.
// (Ejemplo en terminal, no ejecutable en JS)
// npm audit fix
// npm outdated
console.log("Ejecuta 'npm audit fix' para actualizar dependencias inseguras.");

// 7. DOCUMENTATION STRATEGIES
// Enunciado: Documenta una función con JSDoc para que otros devs entiendan su propósito.
/**
 * Calcula el precio con IVA.
 * @param {number} precio - Precio base del producto
 * @returns {number} Precio final con IVA
 */
function precioConIVA(precio) {
  return precio * 1.19;
}
console.log(precioConIVA(200));
