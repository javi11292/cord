const router = require("express").Router()
const postgres = require("../postgres")

router.get("/get", async (req, res) => {
  try {
    res.send(await postgres.room.get(req.session.username))
  } catch (error) {
    res.send({ error: error.message })
  }
})

router.post("/add", async (req, res) => {
  try {
    res.send(await postgres.room.add(req.body.name, req.body.server, req.body.users))
  } catch (error) {
    res.send({ error: error.message })
  }
})

module.exports = router