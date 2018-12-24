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
 * Returns a generic template for FB Messenger
 * https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic
 * @param {string} imageId # of a sticker ('1', '20' etc)
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function fbCard(imageId, stickersObj) {
  try {
    if (!Object.keys(stickersObj).includes(imageId)) return false;

    const playName = stickersObj[imageId].play.name;
    const playUrl = stickersObj[imageId].play.text.url;

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
                  url: `${process.env.domain}/play/${encodeURIComponent(playName)}`, // playUrl,
                  title: i18n.__('read'),
                },
                {
                  type: 'postback',
                  payload: `[### play ###]${playName}`,
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
 * Returns a carousel of generic templates for FB Messenger
 * https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic#carousel
 * @param {array} foundPlays A list of plays' titles
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function fbCarousel(foundPlays, stickersObj) {
  try {
    if (foundPlays.length < 1) return false;

    if (foundPlays.length === 1) {
      const playNeeded = foundPlays[0];
      const stickerId = getStickerIdByPlay(playNeeded, stickersObj);
      if (stickerId) {
        const singleFbCard = fbCard(stickerId, stickersObj);
        return singleFbCard;
      }
      return false;
    }

    const fbCardsCarousel = [];
    foundPlays.forEach((play) => {
      const stickerId = getStickerIdByPlay(play, stickersObj);
      if (!stickerId) return;
      const playUrl = stickersObj[stickerId].play.text.url;

      fbCardsCarousel.push({
        title: i18n.__('what_to_do'),
        image_url: `${process.env.imgBaseUrl}/stickers/${stickerId}.png`,
        subtitle: '',
        buttons: [
          {
            type: 'web_url',
            url: `${process.env.domain}/play/${encodeURIComponent(play)}`, // playUrl,
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
  } catch (error) {
    console.log(`\n⚠ fbCarousel():\n${error}`);
    return false;
  }
}

/**
 * Returns message for Telegram: a sticker + 2 buttons
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

    const playName = stickersObj[imageId].play.name;
    const playUrl = stickersObj[imageId].play.text.url;

    const message = {
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
                url: `${process.env.domain}/play/${encodeURIComponent(playName)}`, // playUrl,
              },
              {
                text: i18n.__('listen'),
                callback_data: `[### play ###]${playName}`,
              },
            ],
          ],
        },
      },
    };
    return message;
  } catch (error) {
    console.log(`\n⚠ tStickerWButtons():\n${error}`);
    return false;
  }
}

/**
 * Returns message for Telegram: an array of blocks [sticker + 2 buttons]
 * https://core.telegram.org/bots/api#sendsticker
 * https://core.telegram.org/bots/api#inlinekeyboardmarkup
 * @param {array} foundPlays A list of plays' titles
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function tStickersArray(foundPlays, stickersObj) {
  console.log('tStickersArray()');
  try {
    if (foundPlays.length < 1) return false;

    if (foundPlays.length === 1) {
      const playNeeded = foundPlays[0];
      console.log('\ntStickersArray()');
      console.log(`playNeeded - ${playNeeded}`);
      const stickerId = getStickerIdByPlay(playNeeded, stickersObj);
      console.log(`stickerId - ${stickerId}`);
      if (stickerId) {
        const singleTelegramCard = tStickerWButtons(stickerId, stickersObj);
        console.log('singleTelegramCard');
        console.log(JSON.stringify(singleTelegramCard, null, 2));
        return singleTelegramCard;
      }
      return false;
    }
    const tCardsCarousel = [];
    foundPlays.forEach((play) => {
      const stickerId = getStickerIdByPlay(play, stickersObj);
      if (!stickerId) return;
      const playUrl = stickersObj[stickerId].play.text.url;

      tCardsCarousel.push({
        method: 'sendSticker',
        parameters: {
          sticker: {
            url: `${process.env.imgBaseUrl}/stickers/${stickerId}.png`,
            mediaType: 'image/png',
          },
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: i18n.__('read'),
                  url: `${process.env.domain}/play/${encodeURIComponent(play)}`, // playUrl,
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
    console.log('tCardsCarousel');
    console.log(JSON.stringify(tCardsCarousel, null, 2));
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
      if (tCardsCarousel.length > 3) tCardsCarousel = tCardsCarousel.slice(0, 3);
      console.log('\ngetCarousel():');
      console.log(JSON.stringify(tCardsCarousel, null, 2));
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
function tAudio(play, stickersObj) {
  try {
    const stickerId = getStickerIdByPlay(play, stickersObj);
    if (!stickerId) return false;

    const audio = stickersObj[stickerId].play.audio.fileName;

    return {
      method: 'sendAudio',
      parameters: {
        audio: {
          url: `${process.env.imgBaseUrl}/mp3/${encodeURIComponent(audio)}`,
        },
      },
    };
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
function fbAudio(play, stickersObj) {
  try {
    const stickerId = getStickerIdByPlay(play, stickersObj);
    console.log('fbAudio()');
    console.log(`stickerId - ${stickerId}`);
    if (!stickerId) return false;

    const audio = stickersObj[stickerId].play.audio.fileName;
    console.log(`audio - ${audio}`);
    console.log(`audioUrl - ${`${process.env.imgBaseUrl}/mp3/${encodeURIComponent(audio)}`}`);

    return {
      attachment: {
        type: 'audio',
        payload: {
          // url: `${process.env.imgBaseUrl}/mp3/${encodeURIComponent(audio)}`,
          attachment_id: '397085417793369',
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
function getAudioMsg(session, play, stickersObj) {
  try {
    const { channelId } = session.message.address;

    let tAudioMessage = {};
    let fbAudioMessage = {};

    if (channelId === 'telegram') {
      tAudioMessage = tAudio(play, stickersObj);
    }

    if (channelId === 'facebook') {
      console.log('fbAudio()');
      fbAudioMessage = fbAudio(play, stickersObj);
      console.log(JSON.stringify(fbAudioMessage, null, 2));
    }

    const msg = new builder.Message(session).sourceEvent({
      facebook: fbAudioMessage,
      telegram: tAudioMessage,
    });
    console.log('');
    console.dir(msg.data);
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
