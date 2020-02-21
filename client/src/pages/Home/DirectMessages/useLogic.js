import { useHistory } from "react-router-dom"

function useLogic() {
  const history = useHistory()

  function search() {
    history.push("/search")
  }

  return { search }
}

export default useLogic