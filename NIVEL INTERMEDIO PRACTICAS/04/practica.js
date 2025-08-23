// Ejercicio 1: Crear una función asíncrona que simule la lectura de un archivo con callback
function leerArchivoSimulado(nombre, callback) {
  setTimeout(() => {
    if (nombre) {
      callback(null, `Contenido del archivo: ${nombre}`);
    } else {
      callback(new Error("Archivo no encontrado"));
    }
  }, 1000);
}
leerArchivoSimulado("datos.txt", (error, contenido) => {
  if (error) console.error(error.message);
  else console.log(contenido);
});

// Ejercicio 2: Convertir la función anterior en una promesa
function leerArchivoPromesa(nombre) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (nombre) resolve(`Contenido del archivo: ${nombre}`);
      else reject(new Error("Archivo no encontrado"));
    }, 1000);
  });
}
leerArchivoPromesa("datos.txt")
  .then((contenido) => console.log(contenido))
  .catch((error) => console.error(error.message));

// Ejercicio 3: Usar async/await para leer dos archivos en secuencia
async function leerArchivosSecuencia() {
  try {
    const archivo1 = await leerArchivoPromesa("config.json");
    const archivo2 = await leerArchivoPromesa("data.json");
    console.log(archivo1, archivo2);
  } catch (error) {
    console.error("Error en la lectura:", error.message);
  }
}
leerArchivosSecuencia();

// Ejercicio 4: Usar Promise.all para leer varios archivos en paralelo
async function leerArchivosParalelo() {
  try {
    const [a1, a2, a3] = await Promise.all([
      leerArchivoPromesa("uno.txt"),
      leerArchivoPromesa("dos.txt"),
      leerArchivoPromesa("tres.txt"),
    ]);
    console.log(a1, a2, a3);
  } catch (error) {
    console.error("Error en alguno de los archivos:", error.message);
  }
}
leerArchivosParalelo();

// Ejercicio 5: Implementar una operación con timeout usando Promise.race
function conTimeout(promesa, ms) {
  return Promise.race([
    promesa,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Tiempo agotado")), ms)
    ),
  ]);
}
conTimeout(leerArchivoPromesa("archivoLento.txt"), 500)
  .then((resultado) => console.log(resultado))
  .catch((error) => console.error(error.message));

// Ejercicio 6: Crear un generador asíncrono que devuelva números del 1 al 3
async function* generadorNumeros() {
  for (let i = 1; i <= 3; i++) {
    await new Promise((r) => setTimeout(r, 300));
    yield i;
  }
}
async function usarGenerador() {
  for await (const n of generadorNumeros()) {
    console.log("Número generado:", n);
  }
}
usarGenerador();

// Ejercicio 7: Simular callback hell con 3 operaciones encadenadas
function paso1(callback) {
  setTimeout(() => callback(null, "Paso 1 completado"), 300);
}
function paso2(callback) {
  setTimeout(() => callback(null, "Paso 2 completado"), 300);
}
function paso3(callback) {
  setTimeout(() => callback(null, "Paso 3 completado"), 300);
}
paso1((err, res1) => {
  if (err) return console.error(err);
  console.log(res1);
  paso2((err, res2) => {
    if (err) return console.error(err);
    console.log(res2);
    paso3((err, res3) => {
      if (err) return console.error(err);
      console.log(res3);
    });
  });
});

// Ejercicio 8: Reescribir el ejercicio anterior con Promises
function pasoPromesa(nombre) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`${nombre} completado`), 300)
  );
}
pasoPromesa("Paso 1")
  .then((res) => {
    console.log(res);
    return pasoPromesa("Paso 2");
  })
  .then((res) => {
    console.log(res);
    return pasoPromesa("Paso 3");
  })
  .then((res) => console.log(res));

// Ejercicio 9: Crear un async iterator que procese un array de strings
async function* procesarStrings(arr) {
  for (const str of arr) {
    await new Promise((r) => setTimeout(r, 200));
    yield str.toUpperCase();
  }
}
async function usarProcesarStrings() {
  for await (const s of procesarStrings(["hola", "mundo", "asincrono"])) {
    console.log(s);
  }
}
usarProcesarStrings();

// Ejercicio 10: Comparar ejecución secuencial vs paralela
async function tarea(nombre) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`${nombre} lista`), 500)
  );
}
async function secuencial() {
  console.time("secuencial");
  const r1 = await tarea("T1");
  const r2 = await tarea("T2");
  const r3 = await tarea("T3");
  console.timeEnd("secuencial");
  console.log(r1, r2, r3);
}
async function paralelo() {
  console.time("paralelo");
  const resultados = await Promise.all([tarea("T1"), tarea("T2"), tarea("T3")]);
  console.timeEnd("paralelo");
  console.log(resultados);
}
secuencial();
paralelo();
