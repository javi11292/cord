const express = require("express")
const router = require("./router")
const postgres = require("./postgres")
const session = require("./middleware/session")

function initialize() {
  postgres.init().then(run).catch(() => setTimeout(initialize, 1000))
}

function run() {
  const app = express()

  app.use(session)
  app.use(express.json())
  app.use(router)

  app.listen(3000, () => console.log("Server started"))
}

initialize()

process.on("SIGTERM", process.exit)