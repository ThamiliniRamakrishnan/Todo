import React, { Fragment } from "react";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

const App = () => {
  return (
    <Fragment>
      <Header />
      <TodoList />
    </Fragment>
  );
};

export default App;
