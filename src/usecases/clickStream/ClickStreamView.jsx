import React from "react";
import ButtonEventListener from "./EventListener/ButtonEventListener";
import InputEventListener from "./EventListener/InputEventListener";
import KeyPressEventListener from "./EventListener/KeyPressEventListener";

import { CLICK_STREAM_EVENT } from "../../entities/EventType.mjs";

export default function ClickStreamView({ onChangeHandler }) {
  return (
    <div>
      <h2>Click Streams</h2>
      <p>
        Any user inputs could be recorded as an event and be considered for
        streaming.
      </p>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Example</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <ButtonEventListener
            onChangeHandler={onChangeHandler}
            eventType={CLICK_STREAM_EVENT}
          />
          <InputEventListener
            onChangeHandler={onChangeHandler}
            eventType={CLICK_STREAM_EVENT}
          />
          <KeyPressEventListener
            onChangeHandler={onChangeHandler}
            eventType={CLICK_STREAM_EVENT}
          />
        </tbody>
      </table>
    </div>
  );
}
