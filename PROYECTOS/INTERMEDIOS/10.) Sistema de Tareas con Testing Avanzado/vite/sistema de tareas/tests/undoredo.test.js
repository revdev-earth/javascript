import { createUndoRedo } from "../src/store/undoRedo";
import { reducer, initialState } from "../src/store/reducer";

describe("Undo/Redo", () => {
  let store;

  beforeEach(() => {
    store = createUndoRedo(reducer, initialState);
  });

  test("debe hacer undo después de un add", () => {
    store.dispatch({ type: "ADD_TASK", payload: { id: 1, text: "Tarea" } });
    expect(store.getState().tasks.length).toBe(1);

    store.undo();
    expect(store.getState().tasks.length).toBe(0);
  });

  test("debe rehacer después de un undo", () => {
    store.dispatch({ type: "ADD_TASK", payload: { id: 1, text: "Tarea" } });
    store.undo();
    store.redo();
    expect(store.getState().tasks.length).toBe(1);
  });

  test("undo sin historial no cambia estado", () => {
    const prev = store.getState();
    store.undo();
    expect(store.getState()).toEqual(prev);
  });

  test("redo sin historial no cambia estado", () => {
    const prev = store.getState();
    store.redo();
    expect(store.getState()).toEqual(prev);
  });
});
