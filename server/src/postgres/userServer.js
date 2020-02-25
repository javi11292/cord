function userServer(pool) {
  async function add(userId, serverId) {
    return pool.query("INSERT INTO users_servers (user_id, server_id) VALUES ($1, $2)", [userId, serverId])
  }

  return {
    add,
  }
}

module.exports = userServer