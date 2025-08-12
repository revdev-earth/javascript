# 3. Closures Naturales

## Lexical Environment

```javascript
// Cada función tiene acceso a su lexical environment
function exterior() {
  let variableExterior = "Desde exterior"

  function interior() {
    let variableInterior = "Desde interior"
    console.log(variableExterior) // Acceso lexical
    console.log(variableInterior)
  }

  return interior
}

// El lexical environment se mantiene vivo
const funcionInterior = exterior()
funcionInterior() // Aún puede acceder a variableExterior

// Visualización del scope chain
let global = "variable global"

function nivel1() {
  let var1 = "nivel 1"

  function nivel2() {
    let var2 = "nivel 2"

    function nivel3() {
      let var3 = "nivel 3"
      // Acceso: var3 → var2 → var1 → global
      console.log(var3, var2, var1, global)
    }

    return nivel3
  }

  return nivel2
}
```

## Closure Creation

```javascript
// Closure básico - función que "recuerda" su entorno
function crearContador(inicial = 0) {
  let contador = inicial

  return function () {
    return ++contador
  }
}

const contador1 = crearContador(0)
const contador2 = crearContador(10)

console.log(contador1()) // 1
console.log(contador1()) // 2
console.log(contador2()) // 11
console.log(contador1()) // 3

// Múltiples closures comparten el mismo entorno
function crearCalculadora(inicial) {
  let valor = inicial

  return {
    sumar: function (n) {
      valor += n
      return valor
    },
    restar: function (n) {
      valor -= n
      return valor
    },
    obtener: function () {
      return valor
    },
  }
}

const calc = crearCalculadora(10)
calc.sumar(5) // 15
calc.restar(3) // 12
console.log(calc.obtener()) // 12
```

## Variable Capture

```javascript
// Problema común con closures en loops
console.log("Problema con var:")
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i) // 3, 3, 3 - todas capturan la misma 'i'
  }, 100)
}

// Solución 1: let (block scope)
console.log("Solución con let:")
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i) // 0, 1, 2 - cada iteración tiene su 'i'
  }, 200)
}

// Solución 2: IIFE para crear scope separado
console.log("Solución con IIFE:")
for (var i = 0; i < 3; i++) {
  ;(function (indice) {
    setTimeout(function () {
      console.log(indice) // 0, 1, 2 - cada IIFE captura su valor
    }, 300)
  })(i)
}

// Captura de objetos (referencia)
function crearManipuladores() {
  let objeto = { valor: 0 }

  return {
    incrementar() {
      objeto.valor++ // Todos modifican el mismo objeto
    },
    obtener() {
      return objeto.valor
    },
    reset() {
      objeto = { valor: 0 } // Cambia la referencia solo para este closure
    },
  }
}
```

## Practical Applications

```javascript
// Module pattern con closures
const MiModulo = (function () {
  // Variables privadas
  let variablePrivada = 0
  const datosPrivados = []

  // Funciones privadas
  function funcionPrivada() {
    return "Solo accesible internamente"
  }

  // API pública
  return {
    incrementar() {
      variablePrivada++
    },
    obtenerValor() {
      return variablePrivada
    },
    agregarDato(dato) {
      datosPrivados.push(dato)
    },
    obtenerDatos() {
      return [...datosPrivados] // Copia para proteger el original
    },
  }
})()

// Factory pattern con closures
function crearUsuario(nombre, email) {
  // Datos privados
  let _nombre = nombre
  let _email = email
  let _activo = true

  // Validación privada
  function validarEmail(email) {
    return email.includes("@")
  }

  return {
    // Getters
    get nombre() {
      return _nombre
    },
    get email() {
      return _email
    },
    get activo() {
      return _activo
    },

    // Setters con validación
    setEmail(nuevoEmail) {
      if (validarEmail(nuevoEmail)) {
        _email = nuevoEmail
        return true
      }
      return false
    },

    desactivar() {
      _activo = false
    },

    // Método que usa datos privados
    obtenerInfo() {
      return `${_nombre} (${_email}) - ${_activo ? "Activo" : "Inactivo"}`
    },
  }
}
```

## Memory Implications

```javascript
// Memory leaks potenciales con closures
function crearElementoConLeak() {
  let elementoGrande = new Array(1000000).fill("data")

  return function () {
    // Aunque no use elementoGrande, se mantiene en memoria
    console.log("Función ejecutada")
  }
}

// Mejor: limpia referencias no necesarias
function crearElementoSinLeak() {
  let elementoGrande = new Array(1000000).fill("data")
  let datoNecesario = elementoGrande.length

  // Limpia la referencia
  elementoGrande = null

  return function () {
    console.log(`Tamaño era: ${datoNecesario}`)
  }
}

// Detach event listeners para evitar leaks
function configurarElemento() {
  const elemento = document.getElementById("miBoton")
  let datos = {
    /* datos grandes */
  }

  function manejador() {
    // Usa datos
    console.log(datos)
  }

  elemento.addEventListener("click", manejador)

  // Cleanup function
  return function cleanup() {
    elemento.removeEventListener("click", manejador)
    datos = null
  }
}
```

## Module Pattern y Data Privacy

```javascript
// Namespace pattern
const MiApp = {}

MiApp.Utilidades = (function () {
  let configuracion = { debug: false }

  return {
    config(opciones) {
      configuracion = { ...configuracion, ...opciones }
    },
    log(mensaje) {
      if (configuracion.debug) {
        console.log(`[DEBUG] ${mensaje}`)
      }
    },
  }
})()

// Revealing module pattern
const Calculator = (function () {
  let resultado = 0

  function sumar(a, b) {
    return a + b
  }

  function restar(a, b) {
    return a - b
  }

  function calcular(operacion, a, b) {
    resultado = operacion(a, b)
    return resultado
  }

  // Solo expone lo necesario
  return {
    suma: function (a, b) {
      return calcular(sumar, a, b)
    },
    resta: function (a, b) {
      return calcular(restar, a, b)
    },
    ultimoResultado: function () {
      return resultado
    },
  }
})()

// Singleton con closure
const ConfiguracionGlobal = (function () {
  let instancia

  function crearInstancia() {
    return {
      configuracion: {},
      set(clave, valor) {
        this.configuracion[clave] = valor
      },
      get(clave) {
        return this.configuracion[clave]
      },
    }
  }

  return {
    obtenerInstancia() {
      if (!instancia) {
        instancia = crearInstancia()
      }
      return instancia
    },
  }
})()
```
