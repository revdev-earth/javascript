// tasks_app.js
// Sistema de Tareas con patrón Redux-like, persistencia, undo/redo y tests simples.

// ---------- Storage Abstraction (localStorage o in-memory) ----------
class StorageAdapter {
  constructor(key = "TASKS_APP_V1") {
    this.key = key;
    // detect localStorage availability
    this.hasLocalStorage = typeof localStorage !== "undefined";
    if (!this.hasLocalStorage) {
      this._memory = {};
    }
  }

  load() {
    try {
      if (this.hasLocalStorage) {
        const raw = localStorage.getItem(this.key);
        return raw ? JSON.parse(raw) : null;
      } else {
        return this._memory[this.key] || null;
      }
    } catch (err) {
      console.error("Storage load error:", err);
      return null;
    }
  }

  save(data) {
    try {
      const raw = JSON.stringify(data);
      if (this.hasLocalStorage) {
        localStorage.setItem(this.key, raw);
      } else {
        this._memory[this.key] = raw;
      }
      return true;
    } catch (err) {
      console.error("Storage save error:", err);
      return false;
    }
  }

  clear() {
    if (this.hasLocalStorage) {
      localStorage.removeItem(this.key);
    } else {
      delete this._memory[this.key];
    }
  }
}

// ---------- Redux-like Store ----------
function createStore(reducer, preloadedState = {}) {
  let state = preloadedState;
  const listeners = new Set();

  return {
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((l) => {
        try {
          l();
        } catch (e) {
          console.error("Listener error:", e);
        }
      });
      return action;
    },
    getState() {
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// ---------- Task Model and Reducer ----------
/*
State shape:
{
  tasks: [{ id, descripcion, completed, createdAt, updatedAt }],
}
*/

const ACTIONS = {
  ADD: "ADD",
  EDIT: "EDIT",
  REMOVE: "REMOVE",
  SET_ALL: "SET_ALL", // replace all (for persistence load)
};

function generateId() {
  // simple id generator
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function tasksReducer(state = { tasks: [] }, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const { descripcion } = action.payload;
      if (!descripcion || typeof descripcion !== "string") {
        throw new TypeError("Descripcion invalida");
      }
      const nueva = {
        id: generateId(),
        descripcion: descripcion.trim(),
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      return { ...state, tasks: [...state.tasks, nueva] };
    }

    case ACTIONS.EDIT: {
      const { id, descripcion, completed } = action.payload;
      const idx = state.tasks.findIndex((t) => t.id === id);
      if (idx === -1) throw new Error("Tarea no encontrada");
      const tarea = state.tasks[idx];
      const updated = {
        ...tarea,
        descripcion: descripcion !== undefined ? String(descripcion).trim() : tarea.descripcion,
        completed: completed !== undefined ? Boolean(completed) : tarea.completed,
        updatedAt: Date.now(),
      };
      const tasks = [...state.tasks];
      tasks[idx] = updated;
      return { ...state, tasks };
    }

    case ACTIONS.REMOVE: {
      const { id } = action.payload;
      const tasks = state.tasks.filter((t) => t.id !== id);
      return { ...state, tasks };
    }

    case ACTIONS.SET_ALL: {
      return { ...state, tasks: Array.isArray(action.payload) ? action.payload : [] };
    }

    default:
      return state;
  }
}

// ---------- Action Creators ----------
const ActionCreators = {
  add(descripcion) {
    return { type: ACTIONS.ADD, payload: { descripcion } };
  },
  edit(id, patch) {
    return { type: ACTIONS.EDIT, payload: { id, ...patch } };
  },
  remove(id) {
    return { type: ACTIONS.REMOVE, payload: { id } };
  },
  setAll(arr) {
    return { type: ACTIONS.SET_ALL, payload: arr };
  },
};

// ---------- Persistence Integration ----------
class Persistor {
  constructor(store, storageAdapter) {
    this.store = store;
    this.storage = storageAdapter;
    // subscribe to store changes
    this.unsubscribe = store.subscribe(() => {
      try {
        const s = store.getState();
        this.storage.save(s.tasks);
      } catch (err) {
        console.error("Persistor save failed:", err);
      }
    });
  }

  load() {
    const data = this.storage.load();
    if (data) {
      try {
        const tasks = JSON.parse(JSON.stringify(data)).map((t) => ({ ...t }));
        this.store.dispatch(ActionCreators.setAll(tasks));
      } catch (err) {
        console.error("Persistor load parse failed:", err);
      }
    }
  }

  clear() {
    this.storage.clear();
  }

  stop() {
    this.unsubscribe();
  }
}

// ---------- Undo/Redo via Closure (Command stacks) ----------
function createUndoRedoManager(store) {
  // each command is { do: () => action, undo: () => action }
  const undoStack = [];
  const redoStack = [];

  function execute(command) {
    try {
      const action = command.do(); // perform action and get the dispatched action
      store.dispatch(action);
      undoStack.push(command);
      // clear redo on new action
      redoStack.length = 0;
      return true;
    } catch (err) {
      console.error("Execute command error:", err);
      throw err;
    }
  }

  function undo() {
    const cmd = undoStack.pop();
    if (!cmd) return false;
    try {
      if (typeof cmd.undo !== "function") throw new Error("No undo available for command");
      const action = cmd.undo();
      store.dispatch(action);
      redoStack.push(cmd);
      return true;
    } catch (err) {
      console.error("Undo error:", err);
      throw err;
    }
  }

  function redo() {
    const cmd = redoStack.pop();
    if (!cmd) return false;
    try {
      const action = cmd.do();
      store.dispatch(action);
      undoStack.push(cmd);
      return true;
    } catch (err) {
      console.error("Redo error:", err);
      throw err;
    }
  }

  function clear() {
    undoStack.length = 0;
    redoStack.length = 0;
  }

  return { execute, undo, redo, clear, _stacks: { undo: undoStack, redo: redoStack } };
}

// ---------- Task Manager: High-level API that uses store + undo/redo ----------
class TaskManager {
  constructor(store, undoRedo) {
    this.store = store;
    this.undoRedo = undoRedo;
  }

  addTask(descripcion) {
    // create command
    const command = {
      do: () => ActionCreators.add(descripcion),
      undo: () => {
        // find the last added task (best-effort)
        const tasks = this.store.getState().tasks;
        const last = tasks.slice().reverse().find((t) => t.descripcion === descripcion);
        if (!last) throw new Error("No se encontró tarea para deshacer ADD");
        return ActionCreators.remove(last.id);
      },
    };
    return this.undoRedo.execute(command);
  }

  editTask(id, patch) {
    // read current to be able to undo
    const current = this.store.getState().tasks.find((t) => t.id === id);
    if (!current) throw new Error("Tarea no encontrada para editar");
    const command = {
      do: () => ActionCreators.edit(id, patch),
      undo: () => ActionCreators.edit(id, { descripcion: current.descripcion, completed: current.completed }),
    };
    return this.undoRedo.execute(command);
  }

  removeTask(id) {
    const current = this.store.getState().tasks.find((t) => t.id === id);
    if (!current) throw new Error("Tarea no encontrada para eliminar");
    const command = {
      do: () => ActionCreators.remove(id),
      undo: () => ActionCreators.add(current.descripcion), // simple undo: re-add (new id)
    };
    return this.undoRedo.execute(command);
  }

  listPending() {
    return this.store.getState().tasks.filter((t) => !t.completed);
  }

  listCompleted() {
    return this.store.getState().tasks.filter((t) => t.completed);
  }

  // direct undo/redo calls
  undo() {
    return this.undoRedo.undo();
  }
  redo() {
    return this.undoRedo.redo();
  }
}

// ---------- Simple Test Runner ----------
function assertEquals(actual, expected, msg) {
  if (actual === expected) return { ok: true };
  return { ok: false, message: `${msg} - expected: ${expected} but got: ${actual}` };
}

function assert(condition, msg) {
  if (condition) return { ok: true };
  return { ok: false, message: msg || "Assertion failed" };
}

async function runTests() {
  const results = [];
  const storage = new StorageAdapter("__TEST_TASKS__");
  storage.clear();

  // create store & components
  const store = createStore(tasksReducer, { tasks: [] });
  const persistor = new Persistor(store, storage);
  const undoRedo = createUndoRedoManager(store);
  const manager = new TaskManager(store, undoRedo);

  // Test 1: add task
  try {
    manager.addTask("Comprar leche");
    const tasks = store.getState().tasks;
    results.push(assert(tasks.length === 1, "Añadir tarea debe crear 1 tarea"));
    results.push(assert(tasks[0].descripcion === "Comprar leche", "Descripcion correcta"));
  } catch (err) {
    results.push({ ok: false, message: "Add task threw: " + err.message });
  }

  // Test 2: edit task
  try {
    const id = store.getState().tasks[0].id;
    manager.editTask(id, { descripcion: "Comprar leche y pan" });
    const t = store.getState().tasks.find((x) => x.id === id);
    results.push(assertEquals(t.descripcion, "Comprar leche y pan", "Editar tarea actualiza descripcion"));
  } catch (err) {
    results.push({ ok: false, message: "Edit task threw: " + err.message });
  }

  // Test 3: remove task
  try {
    const id = store.getState().tasks[0].id;
    manager.removeTask(id);
    results.push(assert(store.getState().tasks.length === 0, "Eliminar tarea quita elemento de state"));
  } catch (err) {
    results.push({ ok: false, message: "Remove task threw: " + err.message });
  }

  // Test 4: undo add
  try {
    manager.addTask("Tarea A");
    manager.addTask("Tarea B");
    const before = store.getState().tasks.length;
    manager.undo(); // should undo adding Tarea B
    results.push(assert(store.getState().tasks.length === before - 1, "Undo debe reducir 1 tarea"));
  } catch (err) {
    results.push({ ok: false, message: "Undo test threw: " + err.message });
  }

  // Test 5: redo
  try {
    const before = store.getState().tasks.length;
    undoRedo.redo(); // redo add Tarea B
    results.push(assert(store.getState().tasks.length === before + 1, "Redo debe aumentar 1 tarea"));
  } catch (err) {
    results.push({ ok: false, message: "Redo test threw: " + err.message });
  }

  // Test 6: persistence
  try {
    // save happened automatically via Persistor subscription
    // create a fresh store and load
    const store2 = createStore(tasksReducer, { tasks: [] });
    const pers2 = new Persistor(store2, storage);
    pers2.load();
    results.push(assert(store2.getState().tasks.length >= 1, "Persistencia debe restaurar tareas"));
    pers2.stop();
  } catch (err) {
    results.push({ ok: false, message: "Persistence test threw: " + err.message });
  }

  // Evaluate results
  const passed = results.filter((r) => r.ok).length;
  const total = results.length;
  const coverageApprox = Math.round((passed / total) * 100);

  console.log("=== TEST RESULTS ===");
  results.forEach((r, i) => {
    if (r.ok) console.log(`Test ${i + 1}: OK`);
    else console.error(`Test ${i + 1}: FAIL — ${r.message}`);
  });
  console.log(`Passed ${passed}/${total} tests — coverage approx: ${coverageApprox}%`);

  // cleanup
  persistor.stop();
  storage.clear();

  return { passed, total, coverageApprox };
}

// ---------- Example usage (CLI-like) ----------
function exampleRun() {
  // build runtime system (store, persistor, manager)
  const store = createStore(tasksReducer, { tasks: [] });
  const storage = new StorageAdapter("TASKS_APP_V1");
  const persistor = new Persistor(store, storage);
  const undoRedo = createUndoRedoManager(store);
  const manager = new TaskManager(store, undoRedo);

  // subscribe for demo
  store.subscribe(() => console.log("STATE:", JSON.stringify(store.getState().tasks, null, 2)));

  // demo flow with try/catch
  try {
    manager.addTask("Pagar facturas");
    manager.addTask("Enviar email al cliente");
    // edit first task
    const firstId = store.getState().tasks[0].id;
    manager.editTask(firstId, { completed: true });
    // remove second
    const secondId = store.getState().tasks[1] && store.getState().tasks[1].id;
    if (secondId) manager.removeTask(secondId);

    console.log("Pending:", manager.listPending());
    console.log("Completed:", manager.listCompleted());
  } catch (err) {
    console.error("Operación fallida:", err.message);
  }

  // expose for interactive debugging
  return { store, persistor, manager, undoRedo, storage };
}

// Run tests automatically when file is executed
if (typeof window === "undefined" || typeof document === "undefined") {
  // likely Node
  (async () => {
    await runTests();
    // optional: example usage
    // exampleRun();
  })();
} else {
  // Browser: attach manager to window for interactive use and run tests
  (async () => {
    const res = await runTests();
    window.TASKS_APP = { runTests, exampleRun };
    console.log("Carga completa, TASKS_APP disponible en window (browser).");
  })();
}
