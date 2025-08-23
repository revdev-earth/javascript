// =========================================
// 🌍 Ejercicios de Internationalization (i18n)
// =========================================

// 📝 Ejercicio 1: Formatear un número en diferentes países
// Enunciado: Formatea el número 1234567.89 en formato alemán (de-DE) y en formato japonés (ja-JP).
function ejercicio1() {
  const num = 1234567.89;
  const de = new Intl.NumberFormat("de-DE").format(num);
  const jp = new Intl.NumberFormat("ja-JP").format(num);

  console.log("Ejercicio 1 → Alemán:", de); // "1.234.567,89"
  console.log("Ejercicio 1 → Japonés:", jp); // "1,234,567.89"
}

// 📝 Ejercicio 2: Detectar el locale del usuario
// Enunciado: Detecta automáticamente el idioma del navegador y muéstralo.
function ejercicio2() {
  const userLocale = navigator.language;
  console.log("Ejercicio 2 → Idioma detectado:", userLocale);
}

// 📝 Ejercicio 3: Formatear moneda en distintos locales
// Enunciado: Muestra el valor 1234.5 como euros en España y como yenes en Japón.
function ejercicio3() {
  const euros = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(1234.5);

  const yenes = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(1234.5);

  console.log("Ejercicio 3 → Euros:", euros);
  console.log("Ejercicio 3 → Yenes:", yenes);
}

// 📝 Ejercicio 4: Mostrar la fecha en distintos formatos
// Enunciado: Muestra la fecha actual en formato completo en inglés británico y formato corto en español de México.
function ejercicio4() {
  const now = new Date();

  const en = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(now);

  const mx = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "short",
  }).format(now);

  console.log("Ejercicio 4 → Fecha en inglés UK:", en);
  console.log("Ejercicio 4 → Fecha en español MX:", mx);
}

// 📝 Ejercicio 5: Ordenar palabras según reglas lingüísticas
// Enunciado: Ordena las palabras ["árbol", "zapato", "avión"] en orden alfabético correcto según el español.
function ejercicio5() {
  const palabras = ["árbol", "zapato", "avión"];
  const ordenadas = palabras.sort(new Intl.Collator("es").compare);

  console.log("Ejercicio 5 → Palabras ordenadas:", ordenadas);
}

// 📝 Ejercicio 6: Usar reglas de pluralización
// Enunciado: Implementa una función que muestre "1 item" o "X items" en inglés, según la cantidad.
function ejercicio6(count) {
  const pr = new Intl.PluralRules("en-US");
  return pr.select(count) === "one" ? "1 item" : `${count} items`;
}

// 📝 Ejercicio 7: Mostrar la hora en distintas zonas horarias
// Enunciado: Muestra la hora actual en Bogotá y en Tokio.
function ejercicio7() {
  const now = new Date();

  const bogota = new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    timeStyle: "short",
  }).format(now);

  const tokio = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    timeStyle: "short",
  }).format(now);

  console.log("Ejercicio 7 → Hora en Bogotá:", bogota);
  console.log("Ejercicio 7 → Hora en Tokio:", tokio);
}

// 📝 Ejercicio 8: Ejemplo práctico combinado
// Enunciado: Muestra el precio 2599.99 en la moneda y formato de fecha del locale del usuario.
function ejercicio8() {
  const locale = navigator.language;
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: locale === "es-MX" ? "MXN" : "USD",
  }).format(2599.99);

  const date = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "America/Mexico_City",
  }).format(new Date());

  console.log(`Ejercicio 8 → Precio: ${currency} — Fecha: ${date}`);
}

// =========================================
// 📌 Ejecutar todos los ejercicios
// =========================================
function runAll() {
  console.log("🚀 Iniciando ejercicios de i18n...\n");
  ejercicio1();
  ejercicio2();
  ejercicio3();
  ejercicio4();
  ejercicio5();
  console.log("Ejercicio 6 →", ejercicio6(1));
  console.log("Ejercicio 6 →", ejercicio6(5));
  ejercicio7();
  ejercicio8();
  console.log("\n✅ Todos los ejercicios ejecutados.");
}

runAll();
