function init(pool) {
  function users() {
    return pool.query(`CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY, 
      password TEXT NOT NULL
    )`)
  }

  return async () => {
    await users()
  }
}

module.exports = init