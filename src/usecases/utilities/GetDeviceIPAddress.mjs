import axios from "axios";

const THIRD_PARTY_URL = "https://api.ipify.org/?format=json"

export default async function getDeviceIPAddress() {
    const res = await axios.get(THIRD_PARTY_URL);
    return res.data.ip;
};