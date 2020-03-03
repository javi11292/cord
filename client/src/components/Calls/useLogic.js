import { useState, useEffect } from "react"
import useStore from "hooks/useStore"
import { answerCall, addListener } from "libraries/webrtc"

function useLogic() {
  const [message, setMessage] = useState()
  const [open, setOpen] = useState(false)
  const [connection, setConnection] = useStore("connection")
  const [offer, setOffer] = useStore("offer")
  const [rooms] = useStore("rooms")

  const roomId = connection?.channel || offer?.channel
  const room = rooms[roomId]?.name

  useEffect(() => {
    setOpen(!!room)
  }, [room])

  useEffect(() => {
    if (!room) return
    if (!connection) {
      setMessage({ state: "offer", room })
    } else {
      setMessage({ state: offer ? "offer" : connection.connectionState, room })
      addListener(connection, "connected", () => {
        setMessage({ state: connection.connectionState, room })
      })
    }
  }, [room, connection, offer])

  function handleClick({ currentTarget }) {
    if (currentTarget.dataset.call) {
      setConnection(answerCall(offer, () => {
        setConnection(null)
        setOffer(null)
      }))
    } else {
      if (connection) connection.stop()
      setOffer(null)
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