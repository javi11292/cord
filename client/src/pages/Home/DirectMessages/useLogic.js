import { useHistory } from "react-router-dom"
import useStore from "hooks/useStore"


function useLogic() {
  const history = useHistory()
  const [activeRoom] = useStore("activeRoom")
  const [rooms] = useStore("rooms")

  function search() {
    history.push("/search")
  }

  return { search, activeRoom, rooms }
}

export default useLogic