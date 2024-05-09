require("dotenv").config();
const express = require("express");
const { connectMongoDB } = require('./connect');
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const publicKey = fs.readFileSync(path.resolve(__dirname,'./public.key'), 'utf-8');

const server = express();
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/users");

// MongoDB connection
connectMongoDB();

// For react connection open theory folder and read MERN file

// bodyParser
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    console.log(token);
    const decoded = jwt.verify(token, publicKey);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

server.use(cors()); // To work with react server and node server
server.use(express.json()); // To work with a json data
server.use(morgan("combined")); // User data
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR))); // Access public directory
server.use("/auth", authRouter.router);
server.use("/products", auth, productRouter.router); // For routes - Product router
server.use("/users", auth, userRouter.router); // For routes - User router

// Below to work with build (in vite 'dist') folder - Server Side Rendering
server.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'dist','index.html'));
})

// console.log(userRouter);

server.listen(process.env.PORT, () => {
  console.log("Server Started");
});
