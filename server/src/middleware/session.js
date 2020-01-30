const redis = require("redis")
const session = require("express-session")
const RedisStore = require("connect-redis")(session)

const redisClient = redis.createClient("redis://redis")

redisClient.on("error", console.log)

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  },
})