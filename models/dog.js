const mongoose = require("mongoose");

const dog = new mongoose.Schema({
  Name: String, //uniq name
  requiredMeals: Number,
  requiredSnacks: Number,
  Owners: [{ type: String }]
});

const Dog = mongoose.model("Dog", dog);

module.exports = Dog;
