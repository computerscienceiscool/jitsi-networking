
// speed-network.js
const JitsiMeetJS = require('lib-jitsi-meet');
const { shuffle, chunk } = require('lodash');

const domain = 'meet.jit.si';       // or your custom Jitsi domain
const roomName = 'SpeedNetRoom';    // change as you like
const options = { disableSimulcast: false };

// Initialize
JitsiMeetJS.init();
const connection = new JitsiMeetJS.JitsiConnection(null, null, { domain });
connection.connect();
