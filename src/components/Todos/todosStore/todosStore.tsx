import { ReactNode, createContext, useContext } from "react";

import useTodos from "./useTodos";

const TodosContext = createContext<ReturnType<typeof useTodos> | null>(null);

export const useTodosContext = () => useContext(TodosContext)!;

export function TodosProvider({ children }: { children: ReactNode }) {
  return (
    <TodosContext.Provider value={useTodos()}>{children}</TodosContext.Provider>
  );
}
