import { useState } from "react"
import {dispatch} from "../store/store"
 import EditForm from "./editForm" 


export default function TaskItem({task}) {
 const [modal, setModal] = useState(false)  
  const eliminar = () => dispatch({type: "DELETE_TASK", payload: task.id})

  return (
    <li>


      {task.text}
      <button onClick={eliminar}>❌</button>
      <button onClick={() => setModal(true)}>🖋</button>

       <EditForm 
        texto={task.text} 
        id={task.id} 
        className={modal === true ? "block" : "none"}
        onClose={() => setModal(false)}
        /> 
    </li>
  )
}