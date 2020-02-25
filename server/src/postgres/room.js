const uuidv4 = require("uuid/v4")

function server(pool) {
  const userRoom = require("./userRoom")(pool)
  const serverRoom = require("./serverRoom")(pool)

  async function get(username) {
    const { rows } = await pool.query(`
      SELECT id, name, servers_rooms.server_id "server", array_agg(users_rooms.user_id) "users"
      FROM rooms
      LEFT JOIN servers_rooms ON id = servers_rooms.room_id
      LEFT JOIN users_rooms ON id = users_rooms.room_id
      WHERE id IN (
        SELECT room_id FROM users_rooms WHERE user_id = $1
      )
      GROUP BY id, servers_rooms.server_id
    `, [username])
    return rows
  }

  async function add(name, server, users) {
    const roomId = server ? uuidv4() : users.reduce((acc, user) => acc < user ? acc + user : user + acc, "")

    const { rows } = await pool.query("INSERT INTO rooms (id, name) VALUES ($1, $2) RETURNING id, name", [roomId, name])
    const promises = []

    if (server) promises.push(serverRoom.add(server, roomId))
    if (users) promises.push(users.map(user => userRoom.add(user, roomId)))
    await Promise.all(promises)
    return rows.map(row => ({ ...row, users, server }))
  }

  return {
    add,
    get,
  }
}

module.exports = server