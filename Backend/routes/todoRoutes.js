const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json())

const { getTodos, addTodo, deleteTodo, summarizeTodos } = require("../controllers/todoControllers");


router.get('/todos', getTodos);
router.post('/todos', addTodo);
router.delete('/todos/:id', deleteTodo);
router.post('/summarize', summarizeTodos);

module.exports = router