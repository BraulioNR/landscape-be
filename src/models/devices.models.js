const { Schema, model } = require("mongoose")

const devicesSchema = new Schema(
  {
    model: {
      type: String,
      required: [true, "The model is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "The brand is required"],
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

const Device = model("Device", devicesSchema)
module.exports = Device
