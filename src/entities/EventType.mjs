import { getLatestSchemaValue } from "../utilities/GetLatestSchemaValue.mjs"

export const CLICK_STREAM_EVENT = "CLICK_STREAM_EVENT"
export const ORDER_STATE_UPDATE_EVENT = "ORDER_STATE_UPDATE_EVENT"

export function toKafkaTopic(event) {
    if (event == CLICK_STREAM_EVENT) return "click-events"
    return "order-events"
}

export async function toTopicAndSchemaValue(eventType) {
    if (eventType == CLICK_STREAM_EVENT) {
        let topic = "click-events"
        return [topic, (await getLatestSchemaValue(topic))]
    }
    else {
        let topic = "order-events"
        return [topic, (await getLatestSchemaValue(topic))]
    }
}