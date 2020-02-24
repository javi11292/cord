import { useEffect, useState } from "react"
import { get } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const [animationEnd, setAnimationEnd] = useState(false)
  const setUser = useStore("user", false)
  const [loggedResponse, setLoggedResponse] = useState()

  useEffect(() => {
    async function checkSession() {
      const { logged, username } = await get("/user/session")
      setLoggedResponse(logged ? username : "")
    }

    checkSession()
  }, [])

  useEffect(() => {
    if (animationEnd) {
      setUser(loggedResponse)
    }
  }, [animationEnd, loggedResponse, setUser])

  function handleAnimationEnd() {
    setAnimationEnd(true)
  }

  return { handleAnimationEnd }
}

export default useLogic