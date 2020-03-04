import { useRef, useState, useEffect } from "react"
import useStore from "hooks/useStore"
import { answerCall } from "libraries/webrtc"

function useLogic() {
  const mediaRef = useRef()
  const [username] = useStore("username")
  const [message, setMessage] = useState()
  const [open, setOpen] = useState(false)
  const [call, setCall] = useStore("call")
  const [incomingCall, setIncomingCall] = useStore("incomingCall")

  const callId = incomingCall?.id || call?.id

  useEffect(() => {
    if (!call && mediaRef.current) mediaRef.current.srcObject = null
  }, [call])

  useEffect(() => {
    if (username) window.addEventListener("stream", handleStream)
    return () => {
      if (username) window.removeEventListener("stream", handleStream)
    }
  }, [username])

  useEffect(() => {
    setOpen(!!callId)
  }, [callId])

  useEffect(() => {
    if (!callId) return
    setMessage({ isCalling: !incomingCall, name: callId })
  }, [callId, incomingCall])

  function handleStream({ detail: stream }) {
    if (mediaRef.current) {
      mediaRef.current.srcObject = stream
    }
  }

  function handleClick({ currentTarget }) {
    if (currentTarget.dataset.call) {
      setIncomingCall(null)
      answerCall(
        incomingCall,
        () => {
          setCall(incomingCall)
        },
        () => {
          setCall(null)
          setIncomingCall(null)
        },
      )
    } else {
      if (call) call.close()
      setIncomingCall(null)
    }
  }

  function handleExited() {
    setMessage()
  }

  return {
    mediaRef,
    handleClick,
    handleExited,
    open,
    message: message || {},
  }
}

export default useLogic