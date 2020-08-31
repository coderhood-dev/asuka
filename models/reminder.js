var mongoose = require("mongoose");

var ReminderSchema = new mongoose.Schema({
  name: String,
  room_id: String,
  owner_id: {
    type: String,
    index: true,
  },
  schedule_date: {
    type: Date,
    index: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  guild_id: {
    type: String,
    index: true,
  },
  title: String,
  message: String,
  footer: String,
  sended: Boolean,
});

var Reminder = mongoose.model("Reminder", ReminderSchema);

module.exports = {
  Reminder: Reminder,
};
