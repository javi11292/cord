import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { post } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const setActiveRoom = useStore("activeRoom", false)
  const addNotification = useStore("notifications", false)
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

  function handleClick({ currentTarget }) {
    // TODO: crear room si no existe
    setActiveRoom(currentTarget.id)
    history.push("/", { openDrawer: false })
  }

  return { back, handleChange, handleClick, value, users }
}

export default useLogic