/**
 *
 * Platform-specific templates used in bot's replies
 * # Facebook: a single generict template (GT) for replies or
 * a carousel of GT for results of Elastic Search (ES)
 * # Telegram: a single block 'sticker + 2 buttons' or
 * an array of such blocks, respectively
 *
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
 */
function fbCard(imageId, allPlays, allPhrases) {
  console.log('\nfbCard');
  console.log(`imageId: ${imageId}`);
  console.log(typeof imageId);
  // console.dir(phrases['168']);
  // const ourPlay = Object.keys(allPlays).filter(play => phrases[play].stickerId === imageId);
  const { play } = allPhrases[imageId];
  // const ourPlay = allPlays.filter(play => play.stickerId === imageId);
  // const play = Object.keys(ourPlay)[0];
  console.log(`ourPlay - ${play}`);
  const { url, audio } = allPlays[play];

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
                type: 'web_url',
                url: audio,
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
 */
async function fbCarousel(foundPlays, allPlays, allPhrases) {
  console.log('\nfbCarousel');
  console.log(`found plays: ${foundPlays}`);
  console.log(typeof foundPlays);

  if (foundPlays.length < 1) {
    return false;
  }

  if (foundPlays.length === 1) {
    const { stickerId } = allPlays[foundPlays[0]];
    console.log(`\n\nstikerId: ${stickerId}`);
    console.log(typeof stickerId);
    const singleFbCard = fbCard(stickerId, allPlays, allPhrases);
    return singleFbCard;
  }

  const fbCardsCarousel = [];
  console.log('for each play...');
  foundPlays.forEach((play) => {
    console.log(`play - ${play}`);
    console.log('object for play');
    console.dir(allPlays[play]);
    console.log(`image_url: ${process.env.imgBaseUrl}/stickers/${allPlays[play].stickerId}.png`);
    console.log(`allPlays[play].url: ${allPlays[play].url}`);

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
          type: 'web_url',
          url: allPlays[play].audio,
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
 */
function tStickerWButtons(imageId, allPlays, allPhrases) {
  const { play } = allPhrases[imageId];
  const { url, audio } = allPlays[play];

  console.log('\nSTICKER URL');
  console.log(`${process.env.imgBaseUrl}/stickers/${imageId}.png`);
  console.log('\nOUR PLAY');
  console.dir(play);
  console.log('\nPLAY URL');
  console.log(url);
  console.log('\nAUDIO URL');
  console.log(audio);

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
              url: audio,
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
                url: allPlays[play].audio,
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
 */
function getCard(session, imageId, allPlays = plays, allPhrases = phrases) {
  console.log('\ngetCard');
  // console.dir(allPlays);
  const fbMessage = fbCard(imageId, allPlays, allPhrases);
  const tMessage = tStickerWButtons(imageId, allPlays, allPhrases);

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

module.exports = { getCard, getCarousel };
