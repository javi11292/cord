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

function handleStream(stream, openCallback) {
  openCallback()
  window.dispatchEvent(new CustomEvent("stream", { detail: stream }))
}

export async function makeCall(peer, room, openCallback, closeCallback) {
  const stream = await getStream()
  return room.users.reduce((acc, user) => {
    if ("javiscript92" + user === peer.id) return acc
    const call = peer.call("javiscript92" + user, stream)
    call.on("stream", stream => handleStream(stream, openCallback))
    call.on("close", closeCallback)
    return call
  }, null)
}

export async function answerCall(call, openCallback, closeCallback) {
  const stream = await getStream()
  call.answer(stream)
  call.on("stream", stream => handleStream(stream, openCallback))
  call.on("close", closeCallback)
}