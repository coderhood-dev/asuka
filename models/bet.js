var mongoose = require("mongoose");

var BetSchema = new mongoose.Schema({
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
  start_price: Number,
  status: {
    type: String,
    index: true,
  },
});

var BetUserSchema = new mongoose.Schema({
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
    current: Number,
  });

var Bet = mongoose.model("Bet", BetSchema);
var BetUser = mongoose.model("BetUser", BetUserSchema);

module.exports = {
  Bet: Bet,
  BetUser: BetUser,
};
