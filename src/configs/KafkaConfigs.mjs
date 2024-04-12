import { CLICK_STREAM_EVENT, ORDER_STATE_UPDATE_EVENT } from "../entities/EventType.mjs";
import { getLatestSchemaValue } from "../utilities/GetLatestSchemaValue.mjs"

import dotenv from 'dotenv';



dotenv.config();
export const KAFKA_CLUSTER_IP = process.env.REACT_APP_KAFKA_CLUSTER_IP
export const KAFKA_CLUSTER_PORT = process.env.REACT_APP_KAFKA_CLUSTER_APIGW_PORT
export const KAFKA_CLIENT_ID = process.env.REACT_APP_KAFKA_CLIENT_ID
export const KAFKA_BROKERS = process.env.REACT_APP_KAFKA_CLUSTER_BROKERS
export const KAFKA_SCHEMA_REGISTRY_URL = `http://${process.env.REACT_APP_KAFKA_SCHEMA_REGISTRY_IP}:${process.env.REACT_APP_KAFKA_SCHEMA_REGISTRY_PORT}`


export const CLICK_EVENT_TOPIC = "click-events"
export const ORDER_EVENT_TOPIC = "order-events"

const clickEventSchema = getLatestSchemaValue(CLICK_EVENT_TOPIC)
const orderEventSchema = getLatestSchemaValue(ORDER_EVENT_TOPIC)

export async function eventMapper(eventType) {
    if (eventType === CLICK_STREAM_EVENT) return [CLICK_EVENT_TOPIC, (await clickEventSchema)]
    else if (eventType === ORDER_STATE_UPDATE_EVENT) return [ORDER_EVENT_TOPIC, (await orderEventSchema)]
}