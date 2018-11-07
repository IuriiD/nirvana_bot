const plays = require('./plays');
const { locale } = require('../config/config');

const l10n = require(`../locales/${locale}`);

function presentPlays(session, esFoundPlays) {
  if (esFoundPlays.length > 1) {
    session.send(l10n.relevant_plays);
  } else {
    session.send(l10n.relevant_play);
  }
  esFoundPlays.forEach((play) => {
    session.send({
      text: `"${play}"\n${plays[play].url}`,
      attachments: [
        {
          contentType: 'image/png',
          contentUrl: `https://raw.githubusercontent.com/IuriiD/nirvana_bot/master/stickers/${
            plays[play].telegramStickerId
          }.png`,
          name: `${plays[play].telegramStickerId}.png`,
        },
      ],
    });
  });
}

module.exports = { presentPlays };
