// Ejercicio 1: Crear una fecha actual y mostrarla en formato legible
// Enunciado: Crea un objeto Date que represente el momento actual y muestra su valor en formato de texto.
const fechaActual = new Date();
console.log("La fecha y hora actuales son:", fechaActual.toString());

// Ejercicio 2: Crear una fecha específica
// Enunciado: Crea un objeto Date para representar el 1 de enero de 2030 a las 12:00:00 y muéstralo.
const fechaFutura = new Date(2030, 0, 1, 12, 0, 0);
console.log("Fecha específica:", fechaFutura.toString());

// Ejercicio 3: Obtener timestamp actual en milisegundos
// Enunciado: Muestra el número de milisegundos transcurridos desde el 1 de enero de 1970 hasta ahora.
const timestamp = Date.now();
console.log("Timestamp actual en milisegundos:", timestamp);

// Ejercicio 4: Convertir fecha a timestamp en segundos
// Enunciado: Convierte la fecha y hora actual en un timestamp expresado en segundos.
const timestampSegundos = Math.floor(Date.now() / 1000);
console.log("Timestamp actual en segundos:", timestampSegundos);

// Ejercicio 5: Diferencia de tiempo entre dos fechas
// Enunciado: Calcula cuántos días faltan entre la fecha actual y el 1 de enero de 2030.
const fechaObjetivo = new Date(2030, 0, 1);
const diferenciaMs = fechaObjetivo - fechaActual;
const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
console.log("Días faltantes para 1 de enero de 2030:", diferenciaDias);

// Ejercicio 6: Obtener hora en UTC
// Enunciado: Crea un objeto Date actual y muestra la hora en UTC.
const fechaUTC = new Date();
console.log("Hora en UTC:", fechaUTC.getUTCHours());

// Ejercicio 7: Mostrar fecha en zona horaria específica
// Enunciado: Formatea la fecha actual en la zona horaria de "Asia/Tokyo".
const fechaTokyo = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "full",
  timeStyle: "long",
  timeZone: "Asia/Tokyo",
}).format(new Date());
console.log("Fecha en Tokio:", fechaTokyo);

// Ejercicio 8: Calcular edad a partir de fecha de nacimiento
// Enunciado: Escribe una función que reciba una fecha de nacimiento y devuelva la edad en años.
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}
console.log("Edad:", calcularEdad(new Date(1990, 5, 15)), "años");

// Ejercicio 9: Sumar días a una fecha
// Enunciado: Escribe una función que reciba una fecha y un número de días, y devuelva la nueva fecha sumando esos días.
function sumarDias(fecha, dias) {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setDate(nuevaFecha.getDate() + dias);
  return nuevaFecha;
}
console.log("Fecha dentro de 10 días:", sumarDias(new Date(), 10).toString());

// Ejercicio 10: Mostrar fecha en formato personalizado
// Enunciado: Formatea la fecha actual como "DD/MM/YYYY".
function formatearFecha(fecha) {
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const año = fecha.getFullYear();
  return `${dia}/${mes}/${año}`;
}
console.log("Fecha actual en formato DD/MM/YYYY:", formatearFecha(new Date()));
