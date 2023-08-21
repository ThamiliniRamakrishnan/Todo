export const setTodos = (todos) => {
  return {
    type: "SET_TODOS",
    payload: todos,
  };
};

export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

export const removeTodo = (todoId) => {
  return {
    type: "REMOVE_TODO",
    payload: todoId,
  };
};

export const updateTodo = (updatedTodo) => {
  return {
    type: "UPDATE_TODO",
    payload: updatedTodo,
  };
};
