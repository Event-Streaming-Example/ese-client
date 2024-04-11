import { CLICK_STREAM_EVENT } from "../../entities/EventType.mjs";
import { INPUT_PASSED_EVENT, BUTTON_CLICK_EVENT, KEY_PRESS_EVENT } from "../../entities/EventSubType.mjs";
import createEventPayload, { createKafkaEventPayload } from "../../utilities/CreateEventPayload.mjs";
import getDeviceIPAddress from "../../utilities/GetDeviceIPAddress.mjs";
import pushEventsToBackend from "../../workers/PushEventsToBackend.mjs"
import simulationResult from "./SimulationResult.mjs";
import pushWebEventToKafkaBroker from "../../workers/PushEventToKafkaBrokers.mjs";

let pushToServerInvocation = 0
let pushToKafkaInvocation = 0
let eventCounter = 0

async function invokePushEventToBroker(ipAddress, event) {
    const eventPayload = createEventPayload(CLICK_STREAM_EVENT, event, ipAddress, {})
    const kafkaEventPayload = createKafkaEventPayload(event, ipAddress, {})

    pushEventsToBackend(eventPayload).then((result) => {
        pushToServerInvocation += result
        eventCounter += 1
    })

    pushWebEventToKafkaBroker(CLICK_STREAM_EVENT, kafkaEventPayload).then((result) => {
        pushToKafkaInvocation += result
        eventCounter += 1
    })
}

async function repeatFunction(times, ip, event) {
    for (let i = 0; i < times; i++) {
        invokePushEventToBroker(ip, event)
    }
}

export default async function simulateClickStreams(random) {
    const ip = await getDeviceIPAddress()

    invokePushEventToBroker(ip, INPUT_PASSED_EVENT)
    invokePushEventToBroker(ip, BUTTON_CLICK_EVENT)
    invokePushEventToBroker(ip, KEY_PRESS_EVENT)

    if (random % 2 == 0) repeatFunction(random, ip, INPUT_PASSED_EVENT)
    else if (random % 3 == 0) repeatFunction(random, ip, BUTTON_CLICK_EVENT)
    else repeatFunction(random, ip, KEY_PRESS_EVENT)

    return simulationResult(eventCounter, pushToServerInvocation, pushToKafkaInvocation)
}