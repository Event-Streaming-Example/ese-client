
export default function simulationResult(events, serverInvocations, kafkaInvocations) {
    return {
        "events": events,
        "server_invocations": serverInvocations,
        "kafka_invocations": kafkaInvocations
    }
}