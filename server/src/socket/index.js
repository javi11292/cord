const io = require("socket.io")
const session = require("../middleware/session")
const { addMessage, getMessages } = require("../redis")
const events = require("../libraries/events")

function socket(server) {
  const socketServer = io(server)
  socketServer.use(({ request }, next) => session(request, {}, next))
  socketServer.on("connect", handleConnect(socketServer))
}

function handleConnect(socketServer) {
  return socket => {
    const { session: { username } } = socket.request

    function handleMessage(response) {
      const message = { ...response, date: Date.now() }
      addMessage(message)
      socketServer.to(message.channel).emit("message", [message])
    }

    async function handleJoin(channel) {
      socket.join(channel)
      socket.emit("message", await getMessages(channel))
    }

    function handleRoom(room) {
      socket.emit("room", [room])
      handleJoin(room.id)
    }

    function handleDisconnect() {
      events.removeListener(username, handleJoin)
    }

    events.addListener(username, handleRoom)

    socket.on("join", handleJoin)
    socket.on("disconnect", handleDisconnect)
    socket.on("message", handleMessage)
  }
}

module.exports = socket