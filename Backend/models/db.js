const { text } = require('body-parser');
const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DB_URI })

exports.getTodos = async () => {
    const res = await pool.query('SELECT * FROMtodos Order By id DESC');
    return res.rows;
}

exports.addTodo = async () => {
    const res = await pool.query('INSERT INTO todos(text) VALUES($1) RETURNING *', [text]);
    return res.rows[0];
}

exports.deleteTodo = async () => {
    const res = await pool.query('DELETE FROM todos WHERE id = $1', [id])
}

