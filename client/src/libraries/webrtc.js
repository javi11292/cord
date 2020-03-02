import socket from "libraries/socket"

const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }

function createConnection(channel, callback, error) {
  const peerConnection = new RTCPeerConnection(configuration)

  socket.on("candidate#" + channel, candidate => {
    peerConnection.addIceCandidate(candidate)
  })

  peerConnection.addEventListener("icecandidate", ({ candidate }) => {
    if (candidate) socket.emit("candidate", { channel, candidate })
  })

  peerConnection.addEventListener("connectionstatechange", () => {
    if (peerConnection.connectionState === "connected" && callback) callback()

    if (peerConnection.connectionState === "disconnected" && error) error()
  })

  return peerConnection
}

export async function makeCall(channel) {
  const peerConnection = createConnection(channel, () => clearTimeout(timeout))

  socket.once("answer#" + channel, answer => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
  })

  const offer = await peerConnection.createOffer({ offerToReceiveAudio: true }) // ELIMINAR
  await peerConnection.setLocalDescription(offer)
  socket.emit("offer", { channel, offer })

  const timeout = setTimeout(() => {
    socket.off("answer#" + channel)
    console.log("timeout")
  }, 1000)
}

export async function handleOffer(message) {
  const peerConnection = createConnection(message.channel)

  peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer))

  const answer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answer)
  socket.emit("answer", { channel: message.channel, answer })
}