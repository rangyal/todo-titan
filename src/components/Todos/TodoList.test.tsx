import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "./TodoList";
import { TodosProvider } from "./todosStore";
import { TodoData } from "./todosStore/types";

const todosTestData = [
  { id: 1, text: "Todo 1", completed: false },
  { id: 2, text: "Todo 2", completed: true },
  { id: 3, text: "Todo 3", completed: false },
];

const renderTodoList = () => {
  render(
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  );
};

const addTodos = async (todos: TodoData[]) => {
  const newItemTextbox = screen.getByRole("textbox", { name: "New item" });
  const addItemButton = screen.getByRole("button", { name: "Add item" });
  const newItemCheckbox = screen.getAllByRole("checkbox").at(-1)!;

  for (const todo of todos) {
    await userEvent.type(newItemTextbox, todo.text);
    if (todo.completed) {
      await userEvent.click(newItemCheckbox);
    } else {
      await userEvent.click(addItemButton);
    }
  }
};

describe("TodoList", () => {
  test("renders TodoList component without todo items", () => {
    renderTodoList();

    const newItemTextbox = screen.getByRole("textbox", { name: "New item" });
    expect(newItemTextbox).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: "Add item" });
    expect(addButton).toBeInTheDocument();
  });

  test("renders TodoList component with todo items", async () => {
    renderTodoList();
    await addTodos(todosTestData);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(4);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(4);
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
    expect(checkboxes[3]).not.toBeChecked();

    const textboxes = screen.getAllByRole("textbox");
    expect(textboxes.length).toBe(4);
    expect(textboxes[0]).toHaveValue("Todo 1");
    expect(textboxes[1]).toHaveValue("Todo 2");
    expect(textboxes[2]).toHaveValue("Todo 3");
    const newItemTextbox = textboxes[3];
    expect(newItemTextbox).toHaveValue("");
    expect(newItemTextbox).toHaveAccessibleName("New item");

    const deleteButtons = screen.getAllByRole("button", {
      name: "Delete item",
    });
    expect(deleteButtons.length).toBe(3);

    const addButton = screen.getByRole("button", { name: "Add item" });
    expect(addButton).toBeInTheDocument();
  });

  test("adds new todo item when 'Add item' button is clicked", async () => {
    renderTodoList();
    await addTodos([todosTestData[0]]);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(2);
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();

    const textboxes = screen.getAllByRole("textbox");
    expect(textboxes.length).toBe(2);
    expect(textboxes[0]).toHaveValue("Todo 1");
    expect(textboxes[1]).toHaveValue("");
  });

  test("toggles todo item when checkbox is clicked", async () => {
    renderTodoList();
    await addTodos(todosTestData);

    const checkbox = screen.getAllByRole("checkbox")[0];
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("updates todo item text when input is changed", async () => {
    renderTodoList();
    await addTodos(todosTestData);

    const textbox = screen.getAllByRole("textbox")[0];
    await userEvent.type(textbox, " Updated");
    expect(textbox).toHaveValue("Todo 1 Updated");
  });

  test("deletes todo item when 'Delete item' button is clicked", async () => {
    renderTodoList();
    await addTodos(todosTestData);

    const deleteButton = screen.getAllByRole("button", {
      name: "Delete item",
    })[0];
    await userEvent.click(deleteButton);

    const textboxes = screen.getAllByRole("textbox");
    expect(textboxes.length).toBe(3);
    expect(textboxes[0]).toHaveValue("Todo 2");
    expect(textboxes[1]).toHaveValue("Todo 3");
    expect(textboxes[2]).toHaveValue("");
  });
});
