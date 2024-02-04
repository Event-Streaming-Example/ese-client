import { CLICK_STREAM_EVENT } from "../../entities/EventType.mjs"
import dotenv from 'dotenv'
import io from 'socket.io-client';

dotenv.config();
const socket_url = process.env.REACT_APP_SERVER_URL + "/websocket"
const BUFFERED_STORAGE_LIMIT = process.env.REACT_APP_BUFFERED_STORAGE_LIMIT
const buffered_push = process.env.REACT_APP_BUFFERED_PUSH_ENABLED
let bufferedStorage = []

console.log(process.env)

const socket = io(socket_url);

async function publishEvent(payload) {
    return socket.emit(payload.eventType, { data: payload });
}

export default async function publishEventsToBroker(eventPayload) {
    if (buffered_push === 'true') {
        if (eventPayload.eventType === CLICK_STREAM_EVENT) {
            bufferedStorage.push(eventPayload)
            if (bufferedStorage.length >= BUFFERED_STORAGE_LIMIT) {
                const bufferedData = bufferedStorage
                bufferedStorage = []
                await publishEvent(eventPayload)
                console.log("Pushed events : ", bufferedData)
                return 1
            } else {
                return 0
            }
        }
    }
    await publishEvent(eventPayload)
    console.log("Pushed event : ", eventPayload)
    return 1
}