function socket(server) {
  const socketServer = io(server)
  socketServer.on("connect", handleSocket(socketServer))
}

function handleSocket(socketServer) {
  return async socket => {
    const { session: { username } } = socket.request

    function handleMessage(response) {
      const message = createMessage(response, username)
      sendMessage(message, message.to)
      addMessage(message)
    }

    function sendMessage(message, to) {
      socketServer.to(to).emit("message", message)
    }

    socket.on("getMessages", await getMessages(username))
    socket.on("sendMessage", handleMessage)
  }
}

module.exports = socket