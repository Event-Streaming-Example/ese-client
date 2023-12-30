import React, { useState } from "react";
import { INPUT_PASSED_EVENT } from "../../../entities/Events.mjs";

export default function InputEventListener({ onChangeHandler, eventType }) {
  const [inputEvent, setInputEvent] = useState(0);

  const handleInputValueChange = (event) => {
    const value = event.target.value;

    const newInputEvent = value.trim() === "" ? 0 : 1;
    if (inputEvent === 0 && newInputEvent === 1)
      onChangeHandler(eventType, { event: INPUT_PASSED_EVENT });
    setInputEvent(newInputEvent);
  };

  return (
    <tr>
      <td>Giving an input</td>
      <td>
        <input
          onChange={handleInputValueChange}
          placeholder="Type anything here"
        ></input>
      </td>
      <td>{inputEvent} (Boolean)</td>
    </tr>
  );
}
