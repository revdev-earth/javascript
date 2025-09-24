import {dispatch} from "../store/store"

export default function TaskItem({task}) {
  const eliminar = () => dispatch({type: "DELETE_TASK", payload: task.id})

  console.log(":: id eliminar task:: ", task.id)

  return (
    <li>
      {task.text}
      <button onClick={eliminar}>❌</button>
    </li>
  )

}