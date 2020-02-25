const session = require("express-session")
const RedisStore = require("connect-redis")(session)
const { client } = require("../redis")

module.exports = session({
  store: new RedisStore({ client }),
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  },
})