import useStore from "hooks/useStore"
import { useMediaQuery, useTheme } from "@material-ui/core"
import { post } from "libraries/fetch"

function refresh() {
  window.location.assign(process.env.PUBLIC_URL + "/")
}

function useLogic() {
  const addNotification = useStore("notifications", false)
  const setOpenDrawer = useStore("openDrawer", false)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  async function logout() {
    try {
      const { error } = await post("/user/logout")
      if (error) throw new Error(error)
      refresh()
    }
    catch (error) {
      addNotification({ action: "push", value: error.message })
    }
  }

  function toggleDrawer(){
    setOpenDrawer(true)
  }

  return {
    logout,
    refresh,
    toggleDrawer,
    isDesktop,
  }
}

export default useLogic