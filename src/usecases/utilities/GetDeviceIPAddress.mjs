import axios from "axios";

const THIRD_PARTY_URL = "https://api.ipify.org/?format=json"

export default async function getDeviceIPAddress() {
    const res = await axios.get(THIRD_PARTY_URL);
    const appNo = Math.floor(Math.random() * 10) + 1
    return res.data.ip + "-" + appNo;
};