const { Schema, model } = require("mongoose")

const photosSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The title is required"],
      trim: true,
    },
    location: {
      type: Array,
      default: [],
      required: [true, "The location is required"],
    },
    image: {
      type: String,
      required: [true, "The image is required"],
    },
    rating: {
      type: Number,
    },
    auto: {
      type: Boolean,
      default: false,
    },
    shutterSpeed: {
      type: String,
      trim: true,
      default: "auto",
    },
    aperture: {
      type: String,
      trim: true,
      default: "auto",
    },
    lens: {
      type: String,
      trim: true,
      default: "auto",
    },
    iso: {
      type: String,
      trim: true,
      default: "auto",
    },
    hdr: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The creator's ID is required"],
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: "Region",
      required: [true, "The region's ID is required"],
    },
    device: {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
  },
  { timestamps: true }
)

const Photo = model("Photo", photosSchema)
module.exports = Photo
