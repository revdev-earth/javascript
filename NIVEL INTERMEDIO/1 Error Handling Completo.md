# 1. Error Handling Completo

## Try/Catch/Finally

```javascript
// Estructura básica
try {
  // Código que puede fallar
  let resultado = operacionPeligrosa()
  console.log(resultado)
} catch (error) {
  // Manejo del error
  console.error("Error capturado:", error.message)
} finally {
  // Siempre se ejecuta
  console.log("Limpieza o código final")
}

// Finally siempre se ejecuta, incluso con return
function ejemploFinally() {
  try {
    return "valor del try"
  } catch (error) {
    return "valor del catch"
  } finally {
    console.log("Esto siempre se ejecuta") // Se ejecuta antes del return
  }
}
```

## Throw Statements

```javascript
// Lanzar errores simples
function dividir(a, b) {
  if (b === 0) {
    throw new Error("División por cero no permitida")
  }
  return a / b
}

// Lanzar diferentes tipos de errores
function validarEdad(edad) {
  if (typeof edad !== "number") {
    throw new TypeError("La edad debe ser un número")
  }
  if (edad < 0) {
    throw new RangeError("La edad no puede ser negativa")
  }
  if (edad > 150) {
    throw new RangeError("Edad no realista")
  }
}

// Re-lanzar errores después de procesarlos
function procesarDatos(datos) {
  try {
    return JSON.parse(datos)
  } catch (error) {
    console.error("Error al procesar JSON:", error.message)
    throw error // Re-lanzar para que el llamador lo maneje
  }
}
```

## Error Types

```javascript
// Tipos de errores nativos
try {
  // SyntaxError
  eval("let x = ;") // Error de sintaxis
} catch (error) {
  console.log(error instanceof SyntaxError) // true
}

try {
  // ReferenceError
  console.log(variableNoExiste)
} catch (error) {
  console.log(error instanceof ReferenceError) // true
}

try {
  // TypeError
  null.metodoInexistente()
} catch (error) {
  console.log(error instanceof TypeError) // true
}

try {
  // RangeError
  new Array(-1)
} catch (error) {
  console.log(error instanceof RangeError) // true
}
```

## Custom Errors

```javascript
// Crear errores personalizados
class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = "ValidationError"
    this.field = field
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = "NetworkError"
    this.statusCode = statusCode
  }
}

// Uso de errores personalizados
function validarUsuario(usuario) {
  if (!usuario.email) {
    throw new ValidationError("Email requerido", "email")
  }
  if (!usuario.email.includes("@")) {
    throw new ValidationError("Email inválido", "email")
  }
}

// Manejo específico por tipo
try {
  validarUsuario({})
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Error en campo ${error.field}: ${error.message}`)
  } else {
    console.log("Error desconocido:", error.message)
  }
}
```

## Error Propagation

```javascript
// Los errores se propagan hacia arriba
function nivel1() {
  throw new Error("Error en nivel 1")
}

function nivel2() {
  nivel1() // No maneja el error, se propaga
}

function nivel3() {
  try {
    nivel2() // El error llega hasta aquí
  } catch (error) {
    console.log("Error capturado en nivel 3:", error.message)
  }
}

// Control granular de propagación
function procesarArchivo(archivo) {
  try {
    return leerArchivo(archivo)
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Archivo no encontrado, creando uno nuevo...")
      return crearArchivoVacio(archivo)
    }
    // Otros errores se propagan
    throw error
  }
}
```

## Async Error Handling

```javascript
// Promesas con catch
fetch("/api/datos")
  .then((response) => response.json())
  .then((datos) => console.log(datos))
  .catch((error) => console.error("Error en fetch:", error))

// Async/await con try/catch
async function obtenerDatos() {
  try {
    const response = await fetch("/api/datos")
    if (!response.ok) {
      throw new NetworkError("Error en la respuesta", response.status)
    }
    const datos = await response.json()
    return datos
  } catch (error) {
    if (error instanceof NetworkError) {
      console.log(`Error de red: ${error.statusCode}`)
    } else {
      console.log("Error desconocido:", error.message)
    }
    throw error // Re-propagar si es necesario
  }
}

// Manejo de múltiples operaciones async
async function procesarMultiplesDatos() {
  const resultados = await Promise.allSettled([
    obtenerDatos("/api/usuarios"),
    obtenerDatos("/api/productos"),
    obtenerDatos("/api/pedidos"),
  ])

  resultados.forEach((resultado, index) => {
    if (resultado.status === "rejected") {
      console.error(`Operación ${index} falló:`, resultado.reason)
    }
  })
}
```

## Debugging Strategies

```javascript
// Agregar información contextual a errores
function operacionCompleja(datos, opciones) {
  try {
    return procesarDatos(datos, opciones)
  } catch (error) {
    // Agregar contexto al error
    error.context = {
      datos: datos,
      opciones: opciones,
      timestamp: new Date().toISOString(),
    }
    throw error
  }
}

// Sistema de logging estructurado
class Logger {
  static error(message, error, context = {}) {
    console.error({
      level: "ERROR",
      message,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      context,
      timestamp: new Date().toISOString(),
    })
  }

  static warn(message, context = {}) {
    console.warn({
      level: "WARN",
      message,
      context,
      timestamp: new Date().toISOString(),
    })
  }
}

// Error boundaries para aplicaciones
class ErrorBoundary {
  constructor() {
    this.errors = []
  }

  captureError(error, context) {
    this.errors.push({
      error,
      context,
      timestamp: new Date(),
    })

    Logger.error("Error capturado", error, context)

    // Decidir si continuar o terminar la aplicación
    if (error.severity === "critical") {
      throw error
    }
  }
}
```
