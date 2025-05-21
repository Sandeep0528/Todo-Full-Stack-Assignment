import React from 'react'
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete }) => {
    const todoArray = Array.isArray(todos) ? todos : [];
    return (
        <div>

            {
                todoArray.map((todo => (
                    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
                ))
                )}

        </div>
    )
}

export default TodoList