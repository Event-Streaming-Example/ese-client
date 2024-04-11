import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const KAFKA_SCHEMA_REGISTRY_IP = process.env.REACT_APP_KAFKA_SCHEMA_REGISTRY_IP
const KAFKA_SCHEMA_REGISTRY_PORT = process.env.REACT_APP_KAFKA_SCHEMA_REGISTRY_PORT

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