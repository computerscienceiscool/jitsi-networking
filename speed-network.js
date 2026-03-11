
// speed-network.js
const JitsiMeetJS = require('lib-jitsi-meet');
const { shuffle, chunk } = require('lodash');

const domain = 'meet.jit.si';       // or your custom Jitsi domain
const roomName = 'SpeedNetRoom';    // change as you like
// Initialize
JitsiMeetJS.init();
const connection = new JitsiMeetJS.JitsiConnection(null, null, {
  hosts: { domain, muc: `conference.${domain}` },
  serviceUrl: `https://${domain}/http-bind`
});
connection.addEventListener(
  JitsiMeetJS.events.connection.CONNECTION_FAILED,
  (err) => { console.error('Connection failed:', err); }
);
connection.addEventListener(
  JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
  () => { console.warn('Connection disconnected'); }
);
connection.connect();
