import io from "socket.io-client"
import { HOST } from "./constants"

const socket = io(HOST, { transports: ["websocket"], autoConnect: false })

export default socket