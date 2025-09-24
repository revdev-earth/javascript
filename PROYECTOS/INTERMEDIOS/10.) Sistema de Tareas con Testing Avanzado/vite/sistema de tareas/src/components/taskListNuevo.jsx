// TaskList.jsx
import React from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return <p>No hay tareas</p>;
  }

  return (
    <ul>
      {tasks
        .filter((task) => task && task.id && task.text) // evita nulos/incompletos
        .map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => onEdit(task.id)}>Editar</button>
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
          </li>
        ))}
    </ul>
  );
};

export default TaskList;
