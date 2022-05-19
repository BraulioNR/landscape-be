const { Schema, model } = require("mongoose")

const regionsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "The description is required"],
      trim: true,
    },
    src: {
      type: String,
      required: [true, "The src of image of regions is required"],
    },
    photos: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Photo",
        },
      ],
    },
  },
  { timestamps: true }
)

const Region = model("Region", regionsSchema)
module.exports = Region
