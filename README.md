
# SpeedNetRoom Application

This project is a client-side web application that integrates with Jitsi Meet to provide breakout room scheduling and network monitoring. It consists of the following files and directories:

## Files & Directories

* **index.html**
  The main entry point of the application. It loads the UI and includes the following script tags:

  * `jitsi-connection.js`
  * `breakout-scheduler.js`
  * `speed-network.js`

* **jitsi-connection.js**
  Handles initialization and management of the Jitsi Meet API. Responsibilities include:

  * Connecting to a Jitsi room
  * Managing local and remote tracks
  * Exposing methods for creating breakout rooms

* **breakout-scheduler.js**
  Implements scheduling logic for breakout sessions. Responsibilities include:

  * Reading UI inputs (e.g., number of rooms, participants per room)
  * Calling into the Jitsi connection layer to create/split rooms
  * Providing callbacks for start/stop events of breakout sessions

* **speed-network.js**
  Monitors network quality and bandwidth. Responsibilities include:

  * Listening to Jitsi statistics events
  * Displaying real-time network metrics in the UI
  * Alerting users on performance degradation

* **package.json**
  Defines project metadata and dependencies. Key sections:

  * `dependencies`: lists runtime libraries (e.g., `http-server`, if used)
  * `scripts`: contains convenience commands (e.g., `start`)

* **package-lock.json**
  Automatically generated lockfile. Ensures reproducible installs.

* **node\_modules/**
  Installed dependencies. Do not commit to version control.

## How These Files Interact

1. **index.html** bootstraps the application by loading the three main scripts in order:

   1. `jitsi-connection.js` establishes the Jitsi connection.
   2. `breakout-scheduler.js` hooks into that connection to schedule rooms.
   3. `speed-network.js` listens for stats on the same connection.
2. The UI in `index.html` provides controls (buttons, forms) which trigger functions in `breakout-scheduler.js` and `jitsi-connection.js`.
3. `breakout-scheduler.js` uses the Jitsi API client exposed by `jitsi-connection.js` to split participants.
4. `speed-network.js` subscribes to Jitsi's `CONNECTION_STATS` events and renders metrics in the DOM.

## Prerequisites

* [Node.js](https://nodejs.org/) (v12+)
* npm (comes with Node.js)

## Installation & Startup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Serve the application on port 9000**

   * If your `package.json` includes a `start` script (e.g., using `http-server`):

     ```bash
     npm start
     ```

     This will launch a static file server at `http://localhost:9000/`.

   * **Or** using npx/http-server directly:

     ```bash
     npx http-server . -p 9000
     ```

3. **Open in browser**

   Navigate to `http://localhost:9000/` to access the SpeedNetRoom application.

---

Enjoy scheduling breakout rooms and monitoring network performance with Jitsi Meet!

