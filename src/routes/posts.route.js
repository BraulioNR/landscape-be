const router = require("express").Router()
/* This is destructuring the favs.controller.js file. */
const {
  create,
  mylist,
  listAll,
  update,
  show,
  destroy,
} = require("../controllers/posts.controller")
const { isAuth } = require("../utils/auth")

/* Creating a route for the `/` path, and then adding a `post` and `get` method to it using isAuthenticated. */
router.route("/").post(isAuth, create).get(listAll)
/* Creating a route for the `/:id` path, and then adding a `get`, `delete`, and `put` method to it using isAuthenticated. */
router
  .route("/:id")
  .get(isAuth, show)
  .delete(isAuth, destroy)
  .put(isAuth, update)
router.route("/mylist").get(isAuth, mylist)
module.exports = router
