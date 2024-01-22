import { CLICK_STREAM_EVENT } from "../../entities/EventType.mjs"
import axios from "axios"

let bufferedStorage = []
const BUFFERED_STORAGE_LIMIT = 5
// const CORS_PROXY = "https://thingproxy.freeboard.io/fetch/"

async function makeApiCall(url, payload) {
    return axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default async function pushEventsToBroker(eventPayload) {
    const server_url = process.env.REACT_APP_BE_SERVER

    if (eventPayload.eventType === CLICK_STREAM_EVENT) {
        bufferedStorage.push(eventPayload)
        if (bufferedStorage.length >= BUFFERED_STORAGE_LIMIT) {
            const bufferedData = bufferedStorage
            bufferedStorage = []
            console.log(await makeApiCall(server_url + "/events", { "events": bufferedData }))
            return 1
        } else {
            return 0
        }
    }
    console.log(await makeApiCall(server_url + "/event", eventPayload))
    return 1
}