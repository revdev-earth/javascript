import { reducer, initialState } from "./reducer";
import { createUndoRedo } from "./undoRedo";
import { saveState, loadState } from "./persistence";

const persisted = loadState();
export const store = createUndoRedo(reducer, persisted || initialState);

export function dispatch(action) {
  const newState = store.dispatch(action);
  saveState(newState);
  return newState;
}
