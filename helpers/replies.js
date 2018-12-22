/**
 * Functions to reply with a single sticker with buttons or
 * with a carousel of such blocks + helpers
 * */

const i18n = require('i18n');
const templates = require('./templates');

function parseAnswer(botReply) {
  const output = { text: false, sticker: false };

  if (botReply.includes('{stickers}')) {
    const [phrase, oneOrSeveralStickers] = botReply.split('{stickers}');
    output.text = phrase;
    let stickers = [];
    if (oneOrSeveralStickers.includes('|')) {
      stickers = oneOrSeveralStickers.split('|');
      const randStickerIndex = Math.floor(Math.random() * stickers.length);
      output.sticker = stickers[randStickerIndex];
    } else {
      output.sticker = oneOrSeveralStickers;
    }
  } else {
    output.text = botReply;
  }
  return output;
}

/**
 * Gets answer from our NLP model, parses it to get text and/or
 * sticker and sends a platform-specific payload
 * @param {object} session Object to interact with BF platform
 * @param {string} answer Reply from npl.js,
 * "[Optional text][{stickers}one|or|several|sticker|Ids]"
 */
function sendAnswer(session, answer) {
  const { text, sticker } = parseAnswer(answer);
  if (text) session.send(text);
  if (sticker) {
    const ourCard = templates.getCard(session, sticker);
    session.send(ourCard);
  }
}

/**
 * Sends a single play or a carousel/list of plays found by ES
 * for a given phrase
 * @param {object} session Object to interact with BF platform
 * @param {array} esFoundPlays A list of plays' titles
 */
function presentPlays(session, esFoundPlays) {
  if (esFoundPlays.length > 1) {
    session.send(i18n.__('relevant_plays', esFoundPlays.length));
  } else {
    session.send(i18n.__('relevant_play'));
  }
  const carousel = templates.getCarousel(session, esFoundPlays);
  session.send(carousel);
}

/**
 * Sends an mp3 with the play needed to Telegram
 * @param {object} session Object to interact with BF platform
 * @param {string} play Name of the play
 */
function sendAudio(session, play) {
  const audioMsg = templates.getAudioMsg(session, play);
  session.send(audioMsg);
}

module.exports = { sendAnswer, presentPlays, sendAudio };
