# 9. State Management Patterns

En JavaScript, gestionar el estado significa manejar y coordinar los datos que la aplicación necesita para funcionar. Un manejo de estado correcto es clave para mantener coherencia, predecibilidad y mantenibilidad en el código.

## Local State

El estado local vive dentro de una función, módulo o closure específico. Es ideal para datos que no necesitan compartirse.

```javascript
// Estado local con closures
function crearContador() {
  let contador = 0 // Estado local privado

  return {
    incrementar() {
      contador++
      return contador
    },
    decrementar() {
      contador--
      return contador
    },
    obtener() {
      return contador
    },
  }
}

const miContador = crearContador()
console.log(miContador.incrementar()) // 1
console.log(miContador.incrementar()) // 2
console.log(miContador.obtener()) // 2

// Estado local con clases
class ComponenteLocal {
  constructor() {
    this.estado = { activo: false, datos: null }
  }

  activar() {
    this.estado.activo = true
    this.render()
  }

  setDatos(datos) {
    this.estado.datos = datos
    this.render()
  }

  render() {
    console.log("Estado actual:", this.estado)
  }
}
```

### Ventajas:

- Simplicidad y encapsulación
- Sin dependencias externas
- Fácil de testear

### Desventajas:

- Difícil de compartir entre módulos
- No hay sincronización automática

## Shared State

Cuando múltiples partes de la aplicación necesitan los mismos datos, usamos estado compartido.

```javascript
// Estado compartido con objeto global
const AppState = {
  usuario: null,
  configuracion: {},
  observers: [],

  setUsuario(usuario) {
    this.usuario = usuario
    this.notificarCambios("usuario", usuario)
  },

  setConfiguracion(config) {
    this.configuracion = { ...this.configuracion, ...config }
    this.notificarCambios("configuracion", this.configuracion)
  },

  suscribir(callback) {
    this.observers.push(callback)
  },

  notificarCambios(tipo, datos) {
    this.observers.forEach((callback) => callback(tipo, datos))
  },
}

// Uso desde diferentes módulos
function moduloA() {
  AppState.suscribir((tipo, datos) => {
    if (tipo === "usuario") {
      console.log("Módulo A: nuevo usuario", datos)
    }
  })
}

function moduloB() {
  AppState.suscribir((tipo, datos) => {
    if (tipo === "usuario") {
      console.log("Módulo B: actualizando UI para", datos)
    }
  })
}

// Estado compartido con módulo dedicado
const StateManager = (function () {
  let state = {}
  let listeners = {}

  return {
    get(key) {
      return state[key]
    },

    set(key, value) {
      const oldValue = state[key]
      state[key] = value

      if (listeners[key]) {
        listeners[key].forEach((callback) => {
          callback(value, oldValue)
        })
      }
    },

    subscribe(key, callback) {
      if (!listeners[key]) {
        listeners[key] = []
      }
      listeners[key].push(callback)

      // Retornar función para desuscribir
      return () => {
        listeners[key] = listeners[key].filter((cb) => cb !== callback)
      }
    },
  }
})()

// Uso
const unsubscribe = StateManager.subscribe("theme", (newTheme) => {
  console.log("Tema cambiado a:", newTheme)
})

StateManager.set("theme", "dark")
```

## State Machines

Las máquinas de estado modelan el flujo de datos con estados y transiciones explícitas.

