import axios from 'axios';
import { KAFKA_SCHEMA_REGISTRY_IP, KAFKA_SCHEMA_REGISTRY_PORT } from '../configs/KafkaConfigs.mjs';

const URL = `http://${KAFKA_SCHEMA_REGISTRY_IP}:${KAFKA_SCHEMA_REGISTRY_PORT}`

async function getLatestVersion(topic) {
    let url = `${URL}/subjects/${topic}-value/versions`
    let versions = (await axios.get(url)).data
    return Math.max(...versions)
}

export async function getLatestSchemaValue(topic) {
    let latestVerison = await getLatestVersion(topic)
    let url = `${URL}/subjects/${topic}-value/versions/${latestVerison}`
    let schema = (await axios.get(url)).data.schema
    return JSON.stringify(schema)
}