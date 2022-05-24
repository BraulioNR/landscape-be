const { connect, disconnect, cleanup } = require("./database")
const { app } = require("./app")
const { verify } = require("./utils/mailer")

const port = process.env.PORT || 8000
/* Connecting to the database. */
connect()
verify()
/* Listening to the port and logging the message. */
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
