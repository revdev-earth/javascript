export function createUndoRedo(reducer, initialState) {
  let past = [];
  let future = [];
  let present = initialState;

  return {
    dispatch(action) {
      past.push(present);
      present = reducer(present, action);
      future = [];
      return present;
    },
    undo() {
      if (past.length === 0) return present;
      future.push(present);
      present = past.pop();
      return present;
    },
    redo() {
      if (future.length === 0) return present;
      past.push(present);
      present = future.pop();
      return present;
    },
    getState() {
      return present;
    },
  };
}
