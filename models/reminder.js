var mongoose = require("mongoose");

var ReminderSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  equipped: Boolean,
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  }
});

var Reminder = mongoose.model('Reminder', ReminderSchema);

module.exports = {
  Reminder: Reminder
}