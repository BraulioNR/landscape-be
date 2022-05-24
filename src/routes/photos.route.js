const router = require("express").Router()
const {
  create,
  mylist,
  listAll,
  update,
  show,
  destroy,
} = require("../controllers/photos.controller")
const { isAuth } = require("../utils/auth")
const { formData } = require("../utils/formData")

/* Creating a route for the `/` path, and then adding a `post` and `get` method to it using isAuthenticated. */
router.route("/").post(isAuth, formData, create).get(listAll)
router.route("/mylist").get(isAuth, mylist)
/* Creating a route for the `/:id` path, and then adding a `get`, `delete`, and `put` method to it using isAuthenticated. */
router.route("/:id").get(show).delete(isAuth, destroy).put(isAuth, update)

module.exports = router
