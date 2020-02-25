import { useEffect } from "react"
import { get } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const addNotification = useStore("notifications", false)
  const [username] = useStore("username")
  const setServers = useStore("servers", false)
  const setRooms = useStore("rooms", false)

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

    if (username) getAll()
  }, [username, addNotification, setServers, setRooms])

  return { username }
}

export default useLogic