```javascript
// Máquina de estado simple
class StateMachine {
  constructor(initialState, states) {
    this.currentState = initialState
    this.states = states
    this.listeners = []
  }

  transition(event) {
    const currentStateConfig = this.states[this.currentState]
    const nextState = currentStateConfig.on[event]

    if (nextState) {
      const oldState = this.currentState
      this.currentState = nextState

      // Ejecutar acciones de salida
      if (currentStateConfig.exit) {
        currentStateConfig.exit()
      }

      // Ejecutar acciones de entrada
      const nextStateConfig = this.states[nextState]
      if (nextStateConfig.enter) {
        nextStateConfig.enter()
      }

      // Notificar cambio
      this.listeners.forEach((callback) => {
        callback(oldState, this.currentState, event)
      })
    } else {
      console.warn(`Transición inválida: ${event} desde ${this.currentState}`)
    }
  }

  subscribe(callback) {
    this.listeners.push(callback)
  }

  getState() {
    return this.currentState
  }
}

// Ejemplo: Semáforo
const semaforo = new StateMachine("verde", {
  verde: {
    on: { TIMER: "amarillo" },
    enter: () => console.log("🟢 Luz verde - Pasar"),
    exit: () => console.log("Saliendo de verde"),
  },
  amarillo: {
    on: { TIMER: "rojo" },
    enter: () => console.log("🟡 Luz amarilla - Precaución"),
    exit: () => console.log("Saliendo de amarillo"),
  },
  rojo: {
    on: { TIMER: "verde" },
    enter: () => console.log("🔴 Luz roja - Detenerse"),
    exit: () => console.log("Saliendo de rojo"),
  },
})

// Uso
semaforo.subscribe((from, to, event) => {
  console.log(`Transición: ${from} → ${to} (${event})`)
})

setInterval(() => {
  semaforo.transition("TIMER")
}, 2000)
```

## Flux Pattern

Arquitectura unidireccional de datos con flujo predecible.

```javascript
// Implementación simple de Flux
class Dispatcher {
  constructor() {
    this.stores = []
  }

  register(store) {
    this.stores.push(store)
  }

  dispatch(action) {
    this.stores.forEach((store) => store.handle(action))
  }
}

class Store {
  constructor(name) {
    this.name = name
    this.state = {}
    this.listeners = []
  }

  handle(action) {
    const newState = this.reduce(this.state, action)
    if (newState !== this.state) {
      this.state = newState
      this.emit()
    }
  }

  reduce(state, action) {
    // Override en stores específicos
    return state
  }

  subscribe(callback) {
    this.listeners.push(callback)
  }

  emit() {
    this.listeners.forEach((callback) => callback(this.state))
  }

  getState() {
    return this.state
  }
}

// Store específico
class CounterStore extends Store {
  constructor() {
    super("counter")
    this.state = { count: 0 }
  }

  reduce(state, action) {
    switch (action.type) {
      case "INCREMENT":
        return { ...state, count: state.count + 1 }
      case "DECREMENT":
        return { ...state, count: state.count - 1 }
      case "RESET":
        return { ...state, count: 0 }
      default:
        return state
    }
  }
}

// Acciones
const Actions = {
  increment: () => ({ type: "INCREMENT" }),
  decrement: () => ({ type: "DECREMENT" }),
  reset: () => ({ type: "RESET" }),
}

// Setup
const dispatcher = new Dispatcher()
const counterStore = new CounterStore()

dispatcher.register(counterStore)

counterStore.subscribe((state) => {
  console.log("Nuevo estado del contador:", state)
})

// Uso
dispatcher.dispatch(Actions.increment()) // { count: 1 }
dispatcher.dispatch(Actions.increment()) // { count: 2 }
dispatcher.dispatch(Actions.reset()) // { count: 0 }
```

## Observer Pattern

Permite que múltiples objetos observen cambios en un sujeto.

```javascript
// Implementación básica del Observer Pattern
class Observable {
  constructor() {
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer)

    // Retornar función de desuscripción
    return () => {
      this.observers = this.observers.filter((obs) => obs !== observer)
    }
  }

  notify(data) {
    this.observers.forEach((observer) => {
      if (typeof observer === "function") {
        observer(data)
      } else if (observer.update) {
        observer.update(data)
      }
    })
  }
}

// Subject específico
class DataStore extends Observable {
  constructor() {
    super()
    this.data = {}
  }

  set(key, value) {
    this.data[key] = value
    this.notify({ type: "SET", key, value, data: this.data })
  }

  delete(key) {
    delete this.data[key]
    this.notify({ type: "DELETE", key, data: this.data })
  }

  get(key) {
    return this.data[key]
  }
}

// Observadores
class UIComponent {
  constructor(name) {
    this.name = name
  }

  update(change) {
    console.log(`${this.name} actualizando por:`, change)
  }
}

const logger = (change) => {
  console.log("Log:", change.type, change.key, change.value)
}

// Uso
const store = new DataStore()
const header = new UIComponent("Header")
const sidebar = new UIComponent("Sidebar")

store.subscribe(header)
store.subscribe(sidebar)
const unsubscribeLogger = store.subscribe(logger)

store.set("user", { name: "Juan", email: "juan@example.com" })
store.set("theme", "dark")
```

