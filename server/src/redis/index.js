const redis = require("redis")
const { promisify } = require("util")

const client = redis.createClient("redis://redis")
redisClient.on("error", console.log)

const add = promisify(client.zadd).bind(client)
const remove = promisify(client.zremrangebyscore).bind(client)
const range = promisify(client.zrange).bind(client)

async function addMessage(message) {
  const stringMessage = JSON.stringify(message)
  return await add(message.from, message.date, stringMessage)
}

async function removeMessage({ to, date, from }) {
  return await remove(to, date, date)
}

async function getMessages(username) {
  return await range(username, 0, -1)
}

module.exports = {
  client,
  addMessage,
  removeMessage,
  getMessages,
}