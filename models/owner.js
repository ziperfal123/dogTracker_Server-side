const mongoose = require("mongoose");

const owner = new mongoose.Schema({
  fullName: String,
  Email: String,
  Password: String,
  Dogs: [{ type: String }]
});

const Owner = mongoose.model("Owner", owner);

module.exports = Owner;
