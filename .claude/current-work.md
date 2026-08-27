# Current Work

## Active Issue
- **Issue**: None
- **Title**: None
- **Branch**: main
- **Started**: -

## Status
Idle. TOD-7 (Edit Todo) implemented, tested, reviewed, documented, and deployed via PR.

## Recent Changes
- TOD-7: Added `updateTodo` service call (PATCH `/api/todos/{id}/`) and a `handleUpdateTodo` hook that returns its request promise.
- TOD-7: Added `EditTodoModal.jsx`, a pencil-icon-triggered modal pre-filled with the todo's title, due date, and priority, reusing `AddTodoModal`'s validation rules; the due-date-in-the-past check only applies if the due date was actually changed, and the modal only closes once the save request succeeds (staying open with the user's edits on failure).
- TOD-7: Wired `updateTodo` through `TodoItem` → `TodoList` → `App`.
- TOD-7: Added `EditTodoModal.test.js` and updated `TodoItem.test.js`/`TodoList.test.js`; 23 frontend tests pass, lint is clean; backend suite (7 tests) unaffected.
- TOD-7: Updated `todo-app/src/README.md` and `todo-app/tests/components/README.md`, and the Linear "Todo App" project's Directory Documentation section.

## Files Modified
- todo-app/src/App.jsx
- todo-app/src/README.md
- todo-app/src/components/EditTodoModal.jsx (new)
- todo-app/src/components/TodoItem.jsx
- todo-app/src/components/TodoList.jsx
- todo-app/src/hooks/useTodos.js
- todo-app/src/services/todoServices.js
- todo-app/tests/components/EditTodoModal.test.js (new)
- todo-app/tests/components/README.md
- todo-app/tests/components/TodoItem.test.js
- todo-app/tests/components/TodoList.test.js
- .claude/current-work.md

## Next Steps
- None — awaiting PR CI results / merge decision.

## Notes
- No backend changes needed — `TodoViewSet` (DRF `ModelViewSet`) already supports `PATCH` for title/due_date/priority.
- Pre-existing, out-of-scope issue noticed: `jest.config.cjs`'s `testMatch` doesn't match on Windows checkouts because `<rootDir>` resolves with backslashes (`npm test` reports "No tests found"); worked around locally with an equivalent forward-slash `testMatch` override for validation.
