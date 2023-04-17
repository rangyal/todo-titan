import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import DragHandle from "@mui/icons-material/DragHandle";
import Box from "@mui/material/Box";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";

import { useTodosContext } from "./todosStore";
import NewTodo from "./NewTodo";

export const TodoList = () => {
  const { todos, toggleTodo, updateTodoText, moveTodo, deleteTodo } =
    useTodosContext();

  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    moveTodo(todos[source.index].id, destination.index);
  };

  return (
    <List>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(
            droppableProvided: DroppableProvided,
            droppableSnapshot: DroppableStateSnapshot
          ) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(
                    draggableProvided: DraggableProvided,
                    draggableSnapshot: DraggableStateSnapshot
                  ) => (
                    <ListItem
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                    >
                      <Box
                        {...draggableProvided.dragHandleProps}
                        display="flex"
                        alignItems="center"
                      >
                        <DragHandle color="action" />
                      </Box>
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                      />
                      <TextField
                        value={todo.text}
                        onChange={(event) =>
                          updateTodoText(todo.id, event.target.value)
                        }
                        variant="standard"
                        sx={{
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                        fullWidth
                        multiline
                        inputProps={{ "aria-label": `Item ${index + 1}` }}
                      />
                      <IconButton
                        aria-label="Delete item"
                        edge="end"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ListItem key="new">
        {/* Just a placeholder element that keeps "Add new item" row aligned */}
        <DragHandle sx={{ visibility: "hidden" }} />
        <NewTodo />
      </ListItem>
    </List>
  );
};

export default TodoList;
