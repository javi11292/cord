const { Pool } = require("pg")
const init = require("./init")
const user = require("./user")
const server = require("./server")

const pool = new Pool({
  host: "postgres",
  user: "postgres",
})

module.exports = {
  init: init(pool),
  user: user(pool),
  server: server(pool),
}  