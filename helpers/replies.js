/**
 * Functions to reply with a single sticker with buttons or
 * with a carousel of such blocks + helpers
 * */

const i18n = require('i18n');
const templates = require('./templates');

function parseAnswer(botReply) {
  try {
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
  } catch (error) {
    console.log(`\n⚠ parseAnswer():\n${error}`);
    return false;
  }
}

/**
 * Gets answer from our NLP model, parses it to get text and/or
 * sticker and sends a platform-specific payload
 * @param {object} session Object to interact with BF platform
 * @param {string} answer Reply from npl.js,
 * "[Optional text][{stickers}one|or|several|sticker|Ids]"
 */
function sendAnswer(session, answer, stickersObj) {
  try {
    const { text, sticker } = parseAnswer(answer);
    if (text) session.send(text);
    if (sticker) {
      const ourCard = templates.getCard(session, sticker, stickersObj);
      console.log('\n !!! sendAnswer !!!');
      console.dir(ourCard.data);
      session.send(ourCard);
    }
    return true;
  } catch (error) {
    console.log(`\n⚠ sendAnswer():\n${error}`);
    return false;
  }
}

/**
 * Sends a single play or a carousel/list of plays found by ES
 * for a given phrase
 * @param {object} session Object to interact with BF platform
 * @param {array} esFoundPlays A list of plays' titles
 */
function presentPlays(session, esFoundPlays, stickersObj) {
  try {
    if (esFoundPlays.length > 1) {
      session.send(i18n.__('relevant_plays', esFoundPlays.length));
    } else {
      session.send(i18n.__('relevant_play'));
    }
    const carousel = templates.getCarousel(session, esFoundPlays, stickersObj);
    console.log('\n !!! presentPlays !!!');
    console.log('carousel');
    console.dir(carousel.data);
    session.send(carousel);
    return true;
  } catch (error) {
    console.log(`\n⚠ presentPlays():\n${error}`);
    return false;
  }
}

/**
 * Sends an mp3 with the play needed to Telegram
 * @param {object} session Object to interact with BF platform
 * @param {string} play Name of the play
 */
function sendAudio(session, playId, stickersObj) {
  try {
    const audioMsg = templates.getAudioMsg(session, playId, stickersObj);
    session.send(audioMsg);
    return true;
  } catch (error) {
    console.log(`\n⚠ sendAudio():\n${error}`);
    return false;
  }
}

module.exports = { sendAnswer, presentPlays, sendAudio };
