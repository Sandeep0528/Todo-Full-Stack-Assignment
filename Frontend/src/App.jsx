import React, { useEffect } from 'react'
import { useState } from 'react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import {
  getTodos,
  addTodo,
  deleteTodo,
  summarizeTodos,
} from "./Api/api"

const App = () => {

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data)
  }

  const handleAdd = async (text) => {
    await addTodo(text)
    fetchTodos()
  }

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos()
  }

  const handleSummarize = async () => {
    try {
      const res = await summarizeTodos();
      setMessage(res.data.message)

    } catch (error) {
      setMessage("failed to sent summary", error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])


  return (
    <div>
      <h1>Todo Summary</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} />
      <button onClick={handleSummarize}>Summarize & Send to Slack</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default App