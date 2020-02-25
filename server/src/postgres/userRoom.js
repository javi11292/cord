function userRoom(pool) {
  async function add(userId, roomId) {
    return pool.query("INSERT INTO users_rooms (user_id, room_id) VALUES ($1, $2)", [userId, roomId])
  }

  return {
    add,
  }
}

module.exports = userRoom