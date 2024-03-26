
function createEvent(eventType, eventSubType) {
    return {
        "type": eventType,
        "sub_type": eventSubType
    };
}

export default function createEventPayload(eventType, eventSubType, ip, data) {
    let event = createEvent(eventType, eventSubType);
    return {
        "event": event,
        "timestamp": Date.now(),
        "ip": ip,
        "data": data
    };
}