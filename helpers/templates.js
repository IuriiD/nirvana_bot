/**
 * Platform-specific templates used in bot's replies
 * # Facebook: a single generict template (GT) for replies or
 * a carousel of GT for results of Elastic Search (ES)
 * # Telegram: a single block 'sticker + 2 buttons' or
 * an array of such blocks, respectively
 */

const builder = require('botbuilder');
const i18n = require('i18n');
const phrases = require('./data/phrases');
const plays = require('./data/plays');

/**
 * Returns a generic template for FB Messenger
 * https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic
 * @param {string} imageId # of a sticker ('1', '20' etc)
 * @param {object} allPlays Object with info about plays
 * @param {object} allPhrases Object with info about phrases
 */
function fbCard(imageId, allPlays, allPhrases) {
  const { play } = allPhrases[imageId];
  const { url } = allPlays[play];

  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: i18n.__('what_to_do'),
            image_url: `${process.env.imgBaseUrl}/stickers/${imageId}.png`,
            subtitle: '',
            buttons: [
              {
                type: 'web_url',
                url,
                title: i18n.__('read'),
              },
              {
                type: 'postback',
                payload: `[### play ###]${play}`,
                title: i18n.__('listen'),
              },
            ],
          },
        ],
        image_aspect_ratio: 'square',
        sharable: true,
      },
    },
  };
}

/**
 * Returns a carousel of generic templates for FB Messenger
 * https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic#carousel
 * @param {array} foundPlays A list of plays' titles
 * @param {object} allPlays Object with info about plays
 * @param {object} allPhrases Object with info about phrases
 */
async function fbCarousel(foundPlays, allPlays, allPhrases) {
  if (foundPlays.length < 1) {
    return false;
  }

  if (foundPlays.length === 1) {
    const { stickerId } = allPlays[foundPlays[0]];
    const singleFbCard = fbCard(stickerId, allPlays, allPhrases);
    return singleFbCard;
  }

  const fbCardsCarousel = [];
  foundPlays.forEach((play) => {
    fbCardsCarousel.push({
      title: i18n.__('what_to_do'),
      image_url: `${process.env.imgBaseUrl}/stickers/${allPlays[play].stickerId}.png`,
      subtitle: '',
      buttons: [
        {
          type: 'web_url',
          url: allPlays[play].url,
          title: i18n.__('read'),
        },
        {
          type: 'postback',
          payload: `[### play ###]${play}`,
          title: i18n.__('listen'),
        },
      ],
    });
  });

  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: fbCardsCarousel,
        image_aspect_ratio: 'square',
        sharable: true,
      },
    },
  };
}

/**
 * Returns message for Telegram: a sticker + 2 buttons
 * https://core.telegram.org/bots/api#sendsticker
 * https://core.telegram.org/bots/api#inlinekeyboardmarkup
 * @param {string} imageId # of a sticker ('1', '20' etc)
 * @param {object} allPlays Object with info about plays
 * @param {object} allPhrases Object with info about phrases
 */
function tStickerWButtons(imageId, allPlays, allPhrases) {
  const { play } = allPhrases[imageId];
  const { url } = allPlays[play];

  return {
    method: 'sendSticker',
    parameters: {
      sticker: {
        url: `${process.env.imgBaseUrl}/stickers/${imageId}.png`,
        mediaType: 'image/png',
      },
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: i18n.__('read'),
              url,
            },
            {
              text: i18n.__('listen'),
              callback_data: `[### play ###]${play}`,
            },
          ],
        ],
      },
    },
  };
}

/**
 * Returns message for Telegram: an array of blocks [sticker + 2 buttons]
 * https://core.telegram.org/bots/api#sendsticker
 * https://core.telegram.org/bots/api#inlinekeyboardmarkup
 * @param {array} foundPlays A list of plays' titles
 * @param {object} allPlays Object with info about plays
 * @param {object} allPhrases Object with info about phrases
 */
async function tStickersArray(foundPlays, allPlays, allPhrases) {
  if (foundPlays.length < 1) {
    return false;
  }

  if (foundPlays.length === 1) {
    const { stickerId } = allPlays[foundPlays[0]];
    const singleTelegramCard = tStickerWButtons(stickerId, allPlays, allPhrases);
    return singleTelegramCard;
  }

  const tCardsCarousel = [];
  foundPlays.forEach((play) => {
    tCardsCarousel.push({
      method: 'sendSticker',
      parameters: {
        sticker: {
          url: `${process.env.imgBaseUrl}/stickers/${allPlays[play].stickerId}.png`,
          mediaType: 'image/png',
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: i18n.__('read'),
                url: allPlays[play].url,
              },
              {
                text: i18n.__('listen'),
                callback_data: `[### play ###]${play}`,
              },
            ],
          ],
        },
      },
    });
  });
  return tCardsCarousel;
}

/**
 * Returns a platform-specific message with a single sticker
 * @param {object} session Object to interact with BF platform
 * @param {string} imageId # of a sticker ('1', '20' etc)
 * @param {object} allPlays Object with info about plays
 * @param {object} allPhrases Object with info about phrases
 */
function getCard(session, imageId, allPlays = plays, allPhrases = phrases) {
  console.log('\ngetCard');
  // console.dir(allPlays);
  const fbMessage = fbCard(imageId, allPlays, allPhrases);
  const tMessage = tStickerWButtons(imageId, allPlays, allPhrases);

  console.log(tMessage);
  console.dir(tMessage);

  const msg = new builder.Message(session).sourceEvent({
    facebook: fbMessage,
    telegram: tMessage,
  });
  return msg;
}

/**
 * Returns a carousel (FB) or list (Telegram) of cards
 * @param {object} session Object to interact with BF platform
 * @param {array} foundPlays A list of plays' titles
 * @param {object} allPlays Object with info about plays
 * @param {object} allPhrases Object with info about phrases
 */
async function getCarousel(session, foundPlays, allPlays = plays, allPhrases = phrases) {
  const fbCardsCarousel = await fbCarousel(foundPlays, allPlays, allPhrases);
  const tCardsCarousel = await tStickersArray(foundPlays, allPlays, allPhrases);

  const msg = new builder.Message(session).sourceEvent({
    facebook: fbCardsCarousel,
    telegram: tCardsCarousel,
  });
  return msg;
}

/**
 * Returns a message used to send an mp3 with the play needed to Telegram
 * @param {object} session Object to interact with BF platform
 * @param {string} play Name of the play
 */
async function tAudio(play, allPlays) {
  const { audio } = allPlays[play];

  return {
    method: 'sendAudio',
    parameters: {
      audio: {
        url: audio,
      },
      caption: play,
    },
  };
}

/**
 * Returns a message used to send an mp3 with the play needed to Facebook
 * @param {object} session Object to interact with BF platform
 * @param {string} play Name of the play
 */
async function fbAudio(play, allPlays) {
  const { audio } = allPlays[play];

  return {
    attachment: {
      type: 'audio',
      payload: {
        url: audio,
        is_reusable: true,
      },
    },
  };
}

/**
 * Returns a platform-specific message to send audio
 * @param {object} session Object to interact with BF platform
 * @param {string} play Name of the play
 * @param {object} allPlays Object with info about plays
 */
async function getAudioMsg(session, play, allPlays = plays) {
  const tAudioMessage = await tAudio(play, allPlays);
  const fbAudioMessage = await fbAudio(play, allPlays);

  const msg = new builder.Message(session).sourceEvent({
    facebook: fbAudioMessage,
    telegram: await tAudioMessage,
  });
  return msg;
}

module.exports = { getCard, getCarousel, getAudioMsg };
