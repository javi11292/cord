import { useMediaQuery, useTheme } from "@material-ui/core"
import useStore from "hooks/useStore"

function useLogic() {
  const [openDrawer, setOpenDrawer] = useStore("openDrawer")
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  function onOpen() {
    setOpenDrawer(true)
  }

  function onClose() {
    setOpenDrawer(false)
  }

  return {
    isDesktop,
    onOpen,
    onClose,
    openDrawer,
  }
}

export default useLogic