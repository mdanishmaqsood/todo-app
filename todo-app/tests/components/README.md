# tests/components

Jest + React Testing Library specs covering the React components in `src/components/`.

## Files

| File | Description |
|------|-------------|
| `AddTodoModal.test.js` | Tests opening/closing the modal, field rendering, validation errors, and the submitted todo payload. |
| `EditTodoModal.test.js` | Tests opening/closing the edit modal, pre-filled fields, validation errors (including that an unchanged overdue due date doesn't block saving), the updated todo payload, that the modal only closes once the update resolves (staying open with the user's changes if it fails), and that cancelling discards changes. |
| `TodoFilters.test.js` | Tests opening/closing the filter drawer, selecting filter options, and applying/clearing filters. |
| `TodoItem.test.js` | Tests rendering of a todo item's title and priority badge, checkbox state for completed/incomplete todos, and the edit button opening a pre-filled form. |
| `TodoList.test.js` | Tests the empty state, rendered item count, and debounced search input handling. |
