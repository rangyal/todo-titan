import { act, renderHook } from "@testing-library/react";

import useTodos from "./useTodos";

const todosTestData = [
  { id: 1, text: "Todo 1", completed: false },
  { id: 2, text: "Todo 2", completed: true },
  { id: 3, text: "Todo 3", completed: false },
];

describe("useTodos", () => {
  it("should initialize with an array of todos", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.load(todosTestData);
    });

    expect(result.current.todos).toMatchObject([
      { id: 1, text: "Todo 1", completed: false },
      { id: 2, text: "Todo 2", completed: true },
      { id: 3, text: "Todo 3", completed: false },
    ]);
  });

  it("should add a todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Test Todo");
    });

    expect(result.current.todos.length).toBe(1);

    const todoAdded = result.current.todos[0];
    expect(todoAdded.id).toBeDefined();
    expect(todoAdded.text).toBe("Test Todo");
    expect(todoAdded.completed).toBe(false);
  });

  it("should update a todo's text", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.load(todosTestData);
      result.current.updateTodoText(2, "Updated todo");
    });

    expect(result.current.todos[1]).toMatchObject({
      id: 2,
      text: "Updated todo",
      completed: true,
    });
  });

  it("should toggle a todo's completed status", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.load(todosTestData);
      result.current.toggleTodo(1);
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo(1);
    });

    expect(result.current.todos[0].completed).toBe(false);
  });

  it("should move a todo to a different index", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.load(todosTestData);
      result.current.moveTodo(1, 2);
    });

    expect(result.current.todos).toMatchObject([
      { id: 2, text: "Todo 2", completed: true },
      { id: 3, text: "Todo 3", completed: false },
      { id: 1, text: "Todo 1", completed: false },
    ]);
  });

  it("should delete a todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.load(todosTestData);
      result.current.deleteTodo(1);
    });

    expect(result.current.todos).toMatchObject([
      { id: 2, text: "Todo 2", completed: true },
      { id: 3, text: "Todo 3", completed: false },
    ]);
  });
});
