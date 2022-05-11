const { connect, disconnect, cleanup } = require("./database")
const { app } = require("./app")

const port = process.env.PORT || 8000
/* Connecting to the database. */
connect()

/* Listening to the port and logging the message. */
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
