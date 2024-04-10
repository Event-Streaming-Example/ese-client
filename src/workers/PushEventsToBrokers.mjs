import { Kafka } from 'kafkajs'

const KAFKA_IP = '192.168.29.191'

const kafka = new Kafka({
    clientId: 'test-app',
    brokers: [`${KAFKA_IP}:19093`, `${KAFKA_IP}:29093`]
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

sendMessageToTopic("hello from the other side!", "adele")
