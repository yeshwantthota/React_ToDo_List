import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [editId, seteditId] = useState(0);
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
        <form className="todoFrom" onSubmit={handleSubmit}>
          <input type="text" value={todo} onChange={onChange} />
          <button>{editId ? "Edit" : "Go"}</button>
        </form>

        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>
                {t.todo}
              </span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
