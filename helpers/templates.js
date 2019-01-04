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
 * Telegram postback button payload can be <=64bit so it couldn't
 * contain 23+ numbers like 156|158 etc >> using letters instead
 */
const letter2Number = {
  153: 'a',
  154: 'b',
  155: 'c',
  156: 'd',
  157: 'e',
  158: 'f',
  159: 'g',
  160: 'h',
  161: 'i',
  162: 'j',
  163: 'k',
  164: 'l',
  165: 'm',
  166: 'n',
  167: 'o',
  168: 'p',
  169: 'q',
  170: 'r',
  171: 's',
  172: 't',
  173: 'u',
  174: 'v',
  175: 'w',
  176: 'x',
  177: 'y',
  178: 'z',
  a: '153',
  b: '154',
  c: '155',
  d: '156',
  e: '157',
  f: '158',
  g: '159',
  h: '160',
  i: '161',
  j: '162',
  k: '163',
  l: '164',
  m: '165',
  n: '166',
  o: '167',
  p: '168',
  q: '169',
  r: '170',
  s: '171',
  t: '172',
  u: '173',
  v: '174',
  w: '175',
  x: '176',
  y: '177',
  z: '178',
};

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
    // const shareButton = shareToFbPayload(imageId);

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
                // shareButton,
                {
                  type: 'postback',
                  payload: i18n.__('random_phrase_payload'),
                  title: i18n.__('random_phrase'),
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
function makeFbCarousel(foundPlaysIds, stickersObj, nextIds = null, numbers2Letters) {
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

    // A special sticker would be good for this card. So far it'll be #48
    if (nextIds) {
      const letters = nextIds.map(number => numbers2Letters[number]);
      const whatNextStickerId = '48';
      fbCardsCarousel.push({
        title: i18n.__('ga'),
        image_url: `${process.env.imgBaseUrl}/stickers/${whatNextStickerId}.png`,
        subtitle: '',
        buttons: [
          {
            type: 'postback',
            payload: `[### next ###]${letters.join('|')}`,
            title: i18n.__('show_more'),
          },
          {
            type: 'postback',
            payload: i18n.__('random_phrase_payload'),
            title: i18n.__('random_phrase'),
          },
        ],
      });
    } else {
      const whatNextStickerId = '48';
      fbCardsCarousel.push({
        title: i18n.__('ga'),
        image_url: `${process.env.imgBaseUrl}/stickers/${whatNextStickerId}.png`,
        subtitle: '',
        buttons: [
          {
            type: 'postback',
            payload: i18n.__('random_phrase_payload'),
            title: i18n.__('random_phrase'),
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
function fbCarousel(foundPlaysIds, stickersObj, numbersForLetters) {
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
      fbCardsCarousel = makeFbCarousel(showNow, stickersObj, showNext, numbersForLetters);
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
function tStickerWButtons(imageId, stickersObj, randomPhraseBtn = false) {
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

    if (randomPhraseBtn) {
      keyBoard.inline_keyboard.push([
        {
          text: i18n.__('random_phrase'),
          callback_data: i18n.__('random_phrase_payload'),
        },
      ]);
    }

    const { telegramStickerId } = stickersObj[imageId].sticker;
    const message = {
      method: 'sendSticker',
      parameters: {
        sticker: telegramStickerId,
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
function makeTCarousel(foundPlaysIds, stickersObj, nextIds = null, numbers2Letters) {
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
      const { telegramStickerId } = stickersObj[playId].sticker;
      tCardsCarousel.push({
        method: 'sendSticker',
        parameters: {
          sticker: telegramStickerId,
          reply_markup: keyBoard,
        },
      });
    });

    if (nextIds) {
      const letters = nextIds.map(number => numbers2Letters[number]);

      tCardsCarousel[tCardsCarousel.length - 1].parameters.reply_markup.inline_keyboard.push([
        {
          text: i18n.__('show_more'),
          callback_data: `[### next ###]${letters.join('|')}`,
        },
      ]);
    }

    tCardsCarousel[tCardsCarousel.length - 1].parameters.reply_markup.inline_keyboard.push([
      {
        text: i18n.__('random_phrase'),
        callback_data: i18n.__('random_phrase_payload'),
      },
    ]);
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
function tStickersArray(foundPlaysIds, stickersObj, numbersForLetters) {
  try {
    if (foundPlaysIds.length < 1) return false;

    if (foundPlaysIds.length === 1) {
      const playNeededId = foundPlaysIds[0];
      if (!Object.keys(stickersObj).includes(playNeededId)) return false;
      const singleTelegramCard = tStickerWButtons(playNeededId, stickersObj, false);
      return singleTelegramCard;
    }

    let tCardsCarousel = [];
    if (foundPlaysIds.length > 3) {
      const showNow = foundPlaysIds.slice(0, 3);
      const showNext = foundPlaysIds.slice(3, foundPlaysIds.length);
      tCardsCarousel = makeTCarousel(showNow, stickersObj, showNext, numbersForLetters);
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
 * Returns a HeroCard template for Skype for a given phrase
 * Looks like HeroCard doesn't allow to set up image proportions so
 * images are display partly hidden >> decided to use separate image + card with only buttons
 * @param {string} imageId # of a sticker ('1', '20' etc)
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function skypeCard(session, imageId, stickersObj, randomPhraseBtn = false) {
  try {
    if (!Object.keys(stickersObj).includes(imageId)) {
      return false;
    }

    const playId = getPlayIbByStickerId(imageId, stickersObj);
    // const shareButton = shareToFbPayload(imageId);

    const image = {
      contentType: 'image/png',
      contentUrl: `${process.env.imgBaseUrl}/stickers/${imageId}.png`,
      name: `${process.env.imgBaseUrl}/stickers/${imageId}.png`,
    };

    const card = new builder.HeroCard(session).buttons([
      {
        type: 'openUrl',
        value: `${process.env.domain}/play/${playId}`,
        title: i18n.__('read'),
      },
      {
        type: 'postBack',
        value: `[### play ###]${playId}`,
        title: i18n.__('listen'),
      },
    ]);

    if (randomPhraseBtn) {
      card.data.content.buttons.push({
        type: 'postBack',
        value: i18n.__('random_phrase_payload'),
        title: i18n.__('random_phrase'),
      });
    }

    return [image, card];
  } catch (error) {
    log.error(`\n⚠ skypeCard():\n${error}`);
    return false;
  }
}

/**
 * Helper function used by tStickersArray()
 * @param {array} foundPlaysIds A list of plays' Ids
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 * @param {array} nextIds A list of plays' ids to show next onclick on corresponding button
 */
function makeSkypeCarousel(session, foundPlaysIds, stickersObj, nextIds = null) {
  try {
    let skypeCardsCarousel = [];
    foundPlaysIds.forEach((playId) => {
      if (!Object.keys(stickersObj).includes(playId)) return false;

      const everyCard = skypeCard(session, playId, stickersObj);
      skypeCardsCarousel = skypeCardsCarousel.concat(everyCard);
    });

    if (nextIds) {
      skypeCardsCarousel[skypeCardsCarousel.length - 1].data.content.buttons.push(
        {
          type: 'postBack',
          value: `[### next ###]${nextIds.join('|')}`,
          title: i18n.__('show_more'),
        },
        {
          type: 'postBack',
          value: i18n.__('random_phrase_payload'),
          title: i18n.__('random_phrase'),
        },
      );
    }
    return skypeCardsCarousel;
  } catch (error) {
    log.error(`\n⚠ makeSkypeCarousel():\n${error}`);
    return false;
  }
}

/**
 * Returns a carousel of HeroCards for Skype for relevant plays
 * @param {array} foundPlays A list of plays' titles
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function skypeCarousel(session, foundPlaysIds, stickersObj) {
  try {
    if (foundPlaysIds.length < 1) return false;

    if (foundPlaysIds.length === 1) {
      const playNeededId = foundPlaysIds[0];
      if (!Object.keys(stickersObj).includes(playNeededId)) return false;
      const singleSkypeCard = skypeCard(session, playNeededId, stickersObj);
      return singleSkypeCard;
    }

    let skypeCardsCarousel = [];
    if (foundPlaysIds.length > 3) {
      const showNow = foundPlaysIds.slice(0, 3);
      const showNext = foundPlaysIds.slice(3, foundPlaysIds.length);
      skypeCardsCarousel = makeSkypeCarousel(session, showNow, stickersObj, showNext);
    } else {
      skypeCardsCarousel = makeSkypeCarousel(session, foundPlaysIds, stickersObj);
    }
    return skypeCardsCarousel;
  } catch (error) {
    log.error(`\n⚠ skypeCarousel():\n${error}`);
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

    let msg;

    if (channelId === 'telegram') {
      const tMessage = tStickerWButtons(imageId, stickersObj, true);
      msg = new builder.Message(session).sourceEvent({
        telegram: tMessage,
      });
    }

    if (channelId === 'facebook') {
      const fbMessage = fbCard(imageId, stickersObj);
      msg = new builder.Message(session).sourceEvent({
        facebook: fbMessage,
      });
    }

    if (channelId === 'skype' || channelId === 'webchat') {
      const skypeMessage = skypeCard(session, imageId, stickersObj, true);
      msg = new builder.Message(session).attachments(skypeMessage).attachmentLayout('list');
    }

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
function getCarousel(session, foundPlays, stickersObj, numbersForLetters) {
  try {
    const { channelId } = session.message.address;

    let msg;

    if (channelId === 'telegram') {
      const tCardsCarousel = tStickersArray(foundPlays, stickersObj, numbersForLetters);
      msg = new builder.Message(session).sourceEvent({
        telegram: tCardsCarousel,
      });
    }

    if (channelId === 'facebook') {
      const fbCardsCarousel = fbCarousel(foundPlays, stickersObj, numbersForLetters);
      msg = new builder.Message(session).sourceEvent({
        facebook: fbCardsCarousel,
      });
    }

    if (channelId === 'skype' || channelId === 'webchat') {
      const skypeCardsCarousel = skypeCarousel(session, foundPlays, stickersObj, numbersForLetters);
      msg = new builder.Message(session).attachments(skypeCardsCarousel).attachmentLayout('list');
    }

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
    // here2
    const message = {
      method: 'sendAudio',
      parameters: {
        audio: {
          url: `${process.env.imgBaseUrl}/mp3/${audio}`,
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: i18n.__('random_phrase'),
                callback_data: i18n.__('random_phrase_payload'),
              },
            ],
          ],
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
 * Returns a message used to send an mp3 for a given play to Skype
 * @param {string} play Name of the play
 * @param {object} stickersObj Object with info for stickers (phrase, play name/url/audio etc)
 */
function skypeAudio(session, playId, stickersObj) {
  try {
    if (!Object.keys(stickersObj).includes(playId)) return false;

    const audio = stickersObj[playId].play.audio.fileName;
    const { name } = stickersObj[playId].play;

    const message = new builder.AudioCard(session)
      .title(name)
      .image(builder.CardImage.create(session, `${process.env.imgBaseUrl}/stickers/${playId}.png`))
      .media([builder.CardMedia.create(session, `${process.env.imgBaseUrl}/mp3/${audio}`)])
      .autoloop(false)
      .autostart(false)
      .shareable(false)
      .buttons([
        {
          type: 'postBack',
          value: i18n.__('random_phrase_payload'),
          title: i18n.__('random_phrase'),
        },
      ]);

    return [message];
  } catch (error) {
    log.error(`\n⚠ skypeAudio():\n${error}`);
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

    const audioBlock = {
      attachment: {
        type: 'audio',
        payload: {
          url: `${process.env.imgBaseUrl}/mp3/${encodeURIComponent(audio)}`,
        },
        is_reusable: true,
      },
    };

    const shareButton = shareToFbPayload(playId);
    const buttons = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: i18n.__('what_to_do_now'),
          buttons: [
            {
              type: 'postback',
              payload: i18n.__('random_phrase_payload'),
              title: i18n.__('random_phrase'),
            },
            shareButton,
          ],
        },
      },
    };
    return [audioBlock, buttons];
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

    let msg;

    if (channelId === 'telegram') {
      const tAudioMessage = tAudio(playId, stickersObj);
      msg = new builder.Message(session).sourceEvent({
        telegram: tAudioMessage,
      });
    }

    if (channelId === 'facebook') {
      const fbAudioMessage = fbAudio(playId, stickersObj);
      const msg1 = new builder.Message(session).sourceEvent({
        facebook: fbAudioMessage[0],
      });
      const msg2 = new builder.Message(session).sourceEvent({
        facebook: fbAudioMessage[1],
      });
      msg = [msg1, msg2];
    }

    if (channelId === 'skype' || channelId === 'webchat') {
      const skypeAudioMessage = skypeAudio(session, playId, stickersObj);
      msg = new builder.Message(session).attachments(skypeAudioMessage);
    }

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
                url: process.env.fbmBotUrl,
              },
            ],
            [
              {
                text: i18n.__('skype'),
                url: process.env.skypeBotUrl,
              },
            ],
            [
              {
                text: i18n.__('webchat'),
                url: process.env.webChatUrl,
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

/**
 * Returns payload with contacts for FBM
 */
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
              url: process.env.tBotUrl,
              title: i18n.__('telegram'),
            },
            {
              type: 'web_url',
              url: process.env.skypeBotUrl,
              title: i18n.__('skype'),
            },
            {
              type: 'web_url',
              url: process.env.webChatUrl,
              title: i18n.__('webchat'),
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
 * Returns payload with contacts for Skype
 */
function getFeedbackInfo4Skype(session) {
  try {
    const buttons = new builder.HeroCard(session).buttons([
      {
        type: 'openUrl',
        value: process.env.tBotUrl,
        title: i18n.__('telegram'),
      },
      {
        type: 'openUrl',
        value: process.env.fbmBotUrl,
        title: i18n.__('fbm'),
      },
      {
        type: 'openUrl',
        value: process.env.webChatUrl,
        title: i18n.__('webchat'),
      },
    ]);
    const message = [i18n.__('lp_fb_descr'), [buttons]];

    return message;
  } catch (error) {
    log.error(`\n⚠ getFeedbackInfo4Skype():\n${error}`);
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
    let msg;

    if (channelId === 'telegram') {
      const tMessage = getFeedbackInfo4T();
      msg = new builder.Message(session).sourceEvent({
        telegram: tMessage,
      });
    }

    if (channelId === 'facebook') {
      const fbMessage = getFeedbackInfo4Fb();
      msg = new builder.Message(session).sourceEvent({
        facebook: fbMessage,
      });
    }

    if (channelId === 'skype' || channelId === 'webchat') {
      const skypeMessage = getFeedbackInfo4Skype(session);
      msg = new builder.Message(session)
        .text(skypeMessage[0])
        .attachments(skypeMessage[1])
        .attachmentLayout('list');
    }

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
    const message2 = tStickerWButtons(greetingSticker, stickersObj, true);
    /* message2.parameters.reply_markup.inline_keyboard.push([
      {
        text: i18n.__('random_phrase'),
        callback_data: i18n.__('random_phrase_payload'),
      },
    ]); */

    return [message1, message2];
  } catch (error) {
    log.error(`\n⚠ getFaq4T():\n${error}`);
    return false;
  }
}

/**
 * Returns payload with contacts for Telegram platform
 * @param {object} session Object to interact with BF platform
 */
function getFaq4Skype(session, stickersObj) {
  let userFirstName = '';

  try {
    userFirstName = session.message.address.user.name;
  } catch (error) {
    userFirstName = false;
  }

  try {
    let greeting = '';
    if (userFirstName) greeting = `, ${userFirstName}`;

    const message1 = {
      text: i18n.__('general_info', greeting, process.env.botName),
    };

    const stickers = i18n.__('greetings_stickers').split('|');
    const randStickerIndex = Math.floor(Math.random() * stickers.length);
    const greetingSticker = stickers[randStickerIndex];

    const message2 = skypeCard(session, greetingSticker, stickersObj, true);

    return [message1, message2];
  } catch (error) {
    log.error(`\n⚠ getFaq4Skype():\n${error}`);
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

function getFaq4Fb2(stickersObj) {
  try {
    const stickers = i18n.__('greetings_stickers').split('|');
    const randStickerIndex = Math.floor(Math.random() * stickers.length);
    const greetingSticker = stickers[randStickerIndex];
    const message = fbCard(greetingSticker, stickersObj);
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
      const fbMessage2 = getFaq4Fb2(stickersObj);
      const msg1 = new builder.Message(session).sourceEvent({
        facebook: fbMessage1,
      });
      const msg2 = new builder.Message(session).sourceEvent({
        facebook: fbMessage2,
      });
      msg = [msg1, msg2];
    }

    if (channelId === 'skype' || channelId === 'webchat') {
      const skypeMessage = getFaq4Skype(session, stickersObj);

      const msg1 = new builder.Message(session).text(skypeMessage[0].text);
      const msg2 = new builder.Message(session)
        .attachments(skypeMessage[1])
        .attachmentLayout('list');
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
    if (channelId === 'skype' || channelId === 'webchat') {
      userId = session.message.user.id;
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
  letter2Number,
};
