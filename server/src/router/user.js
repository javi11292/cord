const router = require("express").Router()
const postgres = require("../postgres")

router.get("/session", (req, res) => {
  const {
    logged = false,
    username = "",
  } = req.session

  res.send({
    logged,
    username,
  })
})

router.post("/get", async (req, res) => {
  try {
    res.send(await postgres.user.get(req.session.username, req.body.username + "%"))
  } catch (error) {
    res.send({ error: error.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    await postgres.user.login(req.body.username, req.body.password)
    req.session.username = req.body.username
    req.session.logged = true
    res.sendStatus(200)
  } catch (error) {
    res.send({ error: error.message })
  }
})

router.post("/logout", async (req, res) => {
  req.session.logged = false
  res.sendStatus(200)
})

router.post("/register", async (req, res) => {
  try {
    await postgres.user.register(req.body.username, req.body.password, req.body.confirmPassword)
    req.session.username = req.body.username
    req.session.logged = true
    res.sendStatus(200)
  } catch (error) {
    res.send({ error: error.message })
  }
})

module.exports = router