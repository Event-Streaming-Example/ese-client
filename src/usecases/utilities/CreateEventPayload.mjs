export default function createEventPayload(eventType, ip, data) {
    return {
        "event_type": eventType,
        "timestamp": Date.now(),
        "ip": ip,
        "data": data
    }
}