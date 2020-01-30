const router = require("express").Router()
const user = require("./user")

router.use("/user", user)

router.use((req, res) => res.sendStatus(404))

module.exports = router