import { Kafka } from 'kafkajs'
import dotenv from 'dotenv';

dotenv.config();
const KAFKA_CLUSTER_IP = process.env.REACT_APP_KAFKA_CLUSTER_IP
const KAFKA_WEB_EVENTS_TOPIC = process.env.REACT_APP_KAFKA_WEB_EVENTS_TOPIC
const KAFKA_CLIENT_ID = process.env.REACT_APP_KAFKA_CLIENT_ID
const KAFKA_BROKERS_PORT = process.env.REACT_APP_KAFKA_CLUSTER_BROKERS


const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: KAFKA_BROKERS_PORT.split(",").map(port => `${KAFKA_CLUSTER_IP}:` + port)
})
const producer = kafka.producer()

export default async function pushWebEventToKafkaBroker(message) {
    await producer.connect()
    await producer.send({
        topic: KAFKA_WEB_EVENTS_TOPIC,
        messages: [
            { value: message },
        ],
    })
    await producer.disconnect()
}

pushWebEventToKafkaBroker("hello from the other side!")
