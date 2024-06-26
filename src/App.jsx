import pushEventsToBackend from "./workers/PushEventsToBackend.mjs";
import pushEventToKafkaApigw from "./workers/PushEventToKafkaApigw.mjs";
import ClickStreamView from "./usecases/clickStream/ClickStreamView";
import StateChangeView from "./usecases/stateChange/StateChangeView";
import getDeviceIPAddress from "./utilities/GetDeviceIPAddress.mjs";
import createEventPayload, {
  createKafkaEventPayload,
} from "./utilities/CreateEventPayload.mjs";

import React, { useState, useEffect } from "react";

function App() {
  const [ip, setIP] = useState("");
  const [eventLogs, setEventLogs] = useState([]);
  useEffect(() => {
    getDeviceIPAddress().then((ip) => setIP(ip));
  }, []);

  function onEventCreationHandler(eventType, eventSubType, data) {
    const eventPayload = createEventPayload(eventType, eventSubType, ip, data);
    const kafkaEventPayload = createKafkaEventPayload(eventSubType, ip, data);

    pushEventsToBackend(eventPayload);
    pushEventToKafkaApigw(eventType, kafkaEventPayload); // cannot use kafkaJS in browser

    setEventLogs((prevLogs) => [...prevLogs, eventPayload]);
  }

  return (
    <div className="App">
      <div className="actionables">
        <h1>Client App</h1>
        <p>The below given action can be performed to mimick an event</p>
        <br />
        <ClickStreamView onChangeHandler={onEventCreationHandler} />
        <br />
        <StateChangeView onChangeHandler={onEventCreationHandler} />
      </div>

      <div className="logging">
        <h3>Event logs</h3>
        <p>Total number of events generated : {eventLogs.length}</p>
        {eventLogs.map((it) => (
          <p className="logs" key={`${it}-${Math.random()}`}>
            {JSON.stringify(it)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
