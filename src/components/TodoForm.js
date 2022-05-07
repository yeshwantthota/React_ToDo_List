import React from "react";

const todoForm = ({ todo, onChange, editId, handleSubmit }) => {
  return (
    <form className="todoFrom" onSubmit={handleSubmit}>
      <input type="text" value={todo} onChange={onChange} />
      <button>{editId ? "Edit" : "Go"}</button>
    </form>
  );
};

export default todoForm;
