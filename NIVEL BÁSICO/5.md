# 5. Condicionales

## If/Else Estructura

```javascript
let edad = 18

if (edad >= 18) {
  console.log("Adulto")
} else if (edad >= 13) {
  console.log("Adolescente")
} else {
  console.log("Niño")
}
```

## Switch/Case

```javascript
let dia = "lunes"

switch (dia) {
  case "lunes":
  case "martes":
    console.log("Inicio de semana")
    break
  case "miércoles":
    console.log("Mitad de semana")
    break
  case "sábado":
  case "domingo":
    console.log("Fin de semana")
    break
  default:
    console.log("Día no válido")
}
```

## Ternary Operator

```javascript
// Básico
let mensaje = edad >= 18 ? "Adulto" : "Menor"

// Anidado (con cuidado)
let categoria = edad >= 18 ? "adulto" : edad >= 13 ? "adolescente" : "niño"

// En funciones
function obtenerSaludo(esManana) {
  return esManana ? "Buenos días" : "Buenas tardes"
}
```

## Logical Operators

```javascript
// && (AND) - evaluación corta
let usuario = { nombre: "Ana" }
usuario && console.log(usuario.nombre) // Solo si usuario existe

// || (OR) - valores por defecto
let nombre = usuario.nombre || "Usuario anónimo"

// ?? (Nullish coalescing) - solo para null/undefined
let edad = usuario.edad ?? 18 // No considera 0 como falsy
```

## Short-circuit Evaluation

```javascript
// && se detiene en el primer falsy
false && console.log("No se ejecuta")
true && console.log("Sí se ejecuta")

// || se detiene en el primer truthy
true || console.log("No se ejecuta")
false || console.log("Sí se ejecuta")

// Uso práctico
function saludar(nombre) {
  nombre && console.log(`Hola ${nombre}`) // Solo si nombre existe
}
```

## Nested Conditions

```javascript
// Malo - demasiado anidado
if (usuario) {
  if (usuario.edad >= 18) {
    if (usuario.activo) {
      console.log("Usuario adulto activo")
    }
  }
}

// Mejor - early returns
function validarUsuario(usuario) {
  if (!usuario) return "Usuario no existe"
  if (usuario.edad < 18) return "Usuario menor de edad"
  if (!usuario.activo) return "Usuario inactivo"

  return "Usuario válido"
}
```
