var mongoose = require("mongoose");

var PinSchema = new mongoose.Schema({
  owner_id: {
    type: String,
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
  channel_id: {
    type: String,
    index: true,
  },
  message_id: {
    type: String,
    index: true,
  },
  message: String,
  pinned: {
    type: Boolean,
    default: true,
    index: true,
  },
});

var Pin = mongoose.model("Pin", PinSchema);

module.exports = {
  Pin: Pin,
};