## State Synchronization

Mantener estados sincronizados entre diferentes partes o instancias.

```javascript
// Sincronización con localStorage
class SyncedState {
  constructor(key) {
    this.key = key
    this.listeners = []
    this.state = this.loadFromStorage()

    // Escuchar cambios en otras ventanas/tabs
    window.addEventListener("storage", (e) => {
      if (e.key === this.key) {
        this.state = JSON.parse(e.newValue || "{}")
        this.notifyListeners()
      }
    })
  }

  loadFromStorage() {
    try {
      return JSON.parse(localStorage.getItem(this.key) || "{}")
    } catch {
      return {}
    }
  }

  saveToStorage() {
    localStorage.setItem(this.key, JSON.stringify(this.state))
  }

  set(key, value) {
    this.state[key] = value
    this.saveToStorage()
    this.notifyListeners()
  }

  get(key) {
    return this.state[key]
  }

  subscribe(callback) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback)
    }
  }

  notifyListeners() {
    this.listeners.forEach((callback) => callback(this.state))
  }
}

// Sincronización con WebSockets
class NetworkSyncedState {
  constructor(websocketUrl) {
    this.state = {}
    this.listeners = []
    this.ws = new WebSocket(websocketUrl)

    this.ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data)
      if (type === "STATE_UPDATE") {
        this.state = { ...this.state, ...data }
        this.notifyListeners()
      }
    }
  }

  set(key, value) {
    this.state[key] = value
    this.ws.send(
      JSON.stringify({
        type: "STATE_CHANGE",
        data: { [key]: value },
      })
    )
    this.notifyListeners()
  }

  subscribe(callback) {
    this.listeners.push(callback)
  }

  notifyListeners() {
    this.listeners.forEach((callback) => callback(this.state))
  }
}
```

## Immutable Updates

Crear nuevos estados en lugar de modificar los existentes.

```javascript
// Helpers para actualizaciones inmutables
const ImmutableHelpers = {
  // Actualizar objeto anidado
  updateNested(obj, path, value) {
    const keys = path.split(".")
    const lastKey = keys.pop()

    let result = { ...obj }
    let current = result

    for (const key of keys) {
      current[key] = { ...current[key] }
      current = current[key]
    }

    current[lastKey] = value
    return result
  },

  // Actualizar elemento en array
  updateArrayItem(array, index, update) {
    return array.map((item, i) => (i === index ? { ...item, ...update } : item))
  },

  // Agregar elemento a array
  addToArray(array, item) {
    return [...array, item]
  },

  // Remover elemento de array
  removeFromArray(array, index) {
    return array.filter((_, i) => i !== index)
  },
}

// Store con actualizaciones inmutables
class ImmutableStore {
  constructor(initialState = {}) {
    this.state = initialState
    this.listeners = []
  }

  getState() {
    return this.state
  }

  setState(updater) {
    const newState =
      typeof updater === "function"
        ? updater(this.state)
        : { ...this.state, ...updater }

    if (newState !== this.state) {
      this.state = newState
      this.listeners.forEach((callback) => callback(this.state))
    }
  }

  updateNested(path, value) {
    this.setState((state) => ImmutableHelpers.updateNested(state, path, value))
  }

  subscribe(callback) {
    this.listeners.push(callback)
  }
}

// Ejemplo de uso
const store = new ImmutableStore({
  user: { name: "Juan", settings: { theme: "light" } },
  posts: [
    { id: 1, title: "Post 1", likes: 5 },
    { id: 2, title: "Post 2", likes: 3 },
  ],
})

store.subscribe((state) => console.log("Estado actualizado:", state))

// Actualizar configuración anidada
store.updateNested("user.settings.theme", "dark")

// Actualizar post específico
store.setState((state) => ({
  ...state,
  posts: ImmutableHelpers.updateArrayItem(state.posts, 0, { likes: 6 }),
}))
```

## Redux Patterns

Implementación básica de patrones Redux sin la librería.

