function user(pool) {
  async function register(username, password, confirmPassword) {
    if (!username) throw new Error("Usuario inválido")
    if (!password) throw new Error("Contraseña inválida")
    if (password !== confirmPassword) throw new Error("Las contraseñas no coinciden")
    return pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password])
  }

  async function login(username, password) {
    if (!username) throw new Error("Usuario inválido")
    if (!password) throw new Error("Contraseña inválida")
    const { rows } = await pool.query("SELECT username FROM users WHERE username = $1 AND password = $2", [username, password])
    if (rows.length === 0) throw new Error("Credenciales inválidas")
  }

  return {
    register,
    login,
  }
}

module.exports = user