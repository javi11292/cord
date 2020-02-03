const router = require("express").Router()
const postgres = require("../postgres")

router.post("/add", async (req, res) => {
  try {
    await postgres.server.add(req.sesion.username, req.body.name)
    res.sendStatus(200)
  } catch (error) {
    res.send({ error: error.message })
  }
})

module.exports = router