/* Importing the `Router` function from the `express` module. */
const router = require("express").Router()
/* Importing the `signup` and `login` functions from the `users.controller.js` file. */
const { signup, login, mydevice } = require("../controllers/users.controller")
const { isAuth } = require("../utils/auth")

/* Creating a route for the login and signup. */
router.route("/auth/login").post(login)
router.route("/auth/signup").post(signup)
router.route("/users/mydevice").get(isAuth, mydevice)
module.exports = router
