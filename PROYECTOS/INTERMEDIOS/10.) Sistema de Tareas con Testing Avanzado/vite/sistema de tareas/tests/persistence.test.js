import { saveState, loadState } from "../src/store/persistence";

describe("Persistencia localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("debe guardar y cargar estado", () => {
    const state = { tasks: [{ id: 1, text: "Persistente" }] };
    saveState(state);
    const loaded = loadState();
    expect(loaded.tasks.length).toBe(1);
    expect(loaded.tasks[0].text).toBe("Persistente");
  });

  test("debe devolver estado vacío si no hay datos", () => {
    const loaded = loadState();
    expect(loaded.tasks).toEqual([]);
  });

  test("maneja JSON inválido", () => {
    localStorage.setItem("tasks", "INVALID");
    const loaded = loadState();
    expect(loaded.tasks).toEqual([]);
  });
});
