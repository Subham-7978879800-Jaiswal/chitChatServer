require("dotenv").config();
const mongoose = require("mongoose");

const run = async () => {
  const { MONGODB_CONNECTION_STRING } = process.env;

  await mongoose.connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
 console.log("Nice :) connection Established to MongoDB"); 
};

module.exports = { run };
