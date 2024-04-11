import { CLICK_STREAM_EVENT, ORDER_STATE_UPDATE_EVENT } from "../entities/EventType.mjs";
import { getLatestSchemaValue } from "../utilities/GetLatestSchemaValue.mjs"

import dotenv from 'dotenv';

dotenv.config();
export const KAFKA_CLUSTER_IP = process.env.REACT_APP_KAFKA_CLUSTER_IP
export const KAFKA_CLUSTER_PORT = process.env.REACT_APP_KAFKA_CLUSTER_APIGW_PORT
export const KAFKA_CLIENT_ID = process.env.REACT_APP_KAFKA_CLIENT_ID
export const KAFKA_BROKERS = process.env.REACT_APP_KAFKA_CLUSTER_BROKERS

export const CLICK_EVENT_TOPIC = "click-events"
export const ORDER_EVENT_TOPIC = "order-events"

export const CLICK_EVENT_SCHEMA_VALUE = await getLatestSchemaValue(CLICK_EVENT_TOPIC)
export const ORDER_EVENT_SCHEMA_VALUE = await getLatestSchemaValue(ORDER_EVENT_TOPIC)

export function eventMapper(eventType) {
    if (eventType == CLICK_STREAM_EVENT) return [CLICK_EVENT_TOPIC, CLICK_EVENT_SCHEMA_VALUE]
    else if (eventType == ORDER_STATE_UPDATE_EVENT) return [ORDER_EVENT_TOPIC, ORDER_EVENT_SCHEMA_VALUE]
}