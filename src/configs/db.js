const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect("mongodb+srv://siva:siva@cluster0.c6pmx.mongodb.net/Adidas");
};
