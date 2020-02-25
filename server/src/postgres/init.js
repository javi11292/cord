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
    return pool.query(`CREATE TABLE IF NOT EXISTS serversRooms (
      serverId TEXT REFERENCES servers(id) ON DELETE CASCADE,
      roomId TEXT REFERENCES rooms(id) ON DELETE CASCADE,
      PRIMARY KEY (serverId, roomId)
    )`)
  }

  function usersRooms() {
    return pool.query(`CREATE TABLE IF NOT EXISTS usersRooms (
      userId TEXT REFERENCES users(username) ON DELETE CASCADE,
      roomId TEXT REFERENCES rooms(id) ON DELETE CASCADE,
      PRIMARY KEY (userId, roomId)
    )`)
  }

  function usersServers() {
    return pool.query(`CREATE TABLE IF NOT EXISTS usersServers (
      userId TEXT REFERENCES users(username) ON DELETE CASCADE,
      serverId TEXT REFERENCES servers(id) ON DELETE CASCADE,
      PRIMARY KEY (userId, serverId)
    )`)
  }

  return async () => {
    await Promise.all([users(), servers(), rooms()])
    await Promise.all([usersServers(), usersRooms(), serversRooms()])
  }
}

module.exports = init