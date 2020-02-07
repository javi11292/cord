import { useEffect } from "react"
import { useMediaQuery, useTheme } from "@material-ui/core"
import useStore from "hooks/useStore"
import { get, post } from "libraries/fetch"
import { NOTIFICATION } from "libraries/constants"

function useLogic() {
  const addNotification = useStore("notifications", false)
  const [servers, setServers] = useStore("servers")
  const [openDrawer, setOpenDrawer] = useStore("openDrawer")
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  useEffect(() => {
    async function getServers() {
      const response = await get("/server/get")

      if (response.error) {
        addNotification({ action: "push", value: response.error })
        return
      }

      setServers(response)
    }

    getServers()
  }, [addNotification, setServers])

  function onClose() {
    setOpenDrawer(false)
  }

  async function addServer() {
    const name = "K"
    const response = await post("/server/add", { name })

    if (response.error) {
      addNotification({ action: "push", value: response.error })
      return
    }

    addNotification({ action: "push", value: `Servidor ${name} creado`, type: NOTIFICATION.info })
    setServers(response)
  }

  return {
    isDesktop,
    onClose,
    openDrawer,
    addServer,
    servers,
  }
}

export default useLogic