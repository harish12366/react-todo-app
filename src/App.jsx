
import { useState } from "react";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [todos, setTodos] = useState([]);

  // Add Todo
  const addTodo = (name, description) => {
    const newTodo = {
      id: Date.now(),
      name: name,
      description: description,
      status: "Not Completed",
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  // Edit Todo
  const editTodo = (id, updatedData) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedData }
          : todo
      )
    );
  };

  // Change Todo Status
  const changeStatus = (id, status) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: status }
          : todo
      )
    );
  };

  return (
    <>
      <Header />

      <Main
        todos={todos}
        onAddTodo={addTodo}
        onDeleteTodo={deleteTodo}
        onEditTodo={editTodo}
        onStatusChange={changeStatus}
      />
    </>
  );
}

export default App;
