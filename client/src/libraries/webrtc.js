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

function handleStream(stream, call) {
  window.dispatchEvent(new CustomEvent("stream", { detail: stream }))
}

export async function makeCall(peer, room, openCallback, closeCallback) {
  const stream = await getStream()
  room.users.forEach(user => {
    if ("javiscript92" + user === peer.id) return
    const call = peer.call("javiscript92" + user, stream)
    openCallback(call)
    call.on("stream", stream => handleStream(stream, call))
    call.on("close", closeCallback)
    return call
  }, null)
}

export async function answerCall(call, openCallback, closeCallback) {
  const stream = await getStream()
  openCallback(call)
  call.answer(stream)
  call.on("stream", stream => handleStream(stream, call))
  call.on("close", closeCallback)
}