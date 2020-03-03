const { Pool } = require("pg")
const init = require("./init")
const user = require("./user")
const server = require("./server")
const room = require("./room")

const pool = new Pool({
  host: "postgres",
  user: "postgres",
  password: "postgres",
})

module.exports = {
  init: init(pool),
  user: user(pool),
  server: server(pool),
  room: room(pool),
}  