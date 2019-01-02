/**
 * Platform-specific templates used in bot's replies
 * # Facebook: a single generict template (GT) for replies or
 * a carousel of GT for results of Elastic Search (ES)
 * # Telegram: a single block 'sticker + 2 buttons' or
 * an array of such blocks, respectively
 */

const builder = require('botbuilder');
const i18n = require('i18n');
const { getUserData } = require('../config/fb/');
const log = require('../config/logger');

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
    log.error(`\n⚠ getStickerIdByPlay(): \n${error}`);
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
    log.error(`\n⚠ getPlayIbByStickerId(): \n${error}`);
    return false;
  }
}

/**
 * Returns JSON for a button to share to FB Messenger
 * @param {string} stickerId # of a sticker ('1', '20' etc)
 */
function shareToFbPayload(stickerId) {
  return {
    type: 'element_share',
    share_contents: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: i18n.__('fbshare_slogan'),
              image_url: `${process.env.imgBaseUrl}/stickers/${stickerId}.png`,
              default_action: {
                type: 'web_url',
                url: process.env.fbmBotUrl,
              },
              buttons: [
                {
                  type: 'web_url',
                  url: process.env.fbmBotUrl,
                  title: i18n.__('lets_go'),
                },
              ],
            },
          ],
          image_aspect_ratio: 'square',
        },
      },
    },
  };
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
    const shareButton = shareToFbPayload(imageId);

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
                shareButton,
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
    log.error(`\n⚠ fbCard():\n${error}`);
    return false;
  }
}

/**
 * Helper function used by tStickersArray()
 * @param {array} foundPlaysIds A list of plays' Ids
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 * @param {array} nextIds A list of plays' ids to show next onclick on corresponding button
 */
