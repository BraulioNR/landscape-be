const Device = require("../models/devices.models")
const User = require("../models/users.models")

/* This is a function that creates a new device. */
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
    const device = await Device.create({ ...rest, creator: userId })
    res.status(201).json({ message: "Device created", device })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds a device by id and returns it. */
exports.show = async (req, res) => {
  try {
    const {
      params: { id },
    } = req
    const device = await Device.findOne({ _id: id })
    if (!device) {
      res.status(403).json({ message: "Device invalid" })
      return
    }
    res.status(201).json({ message: "Device found", device })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
/* This is a function that finds a device by id and updates it. */
exports.update = async (req, res) => {
  const {
    body,
    params: { id },
    userId,
  } = req
  try {
    const device = await Device.findOneAndUpdate(
      { _id: id, creator: userId },
      body,
      {
        new: true,
      }
    )
    if (!device) {
      res.status(403).json({ message: "Device did not update" })
      return
    }
    res.status(201).json({ message: "Device updated", device })
  } catch (e) {
    res.status(400).json({ error: "An error has occurred", e })
  }
}

/* A function that finds a device by id and deletes it. */
exports.destroy = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const device = await Device.findOneAndDelete({ _id: id, creator: userId })
    if (!device) {
      res.status(403).json({ message: "Device did not delete" })
      return
    }
    res.status(201).json({ message: "Device deleted", device })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds all devices by userId and returns them. */
exports.list = async (req, res) => {
  try {
    const devices = await Device.find()
    res
      .status(201)
      .json({ message: `${devices.length} devices found`, devices })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
