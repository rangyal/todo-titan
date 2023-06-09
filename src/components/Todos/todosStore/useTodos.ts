import { useState } from "react";

import type { TodoData } from "./types";

const useTodos = () => {
  const [todos, setTodos] = useState<TodoData[]>([]);

  const load = (todos: TodoData[]) => setTodos(todos);

  const addTodo = (text: string, completed = false) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: Date.now(), text, completed },
    ]);
  };

  const updateTodoText = (id: number, text: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const toggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const moveTodo = (id: number, destinationIndex: number) => {
    setTodos((currentTodos) => {
      const sourceIndex = currentTodos.findIndex((todo) => todo.id === id);

      if (sourceIndex < 0) {
        return currentTodos;
      }

      const result = [...currentTodos];
      const [itemToMove] = result.splice(sourceIndex, 1);
      return [
        ...result.slice(0, destinationIndex),
        itemToMove,
        ...result.slice(destinationIndex),
      ];
    });
  };

  const deleteTodo = (id: number) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    load,
    addTodo,
    updateTodoText,
    toggleTodo,
    moveTodo,
    deleteTodo,
  };
};

export default useTodos;
