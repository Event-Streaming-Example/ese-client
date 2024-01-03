# ESE Client

This is the client facing part of the Event-Streaming Example. This repo can be used to understand what type of events would be produced by our frontend and can also be used to simulate them in large numbers.

_Note_ : Switch to `simulate` branch to get the docker file for `simulate` tag

---

## Overview

Currently, the client emits 2 types of events. Click based events and order state change events. The purpose of this repo is to simulate them and hence provide as a source for us to test our streaming pipeline.

Run the project to understand more about these events in detail.

### Notes

- The order state change events are streamed instantly while the click based events are streamed in a buffered manner (in buckets of 10 - [code](./src/usecases/utilities/PushEventsToBroker.mjs))

- The simulation node will emmit at most 50,000 events with a delay of minimum 300s between each event - [code](./src/usecases/simulation/SimulateTraffic.mjs)

---

## Setting up

### Using Docker

Make sure Docker is running and you are logged in. Run the below-given commands in order. The application will start running on `localhost:8000`

```bash
docker run -it -p 3000:3000 --name ese-client-container saumyabhatt10642/ese-client
```

In order to run the simulation, download the same image with the `simulate` tag and run it.

```bash
docker run -it -p 3000:3000 --name ese-client-simulator-container saumyabhatt10642/ese-client:simulate
```

---

### Using NPM

If you don't have docker, you can simply run the following commands using npm.

```bash
npm install
npm run start       // to run the client in the browser
npm run simulate    // to run the client in simulation
```

---

## Pushing image

__NOTE:__ Make sure to change the command in the `Dockerfile` before pushing out the relevant tag.

[DockerHub Repository](https://hub.docker.com/repository/docker/saumyabhatt10642/ese-client/general)

```bash
docker image build -t ese-client:tag .
docker image tag ese-client:tag saumyabhatt10642/ese-client:tag
docker push saumyabhatt10642/ese-client:tag
```
