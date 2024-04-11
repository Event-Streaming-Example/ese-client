import { toTopicAndSchemaValue } from "../entities/EventType.mjs";
import { createKafkaEventPayload } from "../utilities/CreateEventPayload.mjs";
import { CLICK_STREAM_EVENT, ORDER_STATE_UPDATE_EVENT } from "../entities/EventType.mjs";

import dotenv from 'dotenv';
import axios from "axios";
import { KEY_PRESS_EVENT, ORDER_ALLOCATED } from "../entities/EventSubType.mjs";

dotenv.config();
const KAFKA_CLUSTER_IP = process.env.REACT_APP_KAFKA_CLUSTER_IP
const KAFKA_CLUSTER_PORT = process.env.REACT_APP_KAFKA_CLUSTER_APIGW_PORT

const [CLICK_EVENT_TOPIC, CLICK_EVENT_SCHEMA] = await toTopicAndSchemaValue(CLICK_STREAM_EVENT)
const [ORDER_EVENT_TOPIC, ORDER_EVENT_SCHEMA] = await toTopicAndSchemaValue(ORDER_STATE_UPDATE_EVENT)


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
    if (eventType == CLICK_STREAM_EVENT) {
        return pushEvent(CLICK_EVENT_TOPIC, CLICK_EVENT_SCHEMA, data)
    }
    else if (eventType == ORDER_STATE_UPDATE_EVENT) {
        return pushEvent(ORDER_EVENT_TOPIC, ORDER_EVENT_SCHEMA, data)
    }
}


let data1 = createKafkaEventPayload(KEY_PRESS_EVENT, "192.169.80.787", {})
let data2 = createKafkaEventPayload(ORDER_ALLOCATED, "192.169.80.787", { "order_id": "CRN135" })

pushEventToKafkaApigw(CLICK_STREAM_EVENT, data1)
pushEventToKafkaApigw(ORDER_STATE_UPDATE_EVENT, data2)
