import generateUUID from '../../utilities/GenerateUUID.mjs';
import pushEventsToBackend from '../../workers/PushEventsToBackend.mjs'
import getDeviceIPAddress from '../../utilities/GetDeviceIPAddress.mjs';

import { ORDER_CREATED, ORDER_ALLOCATED, ORDER_STARTED, ORDER_COMPLETED } from '../../entities/EventSubType.mjs';
import { ORDER_STATE_UPDATE_EVENT } from "../../entities/EventType.mjs";
import createEventPayload from '../../utilities/CreateEventPayload.mjs';
import simulationResult from './SimulationResult.mjs';

let publisherInvocations = 0
let eventCounter = 0

async function createAndPushDummyOrderEvent(orderId, state) {
    const data = { orderId: orderId, timestamp: Date.now() }
    const ip = await getDeviceIPAddress()
    const eventPayload = createEventPayload(ORDER_STATE_UPDATE_EVENT, state, ip, data)
    eventCounter += 1
    publisherInvocations += await pushEventsToBackend(eventPayload)
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
    return simulationResult(eventCounter, publisherInvocations)
}