```javascript
// Reducer - función pura que define cómo cambia el estado
function appReducer(state = {}, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "ADD_TODO":
      return {
        ...state,
        todos: [...(state.todos || []), action.payload],
      }
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      }
    default:
      return state
  }
}

// Store simple estilo Redux
class SimpleStore {
  constructor(reducer, initialState = {}) {
    this.reducer = reducer
    this.state = reducer(initialState, { type: "@@INIT" })
    this.listeners = []
  }

  getState() {
    return this.state
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action)
    this.listeners.forEach((callback) => callback())
  }

  subscribe(callback) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback)
    }
  }
}

// Action creators
const Actions = {
  setUser: (user) => ({ type: "SET_USER", payload: user }),
  setLoading: (loading) => ({ type: "SET_LOADING", payload: loading }),
  addTodo: (todo) => ({ type: "ADD_TODO", payload: todo }),
  toggleTodo: (id) => ({ type: "TOGGLE_TODO", payload: id }),
}

// Middleware para logging
function loggerMiddleware(store) {
  const originalDispatch = store.dispatch

  store.dispatch = function (action) {
    console.log("Dispatching:", action)
    console.log("Previous state:", store.getState())

    const result = originalDispatch.call(this, action)

    console.log("Next state:", store.getState())
    return result
  }
}

// Uso
const store = new SimpleStore(appReducer)
loggerMiddleware(store)

store.subscribe(() => {
  console.log("Store updated!")
})

store.dispatch(Actions.setUser({ name: "Ana", id: 1 }))
store.dispatch(
  Actions.addTodo({ id: 1, text: "Aprender JavaScript", completed: false })
)
```

## Context API Pattern

Patrón para evitar prop drilling sin librerías UI específicas.

```javascript
// Implementación de Context pattern en JavaScript puro
class Context {
  constructor(defaultValue) {
    this.value = defaultValue
    this.consumers = []
  }

  provide(value) {
    this.value = value
    this.notifyConsumers()
  }

  consume(callback) {
    this.consumers.push(callback)
    // Llamar inmediatamente con el valor actual
    callback(this.value)

    // Retornar función para desuscribir
    return () => {
      this.consumers = this.consumers.filter((cb) => cb !== callback)
    }
  }

  notifyConsumers() {
    this.consumers.forEach((callback) => callback(this.value))
  }
}

// Contextos específicos
const ThemeContext = new Context("light")
const UserContext = new Context(null)

// Simulación de componentes
class Component {
  constructor(name) {
    this.name = name
    this.unsubscribers = []
  }

  useContext(context, callback) {
    const unsubscribe = context.consume(callback)
    this.unsubscribers.push(unsubscribe)
  }

  destroy() {
    this.unsubscribers.forEach((unsub) => unsub())
  }
}

// Uso
const header = new Component("Header")
const sidebar = new Component("Sidebar")

header.useContext(ThemeContext, (theme) => {
  console.log(`Header: aplicando tema ${theme}`)
})

sidebar.useContext(ThemeContext, (theme) => {
  console.log(`Sidebar: cambiando a tema ${theme}`)
})

sidebar.useContext(UserContext, (user) => {
  console.log(`Sidebar: usuario actual`, user)
})

// Cambios de contexto
ThemeContext.provide("dark")
UserContext.provide({ name: "María", role: "admin" })
```

## State Persistence

Guardar y restaurar estado entre sesiones.

