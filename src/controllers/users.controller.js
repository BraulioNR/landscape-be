const User = require("../models/users.models")
const Device = require("../models/devices.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { welcome } = require("../utils/mailer")

/* This is the signup function. It is creating a new user and returning a token. */
exports.signup = async (req, res) => {
  try {
    const { body } = req
    let srcPerfile = `https://ui-avatars.com/api/?rounded=true&background=random&name=${body.name.substring(
      0,
      1
    )}+${body.lastName.substring(0, 1)}`
    body.perfile = srcPerfile
    const user = await User.create(body)
    await welcome({ email: user.email, name: user.name })
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 365,
    })
    res.status(201).json({ token })
  } catch (e) {
    res.status(400).json({ error: e })
  }
}

/* This is the login function. Checking if the user exists and if the password is valid. If it is, it returns a token, else return Error. */
exports.login = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req
    const user = await User.findOne({ email })
    if (!user || !password) {
      throw new Error("Invalid email or password")
    }
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      throw new Error("Invalid email or password")
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 365,
    })
    const perfile = user.perfile
    res.status(201).json({ token, perfile })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

exports.mydevice = async (req, res) => {
  try {
    const { userId } = req

    const user = await User.findById({ userId })
    if (!user) {
      res.status(403).json({ message: "User not found" })
    }
    const device = await Device.findById(user.device)
    res.status(200).json({ device })
  } catch (e) {
    res.status(400).json({ error: e })
  }
}

exports.show = async (req, res) => {
  try {
    const { userId } = req
    const user = await User.findById(userId).select(
      "name lastName email perfile device"
    )
    if (!user) {
      res.status(403).json({ message: "User not found" })
    }
    res.status(200).json({ user })
  } catch (e) {
    res.status(400).json({ error: e })
  }
}

exports.update = async (req, res) => {
  try {
    const { userId, body } = req
    let srcPerfile = `https://ui-avatars.com/api/?rounded=true&background=random&name=${body.name.substring(
      0,
      1
    )}+${body.lastName.substring(0, 1)}`
    body.perfile = srcPerfile
    const userbd = await User.findById(userId)
    console.log(body)
    if (body.password && body.password === "") {
      console.log("dentro de if")
      console.log(body)
      delete body.password
    } else {
      console.log("dentro de else")
      if (body.password) {
        const isSame = await bcrypt.compare(body.password, userbd.password)
        if (isSame) {
          delete body.password
        }
        body.password = await bcrypt.hash(body.password, 10)
      }
    }
    console.log(body)
    console.log("Por actualizr usuario")
    const user = await User.findByIdAndUpdate(userId, body, {
      new: true,
    })
    if (!user) {
      res.status(403).json({ message: "User did not update" })
      return
    }
    res.status(201).json({ message: "User updated", user })
  } catch (e) {
    res.status(400).json({ error: e })
  }
}
