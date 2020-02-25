import { useHistory } from "react-router-dom"
import useStore from "hooks/useStore"

function useLogic() {
  const history = useHistory()
  const setOpenDrawer = useStore("openDrawer", false)
  const [activeRoom, setActiveRoom] = useStore("activeRoom")
  const [rooms] = useStore("rooms")

  function search() {
    history.push("/search")
  }

  function handleClick({ currentTarget }) {
    setActiveRoom(currentTarget.id)
    setOpenDrawer(false)
  }

  return { search, activeRoom, rooms, handleClick }
}

export default useLogic