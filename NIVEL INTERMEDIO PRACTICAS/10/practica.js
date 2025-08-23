// Ejercicio 1
// Enunciado: Crea una función que calcule el área de un rectángulo y escribe pruebas unitarias
// para verificar que funcione correctamente con números positivos y que lance error con valores negativos.
function areaRectangulo(base, altura) {
  if (base < 0 || altura < 0) {
    throw new Error("Las dimensiones no pueden ser negativas");
  }
  return base * altura;
}

describe("areaRectangulo", () => {
  test("calcula correctamente con números positivos", () => {
    expect(areaRectangulo(5, 10)).toBe(50);
  });

  test("lanza error con números negativos", () => {
    expect(() => areaRectangulo(-5, 10)).toThrow(
      "Las dimensiones no pueden ser negativas"
    );
  });
});

// Ejercicio 2
// Enunciado: Implementa una función que determine si un número es par. Escribe tests que validen pares, impares y valores no numéricos.
function esPar(num) {
  if (typeof num !== "number") return false;
  return num % 2 === 0;
}

describe("esPar", () => {
  test("devuelve true para números pares", () => {
    expect(esPar(4)).toBe(true);
  });
  test("devuelve false para números impares", () => {
    expect(esPar(7)).toBe(false);
  });
  test("devuelve false para valores no numéricos", () => {
    expect(esPar("hola")).toBe(false);
  });
});

// Ejercicio 3
// Enunciado: Crea una clase Calculadora con métodos sumar y restar. Haz pruebas unitarias para cada método.
class Calculadora {
  sumar(a, b) {
    return a + b;
  }
  restar(a, b) {
    return a - b;
  }
}

describe("Calculadora", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculadora();
  });

  test("suma dos números", () => {
    expect(calc.sumar(2, 3)).toBe(5);
  });

  test("resta dos números", () => {
    expect(calc.restar(5, 2)).toBe(3);
  });
});

// Ejercicio 4
// Enunciado: Implementa una función que valide contraseñas (mínimo 6 caracteres y al menos un número). Haz pruebas.
function validarPassword(pass) {
  if (typeof pass !== "string") return false;
  return pass.length >= 6 && /\d/.test(pass);
}

describe("validarPassword", () => {
  test("contraseña válida", () => {
    expect(validarPassword("clave123")).toBe(true);
  });
  test("contraseña demasiado corta", () => {
    expect(validarPassword("a1b")).toBe(false);
  });
  test("contraseña sin número", () => {
    expect(validarPassword("abcdef")).toBe(false);
  });
});

// Ejercicio 5
// Enunciado: Usa mocks para simular una API que devuelve un usuario. Escribe un test para comprobar el comportamiento.
const api = {
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: "Carlos" }),
};

describe("api.fetchUser", () => {
  test("devuelve un usuario simulado", async () => {
    const user = await api.fetchUser();
    expect(user).toEqual({ id: 1, name: "Carlos" });
    expect(api.fetchUser).toHaveBeenCalledTimes(1);
  });
});

// Ejercicio 6
// Enunciado: Crea una función que devuelva "Fizz", "Buzz", "FizzBuzz" o el número según sus múltiplos. Haz pruebas unitarias.
function fizzBuzz(num) {
  if (num % 15 === 0) return "FizzBuzz";
  if (num % 3 === 0) return "Fizz";
  if (num % 5 === 0) return "Buzz";
  return num.toString();
}

describe("fizzBuzz", () => {
  test("devuelve Fizz para múltiplos de 3", () => {
    expect(fizzBuzz(6)).toBe("Fizz");
  });
  test("devuelve Buzz para múltiplos de 5", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });
  test("devuelve FizzBuzz para múltiplos de 15", () => {
    expect(fizzBuzz(30)).toBe("FizzBuzz");
  });
  test("devuelve número si no es múltiplo", () => {
    expect(fizzBuzz(7)).toBe("7");
  });
});

// Ejercicio 7
// Enunciado: Implementa una función que calcule el promedio de un arreglo. Escribe tests para arrays normales, vacíos y con un solo elemento.
function promedio(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const suma = arr.reduce((acc, val) => acc + val, 0);
  return suma / arr.length;
}

describe("promedio", () => {
  test("calcula el promedio de un arreglo", () => {
    expect(promedio([2, 4, 6, 8])).toBe(5);
  });
  test("devuelve null para arreglo vacío", () => {
    expect(promedio([])).toBeNull();
  });
  test("funciona con un solo elemento", () => {
    expect(promedio([10])).toBe(10);
  });
});

// Ejercicio 8
// Enunciado: Usa timers falsos para probar una función que ejecuta un callback después de 1 segundo.
function ejecutarConDelay(callback) {
  setTimeout(callback, 1000);
}

describe("ejecutarConDelay", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("ejecuta el callback tras 1 segundo", () => {
    const mockFn = jest.fn();
    ejecutarConDelay(mockFn);

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

// Ejercicio 9
// Enunciado: Implementa una función que devuelva el mayor número de un array. Haz pruebas unitarias.
function mayorNumero(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return Math.max(...arr);
}

describe("mayorNumero", () => {
  test("devuelve el mayor en un arreglo", () => {
    expect(mayorNumero([1, 5, 3, 9, 2])).toBe(9);
  });
  test("devuelve null si el arreglo está vacío", () => {
    expect(mayorNumero([])).toBeNull();
  });
});

// Ejercicio 10
// Enunciado: Implementa una función que valide correos electrónicos con regex. Escribe pruebas unitarias.
function validarEmail(email) {
  if (typeof email !== "string") return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

describe("validarEmail", () => {
  test("emails válidos", () => {
    expect(validarEmail("test@example.com")).toBe(true);
    expect(validarEmail("user.name@domain.co")).toBe(true);
  });
  test("emails inválidos", () => {
    expect(validarEmail("test@")).toBe(false);
    expect(validarEmail("@domain.com")).toBe(false);
    expect(validarEmail("invalid")).toBe(false);
  });
});
