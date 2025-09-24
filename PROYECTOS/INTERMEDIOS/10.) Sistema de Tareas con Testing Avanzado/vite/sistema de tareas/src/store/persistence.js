export function saveState(state) {
  localStorage.setItem("tasks", JSON.stringify(state));
}

export function loadState() {
  try {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : { tasks: [] };
  } catch (e) {
    console.error("error loading state", e);
    return { tasks: [] };
  }
}
