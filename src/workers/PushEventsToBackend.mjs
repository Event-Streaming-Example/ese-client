import { CLICK_STREAM_EVENT } from "../entities/EventType.mjs"

import dotenv from 'dotenv';
import axios from "axios";

dotenv.config();
const BUFFERED_STORAGE_LIMIT = process.env.REACT_APP_BUFFERED_STORAGE_LIMIT
const BUFFERED_PUSH_ENABLED = process.env.REACT_APP_BUFFERED_PUSH_ENABLED
const SERVER_IP = process.env.REACT_APP_SERVER_IP

let bufferedStorage = []

// const CORS_PROXY = "https://thingproxy.freeboard.io/fetch/"

async function pushEvents(data) {
    let url = SERVER_IP + "/events"
    let headers = { 'Content-Type': 'application/json' }
    await axios.post(url, data, { headers: headers })
}

export default async function pushEventsToBackend(eventPayload) {
    if (BUFFERED_PUSH_ENABLED === 'true') {
        if (eventPayload.eventType === CLICK_STREAM_EVENT) {
            bufferedStorage.push(eventPayload)
            if (bufferedStorage.length >= BUFFERED_STORAGE_LIMIT) {
                await pushEvents({ "events": bufferedStorage })
                console.log("Pushed events : ", bufferedStorage)
                bufferedStorage = []
                return 1
            } else {
                return 0
            }
        }
    }
    await pushEvents(eventPayload)
    console.log("Pushed event : ", eventPayload)
    return 1
}