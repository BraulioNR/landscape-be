const { Schema, model, models } = require("mongoose")
const bcrypt = require("bcrypt")

/* A regular expression that validates the email, password name and lastName. */
const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegexp =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/
const letterRegexp = /^[A-Za-z ]+$/

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 25,
      match: letterRegexp,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minlength: 3,
      maxlength: 25,
      match: letterRegexp,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      match: [emailRegexp, "The email format is invalid"],
      validate: [
        {
          async validator(email) {
            try {
              const user = await models.User.findOne({ email })
              return !user
            } catch (e) {
              return false
            }
          },
          message: "Email is already in use",
        },
      ],
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      match: [passwordRegexp, "The password is insecure"],
    },
    posts: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
    },
    photos: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Photo",
        },
      ],
    },
    device: {
      type: Schema.Types.ObjectId,
      ref: "Device",
      required: [true, "The device is required"],
    },
  },
  { timestamps: true }
)

usersSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const User = model("User", usersSchema)
module.exports = User
