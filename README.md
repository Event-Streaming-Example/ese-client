# ESE Client

This is the client facing part of the Event-Streaming Example. This repo can be used to understand what type of events would be produced by our frontend and can also be used to simulate them in large numbers.

---

## Overview

Currently, the client emits 2 types of events. Click based events and order state change events. The purpose of this repo is to simulate them and hence provide as a source for us to test our streaming pipeline.

Run the project to understand more about these events in detail.

The order state change events are streamed instantly while the click based events are streamed in a buffered manner (in buckets of 10 - [code](./src/usecases/utilities/PushEventsToBroker.mjs))

---

## Setting up

### Using Docker

Make sure docker is running and you are logged in. Run the below given commands in order. The application will start running on `localhost:8000`

[DockerHub Repo](https://hub.docker.com/repository/docker/saumyabhatt10642/ese-client/general)

```docker
docker image pull saumyabhatt10642/ese-client
docker image run -it -p 8000:3000 --name ese-client-container saumyabhatt10642/ese-client
```

In order to run the simulation, download the same image with the `simulate` tag and run it.

```docker
docker image pull saumyabhatt10642/ese-client:simulate
docker image run -it -p 8080:3000 --name ese-client-simulator-container saumyabhatt10642/ese-client:simulate
```

---

### Using NPM

If you don't have docker, one can simply run the following commands using npm.

```terminal
npm install
npm run start       // to run the client in browser
npm run simulate    // to run the client in simulation
```

---

## Pushing image

__NOTE:__ Make sure to change the command in the `Dockerfile` before pushing out the relevant tag.

```docker
docker image build -t ese-client:tag
docker image tag ese-client:tag saumyabhatt10642/ese-client:tag
docker push saumyabhatt10642/ese-client:tag
```