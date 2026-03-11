
// jitsi-connection.js
const JitsiMeetJS = require('lib-jitsi-meet');
const participants = new Map();

function initConnection(domain, roomName, options, onJoined, onUserJoin, onUserLeft) {
  JitsiMeetJS.init();
  const conn = new JitsiMeetJS.JitsiConnection(null, null, {
    hosts: { domain, muc: `conference.${domain}` },
    serviceUrl: `https://${domain}/http-bind`
  });
  conn.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
    () => {
      const conf = conn.initJitsiConference(roomName, options);
      conf.on(JitsiMeetJS.events.conference.USER_JOINED, (id, user) => {
        participants.set(id, user.getDisplayName());
        onUserJoin(id, user);
      });
      conf.on(JitsiMeetJS.events.conference.USER_LEFT, id => {
        participants.delete(id);
        onUserLeft(id);
      });
      conf.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
        onJoined(conf);
      });
      conf.join();
    }
  );
  conn.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_FAILED,
    (err) => { console.error('Connection failed:', err); }
  );
  conn.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
    () => { console.warn('Connection disconnected'); }
  );
  conn.connect();
  return { connection: conn, participants };
}

module.exports = { initConnection };
