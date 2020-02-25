function init(pool) {
  function users() {
    return pool.query(`CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY, 
      password TEXT NOT NULL
    )`)
  }

  function servers() {
    return pool.query(`CREATE TABLE IF NOT EXISTS servers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )`)
  }

  function rooms() {
    return pool.query(`CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY,
      name TEXT
    )`)
  }

  function serversRooms() {
    return pool.query(`CREATE TABLE IF NOT EXISTS servers_rooms (
      server_id TEXT REFERENCES servers(id) ON DELETE CASCADE,
      room_id TEXT REFERENCES rooms(id) ON DELETE CASCADE,
      PRIMARY KEY (server_id, room_id)
    )`)
  }

  function usersRooms() {
    return pool.query(`CREATE TABLE IF NOT EXISTS users_rooms (
      user_id TEXT REFERENCES users(username) ON DELETE CASCADE,
      room_id TEXT REFERENCES rooms(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, room_id)
    )`)
  }

  function usersServers() {
    return pool.query(`CREATE TABLE IF NOT EXISTS users_servers (
      user_id TEXT REFERENCES users(username) ON DELETE CASCADE,
      server_id TEXT REFERENCES servers(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, server_id)
    )`)
  }

  return async () => {
    await Promise.all([users(), servers(), rooms()])
    await Promise.all([usersServers(), usersRooms(), serversRooms()])
  }
}

module.exports = init