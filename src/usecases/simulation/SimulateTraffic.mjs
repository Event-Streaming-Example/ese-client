import simulateClickStreams from './SimulateClickStreams.mjs';
import simulateDummyOrderLifeCycle from './SimulateDummyOrderLifeCycle.mjs';

const EVENT_COUNTER_LIMIT = 50000

let eventCounter = 0
let publisherInvocationCounter = 0

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simulateDummyOrderLifeCycleWithDisruption() {
    const random = getRandomInt(0, 100);
    let orderCycleDisrupt = false
    if (random % 2 === 0) orderCycleDisrupt = true
    simulateDummyOrderLifeCycle(orderCycleDisrupt).then((result) => {
        eventCounter += result.events
        publisherInvocationCounter += result.invocations
    })
}

function simulateClickStreamsWithExcess() {
    const random = getRandomInt(0, 8)
    simulateClickStreams(random).then((result) => {
        eventCounter += result.events
        publisherInvocationCounter += result.invocations
    })
}


function createInfiniteLoop() {
    setTimeout(() => {
        simulateDummyOrderLifeCycleWithDisruption()
        simulateClickStreamsWithExcess()
        if (eventCounter < EVENT_COUNTER_LIMIT) createInfiniteLoop()
    }, 300);
}

createInfiniteLoop()

process.on('SIGINT', function () {
    console.log(`Events created:\t\t${eventCounter}`)
    console.log(`Publisher Invocations:\t${publisherInvocationCounter}`)
    process.exit();
});