```javascript
// Persistencia con diferentes estrategias
class PersistentStore {
  constructor(key, storage = localStorage) {
    this.key = key
    this.storage = storage
    this.state = this.loadState()
    this.listeners = []

    // Auto-save en cambios
    this.autoSave = true
  }

  loadState() {
    try {
      const saved = this.storage.getItem(this.key)
      return saved ? JSON.parse(saved) : {}
    } catch (error) {
      console.warn("Error loading state:", error)
      return {}
    }
  }

  saveState() {
    try {
      this.storage.setItem(this.key, JSON.stringify(this.state))
    } catch (error) {
      console.warn("Error saving state:", error)
    }
  }

  setState(updates) {
    this.state = { ...this.state, ...updates }

    if (this.autoSave) {
      this.saveState()
    }

    this.listeners.forEach((callback) => callback(this.state))
  }

  getState() {
    return this.state
  }

  subscribe(callback) {
    this.listeners.push(callback)
  }

  clear() {
    this.state = {}
    this.storage.removeItem(this.key)
    this.listeners.forEach((callback) => callback(this.state))
  }
}

// Persistencia con versionado
class VersionedPersistentStore extends PersistentStore {
  constructor(key, version = 1) {
    this.version = version
    super(key)
  }

  loadState() {
    try {
      const saved = this.storage.getItem(this.key)
      if (!saved) return {}

      const parsed = JSON.parse(saved)

      // Verificar versión
      if (parsed.version !== this.version) {
        console.log("State version mismatch, migrating...")
        return this.migrate(parsed)
      }

      return parsed.state || {}
    } catch (error) {
      console.warn("Error loading state:", error)
      return {}
    }
  }

  saveState() {
    try {
      const dataToSave = {
        version: this.version,
        state: this.state,
        timestamp: Date.now(),
      }
      this.storage.setItem(this.key, JSON.stringify(dataToSave))
    } catch (error) {
      console.warn("Error saving state:", error)
    }
  }

  migrate(oldData) {
    // Override en subclases para migrar datos
    console.log("Default migration: clearing old data")
    return {}
  }
}

// Persistencia con compresión (para grandes cantidades de datos)
class CompressedPersistentStore extends PersistentStore {
  saveState() {
    try {
      // Simulación de compresión (en real usarías una librería)
      const compressed = this.compress(JSON.stringify(this.state))
      this.storage.setItem(this.key, compressed)
    } catch (error) {
      console.warn("Error saving compressed state:", error)
    }
  }

  loadState() {
    try {
      const compressed = this.storage.getItem(this.key)
      if (!compressed) return {}

      const decompressed = this.decompress(compressed)
      return JSON.parse(decompressed)
    } catch (error) {
      console.warn("Error loading compressed state:", error)
      return {}
    }
  }

  compress(data) {
    // Implementación simple - en producción usar una librería real
    return btoa(data)
  }

  decompress(data) {
    return atob(data)
  }
}
```

## Undo/Redo

Sistema de historial para navegación temporal en el estado.

