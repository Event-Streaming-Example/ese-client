import { CLICK_STREAM_EVENT } from "../../entities/EventType.mjs"
import axios from "axios"
import dotenv from 'dotenv';

dotenv.config();
const BUFFERED_STORAGE_LIMIT = process.env.REACT_APP_BUFFERED_STORAGE_LIMIT
const server_url = process.env.REACT_APP_SERVER_URL
const buffered_push = process.env.REACT_APP_BUFFERED_PUSH_ENABLED
let bufferedStorage = []

// const CORS_PROXY = "https://thingproxy.freeboard.io/fetch/"

async function makeApiCall(url, payload) {
    return axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default async function pushEventsToBroker(eventPayload) {
    if (buffered_push === 'true') {
        if (eventPayload.eventType === CLICK_STREAM_EVENT) {
            bufferedStorage.push(eventPayload)
            if (bufferedStorage.length >= BUFFERED_STORAGE_LIMIT) {
                const bufferedData = bufferedStorage
                bufferedStorage = []
                await makeApiCall(server_url + "/events", { "events": bufferedData })
                console.log("Pushed events : ", bufferedData)
                return 1
            } else {
                return 0
            }
        }
    }
    await makeApiCall(server_url + "/event", eventPayload)
    console.log("Pushed event : ", eventPayload)
    return 1
}