import { Kafka } from 'kafkajs'

const KAFKA_CLUSTER_IP = '192.168.29.191'
const KAFKA_TOPIC = 'adele'
const KAFKA_BROKERS = [`${KAFKA_CLUSTER_IP}:19093`, `${KAFKA_CLUSTER_IP}:29093`]
const CLIENT_ID = 'test-app'

const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: KAFKA_BROKERS
})

const producer = kafka.producer()

async function sendMessageToTopic(message, topic) {
    await producer.connect()
    await producer.send({
        topic: topic,
        messages: [
            { value: message },
        ],
    })

    await producer.disconnect()
}

sendMessageToTopic("hello from the other side!", KAFKA_TOPIC)
