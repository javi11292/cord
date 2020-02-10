import { useEffect, useState } from "react"
import { useMediaQuery, useTheme } from "@material-ui/core"
import useStore from "hooks/useStore"
import { get, post } from "libraries/fetch"
import { NOTIFICATION } from "libraries/constants"

function useLogic() {
  const [serverName, setServerName] = useState("")
  const [showDialog, setShowDialog] = useState(false)
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

  function toggleDialog() {
    setShowDialog(!showDialog)
    setServerName("")
  }

  async function addServer() {
    toggleDialog()
    const response = await post("/server/add", { name: serverName })

    if (response.error) {
      addNotification({ action: "push", value: response.error })
      return
    }

    addNotification({ action: "push", value: "Servidor creado", type: NOTIFICATION.info })
    setServers(response)
  }

  function handleChange({ target }) {
    setServerName(target.value)
  }

  function handleKeyDown({ key }) {
    if (key === "Enter" && serverName) addServer()
  }

  return {
    isDesktop,
    onClose,
    openDrawer,
    addServer,
    servers,
    toggleDialog,
    showDialog,
    serverName,
    handleChange,
    handleKeyDown,
  }
}

export default useLogic