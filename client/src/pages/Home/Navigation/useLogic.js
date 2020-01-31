import { useMediaQuery, useTheme } from "@material-ui/core"

function useLogic() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  return { isDesktop }
}

export default useLogic