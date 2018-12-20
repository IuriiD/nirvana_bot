// Sends text and stickers. DRY
const { parseAnswer } = require('./parseAnswer');
const phrases = require('./phrases');
const { getCard, getCarousel } = require('./templates');
const { locale } = require('../config/config');

const l10n = require(`../locales/${locale}`);

function sendAnswer(session, answer) {
  const { text, sticker } = parseAnswer(phrases, answer);
  if (text) session.send(text);
  if (sticker) {
    const ourCard = getCard(session, sticker);
    session.send(ourCard);
  }
}

function presentPlays(session, esFoundPlays) {
  if (esFoundPlays.length > 1) {
    session.send(l10n.relevant_plays, esFoundPlays.length);
  } else {
    session.send(l10n.relevant_play);
  }

  const carousel = getCarousel(session, esFoundPlays);
  console.log('\nCarousel');
  console.log(JSON.stringify(carousel.data));
  session.send(carousel);
}

module.exports = { sendAnswer, presentPlays };
