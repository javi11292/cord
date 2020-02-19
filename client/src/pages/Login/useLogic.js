import { useState, useRef } from "react"
import { useLocation, useHistory } from "react-router-dom"
import useStore from "hooks/useStore"
import { post } from "libraries/fetch"

function useLogic() {
  const history = useHistory()
  const { pathname } = useLocation()
  const inputRefs = useRef([])
  const addNotification = useStore("notifications", false)
  const setLogged = useStore("logged", false)
  const isLogin = pathname.startsWith("/login")

  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  async function submit() {
    const { error } = await post(`/user${pathname}`, {
      username: user.username,
      password: user.password,
      confirmPassword: user.confirmPassword,
    })

    if (error) {
      addNotification({ action: "push", value: error })
      return
    }

    setLogged(!!error)
  }

  function handleChange({ target }) {
    setUser(user => ({ ...user, [target.id]: target.value }))
  }

  function handleKeyDown({ key, target }) {
    const fields = inputRefs.current
    if (key === "Enter") {
      switch (target.id) {
        case "username":
          fields.password.focus()
          break

        case "password":
          if (isLogin) {
            fields.password.blur()
            submit()
          } else {
            fields.confirmPassword.focus()
          }
          break

        case "confirmPassword":
          fields.confirmPassword.blur()
          submit()
          break

        default:
          break
      }
    }
  }

  function addRef(element) {
    if (!element) return
    inputRefs.current[element.id] = element
  }

  function navigate() {
    history.push(isLogin ? "/register" : "/login")
  }

  return {
    submit,
    user,
    handleChange,
    handleKeyDown,
    addRef,
    navigate,
    isLogin,
  }
}

export default useLogic