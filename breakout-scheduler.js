
// breakout-scheduler.js
const { shuffle, chunk } = require('lodash');

/**
 * Every `intervalMs`, shuffle current participants into pairs,
 * create breakout rooms, assign them, then close after the timer.
 */
function startSpeedNetworking(conference, participantsMap, intervalMs = 3 * 60 * 1000) {
  let timers = [];
  let stopped = false;

  function schedule(fn, ms) {
    const id = setTimeout(fn, ms);
    timers.push(id);
    return id;
  }

  function cycle() {
    if (stopped) return;
    const ids = Array.from(participantsMap.keys());
    if (ids.length < 2) return schedule(cycle, intervalMs);

    const pairs = chunk(shuffle(ids), 2);
    // if odd count, merge the solo person into the last full pair
    if (pairs.length > 1 && pairs[pairs.length - 1].length === 1) {
      const solo = pairs.pop();
      pairs[pairs.length - 1].push(solo[0]);
    }
    // create rooms
    conference._room.sendCommand('createBreakoutRooms', {
      rooms: pairs.map((_, i) => `Pair ${i + 1}`)
    });
    // assign participants
    conference._room.sendCommand('setBreakoutRoomsParticipants', {
      rooms: pairs.map((group, idx) => ({
        roomName: `Pair ${idx + 1}`,
        participants: group
      }))
    });

    // close & re-run
    schedule(() => {
      conference._room.sendCommand('closeAllBreakoutRooms');
      schedule(cycle, 5_000);
    }, intervalMs);
  }

  // Kick off the first cycle after join
  cycle();

  // Return a stop function to cancel all pending timers
  return function stop() {
    stopped = true;
    timers.forEach(id => clearTimeout(id));
    timers = [];
  };
}

module.exports = { startSpeedNetworking };
