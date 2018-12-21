const i18n = require('i18n');
const { sendAnswer } = require('../helpers/replies');

module.exports = (bot) => {
  bot
    .dialog('firstRun', (session) => {
      session.userData.firstRun = true;
      sendAnswer(session, i18n.__('greetings', process.env.botName));
      session.endDialog();
    })
    .triggerAction({
      onFindAction(context, callback) {
        // Only trigger if we've never seen user before
        if (!context.userData.firstRun) {
          // Return a score of 1.1 to ensure the first run dialog wins
          callback(null, 1.1);
        } else {
          callback(null, 0.0);
        }
      },
    });
};
