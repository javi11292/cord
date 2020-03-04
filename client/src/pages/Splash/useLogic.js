import { useRef, useEffect, useState } from "react"
import { get } from "libraries/fetch"
import useStore from "hooks/useStore"

function useLogic() {
  const hasAnimation = useRef()
  const [animationEnd, setAnimationEnd] = useState(false)
  const setUserName = useStore("username", false)
  const [sessionResponse, setSessionResponse] = useState()

  useEffect(() => {
    async function checkSession() {
      const { logged, username } = await get("/user/session")
      setSessionResponse(logged ? username : "")
    }

    checkSession()
  }, [])

  useEffect(() => {
    if (!hasAnimation.current || animationEnd) {
      setUserName(sessionResponse)
    }
  }, [animationEnd, sessionResponse, setUserName])

  function handleAnimationEnd() {
    setAnimationEnd(true)
  }

  function handleAnimationStart() {
    hasAnimation.current = true
  }

  return { handleAnimationEnd, handleAnimationStart }
}

export default useLogic