function makeFbCarousel(foundPlaysIds, stickersObj, nextIds = null) {
  try {
    const fbCardsCarousel = [];

    foundPlaysIds.forEach((playId) => {
      if (!Object.keys(stickersObj).includes(playId)) return false;
      const shareButton = shareToFbPayload(playId);
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
          shareButton,
        ],
      });
    });

    // We need a special sticker for this card. So far it'll be #48
    if (nextIds) {
      const whatNextStickerId = '48';
      fbCardsCarousel.push({
        title: i18n.__('ga'),
        image_url: `${process.env.imgBaseUrl}/stickers/${whatNextStickerId}.png`,
        subtitle: '',
        buttons: [
          {
            type: 'postback',
            payload: `[### next ###]${nextIds.join('|')}`,
            title: i18n.__('show_more'),
          },
        ],
      });
    }

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
    log.error(`\n⚠ makeFbCarousel():\n${error}`);
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

    let fbCardsCarousel = [];
    if (foundPlaysIds.length > 3) {
      const showNow = foundPlaysIds.slice(0, 3);
      const showNext = foundPlaysIds.slice(3, foundPlaysIds.length);
      fbCardsCarousel = makeFbCarousel(showNow, stickersObj, showNext);
    } else {
      fbCardsCarousel = makeFbCarousel(foundPlaysIds, stickersObj);
    }
    return fbCardsCarousel;
  } catch (error) {
    log.error(`\n⚠ fbCarousel():\n${error}`);
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
        [
          {
            text: i18n.__('share_telegram'),
            switch_inline_query: `😆🤬👍 ${process.env.domain}/sticker/${imageId}`,
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
    log.error(`\n⚠ tStickerWButtons():\n${error}`);
    return false;
  }
}

/**
 * Helper function used by tStickersArray()
 * @param {array} foundPlaysIds A list of plays' Ids
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 * @param {array} nextIds A list of plays' ids to show next onclick on corresponding button
 */
function makeTCarousel(foundPlaysIds, stickersObj, nextIds = null) {
  try {
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
          [
            {
              text: i18n.__('share_telegram'),
              switch_inline_query: `😆🤬👍${process.env.domain}/sticker/${playId}`,
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

    if (nextIds) {
      tCardsCarousel[tCardsCarousel.length - 1].parameters.reply_markup.inline_keyboard.push([
        {
          text: i18n.__('show_more'),
          callback_data: `[### next ###]${nextIds.join('|')}`,
        },
      ]);
    }
    console.log(JSON.stringify(tCardsCarousel[tCardsCarousel.length - 1], null, 2));
    return tCardsCarousel;
  } catch (error) {
    log.error(`\n⚠ makeTCarousel():\n${error}`);
    return false;
  }
}

/**
 * Returns message for Telegram: an array of blocks [sticker + 2 buttons] (for relevant plays)
 * If more than 3 plays are found - show them by 3's + button "Show more"
 * https://core.telegram.org/bots/api#sendsticker
 * https://core.telegram.org/bots/api#inlinekeyboardmarkup
 * @param {array} foundPlaysIds A list of plays' Ids
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function tStickersArray(foundPlaysIds, stickersObj) {
  try {
    if (foundPlaysIds.length < 1) return false;

    if (foundPlaysIds.length === 1) {
      const playNeededId = foundPlaysIds[0];
      if (!Object.keys(stickersObj).includes(playNeededId)) return false;
      const singleTelegramCard = tStickerWButtons(playNeededId, stickersObj);
      return singleTelegramCard;
    }

    let tCardsCarousel = [];
    if (foundPlaysIds.length > 3) {
      const showNow = foundPlaysIds.slice(0, 3);
      const showNext = foundPlaysIds.slice(3, foundPlaysIds.length);
      tCardsCarousel = makeTCarousel(showNow, stickersObj, showNext);
    } else {
      tCardsCarousel = makeTCarousel(foundPlaysIds, stickersObj);
    }
    return tCardsCarousel;
  } catch (error) {
    log.error(`\n⚠ tStickersArray():\n${error}`);
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
    log.error(`\n⚠ getCard():\n${error}`);
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
    log.error(`\n⚠ getCarousel():\n${error}`);
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
    return message;
  } catch (error) {
    log.error(`\n⚠ tAudio():\n${error}`);
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
        },
        is_reusable: true,
      },
    };
  } catch (error) {
    log.error(`\n⚠ fbAudio():\n${error}`);
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
    log.error(`\n⚠ getAudioMsg():\n${error}`);
    return false;
  }
}

/**
 * Returns payload with contacts for Telegram platform
 */
function getFeedbackInfo4T() {
  try {
    const message = {
      method: 'sendMessage',
      parameters: {
        text: i18n.__('lp_fb_descr'),
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: i18n.__('fbm'),
                url: 'https://www.messenger.com/t/344980636080979',
              },
            ],
          ],
        },
      },
    };

    return message;
  } catch (error) {
    log.error(`\n⚠ getFeedbackInfo4T():\n${error}`);
    return false;
  }
}

function getFeedbackInfo4Fb() {
  try {
    const message = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: i18n.__('lp_fb_descr'),
          buttons: [
            {
              type: 'web_url',
              url: 'http://t.me/PodervianskogoBot',
              title: i18n.__('telegram'),
            },
          ],
        },
      },
    };

    return message;
  } catch (error) {
    log.error(`\n⚠ getFeedbackInfo4Fb():\n${error}`);
    return false;
  }
}

/**
 * Returns a message with contacts of L.Poderviansky and me
 * @param {object} session Object to interact with BF platform
 */
function getFeedbackInfo(session) {
  try {
    const { channelId } = session.message.address;

    let tMessage = {};
    let fbMessage = {};

    if (channelId === 'telegram') {
      tMessage = getFeedbackInfo4T();
    }

    if (channelId === 'facebook') {
      fbMessage = getFeedbackInfo4Fb();
    }

    const msg = new builder.Message(session).sourceEvent({
      telegram: tMessage,
      facebook: fbMessage,
    });
    return msg;
  } catch (error) {
    log.error(`\n⚠ getFeedbackInfo():\n${error}`);
    return false;
  }
}

/**
 * Returns payload with contacts for Telegram platform
 * @param {object} session Object to interact with BF platform
 */
