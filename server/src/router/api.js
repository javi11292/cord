const router = require("express").Router()
const user = require("./user")
const server = require("./server")
const room = require("./room")

router.use("/user", user)
router.use("/server", server)
router.use("/room", room)

router.use((req, res) => res.sendStatus(404))

module.exports = router