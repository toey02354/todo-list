const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  updated: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ToDo", schema);
