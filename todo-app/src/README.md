# src

React (Vite) frontend source for the Todo app: root app shell, UI components, data-fetching hooks, the API service layer, and shared constants.

## Files

| File | Description |
|------|-------------|
| `App.jsx` | Root component; wires up the todo list, add/filter controls, and dark-mode toggle via `useTodos`. |
| `main.jsx` | App entrypoint; mounts `App` with Chakra UI's theme provider and color mode script. |

## components/

| File | Description |
|------|-------------|
| `AddTodoModal.jsx` | Modal form for creating a todo (title, priority, due date) with client-side validation. |
| `TodoFilters.jsx` | Drawer for filtering todos by completion status, priority, and due date. |
| `TodoItem.jsx` | Renders a single todo row with a completion checkbox, priority badge, and delete button. |
| `TodoList.jsx` | Renders the searchable list of todos, showing a "No Todos" state when empty. |

## hooks/

| File | Description |
|------|-------------|
| `useSearchTodos.js` | Debounced hook that searches todos by title via the API and updates state. |
| `useTodos.js` | Loads todos on mount and exposes add/delete/toggle/filter handlers, surfacing errors as toasts. |

## services/

| File | Description |
|------|-------------|
| `todoServices.js` | Axios-based API client for the `/api/todos` endpoint (get, add, delete, toggle, filter, search). |

## constants/

| File | Description |
|------|-------------|
| `todos.js` | `PriorityEnum` constant mapping priority levels to display labels. |
