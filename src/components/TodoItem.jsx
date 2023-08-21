import React, { useState, Fragment } from "react";
import {
  Radio,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  removeTodo as removeTodoAction,
  updateTodo as updateTodoAction,
} from "../store/todosActions";
import { removeTodo, updateTodoStatus } from "../api/api";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDelete = async () => {
    try {
      await removeTodo(todo._uuid);
      dispatch(removeTodoAction(todo._uuid));
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleStatusChange = async () => {
    try {
      const updatedTodo = await updateTodoStatus(todo._uuid, !todo.completed);
      dispatch(updateTodoAction(updatedTodo));
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <Fragment>
      <ListItem
        sx={{
          backgroundColor: todo.completed ? "#e0f7fa" : "#f5f5f5",
          marginBottom: "0.5rem",
        }}
      >
        <Radio
          checked={todo.completed}
          onChange={handleStatusChange}
          value={todo.id}
          color="primary"
        />
        <ListItemText primary={todo.title} />
        <ListItemText>
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemText>
      </ListItem>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Fragment>
  );
};

export default TodoItem;
