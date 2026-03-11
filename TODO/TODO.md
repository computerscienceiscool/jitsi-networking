# TODO - Jitsi Speed Networking Bugs

## OPEN

- **J101** JitsiConnection config invalid — `{ domain }` is not a valid config; needs `serviceUrl` or `hosts` object (speed-network.js:12, jitsi-connection.js:8)
- **J102** speed-network.js is a dead end — connects but never joins a conference, no room join, no event listeners, does nothing after `connect()`
- **J103** index.html uses non-existent External API commands — `createBreakoutRooms`, `setBreakoutRoomsParticipants`, `closeAllBreakoutRooms` are not valid `executeCommand` calls in the Jitsi IFrame API
- **J104** breakout-scheduler.js uses private `_room.sendCommand()` with non-standard command names — breakout rooms are not managed via `sendCommand` in lib-jitsi-meet
- **J106** No connection error handling — neither speed-network.js nor jitsi-connection.js handle `CONNECTION_FAILED` or `CONNECTION_DISCONNECTED` events
- **J109** index.html has inline duplicate logic instead of loading the JS modules — README says it loads jitsi-connection.js, breakout-scheduler.js, speed-network.js but it doesn't; uses External API while the modules use lib-jitsi-meet (incompatible approaches)
- **J110** No way to stop the cycle loop — `cycle()` recurses via `setTimeout` indefinitely with no cancel mechanism (index.html:33, breakout-scheduler.js:10)

## DONE

- **J105** Odd participant count leaves one person alone — merged solo person into last pair to form a group of 3
- **J107** package.json missing required fields — added `name`, `version`, and `scripts.start`
- **J108** speed-network.js `options` variable defined but never used — removed
- **J111** breakout-scheduler.js `cycle()` declared `async` but never uses `await` — removed `async`