function getFaq4T(session, stickersObj) {
  let userFirstName = '';

  try {
    userFirstName = session.message.sourceEvent.message.chat.first_name;
  } catch (error) {
    userFirstName = false;
  }

  try {
    let greeting = '';
    if (userFirstName) greeting = `, ${userFirstName}`;

    const message1 = {
      method: 'sendMessage',
      parameters: {
        text: i18n.__('general_info', greeting, process.env.botName),
      },
    };

    const stickers = i18n.__('greetings_stickers').split('|');
    const randStickerIndex = Math.floor(Math.random() * stickers.length);
    const greetingSticker = stickers[randStickerIndex];
    const message2 = tStickerWButtons(greetingSticker, stickersObj);
    message2.parameters.reply_markup.inline_keyboard.push(
      [
        {
          text: i18n.__('random_phrase'),
          callback_data: i18n.__('random_phrase_payload'),
        },
      ],
      [
        {
          text: i18n.__('get_feedback'),
          callback_data: i18n.__('get_feedback_payload'),
        },
      ],
    );

    return [message1, message2];
  } catch (error) {
    log.error(`\n⚠ getFaq4T():\n${error}`);
    return false;
  }
}

/**
 * Returns payload with contacts for Facebook Messenger platform
 * @param {object} session Object to interact with BF platform
 */
async function getFaq4Fb1(session) {
  let userFirstName = '';

  try {
    const senderId = session.message.sourceEvent.sender.id;
    userFirstName = await getUserData(senderId);
  } catch (error) {
    userFirstName = false;
  }

  try {
    let greeting = '';
    if (userFirstName) greeting = `, ${userFirstName.data.first_name}`;

    const message = {
      text: i18n.__('general_info', greeting, process.env.botName),
    };
    return message;
  } catch (error) {
    log.error(`\n⚠ getFaq4Fb1():\n${error}`);
    return false;
  }
}

function getFaq4Fb2(session, stickersObj) {
  try {
    const stickers = i18n.__('greetings_stickers').split('|');
    const randStickerIndex = Math.floor(Math.random() * stickers.length);
    const greetingSticker = stickers[randStickerIndex];
    const message = fbCard(greetingSticker, stickersObj);
    message.attachment.payload.elements[0].buttons.push({
      type: 'postback',
      payload: i18n.__('random_phrase_payload'),
      title: i18n.__('random_phrase'),
    });
    return message;
  } catch (error) {
    log.error(`\n⚠ getFaq4Fb2():\n${error}`);
    return false;
  }
}

/**
 * Returns platform-specific message with short FAQ on the bot
 * @param {object} session Object to interact with BF platform
 */
async function faq(session, stickersObj) {
  try {
    const { channelId } = session.message.address;

    let msg;

    if (channelId === 'telegram') {
      const tMessage = getFaq4T(session, stickersObj);
      const msg1 = new builder.Message(session).sourceEvent({
        telegram: tMessage[0],
      });
      const msg2 = new builder.Message(session).sourceEvent({
        telegram: tMessage[1],
      });
      msg = [msg1, msg2];
    }

    if (channelId === 'facebook') {
      const fbMessage1 = await getFaq4Fb1(session, stickersObj);
      const fbMessage2 = getFaq4Fb2(session, stickersObj);
      const msg1 = new builder.Message(session).sourceEvent({
        facebook: fbMessage1,
      });
      const msg2 = new builder.Message(session).sourceEvent({
        facebook: fbMessage2,
      });
      msg = [msg1, msg2];
    }

    return msg;
  } catch (error) {
    log.error(`\n⚠ faq():\n${error}`);
    return false;
  }
}

/**
 * Retrieves channelId and userId for the channel for logging
 * @param {object} session Object to interact with BF platform
 */
function dataToLog(session) {
  try {
    const { channelId } = session.message.address;
    let userId = 'undetermined';
    if (channelId === 'telegram') {
      userId = session.message.sourceEvent.message.from.id;
    }
    if (channelId === 'facebook') {
      userId = session.message.sourceEvent.sender.id;
    }
    return { channelId, userId };
  } catch (error) {
    log.error(`\n⚠ dataToLog():\n${error}`);
    return false;
  }
}

module.exports = {
  getCard,
  getCarousel,
  getAudioMsg,
  getStickerIdByPlay,
  getFeedbackInfo,
  faq,
  dataToLog,
};
