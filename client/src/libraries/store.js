import { useReducer, useEffect, useCallback } from "react"
import produce from "immer"

function addListeners(listeners, key) {
  return { ...listeners, [key]: new Set() }
}

function getStore(fields) {
  const store = {
    fields,
    listeners: Object.keys(fields).reduce(addListeners, {}),

    get(key) {
      return this.fields[key].state
    },

    update(key, value) {
      const field = this.fields[key]
      const { state, reducer } = field

      const nextState = produce(state, draftState => reducer(draftState, value))
      if (state === nextState) return
      field.state = nextState

      this.listeners[key].forEach(callback => callback())
    },

    addListener(key, callback) {
      this.listeners[key].add(callback)
    },

    removeListener(key, callback) {
      this.listeners[key].delete(callback)
    },
  }

  function useStore(key, subscribe = true) {
    const [, forceUpdate] = useReducer(state => !state, false)

    useEffect(() => {
      if (!subscribe) return
      store.addListener(key, forceUpdate)
      return () => store.removeListener(key, forceUpdate)
    }, [key, subscribe])

    const update = useCallback(value => store.update(key, value), [key])

    return subscribe ? [store.get(key), update] : update
  }

  return useStore
}

export default getStore