import axios from "axios";

const API_URL = "https://todo-full-stack-assignment.onrender.com/api";

export const getTodos = () => axios.get(`${API_URL}/todos`);
export const addTodo = (text) => axios.post(`${API_URL}/todos`, { text });
export const deleteTodo = (id) => axios.delete(`${API_URL}/todos/${id}`);
export const summarizeTodos = () => axios.post(`${API_URL}/summarize`);
