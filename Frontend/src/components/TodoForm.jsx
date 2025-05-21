import React, { useState } from 'react'

const TodoForm = ({ onAdd }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text.trim()) return;
        onAdd(text)
        setText("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder='New Todo' />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default TodoForm