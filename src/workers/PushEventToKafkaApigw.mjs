import axios from "axios";
import { KAFKA_CLUSTER_IP, KAFKA_CLUSTER_PORT, eventMapper } from "../configs/KafkaConfigs.mjs";


async function pushEvent(topic, schema, data) {
    let url = `http://${KAFKA_CLUSTER_IP}:${KAFKA_CLUSTER_PORT}/topics/${topic}`
    let headers = { 'Content-Type': 'application/vnd.kafka.json.v2+json' }
    let payload = {
        "value_schema": schema,
        "records": [{ "value": data }]
    }
    return await axios.post(url, payload, { headers: headers })
}


export default async function pushEventToKafkaApigw(eventType, data) {
    try {
        let [topic, schema_value] = await eventMapper(eventType)
        let res = await pushEvent(topic, schema_value, data)
        console.log(`Pushed to Kafka : ${res.status} | ${res.data}`)
        return 1
    } catch (error) {
        console.log(`ERROR : ${error}`)
        return 0
    }
}
