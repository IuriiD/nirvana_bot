// Sends text and stickers. DRY
const builder = require('botbuilder');
const { parseAnswer } = require('./parseAnswer');
const phrases = require('./phrases');

function sendAnswer(session, answer) {
  const { text, sticker } = parseAnswer(phrases, answer);
  if (text) session.send(text);
  if (sticker) {
    const card = new builder.Message(session);
    card.attachments([
      new builder.HeroCard(session)
        .title('Classic White T-Shirt')
        .subtitle('100% Soft and Luxurious Cotton')
        .text('Price is $25 and carried in sizes (S, M, L, and XL)')
        .images([
          builder.CardImage.create(
            session,
            `https://raw.githubusercontent.com/IuriiD/nirvana_bot/master/stickers/${sticker}.png`,
          ),
        ])
        .buttons([builder.CardAction.imBack(session, 'buy classic white t-shirt', 'Buy')]),
    ]);
    session.send(card);
    /*
    session.send({
      text: '',
      attachments: [
        {
          contentType: 'image/png',
          contentUrl: `https://raw.githubusercontent.com/IuriiD/nirvana_bot/master/stickers/${sticker}.png`,
          name: `${sticker}.png`,
        },
      ],
    }); */
  }
}

module.exports = { sendAnswer };
