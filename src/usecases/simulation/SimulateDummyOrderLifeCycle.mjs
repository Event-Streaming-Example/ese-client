import generateUUID from '../../utilities/GenerateUUID.mjs';
import pushEventsToBackend from '../../workers/PushEventsToBackend.mjs'
import getDeviceIPAddress from '../../utilities/GetDeviceIPAddress.mjs';

import { ORDER_CREATED, ORDER_ALLOCATED, ORDER_STARTED, ORDER_COMPLETED } from '../../entities/EventSubType.mjs';
import { ORDER_STATE_UPDATE_EVENT } from "../../entities/EventType.mjs";
import createEventPayload, { createKafkaEventPayload } from '../../utilities/CreateEventPayload.mjs';
import simulationResult from './SimulationResult.mjs';
import pushWebEventToKafkaBroker from '../../workers/PushEventToKafkaBrokers.mjs';

let pushToServerInvocation = 0
let pushToKafkaInvocation = 0
let eventCounter = 0

async function createAndPushDummyOrderEvent(orderId, state) {
    const data = { orderId: orderId, timestamp: Date.now() }
    const ip = await getDeviceIPAddress()

    const eventPayload = createEventPayload(ORDER_STATE_UPDATE_EVENT, state, ip, data)
    const kafkaEventPayload = createKafkaEventPayload(state, ip, data)

    pushEventsToBackend(eventPayload).then((result) => {
        eventCounter += 1
        pushToServerInvocation += result
    })
    pushWebEventToKafkaBroker(ORDER_STATE_UPDATE_EVENT, kafkaEventPayload).then((result) => {
        eventCounter += 1
        pushToKafkaInvocation += result
    })
}

async function withDelayPushDummyState(orderId, orderState, timeout) {
    setTimeout(async () => createAndPushDummyOrderEvent(orderId, orderState), timeout)
}

export default async function simulateDummyOrderLifeCycle(isToBeLeftIncomplete) {
    const orderId = generateUUID()

    withDelayPushDummyState(orderId, ORDER_CREATED, 0)
    withDelayPushDummyState(orderId, ORDER_ALLOCATED, 200)
    withDelayPushDummyState(orderId, ORDER_STARTED, 400)

    if (!isToBeLeftIncomplete) withDelayPushDummyState(orderId, ORDER_COMPLETED, 600)
    return simulationResult(eventCounter, pushToServerInvocation, pushToKafkaInvocation)
}