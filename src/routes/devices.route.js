const router = require("express").Router()
/* This is destructuring the favs.controller.js file. */
const {
  create,
  list,
  update,
  show,
  destroy,
} = require("../controllers/devices.controller")
const { isAuth } = require("../utils/auth")

/* Creating a route for the `/` path, and then adding a `post` and `get` method to it using isAuthenticated. */
router.route("/").post(isAuth, create).get(list)
/* Creating a route for the `/:id` path, and then adding a `get`, `delete`, and `put` method to it using isAuthenticated. */
router
  .route("/:id")
  .get(isAuth, show)
  .delete(isAuth, destroy)
  .put(isAuth, update)
module.exports = router
