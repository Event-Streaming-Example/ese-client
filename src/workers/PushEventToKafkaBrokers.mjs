import { Kafka } from 'kafkajs'
import { createKafkaEventPayload } from '../utilities/CreateEventPayload.mjs'
import { CLICK_STREAM_EVENT, ORDER_STATE_UPDATE_EVENT } from '../entities/EventType.mjs'
import { BUTTON_CLICK_EVENT, ORDER_COMPLETED } from '../entities/EventSubType.mjs'
import { KAFKA_BROKERS, KAFKA_CLIENT_ID, KAFKA_CLUSTER_IP, eventMapper } from './KafkaConstants.mjs'


const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: KAFKA_BROKERS.split(",").map(port => `${KAFKA_CLUSTER_IP}:` + port)
})
const producer = kafka.producer()

export default async function pushWebEventToKafkaBroker(eventType, data) {
    let [topic, _] = eventMapper(eventType)
    await producer.connect()
    await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(data) },],
    })
    await producer.disconnect()
}

pushWebEventToKafkaBroker(CLICK_STREAM_EVENT, createKafkaEventPayload(BUTTON_CLICK_EVENT, "192.169.80.787", {}))
pushWebEventToKafkaBroker(ORDER_STATE_UPDATE_EVENT, createKafkaEventPayload(ORDER_COMPLETED, "192.169.80.787", { "order_id": "CRN135" }))