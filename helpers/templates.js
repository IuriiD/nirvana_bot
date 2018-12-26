/**
 * Platform-specific templates used in bot's replies
 * # Facebook: a single generict template (GT) for replies or
 * a carousel of GT for results of Elastic Search (ES)
 * # Telegram: a single block 'sticker + 2 buttons' or
 * an array of such blocks, respectively
 */

const builder = require('botbuilder');
const i18n = require('i18n');

/**
 * Returns sticker's ID for a play by play's title
 * @param {string} playName Title of the play
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function getStickerIdByPlay(playName, stickersObj) {
  try {
    const results = Object.keys(stickersObj).filter(
      stickerId => stickersObj[stickerId].isAPlay && stickersObj[stickerId].play.name === playName,
    );
    if (results) return results[0];
    return false;
  } catch (error) {
    console.log(`\n⚠ getStickerIdByPlay(): \n${error}`);
    return false;
  }
}

/**
 * Returns ID of the play (#153-178) for a given sticker ID (#1-177)
 * @param {string} stickerId # of a sticker ('1', '20' etc)
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function getPlayIbByStickerId(stickerId, stickersObj) {
  try {
    const playName = stickersObj[stickerId].play.name;
    const results = Object.keys(stickersObj).filter(
      playId => stickersObj[playId].isAPlay && stickersObj[playId].play.name === playName,
    );
    if (results) return results[0];
    return false;
  } catch (error) {
    console.log(`\n⚠ getPlayIbByStickerId(): \n${error}`);
    return false;
  }
}

/**
 * Returns a generic template for FB Messenger for a given phrase
 * https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic
 * @param {string} imageId # of a sticker ('1', '20' etc)
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function fbCard(imageId, stickersObj) {
  try {
    if (!Object.keys(stickersObj).includes(imageId)) {
      return false;
    }

    const playId = getPlayIbByStickerId(imageId, stickersObj);

    const message = {
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
                  url: `${process.env.domain}/play/${playId}`,
                  title: i18n.__('read'),
                },
                {
                  type: 'postback',
                  payload: `[### play ###]${playId}`,
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
    return message;
  } catch (error) {
    console.log(`\n⚠ fbCard():\n${error}`);
    return false;
  }
}

/**
 * Returns a carousel of generic templates for FB Messenger for relevant plays
 * https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic#carousel
 * @param {array} foundPlays A list of plays' titles
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function fbCarousel(foundPlaysIds, stickersObj) {
  try {
    if (foundPlaysIds.length < 1) return false;

    if (foundPlaysIds.length === 1) {
      const playNeededId = foundPlaysIds[0];
      if (!Object.keys(stickersObj).includes(playNeededId)) return false;
      const singleFbCard = fbCard(playNeededId, stickersObj);
      return singleFbCard;
    }

    const fbCardsCarousel = [];
    foundPlaysIds.forEach((playId) => {
      if (!Object.keys(stickersObj).includes(playId)) return false;
      fbCardsCarousel.push({
        title: i18n.__('what_to_do'),
        image_url: `${process.env.imgBaseUrl}/stickers/${playId}.png`,
        subtitle: '',
        buttons: [
          {
            type: 'web_url',
            url: `${process.env.domain}/play/${playId}`,
            title: i18n.__('read'),
          },
          {
            type: 'postback',
            payload: `[### play ###]${playId}`,
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
  } catch (error) {
    console.log(`\n⚠ fbCarousel():\n${error}`);
    return false;
  }
}

/**
 * Returns message for Telegram: a sticker + 2 buttons (for a given phrase)
 * https://core.telegram.org/bots/api#sendsticker
 * https://core.telegram.org/bots/api#inlinekeyboardmarkup
 * @param {string} imageId # of a sticker ('1', '20' etc)
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)s
 */
function tStickerWButtons(imageId, stickersObj) {
  try {
    if (!Object.keys(stickersObj).includes(imageId)) {
      return false;
    }

    const playId = getPlayIbByStickerId(imageId, stickersObj);

    const keyBoard = {
      inline_keyboard: [
        [
          {
            text: i18n.__('read'),
            url: `${process.env.domain}/play/${playId}`,
          },
          {
            text: i18n.__('listen'),
            callback_data: `[### play ###]${playId}`,
          },
        ],
      ],
    };

    const message = {
      method: 'sendSticker',
      parameters: {
        sticker: {
          url: `${process.env.imgBaseUrl}/stickers/${imageId}.png`,
          mediaType: 'image/png',
        },
        reply_markup: keyBoard,
      },
    };
    return message;
  } catch (error) {
    console.log(`\n⚠ tStickerWButtons():\n${error}`);
    return false;
  }
}

