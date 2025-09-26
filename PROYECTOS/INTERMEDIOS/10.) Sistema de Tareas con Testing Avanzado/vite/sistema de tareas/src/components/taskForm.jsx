import  {useState} from "react"
import {dispatch} from "../store/store"

export default function TaskForm() {
  const [text, setText] = useState("")

const handleSubmit = (e) => {
  e.preventDefault();
  if (!text.trim()) return;
  dispatch({
    type: "ADD_TASK",
    payload: { id: Date.now(), text: text.trim() }
  });
  setText("");
};
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Nueva tarea"
      />
      <button type="submit">Agregar tarea</button>
    </form>
  )
  
}