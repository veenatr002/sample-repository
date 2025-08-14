import React from "react";

const AddTodo = ({ setTodo, addTodoHandler, todo, isEdit }) => {
  return (
    <form onSubmit={(e) => addTodoHandler(e)} className="add-todo">
      <input
        type="text"
        placeholder="Add title"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Add descriptiom"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <button
        // style={{
        //   backgroundColor: isEdit ? "yellow" : "green",
        //   color: isEdit ? "black" : "white",
        // }}
      >
        {isEdit ? "Edit todo" : "Add todo"}
      </button>
    </form>
  );
};

export default AddTodo;
