import { useEffect, useState } from "react";
import { store } from "../store/store";
import TaskItem from "./taskItem";

export default function TaskList() {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    const interval = setInterval(() => setState(store.getState()), 200)
    return () => clearInterval(interval)
  }, [])

  if (!state.tasks || state.tasks.length === 0) {
    return <p>No hay tareas</p>;
  }

  return (
    <ul>
      {state.tasks
        .filter((t) => t && t.id && t.text) // filtramos tareas nulas o incompletas
        .map((t) => (
          <TaskItem key={t.id} task={t}/>
      ))}
    </ul>
  )
}