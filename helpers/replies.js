/**
 * Functions to reply with a single sticker with buttons or
 * with a carousel of such blocks + helpers
 * */

const i18n = require('i18n');
const { promisify } = require('util');
const templates = require('./templates');
const log = require('../config/logger');
const { dataToLog } = require('../helpers/templates');

const delay = promisify(setTimeout);

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
    log.error(`\n⚠ parseAnswer():\n${error}`);
    return false;
  }
}

/**
 * Gets answer from our NLP model, parses it to get text and/or
 * sticker and sends a platform-specific payload
 * @param {object} session Object to interact with BF platform
 * @param {string} answer Reply from npl.js,
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function sendAnswer(session, answer, stickersObj) {
  try {
    const { text, sticker } = parseAnswer(answer);
    const { channelId, userId } = dataToLog(session);

    console.log('\nsendAnswer');
    console.log(JSON.stringify(answer, null, 2));
    console.log(text);
    console.log(sticker);

    if (text) {
      session.send(text);
      log.info(`${channelId} - user ${userId} << text response: ${text}`);
    }
    if (sticker) {
      const ourCard = templates.getCard(session, sticker, stickersObj);
      session.send(ourCard);
      log.info(`${channelId} - user ${userId} << card for sticker #${sticker}`);
    }
    return true;
  } catch (error) {
    log.error(`\n⚠ sendAnswer():\n${error}`);
    return false;
  }
}

/**
 * Sends a single play or a carousel/list of plays found by ES
 * for a given phrase
 * @param {object} session Object to interact with BF platform
 * @param {array} esFoundPlays A list of plays' titles
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function presentPlays(session, esFoundPlays, stickersObj, showingNext = false) {
  try {
    if (!showingNext) {
      if (esFoundPlays.length > 1 && esFoundPlays.length <= 3) {
        session.send(i18n.__('relevant_plays', esFoundPlays.length));
      } else if (esFoundPlays.length > 3) {
        session.send(i18n.__('relevant_plays_first_3', esFoundPlays.length));
      } else {
        session.send(i18n.__('relevant_play'));
      }
    } else {
      const replyVariants = [i18n.__('here_they_are'), i18n.__('no_problem'), i18n.__('voila')];
      const ourVariant = Math.floor(Math.random() * replyVariants.length);
      session.send(replyVariants[ourVariant]);
    }
    const carousel = templates.getCarousel(session, esFoundPlays, stickersObj);
    session.send(carousel);

    const { channelId, userId } = dataToLog(session);
    log.info(`${channelId} - user ${userId} << carousel for plays [${esFoundPlays}]`);
    return true;
  } catch (error) {
    log.error(`\n⚠ presentPlays():\n${error}`);
    return false;
  }
}

/**
 * Sends an mp3 with the play needed to Telegram
 * @param {object} session Object to interact with BF platform
 * @param {string} play Name of the play
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function sendAudio(session, playId, stickersObj) {
  try {
    const audioMsg = templates.getAudioMsg(session, playId, stickersObj);
    session.send(audioMsg);
    const { channelId, userId } = dataToLog(session);
    log.info(`${channelId} - user ${userId} << audio for play #${playId}`);
    return true;
  } catch (error) {
    log.error(`\n⚠ sendAudio():\n${error}`);
    return false;
  }
}

/**
 * Returns a card with random phrase
 * @param {object} session Object to interact with BF platform
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function randomPhrase(session, stickersObj) {
  try {
    const phrasesIds = Object.keys(stickersObj).filter(id => !stickersObj[id].isAPlay);
    const randomIdPos = Math.floor(Math.random() * phrasesIds.length);
    const ourCard = templates.getCard(session, phrasesIds[randomIdPos], stickersObj);
    session.send(ourCard);
    const { channelId, userId } = dataToLog(session);
    log.info(
      `${channelId} - user ${userId} << randomly chosen sticker #${phrasesIds[randomIdPos]}`,
    );
    return true;
  } catch (error) {
    log.error(`\n⚠ randomPhrase():\n${error}`);
    return false;
  }
}

/**
 * Info and links about Les' Poderviansky and me
 * @param {object} session Object to interact with BF platform
 */
function feedback(session) {
  try {
    const feedbackMsg = templates.getFeedbackInfo(session);
    session.send(feedbackMsg);
    const { channelId, userId } = dataToLog(session);
    log.info(`${channelId} - user ${userId} << feedback message"`);
    return true;
  } catch (error) {
    log.error(`\n⚠ feedback():\n${error}`);
    return false;
  }
}

/**
 * General info about the chatbot
 * @param {object} session Object to interact with BF platform
 */
async function getFaq(session, stickersObj) {
  console.log('\ngetFaq');
  try {
    const info = await templates.faq(session, stickersObj);
    console.log('info');
    console.log(info);

    session.send(info[0]);
    delay(3000);
    session.sendTyping();
    session.send(info[1]);

    const { channelId } = session.message.address;
    const { userId } = dataToLog(session);
    log.info(`${channelId} - user ${userId} << FAQ message"`);

    return true;
  } catch (error) {
    log.error(`\n⚠ getFaq():\n${error}`);
    return false;
  }
}

/**
 * Greet Skype's user when he adds the bot to contacts
 * @param {object} bot
 * @param {object} message Received when user adds the bot to contacts
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function gettingStartedSkype(bot, message, stickersObj) {
  console.log('\ngettingStartedSkype');
  console.log(message);
  try {
    bot.loadSession(message.address, async (error, session) => {
      const { id } = message.address.user;
      console.log('\nsession.userData[id]');
      console.log(session.userData[id]);

      console.log(`id - ${id}`);
      if (message.action === 'add') {
        console.log('Here1');
        if (!session.userData[id] || session.userData[id] !== true) {
          console.log('Launching getFaq');
          await getFaq(session, stickersObj);
          console.log('Here5');
          session.userData[id] = true;
          console.log('Here6');
        } else {
          console.log('2nd time, mute');
        }
      } else if (message.action === 'remove') {
        session.userData[id] = false;
      }
    });
    return true;
  } catch (error) {
    log.error(`\n⚠ gettingStartedSkype():\n${error}`);
    return false;
  }
}

module.exports = {
  sendAnswer,
  presentPlays,
  sendAudio,
  randomPhrase,
  feedback,
  getFaq,
  gettingStartedSkype,
};
