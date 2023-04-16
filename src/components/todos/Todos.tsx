import React from "react";
import { TodoList } from "./TodoList";
import { TodosProvider } from "./todosStore";

export const Todos = () => {
  return (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  );
};

export default Todos;
