# 10. Testing Foundations

Las bases del testing en JavaScript permiten garantizar que el código sea confiable, mantenible y funcione como se espera en diferentes escenarios. Involucra no solo escribir pruebas, sino también crear una estrategia para cubrir casos comunes, extremos y errores potenciales antes de que lleguen al usuario final.

## Unit Testing

Las pruebas unitarias validan piezas pequeñas y aisladas de código, como funciones o métodos individuales.

```javascript
// Función a probar
function sumar(a, b) {
  return a + b
}

function dividir(a, b) {
  if (b === 0) {
    throw new Error("División por cero no permitida")
  }
  return a / b
}

// Tests unitarios (Jest)
describe("Operaciones matemáticas", () => {
  test("sumar dos números positivos", () => {
    expect(sumar(2, 3)).toBe(5)
  })

  test("sumar números negativos", () => {
    expect(sumar(-2, -3)).toBe(-5)
  })

  test("dividir números normales", () => {
    expect(dividir(10, 2)).toBe(5)
  })

  test("dividir por cero lanza error", () => {
    expect(() => dividir(10, 0)).toThrow("División por cero no permitida")
  })
})
```

## Test Runners

Un test runner ejecuta los tests y organiza los resultados.

```javascript
// Configuración de Jest (jest.config.js)
module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
}

// Ejecutar tests
// npm test -- --watch          // Modo watch
// npm test -- --coverage       // Con cobertura
// npm test -- --verbose        // Output detallado
```

## Assertions

Las assertions comparan resultados reales con esperados.

```javascript
// Tipos de assertions comunes
describe("Assertions examples", () => {
  test("igualdad exacta", () => {
    expect(2 + 2).toBe(4) // ===
    expect({ name: "Juan" }).toEqual({ name: "Juan" }) // comparación profunda
  })

  test("valores truthiness", () => {
    expect("hello").toBeTruthy()
    expect("").toBeFalsy()
    expect(null).toBeNull()
    expect(undefined).toBeUndefined()
  })

  test("números", () => {
    expect(2 + 2).toBeGreaterThan(3)
    expect(Math.PI).toBeCloseTo(3.14, 2)
  })

  test("strings", () => {
    expect("hello world").toMatch(/world/)
    expect("javascript").toContain("script")
  })

  test("arrays y objetos", () => {
    expect(["a", "b", "c"]).toContain("b")
    expect({ name: "Ana", age: 25 }).toHaveProperty("name", "Ana")
  })
})
```

## Mocking

El mocking simula dependencias externas.

```javascript
// Mock de funciones
describe("Mocking examples", () => {
  test("mock función simple", () => {
    const mockFn = jest.fn()
    mockFn("arg1", "arg2")

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2")
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test("mock con valor de retorno", () => {
    const mockFn = jest.fn().mockReturnValue(42)

    expect(mockFn()).toBe(42)
  })
})

// Mock de módulos
jest.mock("./api", () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: "Juan" }),
}))

// Mock de timers
describe("Timer mocks", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test("delayed function", () => {
    const callback = jest.fn()

    setTimeout(callback, 1000)

    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1000)

    expect(callback).toHaveBeenCalled()
  })
})

// Clase con dependencias
class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient
  }

  async getUser(id) {
    const userData = await this.apiClient.get(`/users/${id}`)
    return { ...userData, isActive: true }
  }
}

// Test con mock
test("UserService getUser", async () => {
  const mockApiClient = {
    get: jest.fn().mockResolvedValue({ id: 1, name: "Ana" }),
  }

  const userService = new UserService(mockApiClient)
  const result = await userService.getUser(1)

  expect(mockApiClient.get).toHaveBeenCalledWith("/users/1")
  expect(result).toEqual({ id: 1, name: "Ana", isActive: true })
})
```

## Coverage

La cobertura mide qué porcentaje del código fue ejecutado.

```javascript
// Función con múltiples ramas
function calcularDescuento(precio, tipoCliente) {
  if (precio < 0) {
    throw new Error("Precio no puede ser negativo")
  }

  if (tipoCliente === "premium") {
    return precio * 0.8 // 20% descuento
  } else if (tipoCliente === "regular") {
    return precio * 0.9 // 10% descuento
  } else {
    return precio // Sin descuento
  }
}

// Tests para 100% cobertura
describe("calcularDescuento coverage", () => {
  test("precio negativo lanza error", () => {
    expect(() => calcularDescuento(-10, "regular")).toThrow()
  })

  test("cliente premium recibe 20% descuento", () => {
    expect(calcularDescuento(100, "premium")).toBe(80)
  })

  test("cliente regular recibe 10% descuento", () => {
    expect(calcularDescuento(100, "regular")).toBe(90)
  })

  test("cliente desconocido no recibe descuento", () => {
    expect(calcularDescuento(100, "nuevo")).toBe(100)
  })
})
```

