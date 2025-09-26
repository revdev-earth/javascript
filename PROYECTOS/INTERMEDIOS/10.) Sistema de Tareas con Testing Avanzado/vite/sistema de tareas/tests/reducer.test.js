import { reducer, initialState } from "../src/store/reducer";

describe("Reducer de tareas", () => {
  test("debe agregar una tarea", () => {
    const action = { type: "ADD_TASK", payload: { id: 1, text: "Test" } };
    const newState = reducer(initialState, action);
    expect(newState.tasks.length).toBe(1);
    expect(newState.tasks[0].text).toBe("Test");
  });

  test("debe editar una tarea", () => {
    const state = { tasks: [{ id: 1, text: "Viejo" }] };
    const action = { type: "EDIT_TASK", payload: { id: 1, text: "Nuevo" } };
    const newState = reducer(state, action);
    expect(newState.tasks[0].text).toBe("Nuevo");
  });

  test("debe eliminar una tarea", () => {
    const state = { tasks: [{ id: 1, text: "Eliminar" }] };
    const action = { type: "DELETE_TASK", payload: 1 };
    const newState = reducer(state, action);
    expect(newState.tasks.length).toBe(0);
  });

  test("acción desconocida devuelve el mismo estado", () => {
    const state = { tasks: [{ id: 1, text: "Nada" }] };
    const newState = reducer(state, { type: "UNKNOWN" });
    expect(newState).toEqual(state);
  });
});
