import React, { useState } from "react";
import {
  ORDER_CREATED,
  ORDER_ALLOCATED,
  ORDER_STARTED,
  ORDER_COMPLETED,
} from "../../entities/Events.mjs";
import { ORDER_STATE_UPDATE_EVENT } from "../../entities/EventType.mjs";
import generateUUID from "../utilities/GenerateUUID.mjs";

export default function StateChangeView({ onChangeHandler }) {
  const [state, setState] = useState({});
  const [orderId, setOrderId] = useState(generateUUID());

  function changeOrderState(updatedState) {
    const orderEventBlock = {
      orderId: orderId,
      state: updatedState,
      timestamp: Date.now(),
    };
    onChangeHandler(ORDER_STATE_UPDATE_EVENT, orderEventBlock);
    setState(orderEventBlock);
  }

  function resetOrder() {
    setOrderId(generateUUID());
    setState({});
  }

  return (
    <div>
      <h2>State Changes</h2>
      <p>
        Any changes to the state of an object can also be considered an event.
        Toggle the state of an order below to view its current state.
      </p>
      <button onClick={() => changeOrderState(ORDER_CREATED)}>
        Create an order
      </button>
      <button onClick={() => changeOrderState(ORDER_ALLOCATED)}>
        Allocate an order
      </button>
      <button onClick={() => changeOrderState(ORDER_STARTED)}>
        Start an order
      </button>
      <button onClick={() => changeOrderState(ORDER_COMPLETED)}>
        Complete an order
      </button>
      <br />
      <button onClick={() => resetOrder()}>Reset</button>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
}
