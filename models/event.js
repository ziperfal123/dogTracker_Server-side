const mongoose = require("mongoose");

const event = new mongoose.Schema({
  Date: String, //pk
  nickName: String, //pk
  totalKmWalked: Number,
  Poops: Number, //check if needed
  Snacks: Number,
  Meals: Number,
  Trips: [{ type: Object }]
  /*walkMaps: [] */
});

const Event = mongoose.model("Event", event);

module.exports = Event;
