/* Importing the jsonwebtoken library. */
const jwt = require("jsonwebtoken")

/* A middleware function that checks if the user is authenticated, obtains the token, extracts the id with the secret key, and sets in req */
exports.isAuth = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({ message: "Session expired" })
    return
  }

  const token = authorization.split(" ")[1]

  if (!token) {
    res.status(401).json({ message: "Session expired" })
    return
  }

  const { id } = jwt.verify(token, process.env.SECRET_KEY)
  req.userId = id
  next()
}
