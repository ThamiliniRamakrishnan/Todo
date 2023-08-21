const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };

    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "REMOVE_TODO":
      const updatedTodos = state.todos.filter(
        (todo) => todo._uuid !== action.payload
      );
      return {
        ...state,
        todos: updatedTodos,
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._uuid === action.payload._uuid ? action.payload : todo
        ),
      };

    default:
      return state;
  }
};

export default todosReducer;
