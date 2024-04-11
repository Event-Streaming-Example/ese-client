import axios from "axios"

export async function makePostCall(url, headers, payload) {
    return axios.post(url, payload, {
        headers: headers
    })
}