import { Kafka } from 'kafkajs'
import { KAFKA_BROKERS, KAFKA_CLIENT_ID, KAFKA_CLUSTER_IP, eventMapper } from '../configs/KafkaConfigs.mjs'


const PRODUCER = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: KAFKA_BROKERS.split(",").map(port => `${KAFKA_CLUSTER_IP}:` + port)
}).producer()

export default async function pushWebEventToKafkaBroker(eventType, data) {
    try {
        let [topic, _] = await eventMapper(eventType)
        await PRODUCER.connect()
        await PRODUCER.send({
            topic: topic,
            messages: [{ value: JSON.stringify(data) },],
        })
        await PRODUCER.disconnect()
        return 1
    } catch (error) {
        console.log(`ERROR : ${error}`)
        return 0
    }
}