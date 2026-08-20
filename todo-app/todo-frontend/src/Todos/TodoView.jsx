import { useEffect, useState } from "react";
import axios from "../util/apiClient";

import List from "./List";
import Form from "./Form";

const TodoView = () => {
  const [todos, setTodos] = useState([]);

  console.log("todos from API:", todos);
  console.log("type:", typeof todos);
  console.log("isArray:", Array.isArray(todos));

  const refreshTodos = async () => {
    const { data } = await axios.get("/todos");
    setTodos(data);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const createTodo = async (todo) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/todos`,
      todo,
    );
    setTodos([...todos, data]);
  };

  const deleteTodo = async (todo) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/todos/${todo._id}`);
    refreshTodos();
  };

  const completeTodo = async (todo) => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/todos/${todo._id}`, {
      text: todo.text,
      done: true,
    });
    refreshTodos();
  };

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </>
  );
};

export default TodoView;
