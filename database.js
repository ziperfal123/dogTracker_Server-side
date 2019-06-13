const mongoose = require("mongoose");
const consts = require("./consts.js");
const { MLAB_URL, DB_USER, DB_PASS } = consts;

const options = {
  useNewUrlParser: true, // For deprecation warnings
  useCreateIndex: true, // For deprecation warnings
  user: DB_USER,
  pass: DB_PASS,
  autoReconnect: true
};
mongoose
  .connect(MLAB_URL, options)
  .then(() => console.log("connected"))
  .catch(err => console.log(`connection error: ${err}`));
