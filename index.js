require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 4000;
const connectionString = process.env.MG_CONNECTION;

const app = express();
mongoose.connect(connectionString);

app.use(cors({ methods: ["GET", "POST"] }));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("./frontend/dist"));

app.get("/", (req, res) => {
  res.send("hello");
});
app.put("/", (req, res) => {});
app.post("/", (req, res) => {});
app.delete("/", (req, res) => {});

app.listen(PORT, () => {
  `app is running on port ${PORT}`;
});
