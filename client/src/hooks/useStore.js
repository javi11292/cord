import getStore from "libraries/store"
import { NOTIFICATION } from "libraries/constants"

export default getStore({
  openDrawer: {
    state: false,
    reducer: (state, value) => value,
  },
  user: {
    state: null,
    reducer: (state, value) => value,
  },
  servers: {
    state: {},
    reducer: (state, value) => {
      value.forEach(server => state[server.id] = server)
    }
  },
  rooms: {
    state: {},
    reducer: (state, value) => {
      value.forEach(room => state[room.id] = room)
    }
  },
  activeServer: {
    state: null,
    reducer: (state, value) => value
  },
  activeRoom: {
    state: null,
    reducer: (state, value) => value
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