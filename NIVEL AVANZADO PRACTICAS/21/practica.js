// Ejercicio 1: Validar nombre completo con mayúsculas
// Enunciado: Crea una expresión regular que valide nombres completos donde cada palabra inicie con mayúscula seguida de minúsculas.
const patronNombre = /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)*$/;
console.log("¿Es válido 'Juan Perez'?", patronNombre.test("Juan Perez"));
console.log("¿Es válido 'juan perez'?", patronNombre.test("juan perez"));

// Ejercicio 2: Validar número seguido de 'px'
// Enunciado: Usa lookahead para comprobar si un número es seguido por la unidad 'px'.
const regexPx = /\d+(?=px)/;
console.log("¿Coincide en '10px'?", regexPx.test("10px"));
console.log("¿Coincide en '20em'?", regexPx.test("20em"));

// Ejercicio 3: Detectar número no seguido de 'px'
// Enunciado: Usa negative lookahead para detectar un número que NO esté seguido de 'px'.
const regexNoPx = /\d+(?!px)/;
console.log("¿Coincide en '10px'?", regexNoPx.test("10px"));
console.log("¿Coincide en '20em'?", regexNoPx.test("20em"));

// Ejercicio 4: Extraer valores con lookbehind
// Enunciado: Usa lookbehind para extraer un número precedido por el signo $.
const regexDolares = /(?<=\$)\d+/;
console.log("Número extraído de '$100':", "$100".match(regexDolares));

// Ejercicio 5: Validar fecha con grupos capturantes
// Enunciado: Crea una expresión regular que divida una fecha con el formato YYYY-MM-DD en año, mes y día.
const regexFecha = /(\d{4})-(\d{2})-(\d{2})/;
const [, anio, mes, dia] = "2025-08-21".match(regexFecha);
console.log("Año:", anio, "Mes:", mes, "Día:", dia);

// Ejercicio 6: Buscar todas las vocales en un texto
// Enunciado: Usa el flag global para encontrar todas las vocales en una cadena.
const regexVocales = /[aeiou]/gi;
console.log(
  "Vocales en 'Expresiones Regulares Avanzadas':",
  "Expresiones Regulares Avanzadas".match(regexVocales)
);

// Ejercicio 7: Validar que un texto contenga emojis
// Enunciado: Usa soporte Unicode con \p{Emoji} para comprobar si una cadena contiene emojis.
const regexEmoji = /\p{Emoji}/u;
console.log("¿Contiene emoji '😎'?", regexEmoji.test("😎"));
console.log("¿Contiene emoji 'Hola'?", regexEmoji.test("Hola"));

// Ejercicio 8: Validar texto solo con letras Unicode
// Enunciado: Crea una expresión regular que solo acepte letras de cualquier idioma.
const regexLetras = /^\p{L}+$/u;
console.log("¿Es válido 'Hola'?", regexLetras.test("Hola"));
console.log("¿Es válido '123'?", regexLetras.test("123"));

// Ejercicio 9: Evitar cuantificadores codiciosos
// Enunciado: Diseña una expresión regular que extraiga el contenido entre comillas de manera no codiciosa.
const regexComillas = /".+?"/g;
console.log(
  'Coincidencias en \'El dijo "Hola" y luego "Adiós"\':',
  'El dijo "Hola" y luego "Adiós"'.match(regexComillas)
);

// Ejercicio 10: Validar contraseña segura
// Enunciado: Escribe una expresión regular que valide contraseñas con al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
console.log("¿Es segura 'Passw0rd!'?", regexPassword.test("Passw0rd!"));
console.log("¿Es segura 'password'?", regexPassword.test("password"));
