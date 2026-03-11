# TODO - Jitsi Speed Networking Bugs

## OPEN

- **J102** speed-network.js is a dead end — connects but never joins a conference, no room join, no event listeners, does nothing after `connect()`
- **J103** index.html uses non-existent External API commands — `createBreakoutRooms`, `setBreakoutRoomsParticipants`, `closeAllBreakoutRooms` are not valid `executeCommand` calls in the Jitsi IFrame API
- **J104** breakout-scheduler.js uses private `_room.sendCommand()` with non-standard command names — breakout rooms are not managed via `sendCommand` in lib-jitsi-meet
- **J109** index.html has inline duplicate logic instead of loading the JS modules — README says it loads jitsi-connection.js, breakout-scheduler.js, speed-network.js but it doesn't; uses External API while the modules use lib-jitsi-meet (incompatible approaches)

## DONE

- **J101** JitsiConnection config invalid — added proper `hosts` and `serviceUrl` to both speed-network.js and jitsi-connection.js
- **J105** Odd participant count leaves one person alone — merged solo person into last pair to form a group of 3
- **J106** No connection error handling — added `CONNECTION_FAILED` and `CONNECTION_DISCONNECTED` listeners to speed-network.js and jitsi-connection.js
- **J107** package.json missing required fields — added `name`, `version`, and `scripts.start`
- **J108** speed-network.js `options` variable defined but never used — removed
- **J110** No way to stop the cycle loop — added stop/cancel mechanism with tracked timers in both index.html and breakout-scheduler.js
- **J111** breakout-scheduler.js `cycle()` declared `async` but never uses `await` — removed `async`
