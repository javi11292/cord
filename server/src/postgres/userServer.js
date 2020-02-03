function userServer(pool) {
  async function add(userId, serverId) {
    return pool.query("INSERT INTO usersServers (userId, serverId) VALUES ($1, $2)", [userId, serverId])
  }

  return {
    add,
  }
}

module.exports = userServer