/**
 * Returns message for Telegram: an array of blocks [sticker + 2 buttons] (for relevant plays)
 * https://core.telegram.org/bots/api#sendsticker
 * https://core.telegram.org/bots/api#inlinekeyboardmarkup
 * @param {array} foundPlays A list of plays' titles
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function tStickersArray(foundPlaysIds, stickersObj) {
  try {
    if (foundPlaysIds.length < 1) return false;

    if (foundPlaysIds.length === 1) {
      console.log('\nHERE-1');
      const playNeededId = foundPlaysIds[0];
      console.log(`playNeededId - ${playNeededId}`);
      if (!Object.keys(stickersObj).includes(playNeededId)) return false;
      console.log('\nHERE-2');
      const singleTelegramCard = tStickerWButtons(playNeededId, stickersObj);
      console.log('singleTelegramCard');
      console.dir(singleTelegramCard);
      return singleTelegramCard;
    }
    console.log('\nHERE-3');

    const tCardsCarousel = [];
    foundPlaysIds.forEach((playId) => {
      if (!Object.keys(stickersObj).includes(playId)) return false;

      const keyBoard = {
        inline_keyboard: [
          [
            {
              text: i18n.__('read'),
              url: `${process.env.domain}/play/${playId}`,
            },
            {
              text: i18n.__('listen'),
              callback_data: `[### play ###]${playId}`,
            },
          ],
        ],
      };

      tCardsCarousel.push({
        method: 'sendSticker',
        parameters: {
          sticker: {
            url: `${process.env.imgBaseUrl}/stickers/${playId}.png`,
            mediaType: 'image/png',
          },
          reply_markup: keyBoard,
        },
      });
    });
    return tCardsCarousel;
  } catch (error) {
    console.log(`\n⚠ tStickersArray():\n${error}`);
    return false;
  }
}

/**
 * Returns a platform-specific message with a single sticker
 * @param {object} session Object to interact with BF platform
 * @param {string} imageId # of a sticker ('1', '20' etc)
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function getCard(session, imageId, stickersObj) {
  try {
    const { channelId } = session.message.address;

    let tMessage = {};
    let fbMessage = {};

    if (channelId === 'telegram') {
      tMessage = tStickerWButtons(imageId, stickersObj);
    }

    if (channelId === 'facebook') {
      fbMessage = fbCard(imageId, stickersObj);
    }

    const msg = new builder.Message(session).sourceEvent({
      telegram: tMessage,
      facebook: fbMessage,
    });
    return msg;
  } catch (error) {
    console.log(`\n⚠ getCard():\n${error}`);
    return false;
  }
}

/**
 * Returns a carousel (FB) or list (Telegram) of cards
 * @param {object} session Object to interact with BF platform
 * @param {array} foundPlays A list of plays' titles
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function getCarousel(session, foundPlays, stickersObj) {
  try {
    const { channelId } = session.message.address;

    let fbCardsCarousel = {};
    let tCardsCarousel = {};

    if (channelId === 'telegram') {
      tCardsCarousel = tStickersArray(foundPlays, stickersObj);
    }

    if (channelId === 'facebook') {
      fbCardsCarousel = fbCarousel(foundPlays, stickersObj);
    }

    const msg = new builder.Message(session).sourceEvent({
      facebook: fbCardsCarousel,
      telegram: tCardsCarousel,
    });
    return msg;
  } catch (error) {
    console.log(`\n⚠ getCarousel():\n${error}`);
    return false;
  }
}

/**
 * Returns a message used to send an mp3 with the play needed to Telegram
 * @param {string} play Name of the play
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function tAudio(playId, stickersObj) {
  try {
    if (!Object.keys(stickersObj).includes(playId)) return false;

    const audio = stickersObj[playId].play.audio.fileName;

    const message = {
      method: 'sendAudio',
      parameters: {
        audio: {
          url: `${process.env.imgBaseUrl}/mp3/${audio}`,
        },
      },
    };

    console.log('\ntAudio()');
    console.dir(message);
    return message;
  } catch (error) {
    console.log(`\n⚠ tAudio():\n${error}`);
    return false;
  }
}

/**
 * Returns a message used to send an mp3 with the play needed to Facebook
 * @param {string} play Name of the play
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function fbAudio(playId, stickersObj) {
  try {
    if (!Object.keys(stickersObj).includes(playId)) return false;

    const audio = stickersObj[playId].play.audio.fileName;

    return {
      attachment: {
        type: 'audio',
        payload: {
          url: `${process.env.imgBaseUrl}/mp3/${encodeURIComponent(audio)}`,
          // attachment_id: '397085417793369',
        },
        is_reusable: true,
      },
    };
  } catch (error) {
    console.log(`\n⚠ fbAudio():\n${error}`);
    return false;
  }
}

/**
 * Returns a platform-specific message to send audio
 * @param {object} session Object to interact with BF platform
 * @param {string} play Name of the play
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function getAudioMsg(session, playId, stickersObj) {
  try {
    const { channelId } = session.message.address;

    let tAudioMessage = {};
    let fbAudioMessage = {};

    if (channelId === 'telegram') {
      tAudioMessage = tAudio(playId, stickersObj);
    }

    if (channelId === 'facebook') {
      fbAudioMessage = fbAudio(playId, stickersObj);
    }

    const msg = new builder.Message(session).sourceEvent({
      facebook: fbAudioMessage,
      telegram: tAudioMessage,
    });
    return msg;
  } catch (error) {
    console.log(`\n⚠ getAudioMsg():\n${error}`);
    return false;
  }
}

module.exports = {
  getCard,
  getCarousel,
  getAudioMsg,
  getStickerIdByPlay,
};
