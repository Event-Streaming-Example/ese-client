export default function createEventPayload(eventType, ip, data) {
    return {
        "eventType": eventType,
        "timestamp": Date.now(),
        "ip": ip,
        "data": data
    }
}