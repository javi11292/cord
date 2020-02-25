const uuidv4 = require("uuid/v4")

function server(pool) {
  const userRoom = require("./userRoom")(pool)
  const serverRoom = require("./serverRoom")(pool)

  async function add(name, server, users) {
    const roomId = uuidv4()

    const { rows } = await pool.query("INSERT INTO rooms (id, name) VALUES ($1, $2) RETURNING id, name", [roomId, name])
    const promises = []

    if (server) promises.push(serverRoom.add(server, roomId))
    if (users) promises.push(users.map(user => userRoom.add(user, roomId)))
    await Promise.all(promises)
    return rows.map(row => ({ ...row, users, server }))
  }

  return {
    add,
  }
}

module.exports = server