import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Button,
  TextField,
  Modal,
  Paper,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import TodoItem from "./TodoItem";
import { fetchTodos, addTodo } from "../api/api";
import { Task } from "@mui/icons-material";
import {
  addTodo as addTodoAction,
  setTodos as setTodosAction,
} from "../store/todosActions";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [loading, setLoading] = useState(true);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [todoTitleError, setTodoTitleError] = useState("");

  useEffect(() => {
    fetchAndSetTodos();
  }, []);

  const fetchAndSetTodos = async () => {
    try {
      const fetchedTodos = await fetchTodos();
      dispatch(setTodosAction(fetchedTodos));
      setLoading(false);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodoTitle) {
      setTodoTitleError("Title can't be empty");
      return;
    }

    try {
      const newTodo = { title: newTodoTitle, completed: false };
      const addedTodo = await addTodo(newTodo);
      dispatch(addTodoAction(addedTodo));
      setNewTodoTitle("");
      closeAddModal();
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const openAddModal = () => {
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
    setTodoTitleError("");
    setNewTodoTitle("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      minHeight="5vh"
      width="60%"
      margin="0 auto"
      backgroundColor="#f5f5f5"
      padding="2rem"
      borderRadius="10px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Typography variant="h5">ToDo List</Typography>
        <Button variant="contained" onClick={openAddModal}>
          Add New
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : todos.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Task style={{ fontSize: 80, marginBottom: "0.5rem" }} />
          <Typography variant="body1" color="textSecondary">
            No Data
          </Typography>
        </div>
      ) : (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            width: "100%",
            marginTop: "20px",
          }}
        >
          {[...todos]
            .sort((a, b) => b._created - a._created)
            .sort((a, b) => {
              if (a.completed && !b.completed) return 1; // Completed items at bottom
              if (!a.completed && b.completed) return -1; // Incomplete items at top
              return 0;
            })
            .map((todo) => (
              <li key={todo._uuid}>
                <TodoItem todo={todo} />
              </li>
            ))}
        </ul>
      )}

      <Modal open={isModalOpen} onClose={closeAddModal}>
        <Paper
          style={{
            padding: "1rem",
            width: 300,
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add new item
          </Typography>
          <TextField
            label="Title"
            value={newTodoTitle}
            onChange={(e) => {
              setNewTodoTitle(e.target.value);
              setTodoTitleError("");
            }}
            fullWidth
            error={Boolean(todoTitleError)}
            helperText={todoTitleError}
          />
          <Button
            variant="contained"
            onClick={handleAddTodo}
            style={{ marginTop: "1rem" }}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            onClick={closeAddModal}
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          >
            Cancel
          </Button>
        </Paper>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={
          <Typography
            style={{
              padding: "10px",
            }}
          >
            {snackbarMessage}
          </Typography>
        }
      />
    </Box>
  );
};

export default TodoList;
