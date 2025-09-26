import { useState } from "react";
import { dispatch } from "../store/store";

export default function EditForm({texto, id, className, onClose}) {
  const [newText, setText] = useState(texto)
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if(!newText .trim()) return
    dispatch({
      type: "EDIT_TASK",
      payload: {id: id, text: newText}
    })
    onClose()

  }

  return(
    <form onSubmit={handleSubmit} style={{
      display: className 
    }}>
      <input type="text" onChange={(e) =>setText(e.target.value)} placeholder={texto}/>
      <button type="submit">Editar tarea</button>
      <button type="button" onClick={() => onClose()}>❌ Cancelar</button>

    </form>
  )
}