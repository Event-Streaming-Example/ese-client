import { BUFFERED_PUSH_ENABLED, BUFFERED_STORAGE_LIMIT, SERVER_IP, BUFFERED_PUSH_ENDPOINT, SINGLE_PUSH_ENDPOINT } from "../configs/ServerConfigs.mjs";
import { CLICK_STREAM_EVENT } from "../entities/EventType.mjs"
import axios from "axios";


let bufferedStorage = []

// const CORS_PROXY = "https://thingproxy.freeboard.io/fetch/"


async function pushEvents(data, endpoint) {
    let url = SERVER_IP + endpoint
    let headers = { 'Content-Type': 'application/json' }
    await axios.post(url, data, { headers: headers })
}

export default async function pushEventsToBackend(eventPayload) {
    if (BUFFERED_PUSH_ENABLED === 'true') {
        if (eventPayload.eventType === CLICK_STREAM_EVENT) {
            bufferedStorage.push(eventPayload)
            if (bufferedStorage.length >= BUFFERED_STORAGE_LIMIT) {
                await pushEvents({ "events": bufferedStorage }, BUFFERED_PUSH_ENDPOINT)
                console.log("Pushed events : ", bufferedStorage)
                bufferedStorage = []
                return 1
            } else {
                return 0
            }
        }
    }
    await pushEvents(eventPayload, SINGLE_PUSH_ENDPOINT)
    console.log("Pushed event : ", eventPayload)
    return 1
}