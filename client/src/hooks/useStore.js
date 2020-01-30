import getStore from "libraries/store"

export default getStore({
  notifications: {
    state: [],
    reducer: (state, { action, value, type }) => {
      switch (action) {
        case "push":
          state.push({ value, type })
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