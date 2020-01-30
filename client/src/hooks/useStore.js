import getStore from "libraries/store"
import { NOTIFICATION } from "libraries/constants"

export default getStore({
  logged: {
    state: null,
    reducer: (state, value) => value,
  },
  notifications: {
    state: [],
    reducer: (state, { action, value, type }) => {
      switch (action) {
        case "push":
          state.push({ value, type: type || NOTIFICATION.error })
          break
        case "shift":
          state.shift()
          break
        default:
          return
      }
    },
  },
})