import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useMediaQuery, useTheme } from "@material-ui/core"
import useStore from "hooks/useStore"
import { post } from "libraries/fetch"
import { NOTIFICATION } from "libraries/constants"

function useLogic() {
  const location = useLocation()
  const [activeServer, setActiveServer] = useStore("activeServer")
  const [serverName, setServerName] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const addNotification = useStore("notifications", false)
  const [servers, setServers] = useStore("servers")
  const [openDrawer, setOpenDrawer] = useStore("openDrawer")
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  const locationOpenDrawer = location.state?.openDrawer

  useEffect(() => {
    if (locationOpenDrawer !== undefined) setOpenDrawer(!!locationOpenDrawer)
  }, [setOpenDrawer, locationOpenDrawer])

  useEffect(() => {
    setOpen(openDrawer)
  }, [openDrawer])

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

  function handleServerClick({ currentTarget }) {
    setActiveServer(currentTarget.value)
  }

  return {
    activeServer,
    isDesktop,
    onClose,
    open,
    addServer,
    servers,
    toggleDialog,
    showDialog,
    serverName,
    handleChange,
    handleKeyDown,
    handleServerClick,
  }
}

export default useLogic