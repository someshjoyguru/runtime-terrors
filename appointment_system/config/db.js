const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sp");
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;