import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { EditTodoModal } from "../../src/components/EditTodoModal";

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("EditTodoModal", () => {
  const todo = {
    id: 5,
    title: "Existing Task",
    completed: false,
    created_at: "2024-05-09T00:02:37.234271Z",
    due_date: "2099-12-31T00:00:00Z",
    priority: "medium",
  };

  it("Opens and closes modal correctly", () => {
    render(<EditTodoModal todo={todo} updateTodo={() => {}} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Edit todo/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(screen.queryByRole("dialog")).not.toBeVisible();
  });

  it("Pre-fills the form with the todo's current details", () => {
    render(<EditTodoModal todo={todo} updateTodo={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /Edit todo/i }));

    expect(screen.getByRole("textbox", { name: /Edit task/i })).toHaveValue(
      "Existing Task"
    );
    expect(screen.getByRole("combobox", { name: /Priority/i })).toHaveValue(
      "medium"
    );
  });

  it("Form validation works correctly", () => {
    render(<EditTodoModal todo={todo} updateTodo={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /Edit todo/i }));

    fireEvent.change(screen.getByRole("textbox", { name: /Edit task/i }), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(screen.getByText("Task title cannot be empty.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
  });

  it("updateTodo is called with the edited todo when saved", async () => {
    const updateTodoMock = jest.fn().mockResolvedValue({});
    render(<EditTodoModal todo={todo} updateTodo={updateTodoMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Edit todo/i }));

    fireEvent.change(screen.getByRole("textbox", { name: /Edit task/i }), {
      target: { value: "Updated Task" },
    });

    fireEvent.change(screen.getByRole("combobox", { name: /Priority/i }), {
      target: { value: "high" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(updateTodoMock).toHaveBeenCalledWith(todo.id, {
      title: "Updated Task",
      priority: "high",
      due_date: expect.any(Date),
    });

    await act(async () => {
      await flushPromises();
    });
  });

  it("Allows saving an overdue todo when the due date itself is left unchanged", async () => {
    const overdueTodo = { ...todo, due_date: "2020-01-01T00:00:00Z" };
    const updateTodoMock = jest.fn().mockResolvedValue({});
    render(<EditTodoModal todo={overdueTodo} updateTodo={updateTodoMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Edit todo/i }));

    fireEvent.change(screen.getByRole("textbox", { name: /Edit task/i }), {
      target: { value: "Updated Overdue Task" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(
      screen.queryByText("Due date cannot be in the past.")
    ).not.toBeInTheDocument();
    expect(updateTodoMock).toHaveBeenCalledWith(overdueTodo.id, {
      title: "Updated Overdue Task",
      priority: overdueTodo.priority,
      due_date: new Date(overdueTodo.due_date),
    });

    await act(async () => {
      await flushPromises();
    });
  });

  it("Stays open until the update resolves, then closes", async () => {
    let resolveUpdate;
    const updateTodoMock = jest.fn(
      () => new Promise((resolve) => { resolveUpdate = resolve; })
    );
    render(<EditTodoModal todo={todo} updateTodo={updateTodoMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Edit todo/i }));
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(updateTodoMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await act(async () => {
      resolveUpdate({});
      await flushPromises();
    });

    expect(screen.queryByRole("dialog")).not.toBeVisible();
  });

  it("Keeps the modal and the user's changes if the update fails", async () => {
    const updateTodoMock = jest.fn().mockRejectedValue(new Error("network error"));
    render(<EditTodoModal todo={todo} updateTodo={updateTodoMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Edit todo/i }));

    fireEvent.change(screen.getByRole("textbox", { name: /Edit task/i }), {
      target: { value: "Still Editing" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await act(async () => {
      await flushPromises();
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Edit task/i })).toHaveValue(
      "Still Editing"
    );
  });

  it("Cancelling discards changes and does not call updateTodo", () => {
    const updateTodoMock = jest.fn();
    render(<EditTodoModal todo={todo} updateTodo={updateTodoMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Edit todo/i }));

    fireEvent.change(screen.getByRole("textbox", { name: /Edit task/i }), {
      target: { value: "Discarded Task" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(updateTodoMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /Edit todo/i }));

    expect(screen.getByRole("textbox", { name: /Edit task/i })).toHaveValue(
      "Existing Task"
    );
  });
});
