const plays = require('./plays');
const { locale } = require('../config/config');

const l10n = require(`../locales/${locale}.json`);

function presentPlays(session, esFoundPlays) {
  if (esFoundPlays.length > 1) {
    session.send(l10n.relevant_plays);
  } else {
    session.send(l10n.relevant_play);
  }
  esFoundPlays.forEach((play) => {
    session.send(`"${play}"\n${plays[play].telegramStickerId}\n${plays[play].url}`);
  });
}

module.exports = { presentPlays };
