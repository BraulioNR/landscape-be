const Device = require("../models/devices.models")
const Photo = require("../models/photos.models")
const Region = require("../models/regions.models")
const User = require("../models/users.models")

/* This is a function that creates a new photo. */
exports.create = async (req, res) => {
  try {
    const {
      body: { regionId, deviceId, ...rest },
      userId,
    } = req
    const user = await User.findById(userId)
    if (!user) {
      res.status(403).json({ message: "User invalid" })
      return
    }
    const region = await Region.findById(regionId)
    if (!region) {
      res.status(403).json({ message: "Region invalid" })
      return
    }
    let device
    if (!deviceId) {
      device = await Device.findById(user.device)
    } else {
      device = await Device.findById(deviceId)
    }

    if (!device) {
      res.status(403).json({ message: "Device invalid" })
    }

    const photo = await Photo.create({
      creator: userId,
      region: regionId,
      device: device._id,
      ...rest,
    })

    user.photos.push(photo._id)
    await user.save({ validateBeforeSave: false })
    region.photos.push(photo._id)
    await region.save({ validateBeforeSave: false })
    res.status(201).json({ message: "Photo created", photo })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds a photo by id and returns it. */
exports.show = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req

    const photo = await Photo.findOne({ _id: id, creator: userId })
      .populate("region", "name")
      .populate("device", "model brand aliases")
    if (!photo) {
      res.status(403).json({ message: "User invalid" })
      return
    }
    res.status(201).json({ message: "Photo found", photo })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
/* This is a function that finds a photo by id and updates it. */
exports.update = async (req, res) => {
  const {
    body: { regionId, deviceId, ...rest },
    params: { id },
    userId,
  } = req
  try {
    if (regionId) {
      const region = await Region.findById(regionId)
      if (!region) {
        res.status(403).json({ message: "Region invalid" })
        return
      }
    }
    if (deviceId) {
      device = await Device.findById(deviceId)
      if (!device) {
        res.status(403).json({ message: "Device invalid" })
        return
      }
    }
    const photo = await Photo.findOneAndUpdate(
      { _id: id, creator: userId },
      { region: regionId, device: deviceId, ...rest },
      {
        new: true,
      }
    )
    if (!photo) {
      res.status(403).json({ message: "Photo did not update" })
      return
    }
    res.status(201).json({ message: "Photo updated", photo })
  } catch (e) {
    res.status(400).json({ error: "An error has occurred", e })
  }
}

/* A function that finds a photo by id and deletes it. */
exports.destroy = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const photo = await Photo.findOneAndDelete({ _id: id, creator: userId })
    if (!photo) {
      res.status(403).json({ message: "Photo did not delete" })
      return
    }
    res.status(201).json({ message: "Photo deleted", photo })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds all photos by userId and returns them. */
exports.mylist = async (req, res) => {
  try {
    const { userId } = req
    const photos = await Photo.find({ creator: userId })
      .select(
        "title location image rating auto shutterSpeed aperture lens iso hdr region device"
      )
      .populate("region", "name")
      .populate("device", "model brand aliases")

    res.status(201).json({ message: `${photos.length} photos found`, photos })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

exports.listAll = async (req, res) => {
  try {
    const photos = await Photo.find()
      .populate("creator", "name")
      .populate("region", "name")
      .populate("device", "model brand aliases")
    res.status(200).json({ meesage: `${photos.length} events found`, photos })
  } catch (e) {
    res.status(500).json({ error: "Error server: ", e })
  }
}
