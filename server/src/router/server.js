const router = require("express").Router()
const postgres = require("../postgres")

router.get("/get", async (req, res) => {
  try {
    res.send(await postgres.server.get(req.session.username))
  } catch (error) {
    res.send({ error: error.message })
  }
})

router.post("/add", async (req, res) => {
  try {
    const response = await postgres.server.add(req.session.username, req.body.name)
    res.send(response)
  } catch (error) {
    res.send({ error: error.message })
  }
})

module.exports = router