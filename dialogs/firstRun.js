const { locale } = require('../config/config');

const l10n = require(`../locales/${locale}`);
const { sendAnswer } = require('../helpers/sendAnswer');

module.exports = (bot) => {
  bot
    .dialog('firstRun', (session) => {
      session.userData.firstRun = true;
      sendAnswer(session, l10n.greetings);
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
