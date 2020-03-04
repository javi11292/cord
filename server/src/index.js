const express = require("express")
const compression = require("compression")
const https = require("https")
const http = require("http")
const fs = require("fs")
const { PeerServer } = require("peer")
const router = require("./router")
const postgres = require("./postgres")
const session = require("./middleware/session")
const socket = require("./socket")

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
  const httpServer = http.createServer(app)
  const httpsServer = options ? https.createServer(options, app) : null

  app.use((req, res, next) => {
    if (options && !req.secure) res.redirect(301, `https://${req.headers.host}${req.url}`)
    else next()
  })

  app.use(compression())
  app.use(session)
  app.use(express.json())
  app.use(router)

  PeerServer({ port: 9000, path: '/peer', ssl: options });

  httpServer.listen(3080, () => console.log("HTTP server started"))

  if (options) {
    httpsServer.listen(3443, () => console.log("HTTPS server started"))
    socket(httpsServer)
  } else {
    socket(httpServer)
  }
}

initialize()

process.on("SIGTERM", process.exit)