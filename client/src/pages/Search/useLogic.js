import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { post } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const addNotification = useStore("notifications", false)
  const [users, setUsers] = useState([])
  const [value, setValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useState("")
  const history = useHistory()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [value])

  useEffect(() => {
    async function fetchUsers() {
      const response = await post("/user/get", { username: debouncedValue })

      if (response.error) {
        addNotification({ action: "push", value: response.error })
      } else {
        setUsers(response)
      }
    }

    if (debouncedValue) fetchUsers()
  }, [debouncedValue, addNotification])

  function back() {
    history.goBack()
  }

  function handleChange({ target }) {
    setValue(target.value)
  }

  return { back, handleChange, value, users }
}

export default useLogic