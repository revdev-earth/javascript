# Ejercicios Prácticos de JavaScript

## 1. Calculadora de Gastos Personales

### Enunciado

Crea un programa que permita al usuario ingresar una lista de gastos diarios y al final muestre:

- El total gastado.
- El gasto promedio.
- El gasto más alto y el más bajo.

### Conceptos involucrados

- Variables (`let`, `const`) para guardar montos.
- Arrays para almacenar los gastos.
- Funciones para calcular total, promedio y máximo/mínimo.
- Bucles (`for`, `for...of`) para recorrer los gastos.
- Condicionales para validar si el gasto es válido (número > 0).

---

## 2. Agenda de Contactos Simple

### Enunciado

Construye una agenda que guarde contactos (nombre, teléfono, email). Permite:

- Agregar un contacto.
- Buscar un contacto por nombre.
- Listar todos los contactos.

### Conceptos involucrados

- Objetos para representar un contacto (`{ nombre, telefono, email }`).
- Arrays para almacenar múltiples contactos.
- Funciones para agregar, buscar y listar contactos.
- Condicionales para validar que no se repitan nombres.
- Uso de `console.table` para debuggear la lista.

---

## 3. Juego de Adivinanza de Números

### Enunciado

El programa genera un número secreto entre 1 y 50. El jugador debe adivinar:

- Si el número es mayor o menor, el programa da pistas.
- El jugador gana si lo adivina en menos de 5 intentos.

### Conceptos involucrados

- Variables y operadores lógicos.
- Condicionales (`if/else`) para dar pistas ("mayor"/"menor").
- Bucles (`while`) para limitar intentos.
- Funciones para verificar cada intento.
- Debugging con `console.log` para mostrar el número secreto durante pruebas.

---

## 4. Gestor de Tareas (To-Do List) en Consola

### Enunciado

Diseña un gestor donde el usuario pueda:

- Agregar una tarea.
- Marcarla como completada.
- Listar todas las tareas pendientes y completadas.

### Conceptos involucrados

- Objetos (`{ descripcion, completada }`) para modelar tareas.
- Arrays para guardar la lista de tareas.
- Funciones para agregar, marcar y listar.
- Condicionales (`if/else`, operadores lógicos).
- Métodos de array (`push`, `filter`, `map`).

---

## 5. Conversor de Temperaturas

### Enunciado

Crea un conversor que convierta temperaturas entre Celsius, Fahrenheit y Kelvin.

- El usuario ingresa un valor y la unidad.
- El programa devuelve las otras conversiones.

### Conceptos involucrados

- Variables para almacenar temperaturas.
- Funciones para convertir entre escalas.
- Condicionales (`switch/case`) para elegir la conversión correcta.
- Validaciones (`isNaN`) para detectar entradas incorrectas.
- Debugging con `console.warn` y `console.error`.
