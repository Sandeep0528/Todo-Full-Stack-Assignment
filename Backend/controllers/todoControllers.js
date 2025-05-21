const pool = require('../models/db');
const { getSummaryFromLLM } = require("../services/llmService");
const { sendToSlack } = require("../services/slackService");

let todos = []
exports.getTodos = async (req, res) => {

    res.json(todos);
};

exports.addTodo = async (req, res) => {
    const { text } = req.body;
    const newTodo = { id: Date.now().toString(), text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    res.json({ message: "Deleted" });
};

exports.summarizeTodos = async (req, res) => {
    try {
        // Convert todos array into a plain-text list for the LLM prompt
        const todoText = todos.map((t, i) => `${i + 1}. ${t.text}`).join("\n");
        const prompt = `Summarize the following list of todos:\n${todoText}`;

        const summary = await getSummaryFromLLM(prompt);
        await sendToSlack(summary);

        res.json({ message: "Summary sent to Slack!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to summarize/send to Slack" });
    }
};
