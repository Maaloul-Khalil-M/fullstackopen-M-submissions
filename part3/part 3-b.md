# Goal

Connect the phonebook frontend to a Express backend, then deploy the unified app to the web.
(not written in order of exercices)

# Connect Frontend to Backend Locally

## initial start

| Part     | Location                                         | URL                                 |
| -------- | ------------------------------------------------ | ----------------------------------- |
| Frontend | `~/part2/phonebook` commit `exercice 2.17`       | `http://localhost:5173/`            |
| Backend  | `~/part3/phonebookBackend` commit `exercice 3.8` | `http://localhost:3001/api/persons` |

- The frontend currently fetches data via `json-server` at:

```js
// services/fetchLogic.js
const baseUrl = "http://localhost:3001/persons";
```

- The backend stores data in an in-memory `persons[]`

## Problem: CORS Error

When we change `baseUrl` to call the backend we get [**CORS error**](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy)
this happen because the front and back have different PORT therefore different origin
<image src="./assets/corc err.png" width="300px"/>

To allow CORS we add `cors` middleware to the backend:

```js
// back/index.js
const cors = require("cors");
app.use(cors());
```

<image src="./assets/corc allow.png" width="300px"/>
=> front and back are now running on two separate ports, talking to each other correctly.
(GET + DELETE ok, PUT isn't defined yet in the back therefore 400)

## remove the seperation

instead of app running on two ports, we will make the Backend serve the entire app on port 3001

```plaintext
PhonebookFull/
├──── phonebook/              <- Frontend
└──── PhonebookBackend/       <- Backend
```

this requires this setup:

1. build the Frontend (Production version)
2. copy the front build inside the back and serve those STATIC files
3. switch to relative url

### 1- build the Frontend

```bash
npm run build
```

Vite compiles and minifies the React app into a `dist/`

### 2- copy the front and serve it

```bash
cp -r dist ../PhonebookBackend
```

```js
// middleware to serve the static files
app.use(express.static("dist"));
```

=> now with`http://localhost:3001`, the back serve `dist/index.html` along with the RESTful `api/persons`

### 3- switch to relative url

since everything have the same ORIGIN, we can switch to url relative path

```js
// services/fetchLogic.js
const baseUrl = "/api/persons";
```

`npm run dev` is now broken since vite go to port 5173 by default
therefore we need to define a [PROXY](https://fullstackopen.com/en/part3/deploying_app_to_internet#proxy)

**testing it locally is successful**
<image src="./assets/localprove.png" width="800px"/>
=> to avoid repeating this process everytime we update react DEV build, add this script

```json
// package.json
"build:ui": "rm -rf dist && cd ../phonebook && npm run build && cp -r dist ../PhonebookBackend",
```

# Deploy our app to the web

1. setup the repo
2. choose where to deploy = [Render](https://render.com/)

## setup the repo

```plaintext
PhonebookBackend/         <-- deployed repo root
├── ...
└── dist/                 <-- minified front
    ├── index.html
    └── assets/
```

no need to deploy the front, we minified it and add it to the back
Because of this, we need to make `dist/` not listed in your backend's `.gitignore` we just add `node_modules/`

on the deployed server, the port is **injected**

```js
// index.js
const PORT = process.env.PORT || 3001;
```

we add this scirpt to automate and push changes

```json
// package.json
"deploy:full": "npm run build:ui && git add . && git commit -m \"ui build\" && git push",
```

## deploy on render

[Render](https://render.com/) is a **Platform as a Service (PaaS)** that lets developers deploy backend in friendly way
It is convenient for small projects/api like our, sadly not for production-grade or always-on applications

The free tier works fine for this project but has real constraints: - **Server sleeps after 15 minutes of inactivity.** The next request will hang for 30–60 seconds while it wakes back up. Just wait it out. - **Weak hardware:** 0.1 CPU and 512 MB RAM — fine for a phonebook. - **No persistent disk.** The in-memory `persons[]` resets every time the server restarts or redeploys. For now this is acceptable — eventually you'd replace it with a database. - **No SSH access** — you can't shell into the running instance to debug. - **Delayed logs** — no live log streaming; you query logs by time range. - **Single instance only** — no scaling, no background workers, no scheduled jobs.

inside render we will create a **web-service** and choose `./part3/PhonebookFull/phonebookBackend` as repo root
we should now be able to check if the deploy was successful
<image src="./assets/renderdep.png" width="600px"/>
and be able to send some request
<image src="./assets/hosting1.png" width="600px"/><image src="./assets/hosting2.png" width="600px"/>
and it was deployed [here](https://fullstackopen-m-submissions.onrender.com/)
