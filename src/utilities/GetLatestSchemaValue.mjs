import axios from 'axios';
import { KAFKA_SCHEMA_REGISTRY_URL } from '../configs/KafkaConfigs.mjs';


async function getLatestVersion(topic) {
    let url = `${KAFKA_SCHEMA_REGISTRY_URL}/subjects/${topic}-value/versions`
    let result = (await axios.get(url))
    return Math.max(...result.data)
}

export async function getLatestSchemaValue(topic) {
    let latestVerison = await getLatestVersion(topic)
    let url = `${KAFKA_SCHEMA_REGISTRY_URL}/subjects/${topic}-value/versions/${latestVerison}`
    let result = (await axios.get(url))
    return JSON.stringify(result.data.schema)
}