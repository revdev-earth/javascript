# 4. Asíncrono Complete

## Callbacks

```javascript
// Callback básico
function operacionAsincrona(datos, callback) {
  setTimeout(() => {
    if (datos) {
      callback(null, `Procesado: ${datos}`)
    } else {
      callback(new Error("Datos no válidos"))
    }
  }, 1000)
}

// Uso del callback
operacionAsincrona("mi data", (error, resultado) => {
  if (error) {
    console.error("Error:", error.message)
  } else {
    console.log("Éxito:", resultado)
  }
})

// Callback con múltiples operaciones
function leerArchivo(nombre, callback) {
  setTimeout(() => callback(null, `contenido de ${nombre}`), 500)
}

function procesarContenido(contenido, callback) {
  setTimeout(() => callback(null, contenido.toUpperCase()), 300)
}
```

## Callback Hell

```javascript
// El problema del callback hell
leerArchivo("config.json", (error, config) => {
  if (error) return console.error(error)

  leerArchivo("data.json", (error, data) => {
    if (error) return console.error(error)

    procesarContenido(data, (error, processed) => {
      if (error) return console.error(error)

      guardarArchivo("output.json", processed, (error) => {
        if (error) return console.error(error)
        console.log("¡Proceso completado!")
      })
    })
  })
})

// Mejor: separar en funciones nombradas
function manejarConfig(error, config) {
  if (error) return console.error(error)
  leerArchivo("data.json", manejarData)
}

function manejarData(error, data) {
  if (error) return console.error(error)
  procesarContenido(data, manejarProceso)
}

function manejarProceso(error, processed) {
  if (error) return console.error(error)
  guardarArchivo("output.json", processed, manejarGuardado)
}

function manejarGuardado(error) {
  if (error) return console.error(error)
  console.log("¡Proceso completado!")
}

// Iniciar el proceso
leerArchivo("config.json", manejarConfig)
```

## Promises

```javascript
// Crear promises
function operacionAsincrona(datos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (datos) {
        resolve(`Procesado: ${datos}`)
      } else {
        reject(new Error("Datos no válidos"))
      }
    }, 1000)
  })
}

// Uso básico de promises
operacionAsincrona("mi data")
  .then((resultado) => {
    console.log("Éxito:", resultado)
    return resultado.length // Pasar al siguiente then
  })
  .then((longitud) => {
    console.log("Longitud:", longitud)
  })
  .catch((error) => {
    console.error("Error:", error.message)
  })
  .finally(() => {
    console.log("Operación terminada")
  })

// Convertir callback a promise
function promisificar(funcionCallback) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      funcionCallback(...args, (error, resultado) => {
        if (error) {
          reject(error)
        } else {
          resolve(resultado)
        }
      })
    })
  }
}

const leerArchivoPromise = promisificar(leerArchivo)
```

## Async/Await

```javascript
// Función async devuelve automáticamente una Promise
async function procesoCompleto() {
  try {
    const config = await leerArchivoPromise("config.json")
    const data = await leerArchivoPromise("data.json")
    const processed = await procesarContenido(data)
    await guardarArchivo("output.json", processed)
    console.log("¡Proceso completado!")
    return "éxito"
  } catch (error) {
    console.error("Error en el proceso:", error.message)
    throw error // Re-lanzar si es necesario
  }
}

// await solo funciona dentro de funciones async
async function ejemploAwait() {
  // Secuencial - una después de otra
  const resultado1 = await operacionAsincrona("data1")
  const resultado2 = await operacionAsincrona("data2")
  console.log(resultado1, resultado2)
}

// Top-level await (módulos modernos)
// const datos = await fetch('/api/datos').then(r => r.json());
```

## Error Handling en Async

```javascript
// Manejo de errores con try/catch
async function operacionSegura() {
  try {
    const datos = await fetch("/api/datos")
    const json = await datos.json()
    return json
  } catch (error) {
    console.error("Error en operación:", error)
    // Decidir qué hacer: re-lanzar, valor por defecto, etc.
    return { error: true, message: error.message }
  }
}

// Manejo granular de diferentes tipos de errores
async function manejoGranular() {
  try {
    const response = await fetch("/api/datos")
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }
    const datos = await response.json()
    return datos
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Error de red:", error.message)
    } else if (error.message.includes("HTTP Error")) {
      console.error("Error del servidor:", error.message)
    } else {
      console.error("Error desconocido:", error.message)
    }
    throw error
  }
}

// Timeout personalizado para async/await
function conTimeout(promesa, tiempo) {
  return Promise.race([
    promesa,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), tiempo)
    ),
  ])
}

async function operacionConTimeout() {
  try {
    const resultado = await conTimeout(
      fetch("/api/datos-lentos"),
      5000 // 5 segundos timeout
    )
    return resultado
  } catch (error) {
    if (error.message === "Timeout") {
      console.log("La operación tardó demasiado")
    }
    throw error
  }
}
```

## Promise Methods

