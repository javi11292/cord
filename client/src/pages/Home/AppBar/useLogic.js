import useStore from "hooks/useStore"
import { useMediaQuery, useTheme } from "@material-ui/core"
import { post } from "libraries/fetch"
import { makeCall } from "libraries/webrtc"

function refresh() {
  window.location.assign("/")
}

function useLogic() {
  const [peer] = useStore("peer")
  const addNotification = useStore("notifications", false)
  const setOpenDrawer = useStore("openDrawer", false)
  const [call, setCall] = useStore("call")
  const [incomingCall] = useStore("incomingCall")
  const [activeRoom] = useStore("activeRoom")
  const [rooms] = useStore("rooms")
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  async function logout() {
    const { error } = await post("/user/logout")
    if (error) {
      addNotification({ action: "push", value: error })
    } else {
      localStorage.clear()
      refresh()
    }
  }

  function toggleDrawer() {
    setOpenDrawer(true)
  }

  async function handleCall() {
    const call = makeCall(
      peer,
      rooms[activeRoom],
      () => {
        setCall(call)
      },
      () => {
        setCall(null)
      },
    )
  }

  return {
    hasActiveCall: !!(call || incomingCall),
    handleCall,
    activeRoom,
    logout,
    refresh,
    toggleDrawer,
    isDesktop,
  }
}

export default useLogic