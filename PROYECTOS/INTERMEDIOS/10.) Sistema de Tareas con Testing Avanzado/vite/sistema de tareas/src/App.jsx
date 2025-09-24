import './App.css'
import TaskForm from "./components/taskForm"
import TaskList from "./components/taskList"
import { store } from './store/store'

function App() {

  return (
    <div>
      <h1>📋 Sistema de Tareas</h1>
      <TaskForm />
      <TaskList />

      <div>
        <button onClick={() => store.undo()}>↩</button>
        <button onClick={() => store.redo()}>↪ </button>
      </div>
    </div>
  )
}

export default App
