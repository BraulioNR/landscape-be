const Region = require("../models/regions.models")
/* This is a function that creates a new region. */
exports.create = async (req, res) => {
  try {
    const { body } = req
    console.log("region")
    console.log(body)
    const region = await Region.create(body)
    res.status(201).json({ message: "Region created", region })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds a region by id and returns it. */
exports.show = async (req, res) => {
  try {
    const {
      params: { id },
    } = req
    const region = await Region.findOne({ _id: id }).populate("photos", "")
    if (!region) {
      res.status(403).json({ message: "Region invalid" })
      return
    }
    res.status(201).json({ message: "Region found", region })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
/* This is a function that finds a region by id and updates it. */
exports.update = async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  try {
    const region = await Region.findOneAndUpdate({ _id: id }, body, {
      new: true,
    })
    if (!region) {
      res.status(403).json({ message: "Region did not update" })
      return
    }
    res.status(201).json({ message: "Region updated", region })
  } catch (e) {
    res.status(400).json({ error: "An error has occurred", e })
  }
}

/* A function that finds a region by id and deletes it. */
exports.destroy = async (req, res) => {
  try {
    const {
      params: { id },
    } = req
    const region = await Region.findOneAndDelete({ _id: id })
    if (!region) {
      res.status(403).json({ message: "Region did not delete" })
      return
    }
    res.status(201).json({ message: "Region deleted", region })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds all regions by userId and returns them. */
exports.list = async (req, res) => {
  try {
    const regions = await Region.find()
    res
      .status(201)
      .json({ message: `${regions.length} regions found`, regions })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

/* This is a function that finds the top 5 regions by createdAt and returns them. */
exports.top = async (req, res) => {
  try {
    const regions = await Region.find().sort({ createdAt: 1 }).limit(6)
    res.status(201).json({ message: `Top six regions found`, regions })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
