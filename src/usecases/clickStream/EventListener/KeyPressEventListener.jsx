import React, { useState, useEffect } from "react";
import { KEY_PRESS_EVENT } from "../../../entities/Events.mjs";

export default function KeyPressEventListener(props) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === "F") {
        setCounter((prevCounter) => prevCounter + 1);
        props.onChangeHandler(props.eventType, { event: KEY_PRESS_EVENT });
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [counter, props]);

  return (
    <tr>
      <td>Pressing a key</td>
      <td>Press 'F' key</td>
      <td>{counter} (Counter)</td>
    </tr>
  );
}
