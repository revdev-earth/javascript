import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "../src/components/taskForm";
import TaskList from "../src/components/TaskList";
import { store, dispatch } from "../src/store/store";

describe("Componentes React", () => {
  beforeEach(() => {
    // Reiniciamos el store antes de cada test
    store.undo(); // limpiar estados previos
    while (store.getState().tasks.length > 0) {
      store.undo();
    }
  });

  test("TaskForm agrega tarea", () => {
    render(<TaskForm />);
    const input = screen.getByPlaceholderText("Nueva tarea...");
    const button = screen.getByText("Agregar");

    fireEvent.change(input, { target: { value: "Nueva Tarea" } });
    fireEvent.click(button);

    expect(store.getState().tasks.length).toBe(1);
    expect(store.getState().tasks[0].text).toBe("Nueva Tarea");
  });

  test("TaskList muestra tareas", () => {
    dispatch({ type: "ADD_TASK", payload: { id: 1, text: "Render Test" } });
    render(<TaskList />);
    expect(screen.getByText("Render Test")).toBeInTheDocument();
  });

  test("TaskItem elimina tarea", () => {
    dispatch({ type: "ADD_TASK", payload: { id: 1, text: "Eliminar Test" } });
    render(<TaskList />);
    const button = screen.getByText("❌");
    fireEvent.click(button);
    expect(store.getState().tasks.length).toBe(0);
  });
});
