import socket from "libraries/socket"

const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }

function createConnection(channel, handleConnected, handleDisconnected) {
  const peerConnection = new RTCPeerConnection(configuration)
  socket.on("candidate#" + channel, candidate => {
    peerConnection.addIceCandidate(candidate)
  })

  peerConnection.addEventListener("icecandidate", ({ candidate }) => {
    if (candidate) socket.emit("candidate", { channel, candidate })
  })

  peerConnection.addEventListener("connectionstatechange", () => {
    if (peerConnection.connectionState === "connected" && handleConnected) handleConnected()

    if (peerConnection.connectionState === "disconnected" && handleDisconnected) peerConnection.stop()
  })

  peerConnection.stop = () => {
    peerConnection.close()
    socket.off("candidate#" + channel)
    if (handleDisconnected) handleDisconnected()
  }

  peerConnection.channel = channel

  return peerConnection
}

async function getDevices() {
  return (await navigator.mediaDevices.enumerateDevices()).reduce((acc, device) => {
    if (device.kind === "audioinput") acc.audio = true
    if (device.kind === "videoinput") acc.video = true
    return acc
  }, { video: false, audio: false })
}

function notifyTrack(track) {
  window.dispatchEvent(new CustomEvent("track", { detail: track }))
}

function stopTrack(track) {
  track.stop()
}

export function addListener(connection, state, callback) {
  connection.addEventListener("connectionstatechange", () => {
    if (connection.connectionState === state && callback) callback()
  })
}

export function makeCall(channel, disconnectedCallback) {
  function handleConnected() {
    clearTimeout(timeout)
    tracks.forEach(notifyTrack)
  }

  function handleDisconnected() {
    socket.off("answer#" + channel)
    tracks.forEach(stopTrack)
    if (disconnectedCallback) disconnectedCallback()
  }

  async function run() {
    const devices = await getDevices()
    const stream = await navigator.mediaDevices.getUserMedia(devices)
    if (!stream) return
    tracks = stream.getTracks()
    tracks.forEach(track => {
      peerConnection.addTrack(track, stream)
    })

    socket.once("answer#" + channel, answer => {
      peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
    })

    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    socket.emit("offer", { channel, offer })
  }

  let tracks = []

  const peerConnection = createConnection(channel, handleConnected, handleDisconnected)

  const timeout = setTimeout(() => {
    console.log("timeout")
    peerConnection.stop()
  }, 10000)

  run().catch(peerConnection.stop)

  return peerConnection
}

export function answerCall(message, disconnectedCallback) {
  async function run() {
    peerConnection.addEventListener("track", ({ track }) => notifyTrack(track))
    peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer))

    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    socket.emit("answer", { channel: message.channel, answer })
  }

  const peerConnection = createConnection(message.channel, null, disconnectedCallback)

  run().catch(peerConnection.stop)

  return peerConnection
}