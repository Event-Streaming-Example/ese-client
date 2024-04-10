import axios from "axios"

const KAFKA_CLUSTER_IP = '192.168.29.191'
const KAFKA_CLUSTER_PORT = '8082'
const KAFKA_TOPIC = 'adele'

async function makeApiCall(url, payload) {
    return axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/vnd.kafka.json.v2+json'
        }
    })
}

let url = `http://${KAFKA_CLUSTER_IP}:${KAFKA_CLUSTER_PORT}/topics/${KAFKA_TOPIC}`
let payload = {
    "records": [
        {
            "value": "at least I can see that I'm trying"
        }
    ]
}

makeApiCall(url, payload)