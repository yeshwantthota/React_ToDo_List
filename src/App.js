import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const App = () => {
  const [todo, settodo] = useState("");
  //we setting the initial value of todos list to the values stored in the localStorage.
  const [todos, settodos] = useState(() => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : [];
  });
  const [editId, seteditId] = useState(0);
  //useEffect gets activated whenever there is change in todos array.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onChange = (e) => {
    settodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const editTodo = todos.find((t) => t.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      settodos(updatedTodos);
      seteditId(0);
      settodo(" ");
      return;
    }
    if (todo !== " ") {
      settodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      settodo(" ");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    settodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    settodo(editTodo.todo);
    seteditId(editTodo.id);
  };
  return (
    <div className="App">
      <div className="container">
        <h1>ToDo List</h1>
        <TodoForm
          todo={todo}
          onChange={onChange}
          editId={editId}
          handleSubmit={handleSubmit}
        />
        <TodoList
          todos={todos}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;
