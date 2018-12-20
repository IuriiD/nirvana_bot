const builder = require('botbuilder');
const { locale } = require('../config/config');
const phrases = require('./phrases');
const plays = require('./plays');

const l10n = require(`../locales/${locale}`);

function getCard(session, imageId, allPlays = plays) {
  const { play } = phrases[imageId];
  const { url } = allPlays[play];

  const msg = new builder.Message(session).sourceEvent({
    facebook: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: l10n.what_to_do,
              image_url: `${process.env.imgBaseUrl}${imageId}.png`,
              subtitle: '',
              buttons: [
                {
                  type: 'web_url',
                  url,
                  title: l10n.read,
                },
                {
                  type: 'web_url',
                  url: 'http://www.doslidy.org.ua/mp3/d2trk01.mp3',
                  title: l10n.listen,
                },
              ],
            },
          ],
          image_aspect_ratio: 'square',
          sharable: true,
        },
      },
    },
    telegram: {
      method: 'sendSticker',
      parameters: {
        sticker: {
          url: `${process.env.imgBaseUrl}${imageId}.png`,
          mediaType: 'image/png',
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: l10n.read,
                url,
              },
              {
                text: l10n.listen,
                url: 'http://www.doslidy.org.ua/mp3/d2trk01.mp3', // allPlays[play].audio
              },
            ],
          ],
        },
      },
    },
  });
  return msg;
}

function getCarousel(session, foundPlays, allPlays = plays) {
  const fbCards = [];
  foundPlays.forEach((play) => {
    fbCards.push({
      title: l10n.what_to_do,
      image_url: `${process.env.imgBaseUrl}${allPlays[play].telegramStickerId}.png`,
      subtitle: '',
      buttons: [
        {
          type: 'web_url',
          url: allPlays[play].url,
          title: l10n.read,
        },
        {
          type: 'web_url',
          url: 'http://www.doslidy.org.ua/mp3/d2trk01.mp3', // allPlays[play].audio
          title: l10n.listen,
        },
      ],
    });
  });

  const telegramCards = [];
  foundPlays.forEach((play) => {
    telegramCards.push({
      method: 'sendSticker',
      parameters: {
        sticker: {
          url: `${process.env.imgBaseUrl}${allPlays[play].telegramStickerId}.png`,
          mediaType: 'image/png',
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: l10n.read,
                url: allPlays[play].url,
              },
              {
                text: l10n.listen,
                url: 'http://www.doslidy.org.ua/mp3/d2trk01.mp3', // allPlays[play].audio
              },
            ],
          ],
        },
      },
    });
  });

  const msg = new builder.Message(session).sourceEvent({
    facebook: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: fbCards,
          image_aspect_ratio: 'square',
          sharable: true,
        },
      },
    },
    telegram: telegramCards,
  });
  return msg;
}

module.exports = { getCard, getCarousel };
