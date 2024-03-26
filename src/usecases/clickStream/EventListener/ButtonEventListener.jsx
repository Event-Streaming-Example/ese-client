import React, { useState } from "react";
import { CLICK_STREAM_EVENT } from "../../../entities/EventType.mjs";
import { BUTTON_CLICK_EVENT } from "../../../entities/EventSubType.mjs";

export default function ButtonEventListener({ onChangeHandler }) {
  const [clickEvent, setClickEvent] = useState(0);

  const handleStateChange = () => {
    setClickEvent(clickEvent + 1);
    onChangeHandler(CLICK_STREAM_EVENT, BUTTON_CLICK_EVENT, {});
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
