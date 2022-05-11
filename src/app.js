/* You are loading environment variables from the .env file depending on the environment. */
const path = require("path")
require("dotenv").config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV !== "production"
      ? `../.env.${process.env.NODE_ENV}`
      : "../.env"
  ),
})
/* Importing the dependencies. */
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

/* Importing the routes from the routes folder. */
const userRouter = require("./routes/users.route")
const postRouter = require("./routes/posts.route")
const deviceRouter = require("./routes/devices.route")

/* Creating an instance of the express application. */
const app = express()

/* Add the middlewares. */
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

/* It is a function to verify that the server is running, which returns a JSON object with a message. */
app.get("/", (req, res) => {
  res.status(200).json({ message: "It's working" })
})

/* Add the routes. */
app.use("/", userRouter)
app.use("/posts", postRouter)
app.use("/devices", deviceRouter)
module.exports = { app }
