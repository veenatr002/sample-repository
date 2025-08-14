import React from "react";

const TodoList = ({todos, handleDelete,handleUpdate}) => {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <p style={{ fontWeight: 800 }}>{todo.title}</p>
            <p>{todo.description}</p>
          </div>
          <div className="button-group">
            <button
              style={{ backgroundColor: "blue" }}
              onClick={() => handleUpdate(todo)}
            >
              Edit
            </button>
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