```javascript
// Sistema de Undo/Redo
class UndoRedoStore {
  constructor(initialState = {}) {
    this.history = [initialState]
    this.currentIndex = 0
    this.listeners = []
    this.maxHistorySize = 50
  }

  getState() {
    return this.history[this.currentIndex]
  }

  setState(newState) {
    // Remover estados futuros si estamos en el medio del historial
    this.history = this.history.slice(0, this.currentIndex + 1)

    // Agregar nuevo estado
    this.history.push(newState)
    this.currentIndex = this.history.length - 1

    // Limitar tamaño del historial
    if (this.history.length > this.maxHistorySize) {
      this.history = this.history.slice(-this.maxHistorySize)
      this.currentIndex = this.history.length - 1
    }

    this.notifyListeners()
  }

  undo() {
    if (this.canUndo()) {
      this.currentIndex--
      this.notifyListeners()
      return true
    }
    return false
  }

  redo() {
    if (this.canRedo()) {
      this.currentIndex++
      this.notifyListeners()
      return true
    }
    return false
  }

  canUndo() {
    return this.currentIndex > 0
  }

  canRedo() {
    return this.currentIndex < this.history.length - 1
  }

  getHistoryInfo() {
    return {
      current: this.currentIndex,
      total: this.history.length,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
    }
  }

  subscribe(callback) {
    this.listeners.push(callback)
  }

  notifyListeners() {
    const state = this.getState()
    const historyInfo = this.getHistoryInfo()
    this.listeners.forEach((callback) => callback(state, historyInfo))
  }
}

// Store con comandos para undo/redo más granular
class CommandStore {
  constructor(initialState = {}) {
    this.state = initialState
    this.undoStack = []
    this.redoStack = []
    this.listeners = []
  }

  execute(command) {
    const previousState = { ...this.state }

    // Ejecutar comando
    this.state = command.execute(this.state)

    // Guardar comando con estado anterior para undo
    this.undoStack.push({
      command,
      previousState,
    })

    // Limpiar redo stack
    this.redoStack = []

    this.notifyListeners()
  }

  undo() {
    if (this.undoStack.length > 0) {
      const { command, previousState } = this.undoStack.pop()

      // Guardar estado actual para redo
      this.redoStack.push({
        command,
        currentState: { ...this.state },
      })

      // Restaurar estado anterior
      this.state = previousState
      this.notifyListeners()
      return true
    }
    return false
  }

  redo() {
    if (this.redoStack.length > 0) {
      const { command, currentState } = this.redoStack.pop()

      // Guardar estado anterior para undo
      this.undoStack.push({
        command,
        previousState: { ...this.state },
      })

      // Restaurar estado
      this.state = currentState
      this.notifyListeners()
      return true
    }
    return false
  }

  getState() {
    return this.state
  }

  subscribe(callback) {
    this.listeners.push(callback)
  }

  notifyListeners() {
    this.listeners.forEach((callback) => callback(this.state))
  }
}

// Comandos específicos
class UpdateTextCommand {
  constructor(fieldPath, newText) {
    this.fieldPath = fieldPath
    this.newText = newText
  }

  execute(state) {
    return {
      ...state,
      [this.fieldPath]: this.newText,
    }
  }
}

class AddItemCommand {
  constructor(listPath, item) {
    this.listPath = listPath
    this.item = item
  }

  execute(state) {
    return {
      ...state,
      [this.listPath]: [...(state[this.listPath] || []), this.item],
    }
  }
}

// Ejemplo de uso
const undoRedoStore = new UndoRedoStore({
  title: "Documento sin título",
  content: "",
  items: [],
})

undoRedoStore.subscribe((state, info) => {
  console.log("Estado:", state)
  console.log("Historial:", info)
})

// Simulación de cambios
undoRedoStore.setState({ ...undoRedoStore.getState(), title: "Mi Documento" })
undoRedoStore.setState({
  ...undoRedoStore.getState(),
  content: "Contenido inicial",
})
undoRedoStore.setState({
  ...undoRedoStore.getState(),
  content: "Contenido modificado",
})

console.log("Undoing...")
undoRedoStore.undo() // Vuelve a "Contenido inicial"
undoRedoStore.undo() // Vuelve a ""

console.log("Redoing...")
undoRedoStore.redo() // Vuelve a "Contenido inicial"
```

## Resumen de Patrones

- **Local State** → Encapsulación simple para datos no compartidos
- **Shared State** → Objeto global con notificaciones para datos compartidos
- **State Machines** → Estados explícitos con transiciones controladas
- **Flux Pattern** → Flujo unidireccional con dispatcher, stores y acciones
- **Observer Pattern** → Suscripción a cambios para reactividad
- **State Synchronization** → Mantener coherencia entre diferentes instancias
- **Immutable Updates** → Crear nuevos estados sin mutar los existentes
- **Redux Patterns** → Reducers puros con acciones predecibles
- **Context API Pattern** → Evitar prop drilling con contextos globales
- **State Persistence** → Guardar estado entre sesiones
- **Undo/Redo** → Navegación temporal en el historial de estados

## Cuándo Usar Cada Patrón

### Local State

✅ **Usar cuando:**

- Datos específicos de un módulo/componente
- No necesitas compartir información
- Estado temporal o de UI simple

### Shared State

✅ **Usar cuando:**

- Múltiples módulos necesitan los mismos datos
- Aplicación pequeña a mediana
- No necesitas historial de cambios

### State Machines

✅ **Usar cuando:**

- Tienes flujos complejos con múltiples estados
- Necesitas validar transiciones
- Quieres prevenir estados inválidos

### Flux/Redux Patterns

✅ **Usar cuando:**

- Aplicación grande con muchos estados compartidos
- Necesitas predictibilidad y debugging
- Múltiples desarrolladores trabajando en la misma app

### Observer Pattern

✅ **Usar cuando:**

- Necesitas reactividad simple
- Múltiples partes deben reaccionar a cambios
- No requieres un store complejo

### Persistence + Undo/Redo

✅ **Usar cuando:**

- Aplicaciones tipo editor
- Datos importantes que no se deben perder
- Experiencia de usuario que requiere navegación temporal

Cada patrón resuelve problemas específicos - la clave está en elegir el adecuado para tu caso de uso particular.
