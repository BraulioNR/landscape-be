const { Schema, model, models } = require("mongoose")

const postsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "The description is required"],
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The creator's ID is required"],
    },
  },
  {
    timestamps: true,
  }
)

const Post = model("Post", postsSchema)
module.exports = Post
