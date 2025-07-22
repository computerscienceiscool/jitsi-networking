
// breakout-scheduler.js
const { shuffle, chunk } = require('lodash');

/**
 * Every `intervalMs`, shuffle current participants into pairs,
 * create breakout rooms, assign them, then close after the timer.
 */
function startSpeedNetworking(conference, participantsMap, intervalMs = 3 * 60 * 1000) {
  async function cycle() {
    const ids = Array.from(participantsMap.keys());
    if (ids.length < 2) return setTimeout(cycle, intervalMs);

    const pairs = chunk(shuffle(ids), 2);
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
    setTimeout(() => {
      conference._room.sendCommand('closeAllBreakoutRooms');
      setTimeout(cycle, 5_000);
    }, intervalMs);
  }

  // Kick off the first cycle after join
  cycle();
}

module.exports = { startSpeedNetworking };
