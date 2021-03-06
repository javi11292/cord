const uuidv4 = require("uuid/v4")

function server(pool) {
  const userServer = require("./userServer")(pool)

  async function get(username) {
    const { rows } = await pool.query("SELECT id, name FROM servers, users_servers WHERE id = server_id AND user_id = $1", [username])
    return rows
  }

  async function add(userId, name) {
    if (!name) throw new Error("Nombre inválido")
    const serverId = uuidv4()

    const { rows } = await pool.query("INSERT INTO servers (id, name) VALUES ($1, $2) RETURNING id, name", [serverId, name])
    await userServer.add(userId, serverId)
    return rows
  }

  return {
    get,
    add,
  }
}

module.exports = server