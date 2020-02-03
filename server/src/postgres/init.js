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

  function usersServers() {
    return pool.query(`CREATE TABLE IF NOT EXISTS usersServers (
      userId TEXT REFERENCES users(username) ON DELETE CASCADE,
      serverId TEXT REFERENCES servers(id) ON DELETE CASCADE,
      PRIMARY KEY (userId, serverId)
    )`)
  }

  return async () => {
    await Promise.all([users(), servers()])
    await usersServers()
  }
}

module.exports = init