## TDD Basics (Test-Driven Development)

El TDD sigue el ciclo Red-Green-Refactor.

```javascript
// 1. RED - Escribir test que falla
describe("FizzBuzz TDD", () => {
  test("devuelve el número si no es divisible por 3 o 5", () => {
    expect(fizzBuzz(1)).toBe("1")
    expect(fizzBuzz(2)).toBe("2")
  })
})

// 2. GREEN - Implementación mínima
function fizzBuzz(num) {
  return num.toString()
}

// 3. RED - Agregar más tests
test("devuelve Fizz para múltiplos de 3", () => {
  expect(fizzBuzz(3)).toBe("Fizz")
  expect(fizzBuzz(6)).toBe("Fizz")
})

// 4. GREEN - Implementar funcionalidad
function fizzBuzz(num) {
  if (num % 3 === 0) return "Fizz"
  return num.toString()
}

// 5. RED - Más tests
test("devuelve Buzz para múltiplos de 5", () => {
  expect(fizzBuzz(5)).toBe("Buzz")
  expect(fizzBuzz(10)).toBe("Buzz")
})

test("devuelve FizzBuzz para múltiplos de 3 y 5", () => {
  expect(fizzBuzz(15)).toBe("FizzBuzz")
  expect(fizzBuzz(30)).toBe("FizzBuzz")
})

// 6. GREEN - Implementación completa
function fizzBuzz(num) {
  if (num % 15 === 0) return "FizzBuzz"
  if (num % 3 === 0) return "Fizz"
  if (num % 5 === 0) return "Buzz"
  return num.toString()
}

// 7. REFACTOR - Mejorar código manteniendo tests verdes
function fizzBuzz(num) {
  const result = []
  if (num % 3 === 0) result.push("Fizz")
  if (num % 5 === 0) result.push("Buzz")
  return result.length > 0 ? result.join("") : num.toString()
}
```

## Testing Best Practices

```javascript
// ✅ BUENAS PRÁCTICAS

// 1. Tests independientes
describe("Calculator", () => {
  let calculator

  beforeEach(() => {
    calculator = new Calculator() // Fresh instance cada test
  })

  test("should add two numbers", () => {
    expect(calculator.add(2, 3)).toBe(5)
  })

  test("should subtract two numbers", () => {
    expect(calculator.subtract(5, 3)).toBe(2)
  })
})

// 2. Nombres descriptivos
test("should throw error when dividing by zero", () => {
  // Test implementation
})

// 3. Arrange-Act-Assert pattern
test("should calculate total with tax", () => {
  // Arrange
  const price = 100
  const taxRate = 0.1
  const calculator = new PriceCalculator()

  // Act
  const total = calculator.calculateWithTax(price, taxRate)

  // Assert
  expect(total).toBe(110)
})

// 4. Test casos extremos
describe("validateEmail", () => {
  test("valid email formats", () => {
    expect(validateEmail("user@domain.com")).toBe(true)
    expect(validateEmail("user.name@domain.co.uk")).toBe(true)
  })

  test("invalid email formats", () => {
    expect(validateEmail("")).toBe(false)
    expect(validateEmail("invalid")).toBe(false)
    expect(validateEmail("@domain.com")).toBe(false)
    expect(validateEmail("user@")).toBe(false)
  })

  test("edge cases", () => {
    expect(validateEmail(null)).toBe(false)
    expect(validateEmail(undefined)).toBe(false)
    expect(validateEmail(123)).toBe(false)
  })
})
```

## Debugging Tests

```javascript
// Estrategias para debuggear tests que fallan

describe("Debugging strategies", () => {
  test("failed test debugging", () => {
    const user = { name: "Juan", age: 25 }
    const result = processUser(user)

    // 1. Usar console.log para inspeccionar valores
    console.log("Input:", user)
    console.log("Result:", result)

    // 2. Verificar paso a paso
    expect(result).toHaveProperty("name")
    expect(result.name).toBe("Juan")
    expect(result).toHaveProperty("processed", true)
  })

  // 3. Test más específicos para aislar problemas
  test("processUser adds processed flag", () => {
    const input = { name: "Test" }
    const result = processUser(input)

    expect(result.processed).toBe(true)
  })

  test("processUser preserves original properties", () => {
    const input = { name: "Test", age: 30 }
    const result = processUser(input)

    expect(result.name).toBe("Test")
    expect(result.age).toBe(30)
  })
})

// 4. Setup para debugging
describe("Complex feature", () => {
  let testData

  beforeEach(() => {
    testData = {
      users: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ],
    }

    // Debug: verificar setup
    console.log("Test data setup:", testData)
  })

  test("feature works correctly", () => {
    // Test implementation with debug info
  })
})
```

Con una base sólida de pruebas, se puede escalar el código con confianza, integrar nuevas funcionalidades sin miedo a romper lo existente y facilitar la colaboración en equipos grandes.
