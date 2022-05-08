const Post = require("../models/posts.models")
const User = require("../models/users.models")

/* This is a function that creates a new post. */
exports.create = async (req, res) => {
  try {
    const {
      body: { ...rest },
      userId,
    } = req
    const user = await User.findById(userId)
    if (!user) {
      res.status(403).json({ message: "User invalid" })
      return
    }
    const post = await Post.create({ ...rest, creator: userId })
    user.posts.push(post._id)
    await user.save({ validateBeforeSave: false })
    res.status(201).json({ message: "Post created", post })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds a post by id and returns it. */
exports.show = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const post = await Post.findOne({ _id: id, creator: userId })
    if (!post) {
      res.status(403).json({ message: "User invalid" })
      return
    }
    res.status(201).json({ message: "Post found", post })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
/* This is a function that finds a post by id and updates it. */
exports.update = async (req, res) => {
  const {
    body,
    params: { id },
    userId,
  } = req
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id, creator: userId },
      body,
      {
        new: true,
      }
    )
    if (!post) {
      res.status(403).json({ message: "Post did not update" })
      return
    }
    res.status(201).json({ message: "Post updated", post })
  } catch (e) {
    res.status(400).json({ error: "An error has occurred", e })
  }
}

/* A function that finds a post by id and deletes it. */
exports.destroy = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const post = await Post.findOneAndDelete({ _id: id, creator: userId })
    if (!post) {
      res.status(403).json({ message: "Post did not delete" })
      return
    }
    res.status(201).json({ message: "Post deleted", post })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds all posts by userId and returns them. */
exports.mylist = async (req, res) => {
  try {
    const { userId } = req
    const posts = await Post.find({ creator: userId }).select(
      "title description createdAt updatedAt"
    )

    res.status(201).json({ message: `${posts.length} posts found`, posts })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

exports.listAll = async (req, res) => {
  try {
    const posts = await Post.find()
      .select("title description createdAt updatedAt creator")
      .populate("creator", "name")
    res.status(200).json({ meesage: `${posts.length} events found`, posts })
  } catch (e) {
    res.status(500).json({ error: "Error server: ", e })
  }
}
