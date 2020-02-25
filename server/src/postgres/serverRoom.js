function serverRoom(pool) {
  async function add(serverId, roomId) {
    return pool.query("INSERT INTO servers_rooms (server_id, room_id) VALUES ($1, $2)", [serverId, roomId])
  }

  return {
    add,
  }
}

module.exports = serverRoom