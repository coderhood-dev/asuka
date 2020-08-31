var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    default: `Unamed task ${Date.now()}`
  },
  owner_id: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  guild_id: {
    type: String,
  },
  channel_id: {
    type: String,
    index: true,
  },
  status: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    index: true,
    default: true,
  },
  last_update: {
    type: Date,
    default: Date.now,
  }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = {
  Task: Task,
};
