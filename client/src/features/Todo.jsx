import React from "react";
import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [isEdit, setisEdit] = useState(false);

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8000/api/todos/");
    //  console.log(response)
    const data = await response.json();
    //  console.log(data)
    setTodos(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addTodoHandler(e) {
    e.preventDefault();
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://127.0.0.1:8000/api/todos/${todo.id}/`
      : `http://127.0.0.1:8000/api/todos/`;
    const response = await fetch(url, {
      method: method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    console.log(data);
    fetchData();
    setTodo({ title: "", description: "", completed: false });
    setisEdit(false);
  }

  async function handleDelete(id) {
    await fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
      method: "DELETE",
    });
    fetchData();
  }
  async function handleUpdate(todo) {
    setTodo(todo);
    setisEdit(true);
  }
  return (
    <>
      <div
        style={{
          width: "400px",
          padding: "20px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          backgroundColor: "turquoise",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Task Manager</h1>

        <AddTodo
          todo={todo}
          addTodoHandler={addTodoHandler}
          setTodo={setTodo}
          isEdit={isEdit}
        />
        <TodoList
          todos={todos}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  )
}

export default Todo;
