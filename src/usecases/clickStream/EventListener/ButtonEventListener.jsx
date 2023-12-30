import React, { useState } from "react";
import { BUTTON_CLICK_EVENT } from "../../../entities/Events.mjs";

export default function ButtonEventListener({ onChangeHandler, eventType }) {
  const [clickEvent, setClickEvent] = useState(0);

  const handleStateChange = (event) => {
    setClickEvent(clickEvent + 1);
    onChangeHandler(eventType, { event: BUTTON_CLICK_EVENT });
  };

  return (
    <tr>
      <td>Clicking a button</td>
      <td>
        <button onClick={handleStateChange}>Click</button>
      </td>
      <td>{clickEvent} (Counter)</td>
    </tr>
  );
}
