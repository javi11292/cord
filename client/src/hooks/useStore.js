import getStore from "libraries/store"
import { NOTIFICATION } from "libraries/constants"

export default getStore({
  offer: {
    state: null,
    reducer: (state, value) => value,
  },
  connection: {
    state: null,
    reducer: (state, value) => value,
  },
  openDrawer: {
    state: false,
    reducer: (state, value) => value,
  },
  username: {
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
    reducer: (state, { username, rooms }) => {
      rooms.forEach(room => {
        state[room.id] = { ...room, name: room.name || room.users.find(user => user !== username) }
      })
    }
  },
  messages: {
    state: {},
    reducer: (state, value) => {
      value.forEach(response => {
        const message = response.constructor === String ? JSON.parse(response) : response
        const channel = state[message.channel]
        if (!channel) {
          state[message.channel] = [message]
        } else {
          channel.push(message)
        }
      })
    }
  },
  activeServer: {
    state: null,
    reducer: (state, value) => value
  },
  activeRoom: {
    state: localStorage.getItem("activeRoom"),
    reducer: (state, value) => {
      localStorage.setItem("activeRoom", value)
      return value
    }
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