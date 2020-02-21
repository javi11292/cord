import { useEffect, useState } from "react"
import { get } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const [animationEnd, setAnimationEnd] = useState(false)
  const setLogged = useStore("logged", false)
  const [loggedResponse, setLoggedResponse] = useState()

  useEffect(() => {
    async function checkSession() {
      const { logged } = await get("/user/session")
      setLoggedResponse(!!logged)
    }

    checkSession()
  }, [])

  useEffect(() => {
    if (animationEnd) {
      setLogged(loggedResponse)
    }
  }, [animationEnd, loggedResponse, setLogged])

  function handleAnimationEnd() {
    setAnimationEnd(true)
  }

  return { handleAnimationEnd }
}

export default useLogic