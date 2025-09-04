# Ejercicios Avanzados de JavaScript

## 1. Gestor de Notas con Persistencia Local

### Enunciado

Crea una app web que permita al usuario crear, editar y eliminar notas.

- Guardar las notas en localStorage.
- Manejar errores si el almacenamiento está lleno.
- Usar clases para modelar una Nota y un GestorNotas.
- Implementar pruebas unitarias para las funciones de agregar/eliminar.

**Temas:** DOM interaction, error handling, classes, state management, testing foundations.

---

## 2. Chat en Tiempo Real (Simulado con Promises)

### Enunciado

Simula un chat donde los mensajes llegan después de un tiempo aleatorio.

- Usa setTimeout y Promise para simular el envío y recepción.
- Maneja errores de conexión (lanzando errores personalizados).
- Usa async/await para simplificar el flujo.
- Implementa un estado global de la conversación con un patrón observer.

**Temas:** asincronía, error handling, state management patterns, closures.

---

## 3. Biblioteca Online con Búsqueda

### Enunciado

Construye un sistema de biblioteca en el navegador:

- Cada libro es un objeto con título, autor y disponibilidad.
- Clases para Libro y Biblioteca.
- Métodos para prestar y devolver libros con validación de errores.
- Manejo de formularios para agregar libros.
- Tests de unidad sobre métodos de búsqueda.

**Temas:** DOM interaction, classes, error handling, modules, testing.

---

## 4. Dashboard de Clima con API

### Enunciado

Consume una API pública de clima y muestra la información en pantalla.

- Uso de fetch con async/await.
- Manejo de errores de red (timeouts, respuestas inválidas).
- Uso de template literals y destructuring para mostrar datos.
- Estado de carga con un patrón de gestión de estado simple.

**Temas:** asincronía, error handling, ES6+ features, state management.

---

## 5. Juego "Ahorcado" en la Web

### Enunciado

Implementa el clásico juego de adivinar palabras:

- Lógica encapsulada en un módulo o clase Juego.
- Uso de closures para mantener el estado privado.
- Manejo de eventos en el DOM para cada letra seleccionada.
- Validación y errores si el usuario ingresa caracteres inválidos.
- Pruebas unitarias para la lógica principal.

**Temas:** closures, DOM interaction, classes, modules, testing.

---

## 6. Carrito de Compras con Estado Global

### Enunciado

Simula un e-commerce básico con productos:

- Agregar y eliminar productos del carrito.
- Usar un patrón observer para actualizar la vista automáticamente.
- Manejar errores (ej. intentar pagar carrito vacío).
- Guardar el estado en localStorage (persistencia).
- Implementar undo/redo en el carrito.

**Temas:** state management patterns, error handling, DOM, prototypes.

---

## 7. Reproductor de Música (Mock)

### Enunciado

Crea un reproductor que pueda:

- Reproducir, pausar y cambiar de canción.
- Usar clases para modelar Canción y Reproductor.
- Promesas para simular la carga de una canción (tiempo de espera).
- Manejo de errores si no se encuentra el archivo de audio.
- Testing de métodos del reproductor.

**Temas:** classes, async/await, error handling, testing.

---

## 8. Sistema de Autenticación (Simulado)

### Enunciado

Implementa un sistema básico de login y registro.

- Validar formularios con el DOM.
- Uso de closures para mantener contraseñas privadas.
- Promises para simular consulta a una base de datos.
- Error handling para credenciales inválidas.
- Testing de la función login().

**Temas:** closures, async, error handling, DOM interaction, testing.

---

## 9. Editor de Texto con Plugins

### Enunciado

Crea un mini-editor con las funciones:

- Negrita, cursiva, subrayado.
- Plugins externos (módulos) que agreguen funcionalidades.
- Uso de clases y prototipos para extender funcionalidades.
- Manejo de errores si un plugin no es compatible.

**Temas:** DOM, modules, classes, prototypes, error handling.

---

## 10. Sistema de Tareas con Testing Avanzado

### Enunciado

Desarrolla una app de tareas con funcionalidades:

- Crear, editar y eliminar tareas.
- Estado persistente con patrón Flux o Redux-like.
- Uso de try/catch para manejar errores en operaciones.
- Test unitarios + cobertura de al menos 80%.
- Implementar undo/redo con closures.

**Temas:** state management patterns, error handling, closures, testing.
