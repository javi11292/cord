import { useState, useEffect } from "react"
import useStore from "hooks/useStore"

function useLogic() {
  const [message, setMessage] = useState()
  const [open, setOpen] = useState(false)
  const [connection] = useStore("connection")
  const [offer] = useStore("offer")
  const [rooms] = useStore("rooms")

  const roomId = connection ? connection.channel : offer?.channel
  const room = roomId ? rooms[roomId].name : null

  useEffect(() => {
    setOpen(!!room)
  }, [room])

  useEffect(() => {
    if (!open) return
    setMessage(message => !message
      ? {
        state: connection ? connection.connectionState : "offer",
        room,
      }
      : message
    )
  }, [open, room, connection])

  function handleClick({ currentTarget }) {
    if (currentTarget.dataset.call) {
      console.log("call")
    } else {
      connection.stop()
    }
  }

  function handleExited() {
    if (!open) setMessage()
  }

  return {
    handleClick,
    handleExited,
    open,
    message: message || {},
  }
}

export default useLogic