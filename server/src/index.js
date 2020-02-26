const express = require("express")
const router = require("./router")
const postgres = require("./postgres")
const session = require("./middleware/session")
const socket = require("./socket")
const https = require("https")
const http = require("http")
const fs = require("fs")

function getOptions() {
  try {
    return {
      key: fs.readFileSync(process.env.KEY),
      cert: fs.readFileSync(process.env.CERT),
    }
  } catch  { }
}

function initialize() {
  postgres.init().then(run).catch(() => setTimeout(initialize, 1000))
}

function run() {
  const app = express()
  const options = getOptions()

  app.use(session)
  app.use(express.json())
  app.use(router)

  if (options) {
    socket(https.createServer(options, app).listen(3443, () => console.log("HTTPS server started")))
  } else {
    socket(http.createServer(app).listen(3080, () => console.log("HTTP server started")))
  }
}

initialize()

process.on("SIGTERM", process.exit)