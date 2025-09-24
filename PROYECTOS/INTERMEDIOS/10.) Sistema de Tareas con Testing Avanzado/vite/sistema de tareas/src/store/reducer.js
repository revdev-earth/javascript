export const initialState = {
  tasks: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      if (!action.payload || !action.payload.text) return state; // evitar nulos
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          t.id === action.payload.id ? { ...t, ...action.payload } : t;
        }),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(
          (t) => t && t.id !== action.payload.id // validamos que t no sea null
        ),
      };
  }
}
