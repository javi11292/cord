function userRoom(pool) {
  async function add(userId, roomId) {
    return pool.query("INSERT INTO usersRooms (userId, roomId) VALUES ($1, $2)", [userId, roomId])
  }

  return {
    add,
  }
}

module.exports = userRoom