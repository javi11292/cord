import { useEffect } from "react"
import { get } from "libraries/fetch"
import socket from "libraries/socket"
import useStore from "hooks/useStore"

function useLogic() {
  const addNotification = useStore("notifications", false)
  const [username] = useStore("username")
  const addMessage = useStore("messages", false)
  const setServers = useStore("servers", false)
  const [rooms, setRooms] = useStore("rooms")

  useEffect(() => {
    async function getAll() {
      const [servers, rooms] = await Promise.all([get("/server/get"), get("/room/get")])
      const error = servers.error || rooms.error

      if (error) {
        addNotification({ action: "push", value: error })
        return
      }

      setServers(servers)
      setRooms({ username, rooms })
    }

    if (username) {
      getAll()
      socket.connect()
      socket.on("message", addMessage)
      socket.on("room", rooms => setRooms({ username, rooms }))
    }

    return () => {
      if (username) {
        socket.off()
        socket.disconnect()
      }
    }
  }, [username, addNotification, setServers, setRooms, addMessage])

  useEffect(() => {
    Object.keys(rooms).forEach(room => socket.emit("join", room))
  }, [rooms])

  return { username }
}

export default useLogic