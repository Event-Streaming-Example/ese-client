import { makePostCall } from "../utilities/MakeApiCall.mjs"

import dotenv from 'dotenv';

dotenv.config();
const KAFKA_CLUSTER_IP = process.env.REACT_APP_KAFKA_CLUSTER_IP
const KAFKA_CLUSTER_PORT = process.env.REACT_APP_KAFKA_CLUSTER_APIGW_PORT
const KAFKA_WEB_EVENTS_TOPIC = process.env.REACT_APP_KAFKA_WEB_EVENTS_TOPIC


async function pushEvent(event, topic) {
    let url = `http://${KAFKA_CLUSTER_IP}:${KAFKA_CLUSTER_PORT}/topics/${topic}`
    let headers = { 'Content-Type': 'application/vnd.kafka.json.v2+json' }
    await makePostCall(url, headers, event)
}

export default async function pushWebEventToKafkaApigw(event) {
    let payload = {
        "records": [
            {
                "value": event
            }
        ]
    }
    pushEvent(payload, KAFKA_WEB_EVENTS_TOPIC)
}

pushWebEventToKafkaApigw("At least I can say that I tried")
