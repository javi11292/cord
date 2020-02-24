import { useEffect, useState } from "react"
import { get } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const [animationEnd, setAnimationEnd] = useState(false)
  const setUserName = useStore("username", false)
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
      setUserName(loggedResponse)
    }
  }, [animationEnd, loggedResponse, setUserName])

  function handleAnimationEnd() {
    setAnimationEnd(true)
  }

  return { handleAnimationEnd }
}

export default useLogic