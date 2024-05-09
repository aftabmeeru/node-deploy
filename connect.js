require('dotenv').config();
const mongoose = require('mongoose');

// db connection
connectMongoDB().catch((err) => console.log(err));

async function connectMongoDB() {
  // await mongoose.connect("mongodb://localhost:27017/ecommerce"); // Before connecting cloud
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
}

module.exports = {
    connectMongoDB
}