import { createKafkaEventPayload } from "../utilities/CreateEventPayload.mjs";
import { CLICK_STREAM_EVENT, ORDER_STATE_UPDATE_EVENT } from "../entities/EventType.mjs";

import axios from "axios";

import { KEY_PRESS_EVENT, ORDER_ALLOCATED } from "../entities/EventSubType.mjs";
import { KAFKA_CLUSTER_IP, KAFKA_CLUSTER_PORT, eventMapper } from "./KafkaConstants.mjs";



async function pushEvent(topic, schema, data) {
    let url = `http://${KAFKA_CLUSTER_IP}:${KAFKA_CLUSTER_PORT}/topics/${topic}`
    let headers = { 'Content-Type': 'application/vnd.kafka.json.v2+json' }
    let payload = {
        "value_schema": schema,
        "records": [{ "value": data }]
    }
    return await axios.post(url, payload, { headers: headers })
}


export async function pushEventToKafkaApigw(eventType, data) {
    let [topic, schema_value] = eventMapper(eventType)
    pushEvent(topic, schema_value, data)
}


let data1 = createKafkaEventPayload(KEY_PRESS_EVENT, "192.169.80.787", {})
let data2 = createKafkaEventPayload(ORDER_ALLOCATED, "192.169.80.787", { "order_id": "CRN135" })

pushEventToKafkaApigw(CLICK_STREAM_EVENT, data1)
pushEventToKafkaApigw(ORDER_STATE_UPDATE_EVENT, data2)
