# ESE Client

This is the client facing part of the Event-Streaming Example. This repo can be used to understand what type of events would be produced by our frontend and can also be used to simulate them in large numbers.

_Note_ : Switch to `simulate` branch to get the docker file for `simulate` tag

- **Language :** [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- **Library :** [React](https://react.dev/reference/react)

---

## Running via Docker

Set the desired configs in the `.env` file before running the below commands.

```bash
docker run -it -p 3006:3006 --env-file .env --name ese-client-container saumyabhatt10642/ese-client

// to run the simulation
docker run -it -p 3006:3006 --env-file .env --name ese-client-simulator-container saumyabhatt10642/ese-client:simulate
```

---

## Running Locally

Set the desired configs in the `.env` file before running the below commands.

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
