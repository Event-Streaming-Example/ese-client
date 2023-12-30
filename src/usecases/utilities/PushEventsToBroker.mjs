import { CLICK_STREAM_EVENT } from "../../entities/EventType.mjs"

let bufferedStorage = []
const BUFFERED_STORAGE_LIMIT = 10

export default async function pushEventsToBroker(eventPayload) {
    if (eventPayload.eventType === CLICK_STREAM_EVENT) {
        bufferedStorage.push(eventPayload)
        if (bufferedStorage.length >= BUFFERED_STORAGE_LIMIT) {
            const bufferedData = bufferedStorage
            bufferedStorage = []
            console.log(bufferedData)
            return 1
        } else {
            return 0
        }
    }
    console.log(eventPayload)
    return 1
}