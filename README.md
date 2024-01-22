# ESE Client

This is the client facing part of the Event-Streaming Example. This repo can be used to understand what type of events would be produced by our frontend and can also be used to simulate them in large numbers.

_Note_ : Switch to `simulate` branch to get the docker file for `simulate` tag

- **Language :** [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- **Library :** [React](https://react.dev/reference/react)

---

## Things to Note

- The order state change events are streamed instantly while the click based events are streamed in a buffered manner (in buckets of 10 - [code](./src/usecases/utilities/PushEventsToBroker.mjs))

- The simulation node will emmit at most 50,000 events with a delay of minimum 300s between each event - [code](./src/usecases/simulation/SimulateTraffic.mjs)

---

## Running via Docker

```bash
docker run -it -p 3000:3000 --name ese-client-container saumyabhatt10642/ese-client

// to run the simulation
docker run -it -p 3000:3000 --name ese-client-simulator-container saumyabhatt10642/ese-client:simulate
```

---

## Running Locally

Before running, we must point our frontend to the backend. Assuming our backend is running on `http://localhost:2001`, we would be setting it as below:

```bash
# setting environment variable in windows
($env:REACT_APP_BE_SERVER = "http://localhost:2001")

# setting environment variable in macOS
export REACT_APP_BE_SERVER=http://localhost:2001
```

```bash
npm install
npm run start       // to run the client in the browser
npm run simulate    // to run the client in simulation
```

---

## Pushing image

**NOTE:** Make sure to change the command in the `Dockerfile` before pushing out the relevant tag.

[DockerHub Repository](https://hub.docker.com/repository/docker/saumyabhatt10642/ese-client/general)

```bash
docker image build -t ese-client:tag .
docker image tag ese-client:tag saumyabhatt10642/ese-client:tag
docker push saumyabhatt10642/ese-client:tag
```
