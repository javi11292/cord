import { useHistory } from "react-router-dom"

function useLogic() {
  const history = useHistory()

  function back() {
    history.goBack()
  }

  return { back }
}

export default useLogic