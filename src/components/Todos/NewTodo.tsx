import { useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddOutlined from "@mui/icons-material/AddOutlined";

import { useTodosContext } from "./todosStore";

const NewTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const { addTodo } = useTodosContext();

  const handleAddTodo = (completed = false) => {
    addTodo(newTodo, completed);
    setNewTodo("");
  };

  return (
    <>
      <Checkbox
        checked={false}
        onChange={() => handleAddTodo(true)}
        disabled={!newTodo}
      />
      <TextField
        placeholder="Add new item"
        variant="standard"
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleAddTodo();
          }
        }}
        fullWidth
        multiline
        inputProps={{ "aria-label": "New item" }}
      />
      <IconButton
        aria-label="Add item"
        onClick={() => handleAddTodo()}
        disabled={!newTodo}
        edge="end"
      >
        <AddOutlined />
      </IconButton>
    </>
  );
};

export default NewTodo;
