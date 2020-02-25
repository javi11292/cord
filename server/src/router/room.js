const router = require("express").Router()
const postgres = require("../postgres")

router.post("/add", async (req, res) => {
  try {
    res.send(await postgres.room.add(req.body.name, req.body.server, req.body.users))
  } catch (error) {
    res.send({ error: error.message })
  }
})

module.exports = router