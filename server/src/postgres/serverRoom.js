function serverRoom(pool) {
  async function add(serverId, roomId) {
    return pool.query("INSERT INTO serversRooms (serverId, roomId) VALUES ($1, $2)", [serverId, roomId])
  }

  return {
    add,
  }
}

module.exports = serverRoom