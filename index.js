require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ToDos = require("./model/ToDo");

const PORT = 4000;
const connectionString = process.env.MG_CONNECTION;

const app = express();
mongoose.connect(connectionString);
mongoose.set("strictQuery", false);

app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("./frontend/dist"));

app.get("/api/todo", (req, res) => {
  try {
    const todos = ToDos.find();
    return res.json(todos);
  } catch (error) {
    return res.send("no todos");
  }
});
app.get("/api/todo/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  console.log(todoId);
  try {
    const todo = await ToDos.findById(todoId);
    return res.json(todo);
  } catch (error) {
    return res.send("no todos");
  }
});
app.post("/api/todo", async (req, res) => {
  const data = req.body;
  try {
    await ToDos.create(data);
    return res.status(204).send(`successfully created todo`);
  } catch (error) {
    return res.send("cannot create todos");
  }
});
app.put("/api/todo/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  let data = req.body;
  if (!todoId) return res.status(400).send("id is not provided");
  try {
    await ToDos.updateOne({ _id: todoId }, { ...data });
    return res.send(`successfully updated todo`);
  } catch (error) {
    return res.send("cannot update todos");
  }
});
app.delete("/api/todo/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  try {
    await ToDos.deleteOne({ _id: todoId });
    return res.send("successfully delete todo");
  } catch (error) {
    return res.send("no todos");
  }
});

app.listen(PORT, () => {
  `app is running on port ${PORT}`;
});
