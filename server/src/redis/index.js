const redis = require("redis")
const { promisify } = require("util")

const client = redis.createClient("redis://redis")
client.on("error", console.log)

const add = promisify(client.zadd).bind(client)
const remove = promisify(client.zremrangebyscore).bind(client)
const range = promisify(client.zrange).bind(client)

async function addMessage(message) {
  const stringMessage = JSON.stringify(message)
  return await add(message.channel, message.date, stringMessage)
}

async function removeMessage({ channel, date }) {
  return await remove(channel, date, date)
}

async function getMessages(channel) {
  return await range(channel, -100, -1)
}

module.exports = {
  client,
  addMessage,
  removeMessage,
  getMessages,
}