# ESE Client

This is the client facing part of the Event-Streaming Example. This repo can be used to understand what type of events would be produced by our frontend and can also be used to simulate them in large numbers.

## Setting up

### Using Docker

Make sure docker is running and you are logged in. Run the below given commands in order. The application will start running on `localhost:8000`

```docker
docker image pull saumyabhatt10642/ese-client
```

```docker
docker image run -it -p 8000:3000 --name ese-client-container saumyabhatt10642/ese-client
```

---

In order to run the simulation, download the same image with the `simulate` tag and run it.

```docker
docker image pull saumyabhatt10642/ese-client:simulate
```

```docker
docker image run -it -p 8080:3000 --name ese-client-simulator-container saumyabhatt10642/ese-client:simulate
```

---

### Using NPM

If you don't have docker, one can simply run the following commands using npm.

```terminal
npm install
npm run start       // to start the web-facing client
npm run simulate    // to start the simulation
```
