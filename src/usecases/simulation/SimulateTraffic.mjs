import { EVENT_COUNTER_HARD_LIMIT, EVENT_DELAY_IN_MILlIS } from '../../configs/SimulationConfigs.mjs';
import simulateClickStreams from './SimulateClickStreams.mjs';
import simulateDummyOrderLifeCycle from './SimulateDummyOrderLifeCycle.mjs';


let eventCounter = 0
let serverInvocationCounter = 0
let kafkaInvocationCounter = 0

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simulateDummyOrderLifeCycleWithDisruption() {
    const random = getRandomInt(0, 100);
    let orderCycleDisrupt = false
    if (random % 2 === 0) orderCycleDisrupt = true
    simulateDummyOrderLifeCycle(orderCycleDisrupt).then((result) => {
        eventCounter += result.events
        serverInvocationCounter += result.server_invocations
        kafkaInvocationCounter += result.kafka_invocations
    })
}

function simulateClickStreamsWithExcess() {
    const random = getRandomInt(0, 8)
    simulateClickStreams(random).then((result) => {
        eventCounter += result.events
        serverInvocationCounter += result.server_invocations
        kafkaInvocationCounter += result.kafka_invocations
    })
}


function createInfiniteLoop() {
    setTimeout(() => {
        simulateDummyOrderLifeCycleWithDisruption()
        simulateClickStreamsWithExcess()
        if (eventCounter < EVENT_COUNTER_HARD_LIMIT) createInfiniteLoop()
    }, EVENT_DELAY_IN_MILlIS);
}

createInfiniteLoop()

process.on('SIGINT', function () {
    console.log(`Events created:\t\t${eventCounter}`)
    console.log(`Server Invocations:\t${serverInvocationCounter}`)
    console.log(`Kafka Invocations:\t${kafkaInvocationCounter}`)
    process.exit();
});
