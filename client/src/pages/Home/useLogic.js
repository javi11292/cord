import { useState, useRef, useEffect, useLayoutEffect } from "react"
import socket from "libraries/socket"
import useStore from "hooks/useStore"

function useLogic() {
  const [roomMessages, setRoomMessages] = useState([])
  const scrolled = useRef(false)
  const inputRef = useRef()
  const chatRef = useRef()
  const [username] = useStore("username")
  const [activeRoom] = useStore("activeRoom")
  const [text, setText] = useState("")
  const [messages] = useStore("messages")

  useEffect(() => {
    setRoomMessages((messages[activeRoom] || []).slice(-50))
  }, [messages, activeRoom])

  useEffect(() => {
    const root = document.getElementById("root")

    function handleFocus({ target }) {
      if (inputRef.current && root.contains(target)) {
        inputRef.current.focus()
      }
    }

    document.addEventListener("focus", handleFocus, true)
    return () => document.removeEventListener("focus", handleFocus, true)
  }, [])

  useLayoutEffect(() => {
    if (chatRef.current && !scrolled.current) chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.offsetHeight
  }, [roomMessages])

  function handleChange({ target }) {
    setText(target.value)
  }

  function handleKeyDown({ key }) {
    if (key === "Enter" && text) send()
  }

  function send() {
    if (!text) return
    socket.emit("message", { from: username, channel: activeRoom, text, })
    setText("")
  }

  function handleScroll({ currentTarget: { scrollHeight, scrollTop, offsetHeight } }) {
    scrolled.current = scrollTop !== scrollHeight - offsetHeight
  }

  return {
    chatRef,
    handleScroll,
    handleChange,
    handleKeyDown,
    username,
    text,
    inputRef,
    activeRoom,
    messages: roomMessages,
    send,
  }
}

export default useLogic