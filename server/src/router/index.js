const express = require("express")
const router = express.Router()

router.use(express.static("/client", { maxAge: 1000 * 60 * 60 * 24 * 365 }))
router.use((req, res) => res.sendFile("/client/index.html"))

module.exports = router