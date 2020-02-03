const uuidv4 = require("uuid/v4")
const userServer = require("./userServer")

function server(pool) {
  const userServer = require("./userServer")(pool)

  async function add(userId, name) {
    if (!name) throw new Error("Nombre inválido")
    const serverId = uuidv4()
    
    await pool.query("INSERT INTO servers (id, name) VALUES ($1, $2)", [serverId, name])
    return userServer.add(userId, serverId)
  }

  return {
    add,
  }
}

module.exports = server