```javascript
// Promise.all - todas deben resolverse
async function cargarTodosDatos() {
  try {
    const [usuarios, productos, pedidos] = await Promise.all([
      fetch("/api/usuarios").then((r) => r.json()),
      fetch("/api/productos").then((r) => r.json()),
      fetch("/api/pedidos").then((r) => r.json()),
    ])
    return { usuarios, productos, pedidos }
  } catch (error) {
    console.error("Una de las peticiones falló:", error)
    throw error
  }
}

// Promise.allSettled - espera a todas, fallen o no
async function cargarDatosSeguros() {
  const resultados = await Promise.allSettled([
    fetch("/api/usuarios").then((r) => r.json()),
    fetch("/api/productos").then((r) => r.json()),
    fetch("/api/pedidos").then((r) => r.json()),
  ])

  const exitosos = resultados
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value)

  const fallidos = resultados
    .filter((r) => r.status === "rejected")
    .map((r) => r.reason)

  return { exitosos, fallidos }
}

// Promise.race - el primero que termine
async function cargarConFallback() {
  try {
    const resultado = await Promise.race([
      fetch("/api/rapido"),
      fetch("/api/lento"),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout global")), 3000)
      ),
    ])
    return resultado
  } catch (error) {
    console.error("Todas las opciones fallaron:", error)
    throw error
  }
}

// Promise.any - el primer exitoso (ignora los rechazos)
async function cargarPrimerExitoso() {
  try {
    const resultado = await Promise.any([
      fetch("/api/servidor1"),
      fetch("/api/servidor2"),
      fetch("/api/servidor3"),
    ])
    return resultado
  } catch (error) {
    // Solo falla si todas las promesas fallan
    console.error("Todos los servidores fallaron")
    throw error
  }
}
```

## Parallel vs Sequential Execution

```javascript
// Ejecución secuencial - una después de otra
async function procesoSecuencial() {
  console.time("secuencial")
  const resultado1 = await operacionAsincrona("data1") // Espera 1 segundo
  const resultado2 = await operacionAsincrona("data2") // Espera otro segundo
  const resultado3 = await operacionAsincrona("data3") // Espera otro segundo
  console.timeEnd("secuencial") // ~3 segundos total
  return [resultado1, resultado2, resultado3]
}

// Ejecución paralela - todas al mismo tiempo
async function procesoParalelo() {
  console.time("paralelo")
  // Inicia todas las operaciones inmediatamente
  const promesa1 = operacionAsincrona("data1")
  const promesa2 = operacionAsincrona("data2")
  const promesa3 = operacionAsincrona("data3")

  // Espera a que todas terminen
  const resultados = await Promise.all([promesa1, promesa2, promesa3])
  console.timeEnd("paralelo") // ~1 segundo total
  return resultados
}

// Paralelo con límite de concurrencia
async function procesoParaleloLimitado(tareas, limite = 3) {
  const resultados = []
  for (let i = 0; i < tareas.length; i += limite) {
    const lote = tareas.slice(i, i + limite)
    const resultadosLote = await Promise.all(
      lote.map((tarea) => operacionAsincrona(tarea))
    )
    resultados.push(...resultadosLote)
  }
  return resultados
}

// Pipeline de procesamiento
async function pipeline(datos) {
  const resultados = []
  for (const item of datos) {
    const paso1 = await procesarPaso1(item)
    const paso2 = await procesarPaso2(paso1)
    const paso3 = await procesarPaso3(paso2)
    resultados.push(paso3)
  }
  return resultados
}
```

## Microtask Timing

```javascript
// Orden de ejecución: sincrónico → microtasks → macrotasks
console.log("1 - Sincrónico")
setTimeout(() => console.log("2 - Macrotask (setTimeout)"), 0)
Promise.resolve().then(() => console.log("3 - Microtask (Promise)"))
queueMicrotask(() => console.log("4 - Microtask (queueMicrotask)"))
console.log("5 - Sincrónico")
// Salida: 1, 5, 3, 4, 2

// Event loop y async/await
async function demostracionTiming() {
  console.log("A - Inicio función async")
  await Promise.resolve()
  console.log("B - Después de await")
  setTimeout(() => console.log("C - setTimeout en async"), 0)
  await Promise.resolve()
  console.log("D - Segundo await")
}

console.log("Antes de llamar async")
demostracionTiming()
console.log("Después de llamar async")
```

## Async Iterators

```javascript
// Crear async iterator personalizado
function crearAsyncRange(inicio, fin) {
  return {
    async *[Symbol.asyncIterator]() {
      for (let i = inicio; i <= fin; i++) {
        // Simula operación asíncrona
        await new Promise((resolve) => setTimeout(resolve, 100))
        yield i
      }
    },
  }
}

// Uso con for await...of
async function usarAsyncIterator() {
  for await (const numero of crearAsyncRange(1, 5)) {
    console.log(numero) // 1, 2, 3, 4, 5 (uno cada 100ms)
  }
}

// Async generator function
async function* generadorDatos() {
  let id = 1
  while (id <= 3) {
    const datos = await fetch(`/api/datos/${id}`)
    const json = await datos.json()
    yield json
    id++
  }
}

// Procesar stream de datos
async function procesarStream() {
  for await (const datos of generadorDatos()) {
    console.log("Datos recibidos:", datos)
    // Procesar cada elemento conforme llega
  }
}

// Convertir iterable regular a async
async function* convertirAAsync(iterable) {
  for (const item of iterable) {
    await new Promise((resolve) => setTimeout(resolve, 10))
    yield item
  }
}
```
