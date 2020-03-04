import { useState, useEffect } from "react"
import useStore from "hooks/useStore"
import { answerCall, addListener } from "libraries/webrtc"

function useLogic() {
  const [message, setMessage] = useState()
  const [open, setOpen] = useState(false)
  const [connection, setConnection] = useStore("connection")
  const [incomingConnection, setIncomingConnection] = useStore("incomingConnection")
  const [rooms] = useStore("rooms")

  const roomId = connection?.channel || incomingConnection?.channel
  const room = rooms[roomId]?.name

  useEffect(() => {
    setOpen(!!room)
  }, [room])

  useEffect(() => {
    if (!room) return
    if (!connection) {
      setMessage({ state: "incomingConnection", room })
    } else {
      setMessage({ state: incomingConnection ? "incomingConnection" : connection.connectionState, room })
      addListener(connection, "connected", () => {
        setMessage({ state: connection.connectionState, room })
      })
    }
  }, [room, connection, incomingConnection])

  function handleClick({ currentTarget }) {
    if (currentTarget.dataset.call) {
      setIncomingConnection(null)

      setConnection(answerCall(incomingConnection, () => {
        setConnection(null)
      }))
    } else {
      if (connection) connection.stop()
      setIncomingConnection(null)
    }
  }

  function handleExited() {
    setMessage()
  }

  return {
    handleClick,
    handleExited,
    open,
    message: message || {},
  }
}

export default useLogic