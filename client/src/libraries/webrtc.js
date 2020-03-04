import Peer from "peerjs"

const peer = new Peer()

async function getDevices() {
  return (await navigator.mediaDevices.enumerateDevices()).reduce((acc, device) => {
    if (device.kind === "audioinput") acc.audio = true
    if (device.kind === "videoinput") acc.video = true
    return acc
  }, { video: false, audio: false })
}

async function getStream() {
  const devices = await getDevices()
  return await navigator.mediaDevices.getUserMedia(devices)
}

function handleStream(stream) {
  console.log("GOT STREAM")
}

export async function makeCall(peer, room, openCallback, closeCallback) {
  const stream = await getStream()
  const calls = room.users.reduce((acc, user) => {
    if (user === peer.id) return acc
    const call = peer.call(user, stream)
    call.on("stream", stream => handleStream(stream))
    acc.push(call)
    return acc
  }, [])

  return calls
}

export async function answerCall(call) {
  const stream = await getStream()
  call.answer(stream)
  call.on("stream", stream => handleStream(stream))
  return call
}