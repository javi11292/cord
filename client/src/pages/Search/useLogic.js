import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { post } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const [rooms, setRooms] = useStore("rooms")
  const setActiveRoom = useStore("activeRoom", false)
  const addNotification = useStore("notifications", false)
  const [username] = useStore("username")
  const [users, setUsers] = useState([])
  const [value, setValue] = useState("")
  const history = useHistory()

  useEffect(() => {
    async function fetchUsers() {
      const response = await post("/user/get", { username: value })

      if (response.error) {
        addNotification({ action: "push", value: response.error })
      } else {
        setUsers(response)
      }
    }

    if (value) fetchUsers()
    else setUsers([])
  }, [value, addNotification])

  function back() {
    history.goBack()
  }

  function handleChange({ target }) {
    setValue(target.value)
  }

  async function handleClick({ currentTarget }) {
    if (!rooms[currentTarget.dataset.id]) {
      const response = await post("/room/add", { users: [username, currentTarget.dataset.id] })
      if (response.error) {
        addNotification({ action: "push", value: response.error })
        return
      }
      setRooms({ username, rooms: response })
    }

    setActiveRoom([currentTarget.dataset.id, username].reduce((acc, user) => acc < user ? acc + user : user + acc, ""))
    history.push("/", { openDrawer: false })
  }

  return { back, handleChange, handleClick, value, users }
}

export default useLogic