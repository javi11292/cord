import React from "react"
import { format } from "date-fns"
import { InputAdornment } from "@material-ui/core"
import Send from "@material-ui/icons/Send"
import AppBar from "./AppBar"
import Drawer from "./Drawer"
import useLogic from "./useLogic"
import { Box, Frame, Content, TextField, Messages, Message, InfoPlaceholder, Info, IconButton } from "./useStyles"

function Home() {
  const {
    chatRef,
    handleScroll,
    handleChange,
    handleKeyDown,
    username,
    text,
    inputRef,
    activeRoom,
    messages,
    send,
  } = useLogic()

  return (
    <Box tabIndex="-1">
      <AppBar />
      <Frame>
        <Drawer />
        {activeRoom &&
          <Content>
            <Messages ref={chatRef} onScroll={handleScroll}>
              {messages.map(({ from, date, text }) => (
                <Message key={date} local={from === username}>
                  {text}
                  <InfoPlaceholder />
                  <Info>
                    {format(date, "HH:mm")}
                  </Info>
                </Message>
              ))}
            </Messages>

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={send}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              autoFocus
              inputRef={inputRef}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              variant="filled"
              margin="dense"
              placeholder="Mensaje" />
          </Content>
        }
      </Frame>
    </Box>
  )
}

export default Home